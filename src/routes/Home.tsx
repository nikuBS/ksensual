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
import { venue } from '../data/event'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

export default function Home() {
  return (
    <>
      <Hero />
      <Highlights />
      <ArtistGrid previewCount={12} />
      <Schedule />
      <TicketsSection />
      <Section title="Venue" subtitle="Plan your route and stay near the festival district.">
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <p className="text-sm text-muted">Address</p>
            <p className="font-semibold">{venue.address}</p>
            <p className="mt-4 text-sm text-muted">Transport</p>
            <ul className="mt-1 space-y-1 text-sm text-muted">
              {venue.transport.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted">{venue.shuttle}</p>
            <p className="mt-4 text-sm text-muted">Hotels</p>
            <ul className="mt-1 space-y-1 text-sm text-muted">
              {venue.hotels.map((hotel) => (
                <li key={hotel}>• {hotel}</li>
              ))}
            </ul>
          </Card>
          <Card className="flex min-h-72 flex-col items-center justify-center text-center">
            <p className="mb-2 text-sm text-muted">Map Placeholder</p>
            <p className="max-w-sm text-sm text-muted">Replace this box with an embedded map iframe if needed. External URL is already prepared.</p>
            <a href={venue.mapUrl} target="_blank" rel="noreferrer" className="mt-4">
              <Button variant="outline">Open Map URL</Button>
            </a>
          </Card>
        </div>
      </Section>
      <Gallery />
      <FAQSection limit={8} />
      <Section title="More Questions?">
        <Link to="/faq">
          <Button variant="outline">View all FAQ</Button>
        </Link>
      </Section>
      <Contact />
    </>
  )
}
