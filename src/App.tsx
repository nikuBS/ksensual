import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { fetchCmsContent } from './api/jsonbin'
import { MaintenanceScreen } from './components/cms/MaintenanceScreen'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage'
import Artists from './routes/Artists'
import Tickets from './routes/Tickets'
import Faq from './routes/Faq'
import { defaultCmsContent, type CmsContent } from './utils/cms'

function PublicApp() {
  const [content, setContent] = useState<CmsContent | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      try {
        setLoading(true)
        setError(null)
        const nextContent = await fetchCmsContent(controller.signal)
        setContent(nextContent)
      } catch (loadError) {
        const message = loadError instanceof Error ? loadError.message : 'Unknown fetch error.'
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    void load()

    return () => controller.abort()
  }, [reloadKey])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 py-16 text-center">
        <div className="rounded-[28px] border border-black/10 bg-white/80 px-8 py-10 shadow-[0_18px_60px_rgba(6,50,71,0.12)]">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accentSoft">Loading</p>
          <h1 className="mt-4 text-3xl font-heading text-[#063247]">Fetching CMS content</h1>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 py-16">
        <div className="w-full max-w-2xl rounded-[28px] border border-rose-200 bg-white/80 p-8 text-center shadow-[0_18px_60px_rgba(6,50,71,0.12)]">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-rose-500">Fetch Error</p>
          <h1 className="mt-4 text-3xl font-heading text-[#063247]">CMS data could not be loaded</h1>
          <p className="mt-4 text-sm leading-7 text-muted">{error}</p>
          <button
            type="button"
            onClick={() => setReloadKey((value) => value + 1)}
            className="mt-6 rounded-full bg-accent px-5 py-3 font-semibold text-base shadow-glow transition hover:bg-accentSoft"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  const siteContent = content ?? defaultCmsContent

  if (siteContent.status === 'MAINTENANCE') {
    return <MaintenanceScreen title={siteContent.main.title} subtitle={siteContent.main.subtitle} />
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage content={siteContent} />} />
          <Route path="/lineup" element={<Artists />} />
          <Route path="/artists" element={<Navigate to="/lineup" replace />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/venue" element={<Faq />} />
          <Route path="/faq" element={<Navigate to="/venue" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<PublicApp />} />
    </Routes>
  )
}
