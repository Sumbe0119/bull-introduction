import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Зургуудыг public/managers/ хавтаст ижил нэрээр хийнэ
type Manager = {
  id: string;
  name: string;
  role: string;
  quote: string;
  image: string;
};

const MANAGERS: Manager[] = [
  {
    id: 'general-manager',
    name: 'Нэр Овог',
    role: 'Ерөнхий менежер',
    quote: 'Зочин бүрт The Bull-ийн халуун дулаан уур амьсгалыг мэдрүүлэх нь бидний үүрэг.',
    image: '/managers/01.jpg',
  },
  {
    id: 'head-chef',
    name: 'Нэр Овог',
    role: 'Гүйцэтгэх тогооч',
    quote: 'Хоол бүр шинэхэн орц, тэвчээр, хайрын үр дүн байх ёстой.',
    image: '/managers/02.jpg',
  },
  {
    id: 'operations',
    name: 'Нэр Овог',
    role: 'Үйл ажиллагааны менежер',
    quote: 'Сайн систем сайн үйлчилгээг төрүүлдэг.',
    image: '/managers/03.jpg',
  },
  {
    id: 'service',
    name: 'Нэр Овог',
    role: 'Үйлчилгээний менежер',
    quote: 'Инээмсэглэл бол бидний анхны хоол.',
    image: '/managers/04.jpg',
  },
  {
    id: 'kitchen',
    name: 'Нэр Овог',
    role: 'Гал тогооны менежер',
    quote: 'Цэвэр гал тогоо, тод амт.',
    image: '/managers/05.jpg',
  },
  {
    id: 'hr',
    name: 'Нэр Овог',
    role: 'Хүний нөөцийн менежер',
    quote: 'Ажилтнуудаа урамшуулж, хамт өсөхийг эрхэмлэнэ.',
    image: '/managers/06.jpg',
  },
  {
    id: 'bar',
    name: 'Нэр Овог',
    role: 'Барын менежер',
    quote: 'Уух зүйл бүр түүхтэй.',
    image: '/managers/07.jpg',
  },
  {
    id: 'marketing',
    name: 'Нэр Овог',
    role: 'Маркетингийн менежер',
    quote: 'The Bull-ийн түүхийг хотод түгээнэ.',
    image: '/managers/08.jpg',
  },
];

export default function ManagersSection() {
  const [active, setActive] = useState(0);
  const current = MANAGERS[active];

  return (
    <section
      id="managers"
      className="relative min-h-screen overflow-hidden bg-[#070605] text-white"
    >
      {/* Background glow from active manager photo */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0 scale-110 bg-cover bg-center blur-3xl"
          style={{ backgroundImage: `url(${current.image})` }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-black/80" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-[38%] bg-gradient-to-l from-[#C71920]/[0.08] to-transparent" />

      {/* HEADER */}
      <div className="absolute left-0 right-0 top-[var(--site-header-h)] z-30 px-5 pt-4 md:px-8 lg:px-10">
        <div className="flex items-start justify-between border-b border-white/20 pb-5">
          <div className="flex items-center gap-4">
            <span className="h-[2px] w-8 bg-[#C71920]" />
            <span className="text-[9px] font-semibold uppercase tracking-[0.35em] text-[#FF3B42] md:text-[10px]">
              People & Culture / Management
            </span>
          </div>
          <span className="text-[9px] tracking-[0.18em] text-white/50">
            {String(active + 1).padStart(2, '0')} / {String(MANAGERS.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      <div className="relative z-10 flex min-h-screen flex-col gap-10 px-5 pb-16 pt-36 md:px-8 lg:flex-row lg:items-center lg:gap-8 lg:px-10 lg:pt-32">
        {/* LEFT — active manager info */}
        <div className="flex w-full flex-col justify-center lg:w-[28%] lg:shrink-0">
          <h2 className="font-serif text-[clamp(2rem,3.6vw,3.25rem)] leading-[0.95] tracking-[-0.04em]">
            Манай
            <span className="block italic text-[#FF3B42]">менежерүүд</span>
          </h2>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35 }}
              className="mt-8 border-t border-white/20 pt-6"
            >
              <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white/60">
                {current.role}
              </span>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
                {current.name}
              </h3>
              <p className="mt-5 max-w-sm text-sm leading-7 text-white/75 md:text-base">
                “{current.quote}”
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT — fanned photo cards */}
        <div className="flex flex-1 items-center overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex h-[560px] items-center md:h-[660px]">
            {MANAGERS.map((manager, index) => {
              const isActive = index === active;

              return (
                <motion.button
                  key={manager.id}
                  type="button"
                  layout
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  aria-label={`${manager.name}, ${manager.role}`}
                  aria-pressed={isActive}
                  animate={{
                    width: isActive ? 320 : 140,
                    height: isActive ? 620 : 540,
                    opacity: isActive ? 1 : 0.65,
                  }}
                  transition={{ type: 'spring', stiffness: 180, damping: 22 }}
                  className="group relative -ml-[26px] shrink-0 cursor-pointer overflow-hidden bg-neutral-900 first:ml-0 [clip-path:polygon(18%_0,100%_0,82%_100%,0_100%)]"
                >
                  <motion.img
                    src={manager.image}
                    alt={manager.name}
                    animate={{ scale: isActive ? 1.08 : 1 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />

                  <div
                    className={`absolute inset-0 transition-all duration-500 ${
                      isActive ? 'bg-black/10' : 'bg-black/45 group-hover:bg-black/25'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20" />

                  {/* name + role at bottom */}
                  <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-8 pb-10 text-center">
                    <motion.span
                      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 6 }}
                      className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#FF3B42] md:text-[10px]"
                    >
                      {manager.role}
                    </motion.span>
                    <motion.h4
                      animate={{ opacity: isActive ? 1 : 0.85, scale: isActive ? 1 : 0.9 }}
                      className="mt-2 max-w-[220px] text-sm font-semibold leading-tight tracking-wide text-white md:text-lg"
                    >
                      {manager.name}
                    </motion.h4>
                    {isActive && <span className="mt-4 block h-[2px] w-9 bg-[#C71920]" />}
                  </div>

                  {isActive && (
                    <motion.div
                      layoutId="activeManagerBorder"
                      className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[#C71920]/60"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
