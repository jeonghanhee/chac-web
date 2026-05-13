import { useEffect } from 'react'
import { useReveal } from '../hooks/useReveal'

const HISTORY = [
  {
    period: '2026. 03',
    title: '팀 창단',
    desc: '인디스타즈 공모전 참가를 목표로 팀을 결성했다. 초기 팀명은 하니원정대였다.',
  },
  {
    period: '2026. 03 — 05',
    title: 'The Face They Saw',
    desc: 'AI와 대화하며 숨겨진 진실을 추리하는 첫 번째 게임을 개발했다.',
  },
  {
    period: '2026. 05',
    title: 'CHAC 출범',
    desc: '팀명을 CHAC로 변경하고 정식으로 팀을 출범했다.',
  },
]

export default function HistoryPage() {
  useReveal()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="min-h-screen pt-[120px] pb-[100px] px-[clamp(24px,6vw,96px)] max-md:pt-[90px] max-md:pb-16 max-md:px-6">
      <h1 className="font-bebas text-[clamp(36px,5vw,72px)] tracking-[0.08em] text-white leading-none mb-20 max-md:mb-14 animate-slide-up [animation-delay:100ms] [animation-fill-mode:both]">
        HISTORY
      </h1>

      <div className="relative">
        {/* vertical line — left-0 기준, 도트와 동일한 x축 */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-white/15" />

        <div className="flex flex-col">
          {HISTORY.map((item, i) => (
            <div
              key={i}
              className="reveal relative pb-16 last:pb-4 max-md:pb-12"
              data-delay={String(i * 140)}
            >
              {/* ring dot — 선이 투명한 중심을 관통하도록 bg-transparent */}
              <div className="absolute left-[-4px] top-[10px] w-[9px] h-[9px] rounded-full border border-white/40 bg-bg" />

              <div className="flex flex-col gap-[10px] pl-8 max-md:pl-7">
                <span className="self-start font-sans text-[11px] tracking-[0.14em] uppercase text-white/40 border border-white/20 px-3 py-[5px] rounded-full">
                  {item.period}
                </span>
                <p className="font-bebas text-[clamp(30px,3.2vw,48px)] tracking-[0.06em] text-white leading-none">
                  {item.title}
                </p>
                <p className="font-sans text-[clamp(14px,1.2vw,16px)] text-white/55 leading-relaxed max-w-[480px]">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
