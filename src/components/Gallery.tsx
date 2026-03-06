import { useState } from 'react'
import type { GalleryContent } from '../admin/types/contentSchema'
import { publishedOnly } from '../admin/utils/contentHelpers'
import { useEventContent } from '../content/ContentContext'
import { useLocale } from '../i18n/LocaleContext'
import { messages } from '../i18n/messages'
import { assetPath } from '../lib/assets'
import { Section } from './Section'
import { Modal } from './ui/Modal'

/**
 * 갤러리 썸네일 그리드 + 라이트박스(모달) 컴포넌트
 * 이미지를 누르면 해당 이미지가 큰 화면으로 열린다.
 */
export function Gallery() {
  const { content } = useEventContent()
  const { locale } = useLocale()
  const m = messages[locale]
  const [activeImage, setActiveImage] = useState<GalleryContent | null>(null)
  const gallery = publishedOnly(content.gallery)

  return (
    <Section title={m.sections.galleryTitle} subtitle={m.sections.gallerySubtitle}>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {gallery.map((image) => (
          <button key={image.id} type="button" onClick={() => setActiveImage(image)} aria-label={`Open ${image.caption}`}>
            <img src={assetPath(image.thumbnailUrl || image.imageUrl)} alt={image.caption} className="h-36 w-full rounded-xl object-cover sm:h-44" loading="lazy" />
          </button>
        ))}
      </div>

      <Modal open={!!activeImage} onClose={() => setActiveImage(null)} title={activeImage?.caption ?? m.common.galleryImage}>
        {activeImage ? <img src={assetPath(activeImage.imageUrl)} alt={activeImage.caption} className="w-full rounded-xl" /> : null}
      </Modal>
    </Section>
  )
}
