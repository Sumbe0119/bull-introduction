import { useEffect, useMemo, useRef } from 'react'
import './BenefitsGallery.css'

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function smoothDamp(current, target, velocity, smoothTime, dt) {
  const st = Math.max(0.0001, smoothTime)
  const omega = 2 / st
  const x = omega * dt
  const exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x)
  let change = current - target
  const originalTo = target
  const maxDelta = 3.5 * st
  change = clamp(change, -maxDelta, maxDelta)
  const nextTarget = current - change
  const temp = (velocity + omega * change) * dt
  let nextVelocity = (velocity - omega * temp) * exp
  let output = nextTarget + (change + temp) * exp
  if (originalTo - current > 0 === output > originalTo) {
    output = originalTo
    nextVelocity = dt > 0 ? (output - originalTo) / dt : 0
  }
  return [output, nextVelocity]
}

export default function BenefitsGallery({
  images: imagesProp = [],
  eyebrow = '',
  title = '',
  subtitle,
}) {
  const sectionRef = useRef(null)
  const overlayRef = useRef(null)
  const heroRef = useRef(null)
  const heroTrackRef = useRef(null)
  const thumbsRef = useRef([])
  const targetRef = useRef(0)
  const currentRef = useRef(0)
  const velocityRef = useRef(0)
  const timeRef = useRef(0)
  const rafRef = useRef(0)
  const scrollProgressRef = useRef(0)

  const images = useMemo(
    () =>
      (imagesProp || []).map((item) =>
        typeof item === 'string' ? { src: item, alt: '' } : item,
      ),
    [imagesProp],
  )
  const maxIndex = Math.max(0, images.length - 1)
  const galleryVh = Math.max(380, images.length * 42)

  const setThumbEl = (el, index) => {
    thumbsRef.current[index] = el
  }

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      const scrollableHeight = section.offsetHeight - window.innerHeight
      if (scrollableHeight <= 0) return
      const progress = clamp(-rect.top / scrollableHeight, 0, 1)
      scrollProgressRef.current = progress
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  useEffect(() => {
    const overlay = overlayRef.current
    const hero = heroRef.current
    const track = heroTrackRef.current
    if (!overlay || !hero || !track || images.length === 0) return

    const GAP = 16
    const THUMB_GAP = 18
    timeRef.current = performance.now()

    const render = (now) => {
      const dt = clamp((now - timeRef.current) / 1000, 0, 0.032)
      timeRef.current = now

      const frameW = hero.offsetWidth
      const thumb = thumbsRef.current.find(Boolean)
      const thumbW = thumb?.offsetWidth || frameW * 0.52
      const neighborX = frameW * 0.5 + 10 + GAP + thumbW * 0.5
      const thumbStep = thumbW + THUMB_GAP

      const raw = clamp(scrollProgressRef.current, 0, 1)
      const held = raw <= 0.04 ? 0 : (raw - 0.04) / 0.96
      targetRef.current = held * maxIndex

      const [next, velocity] = smoothDamp(
        currentRef.current,
        targetRef.current,
        velocityRef.current,
        0.32,
        dt || 1 / 60,
      )
      currentRef.current = next
      velocityRef.current = velocity
      const current = currentRef.current

      for (let i = 0; i < track.children.length; i += 1) {
        const slide = track.children[i]
        slide.style.width = `${frameW}px`
        slide.style.flexBasis = `${frameW}px`
      }

      track.style.transform = `translate3d(${-current * frameW}px, 0, 0)`

      thumbsRef.current.forEach((el, index) => {
        if (!el) return
        const media = el.firstElementChild
        const dist = index - current
        const abs = Math.abs(dist)
        const dir = abs < 0.0001 ? 0 : Math.sign(dist)
        const x =
          abs <= 1
            ? dist * neighborX
            : dir * (neighborX + (abs - 1) * thumbStep)
        const opacity = clamp((abs - 0.02) / 0.14, 0, 1)

        el.style.transform = `translate3d(calc(-50% + ${x}px), -50%, 0)`
        el.style.opacity = String(opacity)
        el.style.pointerEvents = opacity > 0.25 ? 'auto' : 'none'
        el.style.zIndex = String(Math.max(1, Math.round(3 - abs)))
        if (media) media.style.transform = 'translate3d(0, 0, 0)'
      })

      rafRef.current = requestAnimationFrame(render)
    }

    rafRef.current = requestAnimationFrame(render)
    return () => cancelAnimationFrame(rafRef.current)
  }, [images.length, maxIndex])

  if (images.length === 0) return null

  return (
    <section
      ref={sectionRef}
      id="benefits-gallery"
      className="gallery-section"
      aria-label={title || eyebrow || 'Gallery'}
      style={{ height: `${galleryVh}vh` }}
    >
      <div className="gallery-pin">
        <div ref={overlayRef} className="gallery-overlay is-embedded" role="region">
          <aside className="gallery-copy">
            {eyebrow ? <p className="gallery-copy-lead">{eyebrow}</p> : null}
            {title ? (
              <h2 className="gallery-copy-title">
                {title}
                {subtitle ? <span>{subtitle}</span> : null}
              </h2>
            ) : null}
          </aside>

          <div className="gallery-stage">
            {images.map((image, index) => (
              <div
                key={`thumb-${image.src}-${index}`}
                ref={(el) => setThumbEl(el, index)}
                className="gallery-thumb"
                aria-hidden="true"
              >
                <span className="gallery-thumb-media">
                  <img src={image.src} alt="" draggable={false} />
                </span>
              </div>
            ))}

            <div className="gallery-hero">
              <div ref={heroRef} className="gallery-hero-clip">
                <div ref={heroTrackRef} className="gallery-hero-track">
                  {images.map((image, index) => (
                    <div key={`hero-${image.src}-${index}`} className="gallery-hero-slide">
                      <img src={image.src} alt={image.alt || title} draggable={false} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="gallery-hint">
            <span className="gallery-hint-icon">↓</span>
            <span>Scroll to continue</span>
          </div>
        </div>
      </div>
    </section>
  )
}
