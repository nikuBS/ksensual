import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

/**
 * Button 컴포넌트에서 받을 수 있는 추가 옵션 타입
 * - variant: 버튼 스타일 종류
 * - size: 버튼 크기
 */
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

/**
 * 프로젝트 전역에서 재사용할 기본 버튼 컴포넌트
 * className을 추가로 받아 필요한 화면에서 커스터마이징할 수 있다.
 */
export function Button({ className, variant = 'primary', size = 'md', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-2xl font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-60',
        variant === 'primary' && 'bg-accent px-5 py-3 text-base font-bold text-base shadow-glow hover:bg-accentSoft',
        variant === 'ghost' && 'bg-transparent px-5 py-3 text-text hover:bg-white/10',
        variant === 'outline' && 'border border-white/20 bg-transparent px-5 py-3 text-text hover:border-accent/50 hover:bg-white/5',
        size === 'sm' && 'px-3 py-2 text-sm',
        size === 'lg' && 'px-6 py-3.5 text-base',
        className,
      )}
      {...props}
    />
  )
}
