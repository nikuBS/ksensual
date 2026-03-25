import { Link, NavLink } from 'react-router-dom'
import { useLocale } from '../i18n/useLocale'
import { localeOptions } from '../i18n/locales'
import { messages } from '../i18n/messages'
import { assetPath } from '../lib/assets'
import { cn } from '../lib/utils'
import { SelectDropdown } from './ui/SelectDropdown'

/** 헤더 로고 이미지 워드마크 컴포넌트 */
function Wordmark() {
  return (
    <div className="h-14 w-full max-w-[320px] overflow-hidden sm:h-16 sm:max-w-[420px]">
      <img
        src={assetPath('placeholders/k-sensual.png')}
        alt="K-SENSUAL"
        className="-ml-16 h-full w-full object-cover object-center sm:-ml-8"
        loading="eager"
      />
    </div>
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
    { label: m.nav.artists, to: '/lineup' },
    { label: m.nav.tickets, to: '/tickets' },
    { label: m.nav.faq, to: '/venue' },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-base/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Link to="/" aria-label="Go to home" className="w-full sm:w-auto">
          <Wordmark />
        </Link>
        <div className="flex w-full items-center gap-2 sm:w-auto">
          <nav aria-label="Main navigation" className="flex min-w-0 flex-1 flex-nowrap items-center gap-2 overflow-x-auto pb-1 sm:flex-none sm:overflow-visible sm:pb-0">
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
          <SelectDropdown
            value={locale}
            options={localeOptions}
            onChange={setLocale}
            ariaLabel={m.language}
          />
        </div>
      </div>
    </header>
  )
}
