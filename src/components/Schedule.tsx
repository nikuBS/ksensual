import { useEffect, useState } from 'react'
import { publishedOnly } from '../admin/utils/contentHelpers'
import { useEventContent } from '../content/ContentContext'
import { useLocale } from '../i18n/LocaleContext'
import { messages } from '../i18n/messages'
import { Section } from './Section'
import { IcsDownload } from './IcsDownload'
import { Card } from './ui/Card'
import { Tabs } from './ui/Tabs'

/**
 * Day 탭으로 스케줄을 전환하는 섹션
 * 선택된 Day만 화면에 보여주고, 같은 Day 기준으로 ICS 다운로드를 제공한다.
 */
export function Schedule() {
  const { content } = useEventContent()
  const { locale } = useLocale()
  const m = messages[locale]
  const schedule = publishedOnly(content.schedule)
  const [activeDayId, setActiveDayId] = useState(schedule[0]?.id ?? '')
  const activeDay = schedule.find((day) => day.id === activeDayId) ?? schedule[0]

  useEffect(() => {
    if (!activeDayId && schedule[0]) {
      setActiveDayId(schedule[0].id)
    }
  }, [activeDayId, schedule])

  if (!activeDay) return null

  return (
    <Section title={m.sections.scheduleTitle} subtitle={m.sections.scheduleSubtitle}>
      <div className="mb-5 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <Tabs
          tabs={schedule.map((day, index) => ({ id: day.id, label: day.dayLabel || `${m.common.day} ${index + 1}` }))}
          value={activeDayId}
          onChange={setActiveDayId}
          ariaLabel={m.common.selectDayTabLabel}
        />
        <IcsDownload day={activeDay} />
      </div>

      <div className="grid gap-3">
        {publishedOnly(activeDay.cards).map((session) => (
          <Card key={`${activeDay.id}-${session.time}-${session.title}`} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-accentSoft">{session.time}</p>
              <h3 className="font-semibold">{session.title}</h3>
              <p className="text-sm text-muted">{session.summary}</p>
            </div>
            <p className="text-sm text-muted">{activeDay.dayLabel}</p>
          </Card>
        ))}
      </div>
    </Section>
  )
}
