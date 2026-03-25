import { useEffect, useMemo, useState } from 'react'
import { useLocale } from '../i18n/useLocale'
import { messages } from '../i18n/messages'

type CountdownProps = {
  targetISO: string
}

type Remaining = {
  days: number
  hours: number
  minutes: number
}

/**
 * 행사 시작일까지 남은 시간을 보여주는 카운트다운 컴포넌트
 * hydration 이슈를 피하기 위해 mounted 이후에만 실제 시간을 표시한다.
 */
export function Countdown({ targetISO }: CountdownProps) {
  const { locale } = useLocale()
  const m = messages[locale]
  const [now, setNow] = useState(() => Date.now())

  const time = useMemo<Remaining>(() => {
    const target = new Date(targetISO).getTime()
    const diff = Math.max(0, target - now)
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((diff / (1000 * 60)) % 60)
    return { days, hours, minutes }
  }, [now, targetISO])

  useEffect(() => {
    /** 분 단위로 갱신하면 충분하므로 60초마다 업데이트 */
    const timer = setInterval(() => {
      setNow(Date.now())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  return (
    <p className="text-sm text-muted" aria-live="polite">
      {m.common.countdownStartsIn} <span className="font-semibold text-text">{time.days}d {time.hours}h {time.minutes}m</span>
    </p>
  )
}
