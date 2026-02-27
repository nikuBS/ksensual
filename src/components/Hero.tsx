import { Link } from 'react-router-dom'
import { eventMeta } from '../data/event'
import { Button } from './ui/Button'
import { Countdown } from './Countdown'

// 랜딩 최상단 Hero 섹션
// 핵심 브랜딩(K-SENSUAL), 카피, CTA, 행사 요약, 카운트다운을 한 번에 제공한다.
export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="absolute left-1/2 top-0 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/30 blur-[100px]" />
      <div className="mx-auto flex min-h-[72vh] w-full max-w-6xl flex-col justify-center gap-5 px-3 py-16 sm:px-6 sm:py-24">
        <p className="text-xs uppercase tracking-[0.2em] text-accentSoft sm:text-sm sm:tracking-[0.25em]">{eventMeta.subtitle}</p>
        <h1 className="max-w-3xl text-balance font-heading text-4xl leading-tight sm:text-6xl md:text-7xl">{eventMeta.title}</h1>
        <p className="max-w-2xl text-sm text-muted sm:text-lg">{eventMeta.heroCopy}</p>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
          {eventMeta.ctas.map((cta) => (
            <Link key={cta.to} to={cta.to} className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto">{cta.label}</Button>
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-1 text-xs text-muted sm:text-sm">
          <p>{eventMeta.dateRangeText} · {eventMeta.venueName}</p>
          <p>{eventMeta.cityCountry}</p>
          <Countdown targetISO={eventMeta.startDateISO} />
        </div>
      </div>
    </section>
  )
}
