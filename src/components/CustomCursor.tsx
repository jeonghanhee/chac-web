import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let rafId: number
    const pos  = { x: -200, y: -200 }
    const ring = { x: -200, y: -200 }
    let targetScale = 1
    let curScale    = 1

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX
      pos.y = e.clientY
    }

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      targetScale = t.closest('a, button') ? 1.7 : 1
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)

    const tick = () => {
      ring.x   += (pos.x - ring.x) * 0.1
      ring.y   += (pos.y - ring.y) * 0.1
      curScale += (targetScale - curScale) * 0.14

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(calc(${pos.x}px - 50%), calc(${pos.y}px - 50%))`
      }
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(calc(${ring.x}px - 50%), calc(${ring.y}px - 50%)) scale(${curScale})`
      }

      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed', top: 0, left: 0,
          width: '6px', height: '6px',
          borderRadius: '50%',
          background: 'rgba(240,240,240,0.95)',
          pointerEvents: 'none',
          zIndex: 9999,
          willChange: 'transform',
          mixBlendMode: 'difference',
        }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed', top: 0, left: 0,
          width: '34px', height: '34px',
          borderRadius: '50%',
          background: 'rgba(240,240,240,0.06)',
          pointerEvents: 'none',
          zIndex: 9998,
          willChange: 'transform',
        }}
      />
    </>
  )
}
