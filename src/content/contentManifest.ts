import type { ContentSectionKey } from '../admin/types/contentSchema'

export const CONTENT_FILE_MAP: Record<ContentSectionKey, string> = {
  site: 'site.json',
  eventInfo: 'eventInfo.json',
  hero: 'hero.json',
  artists: 'artists.json',
  workshops: 'workshops.json',
  parties: 'parties.json',
  schedule: 'schedule.json',
  gallery: 'gallery.json',
  faq: 'faq.json',
  notices: 'notices.json',
}
