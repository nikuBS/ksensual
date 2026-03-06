import { Link } from 'react-router-dom'
import { useEventContent } from '../content/ContentContext'
import { useLocale } from '../i18n/LocaleContext'
import { messages } from '../i18n/messages'
import { assetPath } from '../lib/assets'
import { Button } from './ui/Button'
import { Countdown } from './Countdown'

/**
 * 랜딩 최상단 Hero 섹션
 * 핵심 브랜딩(K-SENSUAL), 카피, CTA, 행사 요약, 카운트다운을 한 번에 제공한다.
 */
export function Hero() {
  const { locale } = useLocale()
  const m = messages[locale]
  const { content, isLoading } = useEventContent()
  const { hero, eventInfo } = content
  const dateRangeText = eventInfo.startDate && eventInfo.endDate ? `${eventInfo.startDate} - ${eventInfo.endDate}` : ''
  const venueText = eventInfo.venueName || 'Venue TBA'
  const cityCountryText = eventInfo.address || 'Address TBA'
  const posterDesktop = assetPath(hero.backgroundUrl || eventInfo.posterImage)
  const posterMobile = assetPath(hero.backgroundMobileUrl || hero.backgroundUrl || eventInfo.posterImage)

  if (isLoading) {
    return (
      <section className="border-b border-black/10">
        <div className="mx-auto w-full max-w-6xl px-3 py-16 sm:px-6">
          <p className="text-sm text-muted">Loading content...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="relative overflow-hidden border-b border-black/10">
      <div className="absolute left-1/2 top-0 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/30 blur-[100px]" />
      <div className="mx-auto grid min-h-[72vh] w-full max-w-6xl gap-8 px-3 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="flex flex-col justify-center gap-5">
          <p className="text-xs uppercase tracking-[0.2em] text-accentSoft sm:text-sm sm:tracking-[0.25em]">{hero.subtitle}</p>
          <h1 className="max-w-3xl text-balance font-heading text-4xl leading-tight text-[#063247] sm:text-6xl md:text-7xl">{hero.title}</h1>
          <p className="max-w-2xl break-words text-sm text-muted sm:text-lg">{hero.description}</p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
            <Link to={hero.ctaLink || '/lineup'} className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto">{m.nav.artists}</Button>
            </Link>
            <Link to="/tickets" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto">{m.nav.tickets}</Button>
            </Link>
            <Link to="/venue" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto">{m.nav.faq}</Button>
            </Link>
          </div>
          <div className="flex flex-col gap-1 text-xs text-muted sm:text-sm">
            <p className="break-words">{dateRangeText} · {venueText}</p>
            <p className="break-words">{cityCountryText}</p>
            <Countdown targetISO={eventInfo.startDate ? `${eventInfo.startDate}T16:00:00+09:00` : new Date().toISOString()} />
          </div>
        </div>

        <div className="mx-auto w-full max-w-md lg:max-w-none">
          <picture>
            <source media="(max-width: 640px)" srcSet={posterMobile} />
            <img
              src={posterDesktop}
              alt={eventInfo.name || hero.title}
              className="w-full rounded-2xl border border-black/10 bg-panel shadow-[0_20px_45px_rgba(12,79,95,0.18)]"
              loading="eager"
            />
          </picture>
        </div>
      </div>
    </section>
  )
}
