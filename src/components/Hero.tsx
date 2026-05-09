import { useState } from 'react'

interface Props {
  titleImage?: string;
}

export default function Hero({ titleImage }: Props) {
  const [imgError, setImgError] = useState(false)

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-[clamp(24px,5vw,72px)] relative overflow-hidden max-md:px-6">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] bg-[radial-gradient(ellipse,rgba(240,240,240,0.04)_0%,transparent_65%)] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-[radial-gradient(circle,rgba(240,240,240,0.06)_0%,transparent_60%)] pointer-events-none animate-breathe"
        aria-hidden="true"
      />

      <div className="relative z-[1] flex flex-col items-center gap-6 max-md:gap-4">
        {titleImage && !imgError ? (
          <img
            src={titleImage}
            alt="CHAC"
            className="max-w-[clamp(300px,60vw,800px)] h-auto animate-slide-up [animation-delay:100ms] [animation-fill-mode:both]"
            onError={() => setImgError(true)}
          />
        ) : (
          <h1 className="font-bebas text-[clamp(120px,22vw,340px)] leading-[0.85] tracking-[0.08em] text-white animate-slide-up [animation-delay:100ms] [animation-fill-mode:both]">
            CHAC
          </h1>
        )}
        <p
          className="font-sans text-[clamp(14px,1.5vw,18px)] tracking-[0.15em] text-muted uppercase animate-slide-up [animation-delay:400ms] [animation-fill-mode:both]"
          lang="ko"
        >
          상상을 게임으로 옮기는 즐거움
        </p>
      </div>
    </section>
  )
}
