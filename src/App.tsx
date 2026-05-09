import { useEffect } from 'react'
import { Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom'
import Nav          from './components/Nav'
import Hero         from './components/Hero'
import GameCarousel from './components/GameCarousel'
import GameDetail   from './pages/GameDetail'
import Footer       from './components/Footer'
import TeamPage     from './pages/TeamPage'
import HistoryPage  from './pages/HistoryPage'
import { useReveal } from './hooks/useReveal'
import { games } from './games'

function MainPage() {
  const navigate = useNavigate()
  const location = useLocation()
  useReveal()

  useEffect(() => {
    if (location.hash === '#games') {
      setTimeout(() => {
        document.querySelector('#games')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [location.hash])

  return (
    <>
      <Nav />
      <Hero titleImage="/images/logo.png" />
      <GameCarousel onSelect={(game) => navigate(`/game/${encodeURIComponent(game.title)}`)} />
      <Footer />
    </>
  )
}

function GameDetailPage() {
  return (
    <>
      <Nav />
      <GameDetailWrapper />
      <Footer />
    </>
  )
}

function TeamFullPage() {
  return (
    <>
      <Nav />
      <TeamPage />
      <Footer />
    </>
  )
}

function HistoryFullPage() {
  return (
    <>
      <Nav />
      <HistoryPage />
      <Footer />
    </>
  )
}

function GameDetailWrapper() {
  const { id } = useParams()
  const game = games.find(g => g.title === decodeURIComponent(id || ''))

  if (!game) {
    return <div className="min-h-screen flex items-center justify-center text-white">Game not found</div>
  }

  return <GameDetail game={game} />
}

export default function App() {
  return (
    <Routes>
      <Route path="/"        element={<MainPage />} />
      <Route path="/game/:id" element={<GameDetailPage />} />
      <Route path="/team"    element={<TeamFullPage />} />
      <Route path="/history" element={<HistoryFullPage />} />
    </Routes>
  )
}
