import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { cn } from '../../lib/utils'

/** 아코디언 아이템 1개의 데이터 타입 */
type Item = { id: string; title: string; content: string }

type AccordionProps = {
  items: Item[]
}

/**
 * FAQ에 사용하는 단일 오픈 방식 아코디언
 * - openId로 현재 열린 항목을 기억
 * - 같은 항목을 다시 누르면 닫힘
 */
export function Accordion({ items }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null)

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const open = openId === item.id
        return (
          <div key={item.id} className="rounded-2xl border border-white/10 bg-panel/70">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left"
              onClick={() => setOpenId(open ? null : item.id)}
              aria-expanded={open}
              aria-controls={`acc-${item.id}`}
            >
              <span className="font-semibold">{item.title}</span>
              <ChevronDown size={18} className={cn('text-muted transition', open && 'rotate-180 text-text')} />
            </button>
            <div id={`acc-${item.id}`} role="region" className={cn('grid transition-all', open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
              <div className="overflow-hidden">
                <p className="px-4 pb-4 text-sm text-muted">{item.content}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
