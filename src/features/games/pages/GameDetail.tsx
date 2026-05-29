import { useEffect } from 'react'
import { marked } from 'marked'
import { useNavigate } from 'react-router-dom'
import type { Game } from '../data'

interface Props {
  game: Game
}

function md(src: string): string {
  return marked(src, { breaks: true }) as string
}

const markdownClass = `font-sans text-16px leading-[1.9] tracking-[0.01em] text-muted [&_h1]:font-bebas [&_h1]:text-[clamp(32px,3.5vw,48px)] [&_h1]:tracking-[0.1em] [&_h1]:uppercase [&_h1]:text-white [&_h1]:mt-10 [&_h1]:mb-4 [&_h1]:leading-none
                       [&_h2]:font-bebas [&_h2]:text-[clamp(24px,2.5vw,32px)] [&_h2]:tracking-[0.1em] [&_h2]:uppercase [&_h2]:text-white [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:leading-none
                       [&_h3]:font-bebas [&_h3]:text-[clamp(20px,2vw,26px)] [&_h3]:tracking-[0.1em] [&_h3]:uppercase [&_h3]:text-muted [&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:leading-none
                       [&_p]:mb-5 [&_strong]:text-white [&_strong]:font-medium
                       [&_ul]:list-none [&_ul]:pl-0 [&_ul]:mb-6
                       [&_li]:pl-6 [&_li]:relative [&_li]:mb-1 [&_li:before]:content-['•'] [&_li:before]:absolute [&_li:before]:left-0 [&_li:before]:text-dim
                       [&_code]:font-mono [&_code]:text-14px [&_code]:text-white [&_code]:bg-white/[0.07] [&_code]:px-2 [&_code]:py-0.5 [&_code]:rounded-sm
                       [&_a]:text-white [&_a]:no-underline [&_a]:transition-colors`

export default function GameDetail({ game }: Props) {
  const navigate = useNavigate()
  const desc = game.description || ''
  const log = game.changelog || ''

  const handleBack = () => {
    if (window.history.length <= 1) {
      navigate('/')
    } else {
      navigate(-1)
    }
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [game])

  return (
    <div className="min-h-screen animate-slide-up">
      <div className="relative h-[70vh] min-h-[480px] max-md:h-[50vh] max-md:min-h-[320px]">
        {game.image && (
          <img
            src={game.image}
            alt={game.title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-bg" />
        <button
          className="absolute top-[88px] left-12 max-md:left-7 inline-flex items-center gap-2 font-sans text-[14px] tracking-[0.04em] text-white/60 bg-none border-none p-0 cursor-pointer transition-colors duration-200 hover:text-white group"
          onClick={handleBack}
        >
          <span className="text-[18px] transition-transform duration-200 group-hover:-translate-x-1" aria-hidden="true">←</span>
          돌아가기
        </button>
      </div>

      <div className="px-12 pb-[140px] max-md:px-7 max-md:pb-[100px]">
        <header className="mb-16 mt-2">
          {game.titleImage
            ? <img src={game.titleImage} alt={game.title} className="h-[clamp(56px,8vw,120px)] w-auto object-contain mb-10" />
            : <h1 className="font-bebas text-[clamp(64px,10vw,160px)] leading-[0.88] tracking-[0.08em] uppercase text-white mb-11">{game.title}</h1>
          }
        </header>

        {desc && (
          <section className="py-16 max-w-[720px]">
            <div
              className={markdownClass}
              dangerouslySetInnerHTML={{ __html: md(desc.trim()) }}
            />
          </section>
        )}

        {game.downloads.length > 0 && (
          <section className="pb-16 max-w-[720px]">
            <div
              className={`${markdownClass} [&_h2:first-child]:mt-0`}
              dangerouslySetInnerHTML={{ __html: md(game.downloadTitle.trim()) }}
            />
            <div className="mt-6 overflow-x-auto border-y border-white/15">
              <table className="w-full border-collapse font-sans text-[15px] text-muted">
                <thead>
                  <tr className="text-left text-[12px] uppercase tracking-[0.12em] text-white/45">
                    <th className="py-4 pr-5 font-medium">운영체제</th>
                    <th className="py-4 pr-5 font-medium">파일</th>
                    <th className="py-4 font-medium text-right">링크</th>
                  </tr>
                </thead>
                <tbody>
                  {game.downloads.map((download) => (
                    <tr key={`${download.os}-${download.url}`} className="border-t border-white/10">
                      <td className="py-4 pr-5 text-white">{download.os}</td>
                      <td className="py-4 pr-5">
                        {download.label || download.version || download.url.split('/').pop()}
                      </td>
                      <td className="py-4 text-right">
                        <a
                          href={download.url}
                          className="inline-flex min-w-[76px] items-center justify-center rounded-sm border border-accent/70 px-3 py-1.5 text-[14px] font-semibold text-accent no-underline transition-all duration-200 hover:bg-accent hover:text-bg"
                          download
                        >
                          다운로드
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {log && (
          <section className="py-16 max-w-[720px]">
            <h2 className="font-bebas text-[clamp(26px,3vw,40px)] tracking-[0.12em] uppercase text-white mb-10">업데이트 내역</h2>
            <div
              className={`${markdownClass} [&_h2:first-child]:mt-0`}
              dangerouslySetInnerHTML={{ __html: md(log.trim()) }}
            />
          </section>
        )}
      </div>
    </div>
  )
}
