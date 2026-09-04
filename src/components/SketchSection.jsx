import { useEffect, useRef, useState } from 'react'
import './SketchSection.css'

const LETTERS = [
  { src: '/new-text/text-1.png?v=2', char: 'T' },
  { src: '/new-text/text-2.png?v=2', char: 'H' },
  { src: '/new-text/text-3.png?v=2', char: 'E' },
  { src: '/new-text/text-4.png?v=2', char: 'B' },
  { src: '/new-text/text-5.png?v=2', char: 'U' },
  { src: '/new-text/text-6.png?v=2', char: 'L' },
  { src: '/new-text/text-7.png?v=2', char: 'L' },
]

const MARK_LOGO = '/new-text/main-logo.png?v=2'
const BOTTOM_TEXT = '/new-text/bottom-text.png?v=2'

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
  const start = 0.58 + word * 0.055 + Math.abs(fromCenter) * 0.026 + local * 0.018
  const raw = range(progress, start, start + 0.15)
  const t = easeOutCubic(raw)
  const punch = easeOutBack(raw)
  const settle = easeOutCubic(range(progress, start + 0.09, start + 0.2))

  const side = Math.sign(fromCenter) || (index % 2 === 0 ? -1 : 1)
  const x = (1 - t) * side * (160 + Math.abs(fromCenter) * 70)
  const y = (1 - t) * (140 + Math.abs(fromCenter) * 24)
  const z = (1 - punch) * 420
  const rotateX = (1 - t) * -85
  const rotateY = (1 - t) * -side * 55
  const rotateZ = (1 - punch) * side * (48 + Math.abs(fromCenter) * 22)
  const scale = 0.25 + punch * 0.65 + settle * 0.1
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
  const expandT = easeOutCubic(range(progress, 0.04, 0.36))

  // Phase B: fade to black (~+1s longer), then letters
  const blackIn = easeOutCubic(range(progress, 0.18, 0.52))
  const blueprintOut = easeOutCubic(range(progress, 0.2, 0.54))
  const lettersGate = easeOutCubic(range(progress, 0.54, 0.62))
  const lettersHero = easeOutCubic(range(progress, 0.58, 0.82))
  const lettersTilt = 1 - easeOutCubic(range(progress, 0.6, 0.84))
  const logoIn = easeOutCubic(range(progress, 0.56, 0.68))
  const bottomIn = easeOutCubic(range(progress, 0.74, 0.88))

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
      style={{ height: '420vh' }}
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
                  translate(-50%, -58%)
                  perspective(1200px)
                  rotateX(${lettersTilt * 18}deg)
                  scale(${1.05 + lettersHero * 0.12})
                `,
              }}
              aria-label="THE BULL"
            >
              <div className="sketch-brand">
                <div className="sketch-letters-group sketch-letters-group--the ">
                  {LETTERS.slice(0, 3).map((letter, index) => {
                    const motion = letterMotion(progress, index)

                    return (
                      <span
                        key={`new-${letter.char}-${index}`}
                        className="sketch-letter"
                        style={motion}
                      >
                        <img
                          src={letter.src}
                          alt={letter.char}
                          draggable={false}
                        />
                      </span>
                    )
                  })}
                </div>

                <div
                  className="sketch-mark-logo"
                  style={{
                    opacity: logoIn,
                    transform: `translateY(${(1 - logoIn) * -28}px) scale(${0.85 + logoIn * 0.15})`,
                  }}
                >
                  <img src={MARK_LOGO} alt="" draggable={false} />
                </div>

                <div className="sketch-brand-right">
                  <div className="sketch-letters-group sketch-letters-group--bull">
                    {LETTERS.slice(3).map((letter, index) => {
                      const i = index + 3
                      const motion = letterMotion(progress, i)

                      return (
                        <span
                          key={`new-${letter.char}-${i}`}
                          className="sketch-letter"
                          style={motion}
                        >
                          <img
                            src={letter.src}
                            alt={letter.char}
                            draggable={false}
                          />
                        </span>
                      )
                    })}
                  </div>

                  <div
                    className="sketch-bottom-text"
                    style={{
                      opacity: bottomIn,
                      transform: `translateY(${(1 - bottomIn) * 16}px)`,
                    }}
                  >
                    <img
                      src={BOTTOM_TEXT}
                      alt="Authentic Hot Pot"
                      draggable={false}
                    />
                  </div>
                </div>
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
