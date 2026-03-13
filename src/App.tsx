import { Navigate, Route, Routes } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import Home from './routes/Home'
import Artists from './routes/Artists'
import Tickets from './routes/Tickets'
import Faq from './routes/Faq'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
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
