export default function IntroSection() {
  return (
    <section
      id="intro"
      aria-label="Intro"
      className="relative grid min-h-screen items-end overflow-hidden bg-black"
    >
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <img
          src="/banner.png"
          alt="The Bull hotpot"
          className="h-full w-full object-cover"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/50" />

        {/* CINEMATIC GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/95" />

        {/* RED GLOW */}
        <div className="pointer-events-none absolute -bottom-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#C71920]/20 blur-[120px]" />

        {/* SIDE DARKEN */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0)_35%,rgba(0,0,0,0)_65%,rgba(0,0,0,0.45)_100%)]" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 mx-auto mb-12 w-full max-w-5xl px-6 text-center text-white md:mb-20 lg:mb-24">
        {/* EYEBROW */}
        <div className="mb-6 flex items-center justify-center gap-4">
          <span className="h-px w-10 bg-[#C71920]" />

          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/65 md:text-xs">
            Authentic Hot Pot · Улаанбаатар
          </p>

          <span className="h-px w-10 bg-[#C71920]" />
        </div>

        {/* TITLE */}
        <h1 className="font-serif text-[clamp(3.7rem,11vw,8rem)] font-normal leading-[0.82] tracking-[-0.045em] text-white">
          THE
          <span className="ml-3 font-bold text-[#C71920] md:ml-5">
            BULL
          </span>
        </h1>

        {/* RED ACCENT */}
        <div className="mx-auto my-7 h-[3px] w-16 bg-[#C71920]" />

        {/* DESCRIPTION */}
        <p className="mx-auto max-w-2xl text-[15px] leading-7 text-white/75 md:text-lg md:leading-8">
          Гал дээр чанагдсан шөл, нэг ширээ, нэг баг.
          <span className="font-medium text-white"> The Bull-д ажиллах </span>
          нь зүгээр нэг ажил биш — найрсаг баг, тогтвортой орчин,
          урт хугацааны хамтын ажиллагаа.
        </p>

        {/* CTA */}

        {/* BOTTOM META */}
        <div className="mt-10 flex items-center justify-center gap-3 text-[9px] uppercase tracking-[0.3em] text-white/35">
          <span>The Bull</span>
          <span className="h-1 w-1 rounded-full bg-[#C71920]" />
          <span>People & Culture</span>
        </div>
      </div>

      {/* BOTTOM LINE */}
      <div className="absolute bottom-0 left-0 z-20 h-[3px] w-full bg-[#C71920]" />
    </section>
  )
}