import { X } from 'lucide-react'
import { type ReactNode, useEffect, useRef } from 'react'
import { Button } from './Button'

/**
 * 모달이 외부에서 받아야 하는 값
 * - open: 모달 열림/닫힘 상태
 * - onClose: 닫기 콜백 (배경 클릭, ESC, 닫기 버튼에서 공통 사용)
 * - title: 접근성을 위한 dialog 레이블 + 화면 제목
 */
type ModalProps = {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

/**
 * 접근성을 고려한 공통 모달
 * - ESC 닫기
 * - 배경 클릭 닫기
 * - Tab 포커스가 모달 내부에서 순환되도록 처리
 */
export function Modal({ open, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    /** 모달이 열린 동안 뒤쪽 페이지 스크롤을 잠근다. */
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'Tab' && dialogRef.current) {
        /** 모달 안에서 포커스 가능한 요소 목록을 구한다. */
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])',
        )
        if (focusables.length === 0) return

        const first = focusables[0]
        const last = focusables[focusables.length - 1]

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        }
        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    /** 모달이 열리자마자 첫 번째 인터랙션 요소로 포커스를 이동해 키보드 접근성을 높인다. */
    setTimeout(() => dialogRef.current?.querySelector<HTMLElement>('button, a, input, textarea')?.focus(), 0)

    return () => {
      /** 모달이 닫히면 기존 body 상태와 이벤트를 원복한다. */
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4" role="presentation">
      <button className="absolute inset-0 bg-black/75 backdrop-blur-sm" aria-label="Close modal background" onClick={onClose} />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative z-10 max-h-[92vh] w-full max-w-2xl overflow-auto rounded-2xl border border-black/15 bg-panel p-3 sm:p-5"
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="font-heading text-xl sm:text-2xl">{title}</h3>
          <Button variant="ghost" size="sm" aria-label="Close dialog" onClick={onClose}>
            <X size={18} />
          </Button>
        </div>
        {children}
      </div>
    </div>
  )
}
