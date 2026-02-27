import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

/**
 * 짧은 상태/태그(예: Best Value, 장르 태그)에 사용하는 배지 컴포넌트
 */
export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn('inline-flex items-center rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-xs font-semibold text-accentSoft', className)}
      {...props}
    />
  )
}
