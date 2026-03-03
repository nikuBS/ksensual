import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '../../lib/utils'
import type { Locale } from '../../i18n/locales'

type LocaleOption = { value: Locale; label: string }

type LocaleDropdownProps = {
  value: Locale
  options: LocaleOption[]
  onChange: (next: Locale) => void
  ariaLabel: string
}

/**
 * 네이티브 select 대신 사용하는 커스텀 언어 드롭다운.
 * - 모바일에서도 글자 크기/터치 영역을 일관되게 유지
 * - 키보드 조작(↑/↓/Enter/Escape) 지원
 */
export function LocaleDropdown({ value, options, onChange, ariaLabel }: LocaleDropdownProps) {
  const [open, setOpen] = useState(false)
  const [focusIndex, setFocusIndex] = useState(0)
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0, width: 120 })
  const rootRef = useRef<HTMLDivElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const listRef = useRef<HTMLUListElement | null>(null)

  const selected = useMemo(() => options.find((option) => option.value === value) ?? options[0], [options, value])

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
      const width = Math.max(rect.width, 148)
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
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      setOpen(true)
    }
  }

  const onListKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
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
      onChange(target.value)
      setOpen(false)
      buttonRef.current?.focus()
    }
  }

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        ref={buttonRef}
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex min-w-[120px] items-center justify-between gap-2 rounded-xl border border-black/15 bg-panel px-3 py-2 text-base font-medium text-text transition hover:bg-black/5"
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
