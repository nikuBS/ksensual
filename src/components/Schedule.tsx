import { useState } from 'react'
import { schedule } from '../data/event'
import { Section } from './Section'
import { IcsDownload } from './IcsDownload'
import { Card } from './ui/Card'
import { Tabs } from './ui/Tabs'

// Day 탭으로 스케줄을 전환하는 섹션
// 선택된 Day만 화면에 보여주고, 같은 Day 기준으로 ICS 다운로드를 제공한다.
export function Schedule() {
  const [activeDayId, setActiveDayId] = useState(schedule[0]?.dayId ?? '')
  const activeDay = schedule.find((day) => day.dayId === activeDayId) ?? schedule[0]

  if (!activeDay) return null

  return (
    <Section title="Schedule" subtitle="Select a day and export that day into your calendar.">
      <div className="mb-5 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <Tabs tabs={schedule.map((day) => ({ id: day.dayId, label: day.label }))} value={activeDayId} onChange={setActiveDayId} />
        <IcsDownload day={activeDay} />
      </div>

      <div className="grid gap-3">
        {activeDay.sessions.map((session) => (
          <Card key={`${activeDay.dayId}-${session.time}-${session.title}`} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-accentSoft">{session.time}</p>
              <h3 className="font-semibold">{session.title}</h3>
              <p className="text-sm text-muted">{session.type} · {session.location}</p>
            </div>
            <p className="text-sm text-muted">{session.hosts?.join(', ')}</p>
          </Card>
        ))}
      </div>
    </Section>
  )
}
