import { useEffect } from 'react'
import { Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom'
import GameCarousel from '../features/games/components/GameCarousel'
import { games } from '../features/games/data'
import GameDetail from '../features/games/pages/GameDetail'
import HistoryPage from '../features/history/HistoryPage'
import TeamPage from '../features/team/TeamPage'
import { useReveal } from '../shared/hooks/useReveal'
import Footer from '../shared/layout/Footer'
import Hero from '../shared/layout/Hero'
import Nav from '../shared/layout/Nav'

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
      <GameCarousel onSelect={(game) => navigate(`/game/${game.slug}`)} />
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
  const decodedId = decodeURIComponent(id || '')
  const game = games.find((item) => item.slug === decodedId || item.title === decodedId)

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
