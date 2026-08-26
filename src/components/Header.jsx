export default function Header() {
  return (
    <header className="absolute left-0 top-0 z-50 flex w-full items-center justify-between px-5 py-4 md:px-8">
      <a href="#intro" className="flex items-center gap-3 text-cream">
        <img src="/bull-log.png" alt="The Bull" className="h-9 w-9 rounded-full bg-[#0a0807] object-contain" />
        <span className="text-sm uppercase tracking-[0.14em]">
          THE <strong className="font-bold text-deep-red">BULL</strong>
        </span>
      </a>

      <nav className="flex items-center gap-5 md:gap-7">
        <a
          href="#intro"
          className="text-xs uppercase tracking-[0.08em] text-cream/80 transition-colors hover:text-cream md:text-[13px]"
        >
          Intro
        </a>
        <a
          href="#benefits"
          className="text-xs uppercase tracking-[0.08em] text-cream/80 transition-colors hover:text-cream md:text-[13px]"
        >
          Хөнгөлөлт
        </a>
        <a
          href="#sketch"
          className="text-xs uppercase tracking-[0.08em] text-cream/80 transition-colors hover:text-cream md:text-[13px]"
        >
          Sketch
        </a>
      </nav>
    </header>
  )
}
