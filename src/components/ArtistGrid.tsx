import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
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
}

type ArtistCategoryFilter = 'ALL' | 'MAIN' | 'DJ' | 'ARTIST' | 'GUEST' | 'DOMESTIC' | 'INTERNATIONAL' | 'MEDIA'

/**
 * 라인업 목록 + 상세 모달 컴포넌트
 * 홈(/)과 아티스트 목록(/artists)에서 동일 컴포넌트를 재사용한다.
 */
export function ArtistGrid({ previewCount, showFilters = false, hideSubtitle = false }: ArtistGridProps) {
  const { locale } = useLocale()
  const m = messages[locale]
  const [selected, setSelected] = useState<Artist | null>(null)
  const [query, setQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<ArtistCategoryFilter>('ALL')
  const [page, setPage] = useState(1)
  const [mobileIndex, setMobileIndex] = useState(0)
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const [slideWidth, setSlideWidth] = useState(0)

  /** 검색어 + 스타일 필터를 동시에 적용한 결과 */
  const filtered = useMemo(() => {
    const lower = query.toLowerCase().trim()
    return artists.filter((artist) => {
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
  }, [query, categoryFilter])

  const categoryOptions = useMemo<Array<{ value: ArtistCategoryFilter; label: string }>>(
    () => [
      { value: 'ALL', label: m.common.all },
      { value: 'MAIN', label: m.common.main },
      { value: 'ARTIST', label: m.common.artist },
      { value: 'DJ', label: m.common.dj },
      { value: 'GUEST', label: m.common.guest },
      { value: 'DOMESTIC', label: m.common.domestic },
      { value: 'INTERNATIONAL', label: m.common.international },
      { value: 'MEDIA', label: m.common.media },
    ],
    [m.common.all, m.common.main, m.common.artist, m.common.dj, m.common.guest, m.common.domestic, m.common.international, m.common.media],
  )

  const totalPages = previewCount ? Math.max(1, Math.ceil(filtered.length / previewCount)) : 1
  const safePage = Math.min(page, totalPages)
  const start = previewCount ? (safePage - 1) * previewCount : 0
  const end = previewCount ? safePage * previewCount : filtered.length
  const displayed = filtered.slice(start, end)
  const isHomePreview = Boolean(previewCount) && !showFilters
  const mobileGap = 12

  useEffect(() => {
    if (!isHomePreview) return

    const updateSlideWidth = () => {
      const width = viewportRef.current?.clientWidth ?? 0
      setSlideWidth(width)
    }

    updateSlideWidth()
    window.addEventListener('resize', updateSlideWidth)
    return () => window.removeEventListener('resize', updateSlideWidth)
  }, [isHomePreview])

  useEffect(() => {
    const maxMobileIndex = Math.max(0, filtered.length - 1)
    if (mobileIndex > maxMobileIndex) {
      setMobileIndex(maxMobileIndex)
    }
  }, [filtered.length, mobileIndex])

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
            <div ref={viewportRef} className="overflow-hidden">
              <motion.div
                className="flex gap-3"
                drag="x"
                dragConstraints={{
                  left: -Math.max(0, (filtered.length - 1) * (slideWidth + mobileGap)),
                  right: 0
                }}
                animate={{ x: -(mobileIndex * (slideWidth + mobileGap)) }}
                transition={{ type: 'spring', stiffness: 280, damping: 30 }}
                onDragEnd={(_, info) => {
                  const threshold = Math.max(50, slideWidth * 0.18)
                  if (info.offset.x < -threshold) {
                    setMobileIndex((prev) => Math.min(filtered.length - 1, prev + 1))
                    return
                  }
                  if (info.offset.x > threshold) {
                    setMobileIndex((prev) => Math.max(0, prev - 1))
                  }
                }}
              >
                {filtered.map((artist) => (
                  <div key={artist.id} className="flex w-full shrink-0 justify-center">
                    <div className="w-full max-w-[420px]">
                      <ArtistCard artist={artist} onClick={setSelected} />
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
            {filtered.length > 1 ? (
              <div className="mt-3 flex items-center justify-center gap-1.5">
                {filtered.map((artist, index) => (
                  <button
                    key={`dot-${artist.id}`}
                    type="button"
                    aria-label={`${m.common.artist} ${index + 1}`}
                    onClick={() => setMobileIndex(index)}
                    className={cn(
                      'h-1.5 rounded-full transition-all',
                      index === mobileIndex ? 'w-4 bg-accentSoft' : 'w-1.5 bg-black/20'
                    )}
                  />
                ))}
              </div>
            ) : null}
          </div>
          <div className="hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
            {displayed.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} onClick={setSelected} />
            ))}
          </div>
        </>
      ) : (
        <div className={cn('grid gap-4 sm:grid-cols-2', previewCount ? 'lg:grid-cols-3' : 'lg:grid-cols-4')}>
          {displayed.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} onClick={setSelected} />
          ))}
        </div>
      )}

      {previewCount && totalPages > 1 ? (
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
