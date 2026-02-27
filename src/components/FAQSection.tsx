import { faq } from '../data/event'
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
  const items = (limit ? faq.slice(0, limit) : faq).map((item, index) => ({
    id: `faq-${index + 1}`,
    title: item.q,
    content: item.a,
  }))

  return (
    <Section title="FAQ" subtitle="Quick answers for planning your K-SENSUAL weekend.">
      <Accordion items={items} />
    </Section>
  )
}
