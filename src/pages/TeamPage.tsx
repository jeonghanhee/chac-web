import { useEffect } from 'react'
import { useReveal } from '../hooks/useReveal'

const TEAM_MEMBERS = [
  { name: '정한희', role: '메인 프로그래머', image: '/images/team/jeonghanhee_profile.jpg' },
  { name: '추승민', role: '프로그래머', image: '/images/team/chuseungmin_profile.jpg' },
  { name: '안세빈', role: '디자이너', image: '/images/team/ansebin_profile.jpg' },
  { name: '조성민', role: '디자이너', image: '/images/team/choseongmin_profile.png' },
]

function MemberCard({ m, i }: { m: { name: string; role: string; image?: string }; i: number }) {
  return (
    <div className="reveal flex flex-col gap-5 group" data-delay={String(i * 120)}>
      <div className="relative overflow-hidden rounded-full aspect-square bg-surface shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
        {m.image ? (
          <img
            src={m.image}
            alt={m.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
        ) : (
          <div className="w-full h-full flex items-end justify-start p-6">
            <span className="font-bebas text-[clamp(64px,8vw,96px)] leading-none text-white/10 select-none">
              {m.name[0]}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 pl-1">
        <p className="font-bebas text-[clamp(26px,2.8vw,40px)] tracking-[0.06em] text-white leading-none">
          {m.name}
        </p>
        <p className="font-sans text-[clamp(13px,1.1vw,15px)] tracking-[0.2em] uppercase text-white/45">
          {m.role}
        </p>
      </div>
    </div>
  )
}

export default function TeamPage() {
  useReveal()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="min-h-screen pt-[120px] pb-[100px] px-[clamp(24px,6vw,96px)] max-md:pt-[90px] max-md:pb-16 max-md:px-6">
      <h1 className="font-bebas text-[clamp(36px,5vw,72px)] tracking-[0.08em] text-white leading-none mb-16 max-md:mb-10 animate-slide-up [animation-delay:100ms] [animation-fill-mode:both]">
        TEAM
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-[clamp(20px,4vw,40px)] gap-y-12 max-w-[1000px] max-md:gap-y-10">
        {TEAM_MEMBERS.map((m, i) => (
          <MemberCard key={i} m={m} i={i} />
        ))}
      </div>
    </main>
  )
}
