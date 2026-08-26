'use client'

import { useEffect, useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Mousewheel, Keyboard } from 'swiper/modules'

import 'swiper/css'

export default function BenefitGallery({
  benefit,
  onClose,
}) {
  const [activeSlide, setActiveSlide] = useState(0)

  const images = benefit?.gallery || []

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const handleKey = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKey)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [onClose])

  if (!benefit) return null

  const currentImage =
    images[activeSlide] || images[0]

  return (
    <div className="gallery-overlay fixed inset-0 z-[999] overflow-hidden bg-black text-white">

      {/* ====================================================== */}
      {/* BACKGROUND IMAGE */}
      {/* ====================================================== */}

      {currentImage && (
        <div
          key={currentImage.src}
          className="gallery-background absolute inset-0"
        >
          <img
            src={currentImage.src}
            alt=""
            className="h-full w-full scale-110 object-cover"
          />

          <div className="absolute inset-0 bg-black/85" />

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/45" />

          <div className="absolute inset-0 backdrop-blur-[35px]" />
        </div>
      )}

      {/* RED AMBIENT GLOW */}
      <div className="pointer-events-none absolute -left-40 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-[#C71920]/10 blur-[160px]" />

      {/* ====================================================== */}
      {/* HEADER */}
      {/* ====================================================== */}

      <header className="absolute left-0 right-0 top-0 z-50 px-6 pt-6 md:px-10 lg:px-14 lg:pt-9">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between border-b border-white/10 pb-5">

          <div className="flex items-center gap-4">

            <span className="h-[2px] w-8 bg-[#C71920]" />

            <span className="text-[9px] font-semibold uppercase tracking-[0.32em] text-[#E1272F]">
              THE BULL / BENEFITS
            </span>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              group flex h-11 w-11
              items-center justify-center
              rounded-full
              border border-white/15
              bg-white/[0.03]
              text-xl text-white
              transition-all duration-500
              hover:rotate-90
              hover:border-[#C71920]
              hover:bg-[#C71920]
            "
            aria-label="Хаах"
          >
            ×
          </button>

        </div>
      </header>

      {/* ====================================================== */}
      {/* LEFT TEXT */}
      {/* ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute left-6 top-[120px] z-30
          hidden w-[260px]
          md:block
          lg:left-14
          lg:top-1/2
          lg:w-[330px]
          lg:-translate-y-1/2
        "
      >
        <div
          key={`${benefit.id}-${activeSlide}`}
          className="gallery-copy"
        >
          <div className="mb-5 flex items-center gap-3">

            <span className="text-[9px] font-semibold tracking-[0.3em] text-[#E1272F]">
              {benefit.number}
            </span>

            <span className="h-px w-8 bg-[#C71920]" />

            <span className="text-[8px] uppercase tracking-[0.25em] text-white/35">
              {benefit.eyebrow}
            </span>

          </div>

          <h2
            className="
              font-serif
              text-[clamp(2rem,3vw,3.8rem)]
              leading-[0.92]
              tracking-[-0.045em]
              text-white
            "
          >
            {benefit.label}
          </h2>

          <p className="mt-6 max-w-xs text-sm leading-7 text-white/50">
            {benefit.description}
          </p>

          {currentImage?.caption && (
            <div className="mt-8 border-l border-[#C71920] pl-4">
              <p className="text-[10px] uppercase leading-5 tracking-[0.16em] text-white/45">
                {currentImage.caption}
              </p>
            </div>
          )}

        </div>
      </div>

      {/* ====================================================== */}
      {/* SWIPER */}
      {/* ====================================================== */}

      <div className="absolute inset-0 z-20 flex items-center pt-16">

        <Swiper
          modules={[
            Mousewheel,
            Keyboard,
          ]}
          slidesPerView="auto"
          centeredSlides
          initialSlide={0}
          speed={1250}
          grabCursor
          keyboard={{
            enabled: true,
          }}
          mousewheel={{
            enabled: true,

            // Vertical scroll → horizontal swiper
            forceToAxis: false,

            sensitivity: 0.35,

            thresholdDelta: 8,

            // Trackpad дээр олон slide
            // шууд алгасахаас хамгаална
            thresholdTime: 850,

            releaseOnEdges: false,
          }}
          onSlideChange={(swiper) => {
            setActiveSlide(swiper.activeIndex)
          }}
          className="gallery-swiper"
        >
          {images.map((image, index) => (
            <SwiperSlide
              key={`${image.src}-${index}`}
              className="gallery-slide"
            >
              <div className="gallery-card">

                {/* FRAME */}
                <div className="gallery-frame">

                  <div className="relative h-full w-full overflow-hidden bg-[#080808]">

                    <img
                      src={image.src}
                      alt={
                        image.alt ||
                        benefit.label
                      }
                      draggable={false}
                      className="gallery-image h-full w-full object-cover"
                    />

                    {/* IMAGE SHADING */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />

                    {/* NUMBER */}
                    <span
                      className="
                        absolute
                        left-5 top-5
                        text-[9px]
                        font-semibold
                        tracking-[0.25em]
                        text-white/55
                      "
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                  </div>

                </div>

                {/* MOBILE CAPTION */}
                <div className="mt-5 block px-2 md:hidden">

                  <span className="text-[8px] uppercase tracking-[0.2em] text-[#E1272F]">
                    {benefit.number} / {benefit.eyebrow}
                  </span>

                  <h3 className="mt-2 font-serif text-2xl">
                    {benefit.label}
                  </h3>

                  {image.caption && (
                    <p className="mt-2 text-xs leading-5 text-white/45">
                      {image.caption}
                    </p>
                  )}

                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>

      {/* ====================================================== */}
      {/* BOTTOM UI */}
      {/* ====================================================== */}

      <div className="absolute bottom-0 left-0 right-0 z-50">

        <div className="mx-auto flex max-w-[1600px] items-end justify-between px-6 pb-8 md:px-10 lg:px-14">

          {/* COUNTER */}
          <div className="hidden items-end gap-3 md:flex">

            <span className="font-serif text-4xl leading-none text-white">
              {String(activeSlide + 1).padStart(2, '0')}
            </span>

            <span className="pb-1 text-[9px] tracking-[0.2em] text-white/25">
              /
              {' '}
              {String(images.length).padStart(2, '0')}
            </span>

          </div>

          {/* SCROLL INDICATOR */}
          <div className="flex items-center gap-4">

            <div className="gallery-scroll-icon flex h-8 w-8 items-center justify-center rounded-full border border-white/15">
              <span className="text-xs text-[#E1272F]">
                ↓
              </span>
            </div>

            <div>
              <span className="block text-[8px] font-semibold uppercase tracking-[0.25em] text-white/65">
                Scroll to continue
              </span>

              <span className="mt-1 block text-[8px] tracking-[0.12em] text-white/25">
                Mouse wheel / Trackpad
              </span>
            </div>

          </div>

        </div>

        {/* PROGRESS */}
        <div className="h-px bg-white/10">

          <div
            className="h-full bg-[#C71920] transition-[width] duration-700 ease-out"
            style={{
              width:
                images.length > 0
                  ? `${((activeSlide + 1) / images.length) * 100}%`
                  : '0%',
            }}
          />

        </div>

      </div>

      {/* ====================================================== */}
      {/* STYLE */}
      {/* ====================================================== */}

      <style jsx global>{`

        .gallery-swiper {
          width: 100%;
          overflow: visible !important;
        }

        /*
         * Desktop:
         * төв зураг том,
         * хажуу талын зураг хэсэгчлэн харагдана.
         */

        .gallery-slide {
          width: min(55vw, 760px) !important;
          height: min(72vh, 820px);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .gallery-card {
          width: 100%;
          height: 100%;

          transform:
            scale(0.70)
            translateY(0);

          opacity: 0.18;

          filter:
            grayscale(0.35)
            brightness(0.55);

          transition:
            transform 1250ms cubic-bezier(0.16, 1, 0.3, 1),
            opacity 1000ms ease,
            filter 1000ms ease;
        }

        /*
         * Өмнөх / дараагийн зураг
         */

        .gallery-slide.swiper-slide-prev .gallery-card,
        .gallery-slide.swiper-slide-next .gallery-card {
          transform:
            scale(0.78)
            translateY(0);

          opacity: 0.40;

          filter:
            grayscale(0.15)
            brightness(0.7);
        }

        /*
         * ACTIVE
         */

        .gallery-slide.swiper-slide-active .gallery-card {
          transform:
            scale(1)
            translateY(0);

          opacity: 1;

          filter:
            grayscale(0)
            brightness(1);
        }

        /*
         * Зургийн хэмжээ
         */

        .gallery-frame {
          position: relative;

          width: 100%;
          height: 100%;

          padding: 7px;
        }

        /*
         * Reference зураг шиг
         * гадуураа dashed frame
         */

        .gallery-slide.swiper-slide-active
        .gallery-frame::before {
          content: '';

          position: absolute;

          inset: -2px;

          border:
            1px dashed
            rgba(255, 255, 255, 0.38);

          pointer-events: none;

          animation:
            galleryFrameIn
            900ms
            cubic-bezier(0.16, 1, 0.3, 1);
        }

        /*
         * ACTIVE зураг subtle zoom
         */

        .gallery-image {
          transform: scale(1.04);

          transition:
            transform
            5s
            cubic-bezier(0.16, 1, 0.3, 1);
        }

        .gallery-slide.swiper-slide-active
        .gallery-image {
          transform: scale(1);
        }

        /*
         * Modal open
         */

        .gallery-overlay {
          animation:
            galleryOverlayIn
            650ms
            cubic-bezier(0.16, 1, 0.3, 1);
        }

        /*
         * Background зураг солигдох
         */

        .gallery-background {
          animation:
            backgroundReveal
            1200ms
            cubic-bezier(0.16, 1, 0.3, 1);
        }

        /*
         * Text animation
         */

        .gallery-copy {
          animation:
            galleryCopyReveal
            1000ms
            cubic-bezier(0.16, 1, 0.3, 1);
        }

        /*
         * Scroll indicator
         */

        .gallery-scroll-icon {
          animation:
            galleryScrollPulse
            2.4s
            ease-in-out
            infinite;
        }

        @keyframes galleryOverlayIn {

          0% {
            opacity: 0;
          }

          100% {
            opacity: 1;
          }

        }

        @keyframes backgroundReveal {

          0% {
            opacity: 0;
            transform: scale(1.08);
          }

          100% {
            opacity: 1;
            transform: scale(1);
          }

        }

        @keyframes galleryCopyReveal {

          0% {
            opacity: 0;

            transform:
              translateY(30px);

            filter:
              blur(8px);
          }

          100% {
            opacity: 1;

            transform:
              translateY(0);

            filter:
              blur(0);
          }

        }

        @keyframes galleryFrameIn {

          0% {
            opacity: 0;
            transform: scale(1.025);
          }

          100% {
            opacity: 1;
            transform: scale(1);
          }

        }

        @keyframes galleryScrollPulse {

          0%,
          100% {
            transform: translateY(0);
            opacity: 0.45;
          }

          50% {
            transform: translateY(5px);
            opacity: 1;
          }

        }

        /*
         * MOBILE
         */

        @media (max-width: 767px) {

          .gallery-slide {
            width: 82vw !important;
            height: 63vh;
          }

          .gallery-card {
            transform: scale(0.86);
          }

          .gallery-slide.swiper-slide-active
          .gallery-card {
            transform: scale(1);
          }

        }

        @media (
          prefers-reduced-motion: reduce
        ) {

          .gallery-card,
          .gallery-image,
          .gallery-overlay,
          .gallery-background,
          .gallery-copy,
          .gallery-scroll-icon {
            animation: none !important;
            transition: none !important;
          }

        }
      `}</style>

    </div>
  )
}
