import { useEffect, useMemo, useRef, useState } from 'react'
import { Instagram } from 'lucide-react'
import { artists, type Artist } from '../data/event'
import { useLocale } from '../i18n/LocaleContext'
import { messages } from '../i18n/messages'
import { cn } from '../lib/utils'
import { ArtistCard } from './ArtistCard'
import { Section } from './Section'
import { Modal } from './ui/Modal'
import { Input } from './ui/Input'
import { Button } from './ui/Button'
import { SelectDropdown } from './ui/SelectDropdown'

/**
 * ArtistGrid 동작 옵션
 * - previewCount: 홈에서는 일부만 보여주기 위해 사용
 * - showFilters: /artists 페이지에서 검색/필터 UI 노출 여부
 */
type ArtistGridProps = {
  previewCount?: number
  showFilters?: boolean
  hideSubtitle?: boolean
  onlyMainArtists?: boolean
}

type ArtistCategoryFilter = 'ALL' | 'MAIN' | 'DJ' | 'ARTIST' | 'GUEST' | 'DOMESTIC' | 'INTERNATIONAL' | 'MEDIA'

/**
 * 라인업 목록 + 상세 모달 컴포넌트
 * 홈(/)과 아티스트 목록(/artists)에서 동일 컴포넌트를 재사용한다.
 */
export function ArtistGrid({ previewCount, showFilters = false, hideSubtitle = false, onlyMainArtists = false }: ArtistGridProps) {
  const { locale } = useLocale()
  const m = messages[locale]
  const [selected, setSelected] = useState<Artist | null>(null)
  const [query, setQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<ArtistCategoryFilter>('ALL')
  const [page, setPage] = useState(1)
  const [mobileIndex, setMobileIndex] = useState(0)
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true)
  const [isMobileViewport, setIsMobileViewport] = useState(false)
  const touchStateRef = useRef<{
    startX: number
    startY: number
    lock: 'pending' | 'horizontal' | 'vertical'
  } | null>(null)
  const autoResumeTimerRef = useRef<number | null>(null)

  /** 검색어 + 스타일 필터를 동시에 적용한 결과 */
  const filtered = useMemo(() => {
    const lower = query.toLowerCase().trim()
    const matched = artists.filter((artist) => {
      if (onlyMainArtists && artist.category !== 'ARTIST') return false
      const queryMatch = !lower || artist.name.toLowerCase().includes(lower)
      const tags: ArtistCategoryFilter[] = []

      if (artist.category === 'ARTIST') {
        tags.push('ARTIST', 'MAIN')
      } else if (artist.category === 'GUEST_ARTIST') {
        tags.push('ARTIST', 'GUEST')
        if (artist.guestRegion === 'DOMESTIC') tags.push('DOMESTIC')
        if (artist.guestRegion === 'INTERNATIONAL') tags.push('INTERNATIONAL')
      } else if (artist.category === 'DJ') {
        tags.push('DJ')
      } else if (artist.category === 'MEDIA') {
        tags.push('MEDIA')
      }

      const categoryMatch = categoryFilter === 'ALL' || tags.includes(categoryFilter)
      return queryMatch && categoryMatch
    })
    if (categoryFilter === 'GUEST') {
      return [...matched].sort((a, b) => {
        const rank = (artist: Artist) =>
          artist.guestRegion === 'INTERNATIONAL' ? 0 : artist.guestRegion === 'DOMESTIC' ? 1 : 2
        return rank(a) - rank(b)
      })
    }
    return matched
  }, [query, categoryFilter, onlyMainArtists])

  const categoryOptions = useMemo<Array<{ value: ArtistCategoryFilter; label: string }>>(
    () => [
      { value: 'ALL', label: m.common.all },
      { value: 'MAIN', label: m.common.main },
      { value: 'ARTIST', label: m.common.artist },
      { value: 'DJ', label: m.common.dj },
      { value: 'GUEST', label: m.common.guest },
      { value: 'INTERNATIONAL', label: m.common.international },
      { value: 'DOMESTIC', label: m.common.domestic },
      { value: 'MEDIA', label: m.common.media },
    ],
    [m.common.all, m.common.main, m.common.artist, m.common.dj, m.common.guest, m.common.domestic, m.common.international, m.common.media],
  )

  const pageSize = previewCount ?? (showFilters ? 12 : filtered.length)
  const totalPages = pageSize > 0 ? Math.max(1, Math.ceil(filtered.length / pageSize)) : 1
  const safePage = Math.min(page, totalPages)
  const start = pageSize > 0 ? (safePage - 1) * pageSize : 0
  const end = pageSize > 0 ? safePage * pageSize : filtered.length
  const displayed = filtered.slice(start, end)
  const isHomePreview = Boolean(previewCount) && !showFilters

  useEffect(() => {
    setPage(1)
  }, [query, categoryFilter])

  useEffect(() => {
    if (filtered.length === 0) {
      setMobileIndex(0)
      return
    }
    setMobileIndex((prev) => Math.min(prev, filtered.length - 1))
  }, [filtered.length])

  const moveMobile = (step: 1 | -1) => {
    if (filtered.length <= 1) return
    setMobileIndex((prev) => (prev + step + filtered.length) % filtered.length)
  }

  const pauseAutoPlayTemporarily = (resumeDelay = 4500) => {
    setAutoPlayEnabled(false)
    if (autoResumeTimerRef.current !== null) {
      window.clearTimeout(autoResumeTimerRef.current)
    }
    autoResumeTimerRef.current = window.setTimeout(() => {
      setAutoPlayEnabled(true)
      autoResumeTimerRef.current = null
    }, resumeDelay)
  }

  const getMobileArtist = (offset: -1 | 0 | 1) => {
    if (filtered.length === 0) return null
    const idx = (mobileIndex + offset + filtered.length) % filtered.length
    return filtered[idx]
  }

  useEffect(() => {
    if (!isHomePreview || !isMobileViewport || filtered.length <= 1 || !autoPlayEnabled) return
    const intervalId = window.setInterval(() => {
      if (!document.hidden) {
        setMobileIndex((prev) => (prev + 1) % filtered.length)
      }
    }, 4000)
    return () => window.clearInterval(intervalId)
  }, [isHomePreview, isMobileViewport, filtered.length, autoPlayEnabled])

  useEffect(() => {
    return () => {
      if (autoResumeTimerRef.current !== null) {
        window.clearTimeout(autoResumeTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 639px)')
    const onChange = (event: MediaQueryListEvent) => {
      setIsMobileViewport(event.matches)
    }
    setIsMobileViewport(mediaQuery.matches)
    mediaQuery.addEventListener('change', onChange)
    return () => mediaQuery.removeEventListener('change', onChange)
  }, [])

  return (
    <Section title={m.sections.lineupTitle} subtitle={hideSubtitle ? undefined : m.sections.lineupSubtitle}>
      {showFilters ? (
        <div className="mb-4 flex flex-col gap-3 sm:flex-row">
          <Input aria-label={m.common.searchArtistName} placeholder={m.common.searchArtistName} value={query} onChange={(e) => setQuery(e.target.value)} />
          <SelectDropdown
            value={categoryFilter}
            options={categoryOptions}
            onChange={setCategoryFilter}
            ariaLabel={m.common.filterCategory}
            className="w-full sm:w-auto"
          />
        </div>
      ) : null}

      {isHomePreview ? (
        <>
          <div className="sm:hidden">
            {filtered.length > 0 ? (
              <>
                <div
                  className="relative mx-auto h-[420px] w-full max-w-[420px] touch-pan-y overflow-hidden"
                  onTouchStart={(e) => {
                    pauseAutoPlayTemporarily()
                    const point = e.changedTouches[0]
                    if (!point) return
                    touchStateRef.current = {
                      startX: point.clientX,
                      startY: point.clientY,
                      lock: 'pending',
                    }
                  }}
                  onTouchMove={(e) => {
                    const state = touchStateRef.current
                    const point = e.changedTouches[0]
                    if (!state || !point) return

                    const dx = point.clientX - state.startX
                    const dy = point.clientY - state.startY
                    const absX = Math.abs(dx)
                    const absY = Math.abs(dy)

                    if (state.lock === 'pending' && (absX > 14 || absY > 14)) {
                      state.lock = absX > absY * 1.35 ? 'horizontal' : 'vertical'
                    }

                    if (state.lock === 'horizontal' && e.cancelable) {
                      e.preventDefault()
                    }
                  }}
                  onTouchEnd={(e) => {
                    const state = touchStateRef.current
                    const point = e.changedTouches[0]
                    if (!state || !point) return

                    const deltaX = point.clientX - state.startX
                    const deltaY = point.clientY - state.startY
                    const absX = Math.abs(deltaX)
                    const absY = Math.abs(deltaY)
                    const horizontalIntent = state.lock === 'horizontal' && absX >= 56 && absX > absY * 1.35

                    if (horizontalIntent && deltaX <= -56) moveMobile(1)
                    if (horizontalIntent && deltaX >= 56) moveMobile(-1)
                    touchStateRef.current = null
                    pauseAutoPlayTemporarily()
                  }}
                >
                  {([-1, 0, 1] as const).map((offset) => {
                    const artist = getMobileArtist(offset)
                    if (!artist) return null
                    return (
                      <div
                        key={`${artist.id}-${offset}`}
                        className={cn(
                          'absolute inset-0',
                          offset === -1 && '-translate-x-[112%]',
                          offset === 0 && 'translate-x-0',
                          offset === 1 && 'translate-x-[112%]'
                        )}
                      >
                        <ArtistCard artist={artist} onClick={setSelected} />
                      </div>
                    )
                  })}
                </div>
                {filtered.length > 1 ? (
                  <div className="mt-3 flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        pauseAutoPlayTemporarily()
                        moveMobile(-1)
                      }}
                      aria-label={m.common.prev}
                    >
                      {m.common.prev}
                    </Button>
                    <span className="min-w-14 text-center text-sm text-muted">{mobileIndex + 1} / {filtered.length}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        pauseAutoPlayTemporarily()
                        moveMobile(1)
                      }}
                      aria-label={m.common.next}
                    >
                      {m.common.next}
                    </Button>
                  </div>
                ) : null}
              </>
            ) : null}
          </div>
          <div className="hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 [&>*]:min-w-0">
            {displayed.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} onClick={setSelected} />
            ))}
          </div>
        </>
      ) : (
        <div className={cn('grid gap-4 sm:grid-cols-2 [&>*]:min-w-0', previewCount ? 'lg:grid-cols-3' : 'lg:grid-cols-4')}>
          {displayed.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} onClick={setSelected} />
          ))}
        </div>
      )}

      {(previewCount || showFilters) && totalPages > 1 ? (
        <div className={cn('mt-6 items-center justify-center gap-2', isHomePreview ? 'hidden sm:flex' : 'flex')}>
          <Button variant="outline" size="sm" onClick={() => setPage((prev) => Math.max(1, prev - 1))} disabled={safePage === 1}>
            {m.common.prev}
          </Button>
          <span className="min-w-14 text-center text-sm text-muted">{safePage} / {totalPages}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={safePage === totalPages}
          >
            {m.common.next}
          </Button>
        </div>
      ) : null}

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.name ?? m.common.artistDetail}>
        {selected ? (
          <div className="space-y-4">
            <div className="rounded-xl border border-black/10 bg-base/40 p-2">
              <img src={selected.image} alt={selected.name} className="max-h-[70vh] w-full rounded-lg object-contain" />
            </div>
            <div className="flex flex-wrap gap-3 pl-2 sm:pl-3">
              {selected.socials.instagram ? (
                <a
                  href={selected.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-lg font-semibold text-accentSoft transition hover:opacity-80"
                >
                  <Instagram size={20} aria-hidden="true" />
                  {m.common.instagram}
                </a>
              ) : null}
            </div>
          </div>
        ) : null}
      </Modal>
    </Section>
  )
}
