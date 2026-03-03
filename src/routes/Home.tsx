import { Link } from 'react-router-dom'
import { Hero } from '../components/Hero'
import { Highlights } from '../components/Highlights'
import { ArtistGrid } from '../components/ArtistGrid'
import { Schedule } from '../components/Schedule'
import { TicketsSection } from '../components/TicketsSection'
import { Gallery } from '../components/Gallery'
import { FAQSection } from '../components/FAQSection'
import { Contact } from '../components/Contact'
import { Section } from '../components/Section'
import { getLocalizedContent } from '../data/localizedContent'
import { useLocale } from '../i18n/LocaleContext'
import { messages } from '../i18n/messages'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

export default function Home() {
  const { locale } = useLocale()
  const { venue } = getLocalizedContent(locale)
  const m = messages[locale]

  return (
    <>
      <Hero />
      <Highlights />
      <ArtistGrid previewCount={12} />
      <Schedule />
      <TicketsSection />
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
      <Gallery />
      <FAQSection limit={8} />
      <Section title={m.sections.moreQuestions}>
        <Link to="/faq">
          <Button variant="outline">{m.common.viewAllFaq}</Button>
        </Link>
      </Section>
      <Contact />
    </>
  )
}
