import { Hotel, Music2, ShieldCheck, Sparkles, Train, UtensilsCrossed } from 'lucide-react'
import { highlights } from '../data/event'
import { Section } from './Section'
import { Card } from './ui/Card'

/** data/event.ts의 문자열 icon 값을 실제 Lucide 아이콘 컴포넌트에 매핑한다. */
const iconMap = {
  Sparkles,
  Music2,
  Train,
  Hotel,
  UtensilsCrossed,
  ShieldCheck,
}

/** 행사 핵심 장점을 카드 형태로 보여주는 섹션 */
export function Highlights() {
  return (
    <Section title="Highlights" subtitle="A premium yet approachable festival journey, crafted for discovery.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {highlights.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap] ?? Sparkles
          return (
            <Card key={item.title}>
              <Icon size={20} className="mb-3 text-accentSoft" aria-hidden="true" />
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">{item.desc}</p>
            </Card>
          )
        })}
      </div>
    </Section>
  )
}
