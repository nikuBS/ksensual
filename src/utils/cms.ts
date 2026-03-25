export type SiteStatus = 'OPEN' | 'MAINTENANCE'

export type CmsSection = {
  id: string
  title: string
  body: string
  image?: string
  ctaLabel?: string
  ctaUrl?: string
}

export type CmsMain = {
  title: string
  subtitle: string
  heroImage: string
}

export type CmsContent = {
  status: SiteStatus
  main: CmsMain
  sections: CmsSection[]
}

type ValidationResult =
  | {
      ok: true
      data: CmsContent
    }
  | {
      ok: false
      errors: string[]
    }

export const defaultCmsContent: CmsContent = {
  status: 'OPEN',
  main: {
    title: 'K-SENSUAL',
    subtitle: 'Editable GitHub Pages CMS powered by JSONbin.io',
    heroImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80',
  },
  sections: [
    {
      id: 'lineup',
      title: 'Lineup Highlights',
      body: 'Update this section from the admin page without redeploying the static site.',
      image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80',
      ctaLabel: 'View Lineup',
      ctaUrl: '/lineup',
    },
    {
      id: 'tickets',
      title: 'Ticket Notice',
      body: 'Use raw JSON editing to adjust operational notices, event summaries, and landing content.',
      ctaLabel: 'Ticket Info',
      ctaUrl: '/tickets',
    },
  ],
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isOptionalString(value: unknown): value is string | undefined {
  return typeof value === 'undefined' || typeof value === 'string'
}

export function validateCmsContent(value: unknown): ValidationResult {
  const errors: string[] = []

  if (!isRecord(value)) {
    return { ok: false, errors: ['Root value must be a JSON object.'] }
  }

  if (value.status !== 'OPEN' && value.status !== 'MAINTENANCE') {
    errors.push('`status` must be either "OPEN" or "MAINTENANCE".')
  }

  if (!isRecord(value.main)) {
    errors.push('`main` must be an object.')
  } else {
    if (typeof value.main.title !== 'string' || value.main.title.trim() === '') {
      errors.push('`main.title` must be a non-empty string.')
    }
    if (typeof value.main.subtitle !== 'string') {
      errors.push('`main.subtitle` must be a string.')
    }
    if (typeof value.main.heroImage !== 'string') {
      errors.push('`main.heroImage` must be a string URL.')
    }
  }

  if (!Array.isArray(value.sections)) {
    errors.push('`sections` must be an array.')
  } else {
    value.sections.forEach((section, index) => {
      if (!isRecord(section)) {
        errors.push(`sections[${index}] must be an object.`)
        return
      }

      if (typeof section.id !== 'string' || section.id.trim() === '') {
        errors.push(`sections[${index}].id must be a non-empty string.`)
      }

      if (typeof section.title !== 'string' || section.title.trim() === '') {
        errors.push(`sections[${index}].title must be a non-empty string.`)
      }

      if (typeof section.body !== 'string') {
        errors.push(`sections[${index}].body must be a string.`)
      }

      if (!isOptionalString(section.image)) {
        errors.push(`sections[${index}].image must be a string if provided.`)
      }

      if (!isOptionalString(section.ctaLabel)) {
        errors.push(`sections[${index}].ctaLabel must be a string if provided.`)
      }

      if (!isOptionalString(section.ctaUrl)) {
        errors.push(`sections[${index}].ctaUrl must be a string if provided.`)
      }
    })
  }

  if (errors.length > 0) {
    return { ok: false, errors }
  }

  return {
    ok: true,
    data: value as CmsContent,
  }
}

export function parseCmsJson(raw: string): ValidationResult {
  try {
    const parsed = JSON.parse(raw) as unknown
    return validateCmsContent(parsed)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown JSON parsing error.'
    return { ok: false, errors: [`Invalid JSON: ${message}`] }
  }
}

export function formatCmsJson(content: CmsContent): string {
  return JSON.stringify(content, null, 2)
}
