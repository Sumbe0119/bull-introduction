import { useEffect, useRef, useState } from 'react'
import './SketchSection.css'

const LETTERS = [
  { src: '/text/text-01.png', char: 'T' },
  { src: '/text/text-02.png', char: 'H' },
  { src: '/text/text-03.png', char: 'E' },
  { src: '/text/text-04.png', char: 'B' },
  { src: '/text/text-05.png', char: 'U' },
  { src: '/text/text-06.png', char: 'L' },
  { src: '/text/text-07.png', char: 'L' },
]

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function range(progress, start, end) {
  if (end <= start) return progress >= end ? 1 : 0
  return clamp((progress - start) / (end - start), 0, 1)
}

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3
}

export default function SketchSection() {
  const sectionRef = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current
      if (!section) return

      const rect = section.getBoundingClientRect()
      const scrollable = section.offsetHeight - window.innerHeight
      if (scrollable <= 0) return

      setProgress(clamp(-rect.top / scrollable, 0, 1))
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  // Phase A: already visible — soft zoom only (0 → 0.28)
  const zoomIn = easeOutCubic(range(progress, 0, 0.28))

  // Phase B: aside fade out, sketch centers (0.28 → 0.48)
  const centerT = easeOutCubic(range(progress, 0.28, 0.48))
  const asideOut = range(progress, 0.28, 0.45)

  // Phase C: blueprint fades out (0.48 → 0.62)
  const blueprintOut = easeOutCubic(range(progress, 0.48, 0.62))

  // Phase D: fullscreen letters (0.55 → 1)
  const lettersGate = range(progress, 0.52, 0.6)
  const lettersHero = easeOutCubic(range(progress, 0.55, 0.78))

  const asideOpacity = 1 - asideOut
  const asideX = asideOut * -90

  const zoom = 0.92 + zoomIn * 0.08
  const sketchScale = zoom * (1 + centerT * 0.04)
  const blueprintOpacity = 1 - blueprintOut
  const glow = (0.55 + zoomIn * 0.25) * (1 - blueprintOut * 0.7)

  return (
    <section
      ref={sectionRef}
      id="sketch"
      className="sketch-section"
      style={{ height: '360vh' }}
    >
      <div className="sketch-sticky">
        <div
          className="sketch-layout"
          style={{
            '--left-col': `${Math.max(0, 38 * (1 - centerT))}%`,
          }}
        >
          <aside
            className="sketch-copy"
            style={{
              opacity: asideOpacity,
              transform: `translateX(${asideX}px)`,
              pointerEvents: asideOpacity < 0.05 ? 'none' : 'auto',
            }}
            aria-hidden={asideOpacity < 0.05}
          >
            <img src="/bull-log.png" alt="" className="sketch-copy-icon" />
            <p className="sketch-eyebrow">CRAFTED WITH INTENT</p>
            <h2 className="sketch-heading">
              Тэмдэгтээ
              <span>нарийн тооцоолсон.</span>
            </h2>
            <p className="sketch-body">
              The Bull-ийн лого нь зүгээр нэг зураг биш — баланстай симметр,
              хүчтэй эвэр, custom serif үсэг зэргийг нэг бүтэн систем болгон
              цэгцэлсэн техникийн зураглал.
            </p>
            <div className="sketch-divider" />
            <p className="sketch-callout">
              AUTHENTIC
              <br />
              HOT POT MARK
            </p>
          </aside>

          <div className="sketch-stage">
            <div className="sketch-glow" style={{ opacity: glow * 0.55 }} />

            <div
              className="sketch-frame"
              style={{
                opacity: blueprintOpacity,
                transform: `scale(${sketchScale})`,
              }}
            >
              <img
                src="/sketch/bull-sketch.png"
                alt="The Bull logo technical sketch"
                className="sketch-image sketch-image--blueprint"
                draggable={false}
              />
            </div>

            {/* Fullscreen THE BULL when blueprint is gone */}
            <div
              className="sketch-letters sketch-letters--hero"
              style={{
                opacity: lettersGate,
                transform: `translate(-50%, -50%) scale(${0.55 + lettersHero * 0.45})`,
              }}
              aria-label="THE BULL"
            >
              <div className="sketch-letters-group">
                {LETTERS.slice(0, 3).map((letter, index) => {
                  const start = 0.54 + index * 0.035
                  const t = easeOutCubic(range(progress, start, start + 0.16))
                  const spin = index % 2 === 0 ? 1 : -1
                  const rotate = (1 - t) * spin * 420
                  const y = (1 - t) * 60

                  return (
                    <span
                      key={letter.src}
                      className="sketch-letter"
                      style={{
                        opacity: t,
                        transform: `translateY(${y}px) rotate(${rotate}deg)`,
                      }}
                    >
                      <img src={letter.src} alt={letter.char} draggable={false} />
                    </span>
                  )
                })}
              </div>

              <div className="sketch-letters-group">
                {LETTERS.slice(3).map((letter, index) => {
                  const i = index + 3
                  const start = 0.54 + i * 0.035
                  const t = easeOutCubic(range(progress, start, start + 0.16))
                  const spin = i % 2 === 0 ? 1 : -1
                  const rotate = (1 - t) * spin * 420
                  const y = (1 - t) * 60

                  return (
                    <span
                      key={letter.src}
                      className="sketch-letter"
                      style={{
                        opacity: t,
                        transform: `translateY(${y}px) rotate(${rotate}deg)`,
                      }}
                    >
                      <img src={letter.src} alt={letter.char} draggable={false} />
                    </span>
                  )
                })}
              </div>
            </div>

            <div
              className="sketch-meta"
              style={{
                opacity: clamp(
                  (1 - asideOut) * (1 - blueprintOut),
                  0,
                  0.85,
                ),
              }}
            >
              <span>Blueprint · THE BULL</span>
              <span>Scroll to reveal</span>
            </div>
          </div>
        </div>

        <div className="sketch-progress">
          <div
            className="sketch-progress-bar"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </section>
  )
}
