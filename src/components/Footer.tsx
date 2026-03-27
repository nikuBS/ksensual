import { getLocalizedContent } from '../data/localizedContent'
import { useLocale } from '../i18n/LocaleContext'
import { assetPath } from '../lib/assets'

/**
 * 전역 푸터
 * 요청된 순서(사이트 | 인스타 | 와츠앱)로 단일 라인 링크를 제공한다.
 */
export function Footer() {
  const { locale } = useLocale()
  const { contact } = getLocalizedContent(locale)

  return (
    <footer className="border-t border-white/10 bg-base/90 px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-3 text-sm tracking-[0.08em] text-text sm:text-base">
        <a
          href="https://www.k-sensual.com"
          target="_blank"
          rel="noreferrer"
          aria-label="K-SENSUAL site"
          className="inline-flex items-center gap-1.5 font-semibold text-text transition hover:opacity-80"
        >
          <span>WWW.K-SENSUAL.COM</span>
        </a>
        <span className="text-text/55">|</span>
        <a
          href={contact.instagramUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
          className="inline-flex items-center gap-1.5 font-semibold text-text transition hover:opacity-80"
        >
          <img src={assetPath('placeholders/social-instagram.svg')} alt="" className="h-4 w-4" aria-hidden="true" />
          <span>KSENSUAL_OFFICIAL</span>
        </a>
        <span className="text-text/55">|</span>
        <a
          href="https://wa.me/821096661251"
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp"
          className="inline-flex items-center gap-1.5 font-semibold text-text transition hover:opacity-80"
        >
          <img src={assetPath('placeholders/social-whatsapp.svg')} alt="" className="h-4 w-4" aria-hidden="true" />
          <span>+82 010 9666 1251</span>
        </a>
      </div>
    </footer>
  )
}
