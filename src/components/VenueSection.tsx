import { useMemo, useState } from 'react'
import { Section } from './Section'
import { Card } from './ui/Card'
import { Button } from './ui/Button'
import { Tabs } from './ui/Tabs'
import { getLocalizedContent } from '../data/localizedContent'
import { useLocale } from '../i18n/LocaleContext'
import { messages } from '../i18n/messages'

export function VenueSection() {
  const { locale } = useLocale()
  const { venue } = getLocalizedContent(locale)
  const m = messages[locale]
  const [selectedMap, setSelectedMap] = useState<'google' | 'naver' | 'kakao'>('google')

  const mapTabs = useMemo(
    () => [
      { id: 'google', label: m.common.googleMaps },
      { id: 'naver', label: m.common.naverMap },
      { id: 'kakao', label: m.common.kakaoMap },
    ],
    [m.common.googleMaps, m.common.naverMap, m.common.kakaoMap],
  )

  const selectedMapUrl =
    selectedMap === 'google' ? venue.mapLinks.google : selectedMap === 'naver' ? venue.mapLinks.naver : venue.mapLinks.kakao

  const selectedMapLabel =
    selectedMap === 'google' ? m.common.googleMaps : selectedMap === 'naver' ? m.common.naverMap : m.common.kakaoMap

  const handleMapTabChange = (id: string) => {
    if (id === 'google') {
      setSelectedMap('google')
      return
    }

    const externalUrl = id === 'naver' ? venue.mapLinks.naver : venue.mapLinks.kakao
    if (externalUrl) {
      window.open(externalUrl, '_blank', 'noopener,noreferrer')
    }
  }

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
        <Card className="flex min-h-72 flex-col text-center">
          <div className="mx-auto">
            <Tabs tabs={mapTabs} value={selectedMap} onChange={handleMapTabChange} ariaLabel="Map provider tabs" />
          </div>
          <div className="mt-5 flex flex-1 flex-col rounded-2xl border border-black/10 bg-base/40 p-3">
            <div className="mb-3 text-center text-sm text-muted">{selectedMapLabel}</div>
            <div className="overflow-hidden rounded-xl border border-black/10">
              <iframe
                title="Google Map Preview"
                src={venue.googleEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-72 w-full"
              />
            </div>
            <Button
              variant="outline"
              className="mx-auto mt-4"
              onClick={() => {
                if (!selectedMapUrl) return
                window.open(selectedMapUrl, '_blank', 'noopener,noreferrer')
              }}
              disabled={!selectedMapUrl}
            >
              {m.common.openMapUrl}
            </Button>
          </div>
        </Card>
      </div>
    </Section>
  )
}
