import { getArtistCategory, type Artist } from '../data/event'
import { Card } from './ui/Card'
import { Badge } from './ui/Badge'

/** 개별 아티스트 카드 입력값 */
type ArtistCardProps = {
  artist: Artist
  onClick: (artist: Artist) => void
}

/**
 * 아티스트 미리보기 카드
 * 클릭하면 상위 컴포넌트에서 모달을 열 수 있도록 artist 객체를 전달한다.
 */
export function ArtistCard({ artist, onClick }: ArtistCardProps) {
  const category = getArtistCategory(artist)

  return (
    <button type="button" className="text-left" onClick={() => onClick(artist)} aria-label={`Open ${artist.name} details`}>
      <Card className="h-full">
        <div className="rounded-xl border border-black/10 bg-base/40 p-2">
          <img src={artist.image} alt={artist.name} className="h-60 w-full rounded-lg object-contain sm:h-64" loading="lazy" />
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">{artist.name}</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge>{category === 'DJ' ? 'Dj' : 'Artist'}</Badge>
          </div>
        </div>
      </Card>
    </button>
  )
}
