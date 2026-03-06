import type { EventCmsBundle, Publishable } from '../types/contentSchema'

export function sortByOrder<T extends Publishable>(items: T[]): T[] {
  return [...items].sort((a, b) => a.order - b.order)
}

export function publishedOnly<T extends Publishable>(items: T[]): T[] {
  return sortByOrder(items.filter((item) => item.isPublished))
}

export function createId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`
}

export function normalizeBundle(base: EventCmsBundle, candidate: unknown): EventCmsBundle {
  if (!candidate || typeof candidate !== 'object') return base
  const data = candidate as Partial<EventCmsBundle>
  return {
    site: typeof data.site === 'object' && data.site ? { ...base.site, ...data.site } : base.site,
    eventInfo: typeof data.eventInfo === 'object' && data.eventInfo ? { ...base.eventInfo, ...data.eventInfo } : base.eventInfo,
    hero: typeof data.hero === 'object' && data.hero ? { ...base.hero, ...data.hero } : base.hero,
    artists: Array.isArray(data.artists) ? data.artists : base.artists,
    workshops: Array.isArray(data.workshops) ? data.workshops : base.workshops,
    parties: Array.isArray(data.parties) ? data.parties : base.parties,
    schedule: Array.isArray(data.schedule) ? data.schedule : base.schedule,
    gallery: Array.isArray(data.gallery) ? data.gallery : base.gallery,
    faq: Array.isArray(data.faq) ? data.faq : base.faq,
    notices: Array.isArray(data.notices) ? data.notices : base.notices,
  }
}
