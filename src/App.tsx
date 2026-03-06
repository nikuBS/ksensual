import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import Home from './routes/Home'
import Artists from './routes/Artists'
import Tickets from './routes/Tickets'
import Faq from './routes/Faq'
import { AdminLayout } from './admin/components/AdminLayout'
import AdminDashboard from './admin/pages/AdminDashboard'
import EventManager from './admin/pages/EventManager'
import HeroManager from './admin/pages/HeroManager'
import ArtistManager from './admin/pages/ArtistManager'
import WorkshopManager from './admin/pages/WorkshopManager'
import PartyManager from './admin/pages/PartyManager'
import ScheduleManager from './admin/pages/ScheduleManager'
import GalleryManager from './admin/pages/GalleryManager'
import FAQManager from './admin/pages/FAQManager'
import NoticeManager from './admin/pages/NoticeManager'

export default function App() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <div className="min-h-screen">
      {!isAdminRoute ? <Navbar /> : null}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lineup" element={<Artists />} />
          <Route path="/artists" element={<Navigate to="/lineup" replace />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/venue" element={<Faq />} />
          <Route path="/faq" element={<Navigate to="/venue" replace />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="event" element={<EventManager />} />
            <Route path="hero" element={<HeroManager />} />
            <Route path="artists" element={<ArtistManager />} />
            <Route path="workshops" element={<WorkshopManager />} />
            <Route path="parties" element={<PartyManager />} />
            <Route path="schedule" element={<ScheduleManager />} />
            <Route path="gallery" element={<GalleryManager />} />
            <Route path="faq" element={<FAQManager />} />
            <Route path="notices" element={<NoticeManager />} />
          </Route>
        </Routes>
      </main>
      {!isAdminRoute ? <Footer /> : null}
    </div>
  )
}
