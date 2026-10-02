import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

type Soup = {
  id: string;
  name: string;
  image: string;
  background: string;
  description: string;
};

const SOUPS: Soup[] = [
  {
    id: 'mushroom',
    name: 'МӨӨГНИЙ ШӨЛ',
    image: '/soups/mushroom.png',
    background:
      'linear-gradient(135deg, #8f8063 0%, #b89b72 45%, #79684f 100%)',
    description: 'Мөөгний баялаг амттай халуун шөл',
  },
  {
    id: 'bone-milk',
    name: 'ЯСНЫ СҮҮН ШӨЛ',
    image: '/soups/bone-milk.png',
    background:
      'linear-gradient(135deg, #a54434 0%, #c75c45 45%, #812e27 100%)',
    description: 'Өтгөн, баялаг амттай ясны сүүн шөл',
  },
  {
    id: 'spicy',
    name: 'ХАЛУУН НОГООТОЙ ШӨЛ',
    image: '/soups/spicy.png',
    background:
      'linear-gradient(135deg, #a84d17 0%, #d37020 45%, #7e3211 100%)',
    description: 'Халуун ногооны хүчтэй амттай шөл',
  },
  {
    id: 'tungalaг',
    name: 'ТУНГАЛАГ ШӨЛ',
    image: '/soups/clear.png',
    background:
      'linear-gradient(135deg, #697156 0%, #919979 45%, #4f5840 100%)',
    description: 'Хөнгөн, тунгалаг амттай шөл',
  },
  {
    id: 'ulaан',
    name: 'УЛААН ЛООЛИЙН ШӨЛ',
    image: '/soups/tomato.png',
    background:
      'linear-gradient(135deg, #851f2c 0%, #bd3445 45%, #65141f 100%)',
    description: 'Улаан лоолийн исгэлэн, баялаг амт',
  },
  {
    id: 'bone',
    name: 'ЯСНЫ ШӨЛ',
    image: '/soups/bone.png',
    background:
      'linear-gradient(135deg, #af8136 0%, #cfaa65 45%, #8c642b 100%)',
    description: 'Удаан чанасан ясны баялаг шөл',
  },
];

export default function SoupSelector() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeSoup = SOUPS[activeIndex];

  const selectSoup = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
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

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-5 py-20">
        {/* Heading */}
        <motion.div
          className="mb-12 text-center text-white"
          layout
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.35em] text-white/60">
            The Bull
          </p>

          <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
            Та ямар шөлөнд дуртай вэ?
          </h1>

          <AnimatePresence mode="wait">
            <motion.p
              key={activeSoup.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mt-4 text-sm text-white/70 md:text-base"
            >
              {activeSoup.description}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Soup selector */}
        <div className="relative flex h-[550px] w-full max-w-[850px] items-center justify-center md:h-[650px]">
          {/* Circle lines */}
          <div className="pointer-events-none absolute h-[440px] w-[440px] rounded-full border border-white/20 md:h-[540px] md:w-[540px]" />
          <div className="pointer-events-none absolute h-[370px] w-[370px] rounded-full border border-white/15 md:h-[460px] md:w-[460px]" />

          {/* Rotating labels */}
          <motion.div
            className="absolute h-[440px] w-[440px] md:h-[540px] md:w-[540px]"
            animate={{
              rotate: -activeIndex * (360 / SOUPS.length),
            }}
            transition={{
              type: 'spring',
              stiffness: 80,
              damping: 18,
            }}
          >
            {SOUPS.map((soup, index) => {
              const angle = (360 / SOUPS.length) * index - 90;
              const radius = 50;

              return (
                <button
                  key={soup.id}
                  onClick={() => selectSoup(index)}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    transform: `
                      translate(-50%, -50%)
                      rotate(${angle}deg)
                      translateY(-${radius}%)
                    `,
                    transformOrigin: 'center',
                  }}
                >
                  <motion.div
                    animate={{
                      rotate:
                        activeIndex * (360 / SOUPS.length) - angle,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 80,
                      damping: 18,
                    }}
                    className="flex w-[150px] flex-col items-center"
                  >
                    <span
                      className={`
                        transition-all duration-300
                        ${
                          activeIndex === index
                            ? 'scale-110 text-white'
                            : 'text-white/50 hover:text-white'
                        }
                      `}
                    >
                      <span className="text-[11px] font-semibold uppercase tracking-[0.12em] md:text-sm">
                        {soup.name}
                      </span>
                    </span>

                    <motion.span
                      animate={{
                        scale: activeIndex === index ? 1 : 0,
                        opacity: activeIndex === index ? 1 : 0,
                      }}
                      className="mt-3 h-2.5 w-2.5 rounded-full bg-white"
                    />
                  </motion.div>
                </button>
              );
            })}
          </motion.div>

          {/* Main soup */}
          <div className="relative z-20 flex h-[310px] w-[310px] items-center justify-center md:h-[420px] md:w-[420px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSoup.id}
                initial={{
                  opacity: 0,
                  scale: 0.8,
                  rotate: -35,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.8,
                  rotate: 35,
                }}
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
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Current soup title */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSoup.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="mt-4 text-center text-white"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-white/50">
              Selected
            </span>

            <h2 className="mt-2 text-2xl font-semibold md:text-4xl">
              {activeSoup.name}
            </h2>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}