import { useState } from 'react'
import { gallery } from '../data/event'
import { Section } from './Section'
import { Modal } from './ui/Modal'

/**
 * 갤러리 썸네일 그리드 + 라이트박스(모달) 컴포넌트
 * 이미지를 누르면 해당 이미지가 큰 화면으로 열린다.
 */
export function Gallery() {
  const [activeImage, setActiveImage] = useState<(typeof gallery)[number] | null>(null)

  return (
    <Section title="Gallery" subtitle="Snapshots of stage design, crowd moments, and sensory details.">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {gallery.map((image) => (
          <button key={image.id} type="button" onClick={() => setActiveImage(image)} aria-label={`Open ${image.alt}`}>
            <img src={image.src} alt={image.alt} className="h-36 w-full rounded-xl object-cover sm:h-44" loading="lazy" />
          </button>
        ))}
      </div>

      <Modal open={!!activeImage} onClose={() => setActiveImage(null)} title={activeImage?.alt ?? 'Gallery image'}>
        {activeImage ? <img src={activeImage.src} alt={activeImage.alt} className="w-full rounded-xl" /> : null}
      </Modal>
    </Section>
  )
}
