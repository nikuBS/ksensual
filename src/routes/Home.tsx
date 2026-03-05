import { Hero } from '../components/Hero'
import { ArtistGrid } from '../components/ArtistGrid'
import { Contact } from '../components/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <ArtistGrid previewCount={6} onlyMainArtists />
      <Contact />
    </>
  )
}
