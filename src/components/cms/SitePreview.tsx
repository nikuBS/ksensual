import type { CmsContent } from '../../utils/cms'

type SitePreviewProps = {
  content: CmsContent
  compact?: boolean
}

export function SitePreview({ content, compact = false }: SitePreviewProps) {
  const headingClass = compact ? 'text-3xl sm:text-4xl' : 'text-4xl sm:text-6xl'
  const sectionGridClass = compact ? 'lg:grid-cols-2' : 'lg:grid-cols-3'

  return (
    <div className="overflow-hidden rounded-[28px] border border-black/10 bg-white/75 shadow-[0_18px_60px_rgba(6,50,71,0.12)] backdrop-blur">
      <section className="grid gap-8 border-b border-black/10 px-6 py-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accentSoft">{content.status}</p>
          <h1 className={`mt-4 text-balance font-heading text-[#063247] ${headingClass}`}>{content.main.title}</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-base">{content.main.subtitle}</p>
        </div>
        <div className="overflow-hidden rounded-[24px] border border-black/10 bg-base/70">
          {content.main.heroImage ? (
            <img src={content.main.heroImage} alt={content.main.title} className="h-full min-h-64 w-full object-cover" />
          ) : (
            <div className="flex min-h-64 items-center justify-center px-6 text-center text-sm text-muted">
              No hero image URL provided.
            </div>
          )}
        </div>
      </section>

      <section className={`grid gap-4 px-6 py-8 ${sectionGridClass} lg:px-8`}>
        {content.sections.length > 0 ? (
          content.sections.map((section) => (
            <article key={section.id} className="flex h-full flex-col rounded-[24px] border border-black/10 bg-base/70 p-5">
              {section.image ? (
                <img src={section.image} alt={section.title} className="mb-4 h-40 w-full rounded-2xl object-cover" />
              ) : null}
              <p className="text-xs uppercase tracking-[0.24em] text-accentSoft">{section.id}</p>
              <h2 className="mt-3 text-xl font-bold text-[#063247]">{section.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-6 text-muted">{section.body}</p>
              {section.ctaLabel && section.ctaUrl ? (
                <a
                  href={section.ctaUrl}
                  className="mt-5 inline-flex w-fit rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-[#063247] transition hover:border-accent/50 hover:bg-white"
                >
                  {section.ctaLabel}
                </a>
              ) : null}
            </article>
          ))
        ) : (
          <div className="rounded-[24px] border border-dashed border-black/15 px-6 py-10 text-center text-sm text-muted">
            No sections configured yet. Add section objects in the admin JSON editor.
          </div>
        )}
      </section>
    </div>
  )
}
