export type ContentSectionKey =
  | 'site'
  | 'eventInfo'
  | 'hero'
  | 'artists'
  | 'workshops'
  | 'parties'
  | 'schedule'
  | 'gallery'
  | 'faq'
  | 'notices'

export type Publishable = {
  id: string
  order: number
  isPublished: boolean
}

export type SiteContent = {
  siteName: string
  tagline: string
  description: string
  contactEmail: string
  instagramUrl: string
  whatsappUrl: string
  primaryCtaLabel: string
  primaryCtaLink: string
  updatedAt: string
}

export type EventInfoContent = {
  name: string
  slogan: string
  description: string
  startDate: string
  endDate: string
  venueName: string
  address: string
  googleMapLink: string
  ticketLink: string
  posterImage: string
  primaryCtaText: string
}

export type HeroContent = {
  title: string
  subtitle: string
  description: string
  backgroundType: 'image' | 'video'
  backgroundUrl: string
  backgroundMobileUrl?: string
  ctaLabel: string
  ctaLink: string
}

export type ArtistRole = 'ARTIST' | 'DJ' | 'INSTRUCTOR' | 'PERFORMER' | 'MEDIA'

export type ArtistContent = Publishable & {
  name: string
  role: ArtistRole
  profileImage: string
  region: string
  shortBio: string
  fullBio: string
  socialLinks: {
    instagram?: string
    youtube?: string
    website?: string
  }
}

export type WorkshopContent = Publishable & {
  date: string
  startTime: string
  endTime: string
  title: string
  instructor: string
  level: string
  description: string
  tags: string[]
}

export type PartyContent = Publishable & {
  name: string
  date: string
  startTime: string
  endTime: string
  venue: string
  dj: string
  description: string
  dressCode: string
  posterImage: string
}

export type ScheduleCard = Publishable & {
  time: string
  title: string
  summary: string
  isHighlighted: boolean
}

export type ScheduleContent = Publishable & {
  dayLabel: string
  date: string
  isHighlighted: boolean
  cards: ScheduleCard[]
}

export type GalleryContent = Publishable & {
  imageUrl: string
  thumbnailUrl: string
  caption: string
  category: string
}

export type FaqContent = Publishable & {
  question: string
  answer: string
}

export type NoticeContent = Publishable & {
  title: string
  content: string
  publishedAt: string
  isPinned: boolean
}

export type EventCmsBundle = {
  site: SiteContent
  eventInfo: EventInfoContent
  hero: HeroContent
  artists: ArtistContent[]
  workshops: WorkshopContent[]
  parties: PartyContent[]
  schedule: ScheduleContent[]
  gallery: GalleryContent[]
  faq: FaqContent[]
  notices: NoticeContent[]
}

export type CollectionSectionKey = Exclude<ContentSectionKey, 'site' | 'eventInfo' | 'hero'>
