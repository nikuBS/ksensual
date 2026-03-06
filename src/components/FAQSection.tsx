import { publishedOnly } from '../admin/utils/contentHelpers'
import { useEventContent } from '../content/ContentContext'
import { useLocale } from '../i18n/LocaleContext'
import { messages } from '../i18n/messages'
import { Section } from './Section'
import { Accordion } from './ui/Accordion'

/**
 * FAQ 섹션 옵션
 * 홈에서는 limit으로 일부만 보여주고 /faq 페이지에서는 전체를 노출한다.
 */
type FAQSectionProps = {
  limit?: number
}

/** FAQ 데이터를 아코디언이 요구하는 형식으로 변환해 렌더링 */
export function FAQSection({ limit }: FAQSectionProps) {
  const { content } = useEventContent()
  const { locale } = useLocale()
  const m = messages[locale]
  const faq = publishedOnly(content.faq)

  const items = (limit ? faq.slice(0, limit) : faq).map((item) => ({
    id: item.id,
    title: item.question,
    content: item.answer,
  }))

  return (
    <Section title={m.sections.faqTitle} subtitle={m.sections.faqSubtitle}>
      <Accordion items={items} />
    </Section>
  )
}
