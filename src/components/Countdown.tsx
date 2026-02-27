import { useEffect, useState } from 'react'

type CountdownProps = {
  targetISO: string
}

/** 화면에 표시할 남은 시간 구조 (일/시간/분) */
type Remaining = {
  days: number
  hours: number
  minutes: number
}

/**
 * 목표 시각(targetISO)까지 남은 시간을 계산하는 순수 함수
 * 음수로 내려가지 않도록 Math.max(0, diff)로 보정했다.
 */
function getRemaining(targetISO: string): Remaining {
  const target = new Date(targetISO).getTime()
  const now = Date.now()
  const diff = Math.max(0, target - now)
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  return { days, hours, minutes }
}

/**
 * 행사 시작일까지 남은 시간을 보여주는 카운트다운 컴포넌트
 * hydration 이슈를 피하기 위해 mounted 이후에만 실제 시간을 표시한다.
 */
export function Countdown({ targetISO }: CountdownProps) {
  const [mounted, setMounted] = useState(false)
  const [time, setTime] = useState<Remaining>({ days: 0, hours: 0, minutes: 0 })

  useEffect(() => {
    setMounted(true)
    setTime(getRemaining(targetISO))

    /** 분 단위로 갱신하면 충분하므로 60초마다 업데이트 */
    const timer = setInterval(() => {
      setTime(getRemaining(targetISO))
    }, 60000)

    return () => clearInterval(timer)
  }, [targetISO])

  if (!mounted) {
    return <p className="text-sm text-muted">Loading countdown...</p>
  }

  return (
    <p className="text-sm text-muted" aria-live="polite">
      Starts in <span className="font-semibold text-text">{time.days}d {time.hours}h {time.minutes}m</span>
    </p>
  )
}
