import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

// 공통 단일 줄 입력 컴포넌트
// 폼 화면마다 동일한 스타일을 유지하기 위해 분리했다.
export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn('w-full rounded-2xl border border-white/20 bg-base/60 px-4 py-3 text-sm text-text placeholder:text-muted', className)}
      {...props}
    />
  )
}

// 공통 여러 줄 입력 컴포넌트
// 문의 메시지처럼 긴 텍스트를 받을 때 사용한다.
export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn('w-full rounded-2xl border border-white/20 bg-base/60 px-4 py-3 text-sm text-text placeholder:text-muted', className)}
      {...props}
    />
  )
}
