import { SitePreview } from '../components/cms/SitePreview'
import type { CmsContent } from '../utils/cms'

type HomePageProps = {
  content: CmsContent
}

export default function HomePage({ content }: HomePageProps) {
  return (
    <div className="mx-auto w-full max-w-6xl px-3 py-8 sm:px-6 sm:py-12">
      <SitePreview content={content} />
    </div>
  )
}
