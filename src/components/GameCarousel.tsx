import { useState, useRef, useEffect } from 'react'
import type { Game } from '../games'
import { games, STATUS_LABEL } from '../games'

interface Props {
  onSelect: (game: Game) => void
}

export default function GameCarousel({ onSelect }: Props) {
  const [idx, setIdx] = useState(0)
  const viewportRef = useRef<HTMLDivElement>(null)
  const touchX     = useRef(0)

  const go = (next: number) => {
    const n = Math.max(0, Math.min(games.length - 1, next))
    setIdx(n)
    const vp = viewportRef.current
    if (!vp) return
    const card = vp.children[n] as HTMLElement
    const padding = parseInt(getComputedStyle(vp).paddingLeft)
    vp.scrollTo({ left: card.offsetLeft - padding, behavior: 'smooth' })
  }

  /* 키보드 ← → */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  go(idx - 1)
      if (e.key === 'ArrowRight') go(idx + 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [idx])

  return (
    <section id="games" className="flex flex-col items-center justify-center py-[60px] gap-10 bg-gradient-to-b from-bg via-surface to-bg">
      <h2 className="font-bebas text-[clamp(32px,5vw,56px)] tracking-[0.12em] uppercase text-white self-start pl-[clamp(24px,6vw,72px)] max-md:pl-6 animate-slide-up">
        Games
      </h2>

      <div
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none w-full px-[clamp(24px,6vw,72px)] scroll-pl-[clamp(24px,6vw,72px)] max-md:px-6 max-md:scroll-pl-6 max-md:gap-5"
        ref={viewportRef}
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX }}
        onTouchEnd={(e) => {
          const diff = touchX.current - e.changedTouches[0].clientX
          if (Math.abs(diff) > 40) go(diff > 0 ? idx + 1 : idx - 1)
        }}
      >
        {games.map((game, i) => (
          <button
            key={game.title}
            className={`flex-none w-[min(75vw,1000px)] max-md:w-[85vw] snap-start flex flex-col gap-5 bg-none border-none cursor-pointer text-left origin-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${i === idx ? 'opacity-100 scale-100' : 'opacity-30 scale-[0.96]'}`}
            onClick={() => { go(i); onSelect(game) }}
          >
            <div className="w-full aspect-16/8.5 max-md:aspect-16/10 overflow-hidden bg-[#1d1d1d] rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              {game.image
                ? <img
                    src={game.image}
                    alt={game.title}
                    loading="lazy"
                    className="w-full h-full object-cover block"
                  />
                : <div className="w-full h-full bg-[#1d1d1d]" />}
            </div>

            <div
              className={`flex items-center gap-4 px-1 ${i === idx ? 'animate-slide-up' : ''}`}
              key={i === idx ? `on-${idx}` : `off-${i}`}
            >
              {game.titleImage
                ? <img src={game.titleImage} alt={game.title} className="h-[clamp(22px,2.5vw,36px)] w-auto object-contain" />
                : <span className="font-bebas text-[clamp(22px,2.5vw,36px)] tracking-[0.08em] uppercase text-white">{game.title}</span>
              }
              {game.status !== 'released' && (
                <span className="font-sans text-[12px] tracking-[0.1em] text-white bg-white/10 px-3 py-1 rounded">
                  {STATUS_LABEL[game.status]}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-6 mt-2">
        <button
          className="bg-none border-none text-white cursor-pointer opacity-40 hover:enabled:opacity-100 disabled:opacity-10 transition-opacity font-serif text-[22px] leading-none px-3 py-2"
          onClick={() => go(idx - 1)}
          disabled={idx === 0}
        >
          ←
        </button>

        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            {games.map((_, i) => (
              <button
                key={i}
                className={`w-1.5 h-1.5 rounded-full border-none p-0 transition-all duration-300 ${i === idx ? 'bg-white scale-[1.5]' : 'bg-white/20 cursor-pointer'}`}
                onClick={() => go(i)}
              />
            ))}
          </div>
        </div>

        <button
          className="bg-none border-none text-white cursor-pointer opacity-40 hover:enabled:opacity-100 disabled:opacity-10 transition-opacity font-serif text-[22px] leading-none px-3 py-2"
          onClick={() => go(idx + 1)}
          disabled={idx === games.length - 1}
        >
          →
        </button>
      </div>
    </section>
  )
}
