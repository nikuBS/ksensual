import { useLocale } from '../i18n/useLocale'
import { messages } from '../i18n/messages'
import { assetPath } from '../lib/assets'
import { Section } from './Section'
import { Button } from './ui/Button'

/** 티켓 섹션 옵션 */
type TicketsSectionProps = {
  fullPage?: boolean
}

/** 티켓 티어 카드 리스트 컴포넌트 */
export function TicketsSection({ fullPage = false }: TicketsSectionProps) {
  const { locale } = useLocale()
  const m = messages[locale]
  const subtitle = fullPage ? '' : m.sections.ticketsSubtitle
  const ticketFormUrl =
    locale === 'ko'
      ? 'https://docs.google.com/forms/d/e/1FAIpQLSdjuuZk558TiqyTt6gpZ-tajkgqxs01qHOqS5ofFl4inR2zIg/viewform'
      : 'https://docs.google.com/forms/d/e/1FAIpQLScGJpA8b-eM4p8g68Kq74voW44NTAPTAMg1y2OzM6qMZ55LLA/viewform'
  const jackAndJillUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdEFmxjA2yIsfT0yNFtmzLDKVGQkYUE2lxghxdXx9b8fQAZRg/viewform'

  return (
    <Section title={m.sections.ticketsTitle} subtitle={subtitle}>
      <div className="mb-5 flex flex-row items-center justify-center gap-2 whitespace-nowrap sm:gap-3">
        <Button
          type="button"
          variant="outline"
          size="sm"
          aria-label={m.common.ticketHotel}
          className="min-w-0 px-3 text-[12px] sm:px-4 sm:text-sm"
          onClick={() => window.open(ticketFormUrl, '_blank', 'noopener,noreferrer')}
        >
          {m.common.ticketHotel}
        </Button>
        <Button
          type="button"
          size="sm"
          aria-label={m.common.jackAndJillApply}
          className="min-w-0 px-3 text-[12px] sm:px-4 sm:text-sm"
          onClick={() => window.open(jackAndJillUrl, '_blank', 'noopener,noreferrer')}
        >
          {m.common.jackAndJillApply}
        </Button>
      </div>
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-black/10 bg-panel/70 p-2 shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
        <img
          src={assetPath('placeholders/price_chart_ko.png')}
          alt="K-SENSUAL ticket and hotel price chart (Korean)"
          className={locale === 'ko' ? 'block w-full rounded-2xl' : 'hidden w-full rounded-2xl'}
          aria-hidden={locale !== 'ko'}
        />
        <img
          src={assetPath('placeholders/price_chart_en.png')}
          alt="K-SENSUAL ticket and hotel price chart (English)"
          className={locale === 'ko' ? 'hidden w-full rounded-2xl' : 'block w-full rounded-2xl'}
          aria-hidden={locale === 'ko'}
        />
      </div>
    </Section>
  )
}
