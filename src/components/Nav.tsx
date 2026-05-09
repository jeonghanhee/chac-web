import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleGames = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (location.pathname === '/') {
      document.querySelector('#games')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = '/#games'
    }
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] px-12 py-7 flex justify-between items-center transition-all duration-400 ease-in-out max-md:px-6 max-md:py-5 ${scrolled ? 'bg-[#111111]/85 backdrop-blur-[20px]' : ''}`}>
      <Link
        to="/"
        onClick={() => { if (location.pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        className="font-bebas text-[22px] tracking-[0.18em] text-white no-underline animate-slide-up [animation-delay:50ms] [animation-fill-mode:both]"
      >
        CHAC
      </Link>
      <ul className="flex gap-9 list-none max-md:gap-5">
        <li className="animate-slide-up" style={{ animationDelay: '120ms', animationFillMode: 'both' }}>
          <a
            href="/#games"
            onClick={handleGames}
            className="font-sans text-[15px] tracking-[0.06em] text-muted no-underline transition-colors duration-200 hover:text-white"
          >
            Games
          </a>
        </li>
        <li className="animate-slide-up" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
          <Link
            to="/team"
            className="font-sans text-[15px] tracking-[0.06em] text-muted no-underline transition-colors duration-200 hover:text-white"
          >
            Team
          </Link>
        </li>
        <li className="animate-slide-up" style={{ animationDelay: '280ms', animationFillMode: 'both' }}>
          <Link
            to="/history"
            className="font-sans text-[15px] tracking-[0.06em] text-muted no-underline transition-colors duration-200 hover:text-white"
          >
            History
          </Link>
        </li>
      </ul>
    </nav>
  )
}
