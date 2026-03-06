import { Download } from 'lucide-react'
import type { ScheduleContent } from '../admin/types/contentSchema'
import { useLocale } from '../i18n/LocaleContext'
import { messages } from '../i18n/messages'
import { buildIcs } from '../lib/ics'
import { Button } from './ui/Button'

/** 선택된 스케줄 Day 정보를 받아 ICS를 생성/다운로드하는 컴포넌트 */
type IcsDownloadProps = {
  day: ScheduleContent
}

/** "YYYY-MM-DD" + "HH:mm" 문자열을 ISO 문자열로 결합하는 헬퍼 */
function toIso(dateISO: string, time: string): string {
  return `${dateISO}T${time}:00+09:00`
}

export function IcsDownload({ day }: IcsDownloadProps) {
  const { locale } = useLocale()
  const m = messages[locale]

  const handleDownload = () => {
    /**
     * 현재 Day의 모든 세션을 iCalendar 이벤트로 변환
     * 각 세션 기본 길이는 30분으로 계산한다.
     */
    const events = day.cards.map((session, index) => {
      const start = toIso(day.date, session.time)
      const [h, minuteValue] = session.time.split(':').map(Number)
      const m = Number.isNaN(minuteValue) ? 0 : minuteValue
      const endHour = m === 30 ? h + 1 : h
      const endMinute = m === 30 ? '00' : '30'
      const end = toIso(day.date, `${String(endHour).padStart(2, '0')}:${endMinute}`)

      return {
        title: session.title,
        start,
        end,
        description: session.summary,
        uid: `${day.id}-${index}`,
      }
    })

    /** 문자열 ICS -> Blob -> 임시 a 태그 클릭 방식으로 다운로드 */
    const ics = buildIcs(events, `K-SENSUAL ${day.dayLabel}`)
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `k-sensual-${day.id}.ics`
    document.body.append(anchor)
    anchor.click()
    anchor.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <Button variant="outline" onClick={handleDownload} aria-label={`${m.common.downloadIcs} ${day.dayLabel}`}>
      <Download size={16} className="mr-2" /> {m.common.downloadIcs}
    </Button>
  )
}
