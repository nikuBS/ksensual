import type { Artist } from '../data/event'
import { Card } from './ui/Card'
import { Badge } from './ui/Badge'

// 개별 아티스트 카드 입력값
type ArtistCardProps = {
  artist: Artist
  onClick: (artist: Artist) => void
}

// 아티스트 미리보기 카드
// 클릭하면 상위 컴포넌트에서 모달을 열 수 있도록 artist 객체를 전달한다.
export function ArtistCard({ artist, onClick }: ArtistCardProps) {
  return (
    <button type="button" className="text-left" onClick={() => onClick(artist)} aria-label={`Open ${artist.name} details`}>
      <Card className="h-full">
        <img src={artist.image} alt={artist.name} className="h-48 w-full rounded-xl object-cover" loading="lazy" />
        <div className="mt-4">
          <h3 className="text-lg font-semibold">{artist.name}</h3>
          <p className="text-sm text-muted">{artist.roles.join(' · ')}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {artist.styles.slice(0, 2).map((style) => (
              <Badge key={style}>{style}</Badge>
            ))}
          </div>
        </div>
      </Card>
    </button>
  )
}
