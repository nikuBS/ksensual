import { Hero } from '../components/Hero'
import { ArtistGrid } from '../components/ArtistGrid'
import { Contact } from '../components/Contact'
import { WorkshopsSection } from '../components/WorkshopsSection'
import { PartiesSection } from '../components/PartiesSection'
import { FAQSection } from '../components/FAQSection'

export default function Home() {
  return (
    <>
      <Hero />
      <ArtistGrid previewCount={6} onlyMainArtists />
      <WorkshopsSection />
      <PartiesSection />
      <FAQSection limit={5} />
      <Contact />
    </>
  )
}
