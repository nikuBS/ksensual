import { cn } from '../../lib/utils'

// 탭 버튼 목록의 최소 데이터 구조
type TabItem = { id: string; label: string }

// Tabs 컴포넌트 입력값
// - tabs: 표시할 탭 목록
// - value: 현재 선택된 탭 id
// - onChange: 탭 클릭 시 상위 상태 변경 콜백
type TabsProps = {
  tabs: TabItem[]
  value: string
  onChange: (id: string) => void
}

// 수평 스크롤 가능한 탭 UI
// 모바일에서 탭이 많아도 줄바꿈 대신 스크롤되도록 구현했다.
export function Tabs({ tabs, value, onChange }: TabsProps) {
  return (
    <div
      className="inline-flex max-w-full flex-nowrap items-center gap-2 overflow-x-auto rounded-2xl border border-white/15 bg-panel/60 p-2"
      role="tablist"
      aria-label="Day tabs"
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
              'shrink-0 whitespace-nowrap rounded-xl px-3 py-2 text-sm font-semibold transition sm:px-4',
              active ? 'bg-accent text-base' : 'bg-transparent text-muted hover:bg-white/5 hover:text-text',
            )}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
