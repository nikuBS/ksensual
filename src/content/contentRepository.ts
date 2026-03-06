import type { ContentSectionKey, EventCmsBundle } from '../admin/types/contentSchema'
import { normalizeBundle } from '../admin/utils/contentHelpers'
import { readDraftBundle } from '../admin/utils/contentStorage'
import { artists as legacyArtists } from '../data/event'
import { EMPTY_CONTENT } from './defaultContent'
import { CONTENT_FILE_MAP } from './contentManifest'

async function fetchSection<K extends ContentSectionKey>(section: K): Promise<EventCmsBundle[K]> {
  const base = import.meta.env.BASE_URL
  const response = await fetch(`${base}content/${CONTENT_FILE_MAP[section]}`)
  if (!response.ok) {
    throw new Error(`Failed to load content file: ${CONTENT_FILE_MAP[section]}`)
  }
  return (await response.json()) as EventCmsBundle[K]
}

export async function loadEventContent(): Promise<{ base: EventCmsBundle; current: EventCmsBundle }> {
  const [
    site,
    eventInfo,
    hero,
    artists,
    workshops,
    parties,
    schedule,
    gallery,
    faq,
    notices,
  ] = await Promise.all([
    fetchSection('site'),
    fetchSection('eventInfo'),
    fetchSection('hero'),
    fetchSection('artists'),
    fetchSection('workshops'),
    fetchSection('parties'),
    fetchSection('schedule'),
    fetchSection('gallery'),
    fetchSection('faq'),
    fetchSection('notices'),
  ])

  const baseBundle = normalizeBundle(EMPTY_CONTENT, {
    site,
    eventInfo,
    hero,
    artists: buildInitialArtists(artists),
    workshops,
    parties,
    schedule,
    gallery,
    faq,
    notices,
  })

  const draft = readDraftBundle()
  const current = normalizeBundle(baseBundle, draft)

  return { base: baseBundle, current }
}

function buildInitialArtists(jsonArtists: EventCmsBundle['artists']): EventCmsBundle['artists'] {
  const mappedLegacy = legacyArtists.map((artist, index) => ({
    id: artist.id,
    name: artist.name,
    role:
      artist.category === 'DJ'
        ? 'DJ'
        : artist.category === 'GUEST_ARTIST'
          ? 'PERFORMER'
        : artist.category === 'MEDIA'
          ? 'MEDIA'
          : 'ARTIST',
    profileImage: artist.image,
    region:
      artist.guestRegion === 'DOMESTIC'
        ? 'Domestic'
        : artist.guestRegion === 'INTERNATIONAL'
          ? 'International'
          : '',
    shortBio: artist.bio,
    fullBio: artist.bio,
    socialLinks: {
      instagram: artist.socials.instagram,
      youtube: artist.socials.youtube,
      website: artist.socials.website,
    },
    order: index + 1,
    isPublished: true,
  }))

  if (jsonArtists.length === 0) return mappedLegacy

  const legacyById = new Map(mappedLegacy.map((item) => [item.id, item]))
  for (const item of jsonArtists) {
    legacyById.set(item.id, item)
  }
  return Array.from(legacyById.values()).sort((a, b) => a.order - b.order)
}
