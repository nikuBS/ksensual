import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getLocalizedContent } from '../data/localizedContent'
import { useLocale } from '../i18n/LocaleContext'
import { Button } from './ui/Button'
import { Countdown } from './Countdown'
import { Modal } from './ui/Modal'

/**
 * 랜딩 최상단 Hero 섹션
 * 핵심 브랜딩(K-SENSUAL), 카피, CTA, 행사 요약, 카운트다운을 한 번에 제공한다.
 */
export function Hero() {
  const { locale } = useLocale()
  const { eventMeta } = getLocalizedContent(locale)
  const [isPosterOpen, setIsPosterOpen] = useState(false)
  const expandPosterLabel = locale === 'ko' ? '포스터 크게 보기' : locale === 'es' ? 'Ver poster ampliado' : 'Expand poster'
  const expandPosterHint = locale === 'ko' ? '클릭해서 확대' : locale === 'es' ? 'Toca para ampliar' : 'Tap to expand'

  return (
    <section className="relative overflow-hidden border-b border-black/10">
      <div className="absolute left-1/2 top-0 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/30 blur-[100px]" />
      <div className="mx-auto grid min-h-[72vh] w-full max-w-6xl gap-8 px-3 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1fr_minmax(22rem,38rem)] lg:items-center lg:gap-10">
        <div className="flex flex-col justify-center gap-5">
          <p className="text-xs uppercase tracking-[0.2em] text-accentSoft sm:text-sm sm:tracking-[0.25em]">{eventMeta.subtitle}</p>
          <h1 className="max-w-3xl text-balance font-heading text-4xl leading-tight text-[#063247] sm:text-6xl md:text-7xl">{eventMeta.title}</h1>
          <p className="max-w-2xl break-words text-sm text-muted sm:text-lg">{eventMeta.heroCopy}</p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
            {eventMeta.ctas.map((cta) => (
              <Link key={cta.to} to={cta.to} className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto">{cta.label}</Button>
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-1 text-xs text-muted sm:text-sm">
            <p className="break-words">{eventMeta.dateRangeText} · {eventMeta.venueName}</p>
            <p className="break-words">{eventMeta.cityCountry}</p>
            <Countdown targetISO={eventMeta.startDateISO} />
          </div>
        </div>

        <div className="mx-auto w-full max-w-lg lg:max-w-none">
          <button
            type="button"
            onClick={() => setIsPosterOpen(true)}
            className="group relative block w-full overflow-hidden rounded-[1.75rem] border border-black/10 bg-panel text-left shadow-[0_24px_60px_rgba(12,79,95,0.2)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_32px_80px_rgba(12,79,95,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
            aria-label={`${eventMeta.heroPosterAlt} ${expandPosterLabel}`}
          >
            <img
              src={eventMeta.heroPoster}
              alt={eventMeta.heroPosterAlt}
              className="w-full"
              loading="eager"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-[#062838]/70 via-[#062838]/10 to-transparent px-4 py-4 text-white sm:px-5">
              <div>
                <p className="text-sm font-semibold sm:text-base">{eventMeta.title}</p>
                <p className="text-xs text-white/80 sm:text-sm">{eventMeta.dateRangeText}</p>
              </div>
              <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-sm">{expandPosterHint}</span>
            </div>
          </button>
        </div>
      </div>

      <Modal open={isPosterOpen} onClose={() => setIsPosterOpen(false)} title="">
        <img src={eventMeta.heroPoster} alt={eventMeta.heroPosterAlt} className="mx-auto w-full rounded-xl" />
      </Modal>
    </section>
  )
}
