export type IcsEvent = {
  title: string
  start: string
  end: string
  description?: string
  location?: string
}

const pad = (v: number): string => String(v).padStart(2, '0')

function toUTC(date: Date): string {
  return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`
}

export function buildIcs(events: IcsEvent[], calendarName: string): string {
  const header = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//K-SENSUAL//Event Calendar//EN',
    'CALSCALE:GREGORIAN',
    `X-WR-CALNAME:${calendarName}`,
  ]

  const body = events.flatMap((event, index) => {
    const uid = `k-sensual-${Date.now()}-${index}@ksensual.local`
    const lines = [
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${toUTC(new Date())}`,
      `DTSTART:${toUTC(new Date(event.start))}`,
      `DTEND:${toUTC(new Date(event.end))}`,
      `SUMMARY:${event.title}`,
    ]

    if (event.description) lines.push(`DESCRIPTION:${event.description.replaceAll('\n', '\\n')}`)
    if (event.location) lines.push(`LOCATION:${event.location}`)

    lines.push('END:VEVENT')
    return lines
  })

  return [...header, ...body, 'END:VCALENDAR'].join('\r\n')
}
