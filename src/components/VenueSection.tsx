import { Section } from './Section'
import { Card } from './ui/Card'
import { Button } from './ui/Button'
import { getLocalizedContent } from '../data/localizedContent'
import { useLocale } from '../i18n/LocaleContext'
import { messages } from '../i18n/messages'

export function VenueSection() {
  const { locale } = useLocale()
  const { venue } = getLocalizedContent(locale)
  const m = messages[locale]

  return (
    <Section title={m.sections.venueTitle} subtitle={m.sections.venueSubtitle}>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <p className="text-sm text-muted">{m.common.address}</p>
          <p className="font-semibold">{venue.address}</p>
          <p className="mt-4 text-sm text-muted">{m.common.transport}</p>
          <ul className="mt-1 space-y-1 text-sm text-muted">
            {venue.transport.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">{venue.shuttle}</p>
          <p className="mt-4 text-sm text-muted">{m.common.hotels}</p>
          <ul className="mt-1 space-y-1 text-sm text-muted">
            {venue.hotels.map((hotel) => (
              <li key={hotel}>• {hotel}</li>
            ))}
          </ul>
        </Card>
        <Card className="flex min-h-72 flex-col items-center justify-center text-center">
          <p className="mb-2 text-sm text-muted">{m.common.mapPlaceholder}</p>
          <p className="max-w-sm text-sm text-muted">{m.common.mapPlaceholderDesc}</p>
          <a href={venue.mapUrl} target="_blank" rel="noreferrer" className="mt-4">
            <Button variant="outline">{m.common.openMapUrl}</Button>
          </a>
        </Card>
      </div>
    </Section>
  )
}
