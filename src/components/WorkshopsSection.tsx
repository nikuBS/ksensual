import { publishedOnly } from '../admin/utils/contentHelpers'
import { useEventContent } from '../content/ContentContext'
import { useLocale } from '../i18n/LocaleContext'
import { Section } from './Section'
import { Card } from './ui/Card'

const titleByLocale = {
  en: { title: 'Workshops', subtitle: 'Curated classes for all levels.' },
  ko: { title: '워크샵', subtitle: '레벨별 큐레이션 클래스' },
  es: { title: 'Workshops', subtitle: 'Clases curadas para todos los niveles.' },
}

export function WorkshopsSection() {
  const { content } = useEventContent()
  const { locale } = useLocale()
  const copy = titleByLocale[locale]
  const workshops = publishedOnly(content.workshops)

  return (
    <Section title={copy.title} subtitle={copy.subtitle}>
      {workshops.length === 0 ? (
        <Card className="text-sm text-muted">No workshops published yet.</Card>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {workshops.map((workshop) => (
            <Card key={workshop.id}>
              <p className="text-sm text-accentSoft">{workshop.date} · {workshop.startTime}-{workshop.endTime}</p>
              <h3 className="mt-1 text-lg font-semibold">{workshop.title}</h3>
              <p className="text-sm text-muted">{workshop.instructor} · {workshop.level}</p>
              <p className="mt-2 text-sm text-muted">{workshop.description}</p>
            </Card>
          ))}
        </div>
      )}
    </Section>
  )
}
