import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

/**
 * 카드 형태의 공통 래퍼 컴포넌트
 * - 테두리, 배경, 그림자, 라운드를 기본 제공
 * - 어떤 콘텐츠든 children으로 넣어 재사용 가능
 */
export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('rounded-2xl border border-white/10 bg-panel/80 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur', className)}
      {...props}
    />
  )
}
