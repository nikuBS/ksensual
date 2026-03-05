import { cn } from '../../lib/utils'

/** 탭 버튼 목록의 최소 데이터 구조 */
type TabItem = { id: string; label: string }

/**
 * Tabs 컴포넌트 입력값
 * - tabs: 표시할 탭 목록
 * - value: 현재 선택된 탭 id
 * - onChange: 탭 클릭 시 상위 상태 변경 콜백
 */
type TabsProps = {
  tabs: TabItem[]
  value: string
  onChange: (id: string) => void
  ariaLabel?: string
  layout?: 'scroll' | 'wrap' | 'equal'
}

/**
 * 수평 스크롤 가능한 탭 UI
 * 모바일에서 탭이 많아도 줄바꿈 대신 스크롤되도록 구현했다.
 */
export function Tabs({ tabs, value, onChange, ariaLabel = 'Tabs', layout = 'scroll' }: TabsProps) {
  return (
    <div
      className={cn(
        'max-w-full items-center gap-2 rounded-2xl border border-black/10 bg-panel/60 p-2',
        layout === 'scroll' && 'inline-flex flex-nowrap overflow-x-auto',
        layout === 'wrap' && 'inline-flex flex-wrap overflow-hidden',
        layout === 'equal' && 'grid w-full grid-cols-3 overflow-hidden',
      )}
      role="tablist"
      aria-label={ariaLabel}
    >
      {tabs.map((tab) => {
        const active = tab.id === value
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.id)}
            className={cn(
              layout === 'equal'
                ? 'min-w-0 w-full truncate rounded-xl px-2 py-2 text-xs font-semibold transition sm:text-sm'
                : layout === 'wrap'
                  ? 'rounded-xl px-3 py-2 text-sm font-semibold transition sm:px-4'
                  : 'shrink-0 whitespace-nowrap rounded-xl px-3 py-2 text-sm font-semibold transition sm:px-4',
              active ? 'bg-accent text-base' : 'bg-transparent text-muted hover:bg-black/5 hover:text-text',
            )}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
