import { Link } from 'react-router-dom'
import { tickets } from '../data/event'
import { Section } from './Section'
import { Badge } from './ui/Badge'
import { Button } from './ui/Button'
import { Card } from './ui/Card'

/**
 * 티켓 섹션 옵션
 * fullPage=true면 /tickets 페이지처럼 "Tickets page" 이동 버튼을 숨긴다.
 */
type TicketsSectionProps = {
  fullPage?: boolean
}

/** 티켓 티어 카드 리스트 컴포넌트 */
export function TicketsSection({ fullPage = false }: TicketsSectionProps) {
  return (
    <Section title="Tickets" subtitle="Choose your access tier. Taxes and processing fees are shown at checkout.">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {tickets.map((tier) => (
          <Card key={tier.id} className="flex h-full flex-col">
            <div className="mb-4 flex items-center justify-between gap-2">
              <h3 className="text-xl font-semibold">{tier.name}</h3>
              {tier.badge ? <Badge>{tier.badge}</Badge> : null}
            </div>
            <p className="text-3xl font-bold">{tier.priceText}</p>
            <ul className="mt-4 flex-1 space-y-2 text-sm text-muted">
              {tier.includes.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
            {tier.note ? <p className="mt-3 text-xs text-muted">{tier.note}</p> : null}
          </Card>
        ))}
      </div>
      {!fullPage ? (
        <div className="mt-6">
          <Link to="/tickets">
            <Button variant="outline">Tickets page</Button>
          </Link>
        </div>
      ) : null}
    </Section>
  )
}
