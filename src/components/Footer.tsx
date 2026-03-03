import { Link } from 'react-router-dom'
import { getLocalizedContent } from '../data/localizedContent'
import { useLocale } from '../i18n/LocaleContext'
import { messages } from '../i18n/messages'

/**
 * 전역 푸터
 * 행사 요약 정보 + 핵심 연락 링크를 하단에 고정 제공한다.
 */
export function Footer() {
  const { locale } = useLocale()
  const { contact, eventMeta } = getLocalizedContent(locale)
  const m = messages[locale]

  return (
    <footer className="border-t border-black/10 px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-heading text-text">{eventMeta.title}</p>
          <p>{eventMeta.dateRangeText} · {eventMeta.cityCountry}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a href={contact.instagramUrl} target="_blank" rel="noreferrer" aria-label={m.common.instagram}>{m.common.instagram}</a>
          <Link to="/faq">{m.nav.faq}</Link>
        </div>
      </div>
    </footer>
  )
}
