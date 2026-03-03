import { Link, NavLink } from 'react-router-dom'
import { useLocale } from '../i18n/LocaleContext'
import { localeOptions } from '../i18n/locales'
import { messages } from '../i18n/messages'
import { cn } from '../lib/utils'

/** 헤더 로고 이미지 워드마크 컴포넌트 */
function Wordmark() {
  return (
    <img
      src={`${import.meta.env.BASE_URL}placeholders/k-sensual.png`}
      alt="K-SENSUAL"
      className="h-9 w-auto sm:h-10"
      loading="eager"
    />
  )
}

/**
 * 상단 고정 내비게이션
 * - 데이터 파일의 navigation 배열을 그대로 렌더링
 * - 현재 경로와 일치하는 메뉴는 활성 스타일로 표시
 */
export function Navbar() {
  const { locale, setLocale } = useLocale()
  const m = messages[locale]
  const navigation = [
    { label: m.nav.home, to: '/' },
    { label: m.nav.artists, to: '/artists' },
    { label: m.nav.tickets, to: '/tickets' },
    { label: m.nav.faq, to: '/faq' },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-base/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Link to="/" aria-label="Go to home" className="self-start">
          <Wordmark />
        </Link>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:items-end">
          <label className="sr-only" htmlFor="locale-select">{m.language}</label>
          <select
            id="locale-select"
            value={locale}
            onChange={(event) => setLocale(event.target.value as typeof locale)}
            className="w-full rounded-xl border border-black/15 bg-panel px-3 py-2 text-sm text-text sm:w-auto"
            aria-label={m.language}
          >
            {localeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <nav aria-label="Main navigation" className="flex w-full flex-nowrap items-center gap-2 overflow-x-auto pb-1 sm:w-auto sm:flex-wrap sm:overflow-visible sm:pb-0">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'shrink-0 whitespace-nowrap rounded-xl px-3 py-2 text-sm text-muted transition hover:bg-black/5 hover:text-text',
                  isActive && 'bg-black/5 text-text',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
