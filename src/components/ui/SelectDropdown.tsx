import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '../../lib/utils'

type SelectOption<T extends string> = {
  value: T
  label: string
}

type SelectDropdownProps<T extends string> = {
  value: T
  options: SelectOption<T>[]
  onChange: (next: T) => void
  ariaLabel: string
  className?: string
}

/**
 * 범용 커스텀 드롭다운
 * - 네이티브 select 대신 사용할 수 있는 경량 컴포넌트
 * - 키보드(↑/↓/Enter/Escape)와 외부 클릭 닫기 지원
 */
export function SelectDropdown<T extends string>({
  value,
  options,
  onChange,
  ariaLabel,
  className,
}: SelectDropdownProps<T>) {
  const [open, setOpen] = useState(false)
  const [focusIndex, setFocusIndex] = useState(0)
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0, width: 120 })
  const rootRef = useRef<HTMLDivElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const listRef = useRef<HTMLUListElement | null>(null)

  const selected = useMemo(() => {
    const matched = options.find((option) => option.value === value)
    if (matched) return matched
    const first = options[0]
    if (first) return first
    return { value, label: String(value) }
  }, [options, value])

  useEffect(() => {
    const selectedIndex = options.findIndex((option) => option.value === value)
    setFocusIndex(selectedIndex >= 0 ? selectedIndex : 0)
  }, [options, value])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!rootRef.current) return
      if (!rootRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (open) {
      listRef.current?.focus()
    }
  }, [open])

  useEffect(() => {
    if (!open) return

    const updateMenuPosition = () => {
      const rect = buttonRef.current?.getBoundingClientRect()
      if (!rect) return
      const width = Math.max(rect.width, 156)
      const maxLeft = Math.max(8, window.innerWidth - width - 8)
      const left = Math.min(Math.max(8, rect.right - width), maxLeft)
      setMenuPosition({
        top: rect.bottom + 8,
        left,
        width,
      })
    }

    updateMenuPosition()
    window.addEventListener('resize', updateMenuPosition)
    window.addEventListener('scroll', updateMenuPosition, true)
    return () => {
      window.removeEventListener('resize', updateMenuPosition)
      window.removeEventListener('scroll', updateMenuPosition, true)
    }
  }, [open])

  const onButtonKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (options.length === 0) return
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      setOpen(true)
    }
  }

  const onListKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (options.length === 0) {
      setOpen(false)
      return
    }

    if (event.key === 'Tab') {
      setOpen(false)
      return
    }

    if (event.key === 'Escape') {
      event.preventDefault()
      setOpen(false)
      buttonRef.current?.focus()
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setFocusIndex((prev) => (prev + 1) % options.length)
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setFocusIndex((prev) => (prev - 1 + options.length) % options.length)
      return
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      const target = options[focusIndex]
      if (!target) return
      onChange(target.value)
      setOpen(false)
      buttonRef.current?.focus()
    }
  }

  return (
    <div ref={rootRef} className={cn('relative shrink-0', className)}>
      <button
        ref={buttonRef}
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex w-full min-w-[120px] items-center justify-between gap-2 rounded-2xl border border-black/15 bg-panel px-4 py-3 text-sm font-medium text-text transition hover:bg-black/5"
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={onButtonKeyDown}
      >
        <span>{selected.label}</span>
        <ChevronDown size={18} className={cn('transition', open && 'rotate-180')} aria-hidden="true" />
      </button>

      {open ? (
        <ul
          ref={listRef}
          role="listbox"
          aria-label={ariaLabel}
          tabIndex={-1}
          className="fixed z-[70] overflow-hidden rounded-xl border border-black/15 bg-base shadow-lg"
          style={{ top: menuPosition.top, left: menuPosition.left, minWidth: menuPosition.width }}
          onKeyDown={onListKeyDown}
        >
          {options.map((option, index) => {
            const isSelected = option.value === value
            const isFocused = index === focusIndex
            return (
              <li key={option.value} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  className={cn(
                    'flex w-full items-center justify-between px-3 py-2 text-left text-base transition',
                    isFocused ? 'bg-black/5' : 'bg-transparent',
                    isSelected ? 'font-semibold text-text' : 'text-muted',
                  )}
                  onMouseEnter={() => setFocusIndex(index)}
                  onClick={() => {
                    onChange(option.value)
                    setOpen(false)
                    buttonRef.current?.focus()
                  }}
                >
                  <span>{option.label}</span>
                  {isSelected ? <Check size={16} aria-hidden="true" /> : null}
                </button>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}
