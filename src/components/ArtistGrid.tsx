import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { artists, type Artist } from '../data/event'
import { ArtistCard } from './ArtistCard'
import { Section } from './Section'
import { Modal } from './ui/Modal'
import { Input } from './ui/Input'
import { Button } from './ui/Button'

/**
 * ArtistGrid 동작 옵션
 * - previewCount: 홈에서는 일부만 보여주기 위해 사용
 * - showFilters: /artists 페이지에서 검색/필터 UI 노출 여부
 */
type ArtistGridProps = {
  previewCount?: number
  showFilters?: boolean
}

/**
 * 라인업 목록 + 상세 모달 컴포넌트
 * 홈(/)과 아티스트 목록(/artists)에서 동일 컴포넌트를 재사용한다.
 */
export function ArtistGrid({ previewCount, showFilters = false }: ArtistGridProps) {
  const [selected, setSelected] = useState<Artist | null>(null)
  const [query, setQuery] = useState('')
  const [styleFilter, setStyleFilter] = useState('All')

  /**
   * 필터 드롭다운에 사용할 스타일 목록 생성
   * Set을 사용해 중복 스타일을 제거한다.
   */
  const styles = useMemo(() => ['All', ...new Set(artists.flatMap((artist) => artist.styles))], [])

  /** 검색어 + 스타일 필터를 동시에 적용한 결과 */
  const filtered = useMemo(() => {
    const lower = query.toLowerCase().trim()
    return artists.filter((artist) => {
      const queryMatch =
        !lower || artist.name.toLowerCase().includes(lower) || artist.roles.join(' ').toLowerCase().includes(lower) || artist.styles.join(' ').toLowerCase().includes(lower)
      const styleMatch = styleFilter === 'All' || artist.styles.includes(styleFilter)
      return queryMatch && styleMatch
    })
  }, [query, styleFilter])

  /** previewCount가 있으면 해당 개수만 잘라서 홈 미리보기로 사용 */
  const displayed = previewCount ? filtered.slice(0, previewCount) : filtered

  return (
    <Section title="Line-up" subtitle="Genre-diverse artists across live showcases and late-night sets.">
      {showFilters ? (
        <div className="mb-4 flex flex-col gap-3 sm:flex-row">
          <Input aria-label="Search artists" placeholder="Search by artist, role, style" value={query} onChange={(e) => setQuery(e.target.value)} />
          <select
            aria-label="Filter by style"
            className="w-full rounded-2xl border border-white/20 bg-base/60 px-4 py-3 text-sm sm:w-auto"
            value={styleFilter}
            onChange={(e) => setStyleFilter(e.target.value)}
          >
            {styles.map((style) => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {displayed.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} onClick={setSelected} />
        ))}
      </div>

      {previewCount ? (
        <div className="mt-6">
          <Link to="/artists">
            <Button variant="outline">See all artists</Button>
          </Link>
        </div>
      ) : null}

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.name ?? 'Artist detail'}>
        {selected ? (
          <div className="space-y-4">
            <img src={selected.image} alt={selected.name} className="h-44 w-full rounded-xl object-cover sm:h-56" />
            <p className="text-sm text-muted">{selected.roles.join(' · ')} · {selected.country}</p>
            <p className="text-sm text-muted">{selected.bio}</p>
            <div className="flex flex-wrap gap-3 text-sm">
              {selected.socials.instagram ? <a href={selected.socials.instagram} target="_blank" rel="noreferrer">Instagram</a> : null}
              {selected.socials.youtube ? <a href={selected.socials.youtube} target="_blank" rel="noreferrer">YouTube</a> : null}
              {selected.socials.website ? <a href={selected.socials.website} target="_blank" rel="noreferrer">Website</a> : null}
            </div>
          </div>
        ) : null}
      </Modal>
    </Section>
  )
}
