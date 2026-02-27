import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * 모든 섹션이 공통으로 받는 값
 * - id: 앵커 이동이나 식별에 사용
 * - title/subtitle: 섹션 머리글
 */
type SectionProps = {
  id?: string
  title: string
  subtitle?: string
  children: ReactNode
}

/**
 * 페이지 섹션 공통 레이아웃 컴포넌트
 * framer-motion으로 스크롤 진입 시 fade + up 애니메이션을 적용한다.
 */
export function Section({ id, title, subtitle, children }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="mx-auto w-full max-w-6xl px-3 py-10 sm:px-6 sm:py-16"
    >
      <div className="mb-8">
        <h2 className="font-heading text-3xl sm:text-4xl">{title}</h2>
        {subtitle ? <p className="mt-2 max-w-2xl text-sm text-muted sm:text-base">{subtitle}</p> : null}
      </div>
      {children}
    </motion.section>
  )
}
