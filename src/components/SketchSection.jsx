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

function easeOutBack(t) {
  const c1 = 1.70158
  const c3 = c1 + 1
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2
}

function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - 2 ** (-10 * t)
}

function letterMotion(progress, index) {
  const word = index < 3 ? 0 : 1
  const local = word === 0 ? index : index - 3
  const fromCenter = local - (word === 0 ? 1 : 1.5)
  // Longer, readable entrance — staggered letter by letter
  const start = 0.48 + word * 0.06 + Math.abs(fromCenter) * 0.028 + local * 0.02
  const raw = range(progress, start, start + 0.16)
  const t = easeOutCubic(raw)
  const punch = easeOutBack(raw)
  const settle = easeOutCubic(range(progress, start + 0.1, start + 0.22))

  const side = Math.sign(fromCenter) || (index % 2 === 0 ? -1 : 1)
  const x = (1 - t) * side * (160 + Math.abs(fromCenter) * 70)
  const y = (1 - t) * (140 + Math.abs(fromCenter) * 24)
  const z = (1 - punch) * 420
  const rotateX = (1 - t) * -85
  const rotateY = (1 - t) * -side * 55
  const rotateZ = (1 - punch) * side * (48 + Math.abs(fromCenter) * 22)
  const scale = 0.2 + punch * 0.85 + settle * 0.1
  const blur = (1 - t) * 22
  const glow = t * (0.45 + settle * 0.55)
  const opacity = clamp(easeOutCubic(range(progress, start, start + 0.1)) * 1.2, 0, 1)

  return {
    opacity,
    transform: `
      translate3d(${x}px, ${y}px, ${z}px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      rotateZ(${rotateZ}deg)
      scale(${scale})
    `,
    filter: `blur(${blur}px) brightness(${0.55 + glow})`,
    zIndex: Math.round(10 + t * 10 - Math.abs(fromCenter)),
  }
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

  // Phase A: box expands left + aside exits
  const expandT = easeOutCubic(range(progress, 0.04, 0.4))

  // Phase B: black, then readable letter entrance, short hold after
  const blackIn = easeOutCubic(range(progress, 0.22, 0.42))
  const blueprintOut = easeOutCubic(range(progress, 0.24, 0.44))
  // Container stays visible — individual letters drive the animation
  const lettersGate = easeOutCubic(range(progress, 0.44, 0.5))
  const lettersHero = easeOutCubic(range(progress, 0.5, 0.78))
  const lettersTilt = 1 - easeOutCubic(range(progress, 0.52, 0.8))

  const asideOpacity = 1 - expandT
  const asideX = expandT * -120

  const frameWidth = `${(5 / 9 + expandT * (4 / 9)) * 100}vw`
  const blueprintOpacity = 1 - blueprintOut
  const glow = (0.55 + expandT * 0.15) * (1 - blackIn * 0.85) * (1 - blueprintOut * 0.7)

  return (
    <section
      ref={sectionRef}
      id="sketch"
      className="sketch-section"
      style={{ height: '320vh' }}
    >
      <div
        className="sketch-sticky"
        style={{ '--sketch-black': String(blackIn) }}
      >
        <div className="sketch-layout">
          <aside
            className="sketch-copy"
            style={{
              opacity: asideOpacity,
              transform: `translateX(${asideX}%)`,
              pointerEvents: asideOpacity < 0.05 ? 'none' : 'auto',
            }}
            aria-hidden={asideOpacity < 0.05}
          >
            <h2 className="sketch-heading">
              The Bull
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
                width: frameWidth,
              }}
            >
              <img
                src="/main-right-side.jpg"
                alt="The Bull restaurant"
                className="sketch-image sketch-image--blueprint"
                draggable={false}
              />
            </div>

            <div
              className="sketch-blackout"
              style={{ opacity: blackIn }}
              aria-hidden="true"
            />

            <div
              className="sketch-letters sketch-letters--hero"
              style={{
                opacity: lettersGate,
                transform: `
                  translate(-50%, -50%)
                  perspective(1200px)
                  rotateX(${lettersTilt * 18}deg)
                  scale(${0.88 + lettersHero * 0.12})
                `,
              }}
              aria-label="THE BULL"
            >
              <div className="sketch-letters-group">
                {LETTERS.slice(0, 3).map((letter, index) => {
                  const motion = letterMotion(progress, index)

                  return (
                    <span
                      key={letter.src}
                      className="sketch-letter"
                      style={motion}
                    >
                      <img src={letter.src} alt={letter.char} draggable={false} />
                    </span>
                  )
                })}
              </div>

              <div className="sketch-letters-group">
                {LETTERS.slice(3).map((letter, index) => {
                  const motion = letterMotion(progress, index + 3)

                  return (
                    <span
                      key={letter.src}
                      className="sketch-letter"
                      style={motion}
                    >
                      <img src={letter.src} alt={letter.char} draggable={false} />
                    </span>
                  )
                })}
              </div>
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
