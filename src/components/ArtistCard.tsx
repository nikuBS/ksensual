import { getArtistCategory, type Artist } from '../data/event'
import { useLocale } from '../i18n/LocaleContext'
import { messages } from '../i18n/messages'
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
  const { locale } = useLocale()
  const m = messages[locale]
  const category = getArtistCategory(artist)
  const categoryLabels =
    category === 'ARTIST'
      ? [m.common.artist, m.common.main]
      : category === 'GUEST_ARTIST'
        ? [
          m.common.artist,
          m.common.guest,
          artist.guestRegion === 'DOMESTIC'
            ? m.common.domestic
            : artist.guestRegion === 'INTERNATIONAL'
              ? m.common.international
              : '',
        ].filter(Boolean)
        : category === 'DJ'
          ? [m.common.dj]
          : category === 'MEDIA'
            ? [m.common.media]
            : [m.common.artist]

  return (
    <button type="button" className="block w-full min-w-0 text-left" onClick={() => onClick(artist)} aria-label={`Open ${artist.name} details`}>
      <Card className="h-full overflow-hidden">
        <div className="rounded-xl border border-black/10 bg-base/40 p-2">
          <img src={artist.image} alt={artist.name} className="h-60 w-full rounded-lg object-contain object-center sm:h-64" loading="lazy" />
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">{artist.name}</h3>
          <div className="mt-3 flex w-full max-w-full min-h-[32px] flex-nowrap gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categoryLabels.map((label) => (
              <Badge key={`${artist.id}-${label}`} className="shrink-0">{label}</Badge>
            ))}
          </div>
        </div>
      </Card>
    </button>
  )
}
