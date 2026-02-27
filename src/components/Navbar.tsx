import { Link, NavLink } from 'react-router-dom'
import { eventMeta, navigation } from '../data/event'
import { cn } from '../lib/utils'

/** 텍스트 로고 + 심볼 SVG를 묶은 워드마크 컴포넌트 */
function Wordmark() {
  return (
    <div className="flex items-center gap-2">
      <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 14c2 2 6 2 8-1" fill="none" stroke="#36E2D5" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <span className="font-heading text-base tracking-[0.12em] sm:text-lg sm:tracking-[0.2em]">{eventMeta.title}</span>
    </div>
  )
}

/**
 * 상단 고정 내비게이션
 * - 데이터 파일의 navigation 배열을 그대로 렌더링
 * - 현재 경로와 일치하는 메뉴는 활성 스타일로 표시
 */
export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-base/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Link to="/" aria-label="Go to home" className="self-start">
          <Wordmark />
        </Link>
        <nav aria-label="Main navigation" className="flex w-full flex-nowrap items-center gap-2 overflow-x-auto pb-1 sm:w-auto sm:flex-wrap sm:overflow-visible sm:pb-0">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'shrink-0 whitespace-nowrap rounded-xl px-3 py-2 text-sm text-muted transition hover:bg-white/10 hover:text-text',
                  isActive && 'bg-white/10 text-text',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
