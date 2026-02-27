import { Download } from 'lucide-react'
import type { ScheduleDay } from '../data/event'
import { buildIcs } from '../lib/ics'
import { Button } from './ui/Button'

// 선택된 스케줄 Day 정보를 받아 ICS를 생성/다운로드하는 컴포넌트
type IcsDownloadProps = {
  day: ScheduleDay
}

// "YYYY-MM-DD" + "HH:mm" 문자열을 ISO 문자열로 결합하는 헬퍼
function toIso(dateISO: string, time: string): string {
  return `${dateISO}T${time}:00+09:00`
}

export function IcsDownload({ day }: IcsDownloadProps) {
  const handleDownload = () => {
    // 현재 Day의 모든 세션을 iCalendar 이벤트로 변환
    // 각 세션 기본 길이는 30분으로 계산한다.
    const events = day.sessions.map((session, index) => {
      const start = toIso(day.dateISO, session.time)
      const [h, m] = session.time.split(':').map(Number)
      const endHour = m === 30 ? h + 1 : h
      const endMinute = m === 30 ? '00' : '30'
      const end = toIso(day.dateISO, `${String(endHour).padStart(2, '0')}:${endMinute}`)

      return {
        title: `${session.title} (${session.type})`,
        start,
        end,
        description: `Host: ${session.hosts?.join(', ') ?? 'TBA'}`,
        location: session.location,
        uid: `${day.dayId}-${index}`,
      }
    })

    // 문자열 ICS -> Blob -> 임시 a 태그 클릭 방식으로 다운로드
    const ics = buildIcs(events, `K-SENSUAL ${day.label}`)
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `k-sensual-${day.dayId}.ics`
    document.body.append(anchor)
    anchor.click()
    anchor.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <Button variant="outline" onClick={handleDownload} aria-label={`Download ${day.label} schedule in ICS`}>
      <Download size={16} className="mr-2" /> Download ICS
    </Button>
  )
}
