import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { useEffect, useState, type CSSProperties } from 'react';
import './Soups.css';

type Soup = {
  id: string;
  name: string;
  image: string;
  /** Аяганы төв зурган дээр (0–1). Тогоог дугуйн яг голд байрлуулахад хэрэглэнэ */
  center: [number, number];
  background: string;
  description: string;
};

const SOUPS: Soup[] = [
  {
    id: 'mushroom',
    name: 'МӨӨГНИЙ ШӨЛ',
    image: '/soups/mushroom.png',
    center: [0.5055, 0.4924],
    background:
      'linear-gradient(135deg, #8f8063 0%, #b89b72 45%, #79684f 100%)',
    description: 'Мөөгний баялаг амттай халуун шөл',
  },
  {
    id: 'bone-milk',
    name: 'ЯСНЫ СҮҮН ШӨЛ',
    image: '/soups/bone-milk.png',
    center: [0.4925, 0.4962],
    background:
      'linear-gradient(135deg, #a54434 0%, #c75c45 45%, #812e27 100%)',
    description: 'Өтгөн, баялаг амттай ясны сүүн шөл',
  },
  {
    id: 'spicy',
    name: 'ХАЛУУН НОГООТОЙ ШӨЛ',
    image: '/soups/spicy.png',
    center: [0.4979, 0.5065],
    background:
      'linear-gradient(135deg, #a84d17 0%, #d37020 45%, #7e3211 100%)',
    description: 'Халуун ногооны хүчтэй амттай шөл',
  },
  {
    id: 'clear',
    name: 'ТУНГАЛАГ ШӨЛ',
    image: '/soups/clear.png',
    center: [0.48, 0.4858],
    background:
      'linear-gradient(135deg, #697156 0%, #919979 45%, #4f5840 100%)',
    description: 'Хөнгөн, тунгалаг амттай шөл',
  },
  {
    id: 'tomato',
    name: 'УЛААН ЛООЛИЙН ШӨЛ',
    image: '/soups/tomato.png',
    center: [0.4758, 0.4823],
    background:
      'linear-gradient(135deg, #851f2c 0%, #bd3445 45%, #65141f 100%)',
    description: 'Улаан лоолийн исгэлэн, баялаг амт',
  },
  {
    id: 'bone',
    name: 'ЯСНЫ ШӨЛ',
    image: '/soups/bone.png',
    center: [0.4726, 0.4976],
    background:
      'linear-gradient(135deg, #af8136 0%, #cfaa65 45%, #8c642b 100%)',
    description: 'Удаан чанасан ясны баялаг шөл',
  },
  {
    id: 'nourishing',
    name: 'ТЭЖЭЭЛЛЭГ ШӨЛ',
    image: '/soups/zipu.png',
    center: [0.4908, 0.5144],
    background:
      'linear-gradient(135deg, #7d6a35 0%, #a08a4a 45%, #5e4f26 100%)',
    description: 'Годжи жимс, эрдэнэт ургамлаар баяжуулсан тэжээллэг шөл',
  },
  {
    id: 'white',
    name: 'ЦАГААН ШӨЛ',
    image: '/soups/four.png',
    center: [0.4879, 0.4937],
    background:
      'linear-gradient(135deg, #b88c6a 0%, #d4a983 45%, #8f6a4e 100%)',
    description: 'Годжи жимс, яншуйтай зөөлөн амттай цагаан шөл',
  },
];

const STEP = 360 / SOUPS.length;

// Зургууд 16:9, тогоо нь 1.7 дахин томруулагдсан
const POT_SCALE = 1.7;
const IMAGE_RATIO = 1080 / 1920;

// Аяганы төвийг хайрцгийн төвд шилжүүлэх transform
const potTransform = ([x, y]: [number, number]) =>
  `scale(${POT_SCALE}) translate(${(0.5 - x) * 100}%, ${(0.5 - y) * IMAGE_RATIO * 100}%)`;

const mod = (n: number, m: number) => ((n % m) + m) % m;

// Тогоо дугуйтай ижил чиглэлд эргэж орж, гарна
const potVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, scale: 0.8, rotate: 35 * dir }),
  center: { opacity: 1, scale: 1, rotate: 0 },
  exit: (dir: number) => ({ opacity: 0, scale: 0.8, rotate: -35 * dir }),
};

export default function SoupSelector() {
  // turn нь хязгааргүй өсөж/буурна. Дугуй үргэлж хамгийн богино замаар эргэнэ
  const [turn, setTurn] = useState(0);
  const [direction, setDirection] = useState(1);
  const activeIndex = mod(turn, SOUPS.length);

  const activeSoup = SOUPS[activeIndex];

  // Шилжих үед зураг хоосон харагдахгүйн тулд бүх зургийг урьдчилан ачаална
  useEffect(() => {
    SOUPS.forEach((soup) => {
      const img = new Image();
      img.src = soup.image;
    });
  }, []);

  const selectSoup = (index: number) => {
    const n = SOUPS.length;
    let delta = mod(index - activeIndex, n);
    if (delta > n / 2) delta -= n;
    if (delta === 0) return;
    setDirection(Math.sign(delta));
    setTurn((t) => t + delta);
  };

  return (
    <section id="soups" className="relative h-svh overflow-hidden">
      {/* Background */}
      <AnimatePresence mode="sync">
        <motion.div
          key={activeSoup.id}
          className="absolute inset-0"
          style={{
            background: activeSoup.background,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </AnimatePresence>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col px-5 pb-5 pt-[calc(var(--site-header-h)+0.5rem)] lg:flex-row lg:items-center lg:gap-6 lg:px-10 lg:pb-8">
        {/* Copy: heading + selected soup */}
        <div className="shrink-0 text-center text-white lg:w-[300px] lg:text-left">
          <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.35em] text-white/60 md:text-xs">
            The Bull
          </p>

          <h1 className="text-2xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            Үндсэн шөлний цэс
          </h1>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSoup.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mt-2 lg:mt-10"
            >
              <h2 className="hidden text-4xl font-semibold lg:mt-2 lg:block">
                {activeSoup.name}
              </h2>
              <p className="text-sm text-white/70 md:text-base lg:mt-4">
                {activeSoup.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Soup selector: sized from the space that is left (see Soups.css) */}
        <div className="soup-stage relative min-h-0 w-full flex-1 lg:h-full">
          <div className="soup-ring absolute inset-0 flex items-center justify-center">
            {/* Circle lines */}
            <div className="soup-line-outer pointer-events-none absolute rounded-full border border-white/20" />
            <div className="soup-line-inner pointer-events-none absolute rounded-full border border-white/15" />

            {/* Rotating labels (zero-size box at the centre, rotated as a whole) */}
            <motion.div
              className="absolute left-1/2 top-1/2 z-30 h-0 w-0"
              animate={{
                rotate: -turn * STEP,
              }}
              transition={{
                type: 'spring',
                stiffness: 80,
                damping: 18,
              }}
            >
              {SOUPS.map((soup, index) => {
                // 0deg = дээд тал. Идэвхтэй шөл үргэлж дээд талд ирнэ
                const angle = STEP * index;
                const isActive = activeIndex === index;

                return (
                  <button
                    key={soup.id}
                    type="button"
                    onClick={() => selectSoup(index)}
                    aria-label={soup.name}
                    aria-pressed={isActive}
                    className="soup-label-pos absolute left-0 top-0 cursor-pointer rounded-full px-1 py-1 outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                    style={{ '--angle': `${angle}deg` } as CSSProperties}
                  >
                    <motion.div
                      animate={{
                        rotate: turn * STEP - angle,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 80,
                        damping: 18,
                      }}
                      className="soup-label flex flex-col items-center"
                    >
                      <span
                        className={`transition-all duration-300 ${isActive ? 'scale-110 text-white' : 'text-white/50 hover:text-white'
                          }`}
                      >
                        <span className="text-[9px] font-semibold uppercase tracking-[0.08em] md:text-sm md:tracking-[0.12em]">
                          {soup.name}
                        </span>
                      </span>

                      <motion.span
                        animate={{
                          scale: isActive ? 1 : 0,
                          opacity: isActive ? 1 : 0,
                        }}
                        className="mt-2 h-2 w-2 rounded-full bg-white md:mt-3 md:h-2.5 md:w-2.5"
                      />
                    </motion.div>
                  </button>
                );
              })}
            </motion.div>

            {/* Main soup */}
            <div className="soup-pot pointer-events-none relative z-20 flex items-center justify-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeSoup.id}
                  custom={direction}
                  variants={potVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute inset-0"
                >
                  <img
                    src={activeSoup.image}
                    alt={activeSoup.name}
                    className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_35px_45px_rgba(0,0,0,0.3)]"
                    style={{ transform: potTransform(activeSoup.center) }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
