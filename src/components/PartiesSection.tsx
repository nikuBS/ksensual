import { publishedOnly } from '../admin/utils/contentHelpers'
import { useEventContent } from '../content/ContentContext'
import { useLocale } from '../i18n/LocaleContext'
import { Section } from './Section'
import { Card } from './ui/Card'

const titleByLocale = {
  en: { title: 'Parties', subtitle: 'Social dance programs and special nights.' },
  ko: { title: '파티', subtitle: '소셜댄스 프로그램 및 스페셜 나이트' },
  es: { title: 'Parties', subtitle: 'Programas sociales y noches especiales.' },
}

export function PartiesSection() {
  const { content } = useEventContent()
  const { locale } = useLocale()
  const copy = titleByLocale[locale]
  const parties = publishedOnly(content.parties)

  return (
    <Section title={copy.title} subtitle={copy.subtitle}>
      {parties.length === 0 ? (
        <Card className="text-sm text-muted">No party programs published yet.</Card>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {parties.map((party) => (
            <Card key={party.id}>
              <p className="text-sm text-accentSoft">{party.date} · {party.startTime}-{party.endTime}</p>
              <h3 className="mt-1 text-lg font-semibold">{party.name}</h3>
              <p className="text-sm text-muted">{party.venue} · {party.dj}</p>
              <p className="mt-2 text-sm text-muted">{party.description}</p>
              {party.dressCode ? <p className="mt-2 text-xs text-muted">Dress code: {party.dressCode}</p> : null}
            </Card>
          ))}
        </div>
      )}
    </Section>
  )
}
