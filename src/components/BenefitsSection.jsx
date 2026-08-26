import { useEffect, useRef, useState } from "react";
import BenefitsGallery from "./BenefitsGallery";
import "./BenefitsSection.css";

const BENEFIT_ITEMS = [
  {
    id: "new-employee",
    number: "01",
    label: "Шинэ ажилтны урамшуулал",
    short: "12 САР",
    eyebrow: "NEW EMPLOYEE REWARD",
    title: "Шинэ ажилтны\nурамшуулал",
    description:
      "Шинээр ажилд орсон ажилтны тогтвортой ажиллах хүсэл эрмэлзэл, байгууллагатай урт хугацаанд хамтран ажиллах оролцоог дэмжинэ.",
    highlight: "500,000₮",
    highlightLabel: "Нэг удаагийн урамшуулал",
    extra: "Компанид 12 сар тасралтгүй, тогтвортой ажилласан ажилтанд 500,000₮-ийн урамшуулал олгоно.",

    gallery: [
      {
        src: "/benefits/best/01.jpg",
        caption: "The Bull-д шинэ ажилтнаар нэгдэж, багийн нэг хэсэг болно.",
      },
      {
        src: "/benefits/best/02.jpg",
        caption: "12 сар тасралтгүй, тогтвортой ажилласан байх шаардлагатай.",
      },
      {
        src: "/benefits/best/03.jpg",
        caption: "Нөхцөлийг хангасан ажилтанд 500,000₮-ийн нэг удаагийн урамшуулал олгоно.",
      },
    ],
  },

  {
    id: "long-service",
    number: "02",
    label: "Удаан жилийн нэмэгдэл",
    short: "1 ЖИЛ +",
    eyebrow: "LONG SERVICE BENEFIT",
    title: "Удаан жилийн\nнэмэгдэл",
    description:
      "Компанид тогтвортой, урт хугацаанд ажилласан ажилтны туршлага, хувь нэмрийг үнэлж ажилласан жилээс нь хамааруулан сар бүрийн нэмэгдэл олгоно.",
    highlight: "50,000₮",
    highlightLabel: "Жил тутмын сарын нэмэгдэл",
    extra: "Ажилласан 1 жил тутамд сарын цалин дээр 50,000₮-ийн нэмэгдэл тооцогдоно.",

    values: [
      ["1 жил", "50,000₮"],
      ["3 жил", "150,000₮"],
      ["5 жил", "250,000₮"],
      ["10 жил", "500,000₮"],
    ],

    gallery: [
      {
        src: "/benefits/performance/01.jpg",
        caption: "1 жил ажилласан ажилтанд сар бүр 50,000₮ нэмэгдэнэ.",
      },
      {
        src: "/benefits/performance/02.jpg",
        caption: "3 жил ажилласан ажилтанд сар бүр 150,000₮ нэмэгдэнэ.",
      },
      {
        src: "/benefits/performance/03.jpg",
        caption: "5 жил ажилласан ажилтанд сар бүр 250,000₮ нэмэгдэнэ.",
      },
      {
        src: "/benefits/performance/04.jpg",
        caption: "10 жил ажилласан ажилтанд сар бүр 500,000₮ нэмэгдэнэ.",
      },
    ],
  },

  {
    id: "professional-grade",
    number: "03",
    label: "Мэргэжлийн зэргийн нэмэгдэл",
    short: "I · II · III",
    eyebrow: "PROFESSIONAL GRADE",
    title: "Мэргэжлийн зэргийн\nнэмэгдэл",
    description:
      "Ажилтны мэргэжлийн ур чадварыг тасралтгүй хөгжүүлэх зорилгоор тогооч, зөөгч нарыг мэргэжлийн сургалт, үнэлгээнд хамруулж зэрэг ахих боломжийг бүрдүүлнэ.",
    highlight: "100,000₮",
    highlightLabel: "I зэргийн сарын нэмэгдэл",
    extra: "Мэргэжлийн шалгалтад тэнцэж зэрэг авсан ажилтанд тухайн зэргээс хамааран сар бүр нэмэгдэл олгоно.",

    values: [
      ["I зэрэг", "100,000₮"],
      ["II зэрэг", "75,000₮"],
      ["III зэрэг", "50,000₮"],
    ],

    gallery: [
      {
        src: "/benefits/professional/01.jpg",
        caption: "Ажилтнууд мэргэжлийн сургалт, ур чадварын хөгжлийн хөтөлбөрт хамрагдана.",
      },
      {
        src: "/benefits/professional/02.jpg",
        caption: "I зэрэг — сарын 100,000₮ нэмэгдэл.",
      },
      {
        src: "/benefits/professional/03.jpg",
        caption: "II зэрэг — сарын 75,000₮ нэмэгдэл.",
      },
      {
        src: "/benefits/professional/04.jpg",
        caption: "III зэрэг — сарын 50,000₮ нэмэгдэл.",
      },
    ],
  },

  {
    id: "performance",
    number: "04",
    label: "Манлай, Шилдэг, Сайн ажилтны нэмэгдэл",
    short: "20 · 15 · 10%",
    eyebrow: "PERFORMANCE RECOGNITION",
    title: "Манлай, Шилдэг, Сайн\nажилтны нэмэгдэл",
    description:
      "Жил бүр ажилтнуудын мэдлэг, ур чадвар, ажлын гүйцэтгэлийг нэгдсэн үнэлгээгээр тодорхойлж, өндөр үр дүн үзүүлсэн ажилтнуудыг Манлай, Шилдэг, Сайн ажилтнаар шалгаруулна.",
    highlight: "20%",
    highlightLabel: "Манлай ажилтны нэмэгдэл",
    extra: "Шалгарсан ажилтан бүтэн жилийн хугацаанд үндсэн цалингийн 10–20 хувийн нэмэгдэл авах боломжтой.",

    values: [
      ["Манлай · 1–5%", "20%"],
      ["Шилдэг · 6–10%", "15%"],
      ["Сайн · 11–20%", "10%"],
    ],

    gallery: [
      {
        src: "/benefits/best/01.jpg",
        caption: "Ур чадварын нэгдсэн үнэлгээгээр ажилтнуудын гүйцэтгэлийг үнэлнэ.",
      },
      {
        src: "/benefits/best/02.jpg",
        caption: "Манлай ажилтан — үндсэн цалингийн 20%-ийн нэмэгдэл.",
      },
      {
        src: "/benefits/best/03.jpg",
        caption: "Шилдэг ажилтан — үндсэн цалингийн 15%-ийн нэмэгдэл.",
      },
      {
        src: "/benefits/best/04.jpg",
        caption: "Сайн ажилтан — үндсэн цалингийн 10%-ийн нэмэгдэл.",
      },
    ],
  },

  {
    id: "best",
    number: "05",
    label: "Жилийн шилдэг ажилтан",
    short: "BEST",
    eyebrow: "EMPLOYEE OF THE YEAR",
    title: "Жилийн шилдэг\nажилтан",
    description:
      "Жилийн турш тогтвортой өндөр гүйцэтгэл үзүүлж, баг болон байгууллагын үр дүнд бодит хувь нэмэр оруулсан ажилтны хөдөлмөрийг онцлон үнэлнэ.",
    highlight: "BEST",
    highlightLabel: "Жилийн онцлох үнэлгээ",
    extra: "Ажлын үр дүн, оролцоо, манлайлал болон байгууллагад оруулсан хувь нэмрийг үндэслэн шалгаруулна.",

    gallery: [
      {
        src: "/benefits/performance/01.jpg",
        caption: "Жилийн турш гаргасан ажлын үр дүнг үнэлнэ.",
      },
      {
        src: "/benefits/performance/02.jpg",
        caption: "Багийн хөгжилд оруулсан хувь нэмэр, манлайллыг үнэлнэ.",
      },
      {
        src: "/benefits/performance/03.jpg",
        caption: "Жилийн шилдэг ажилтныг онцгойлон урамшуулна.",
      },
    ],
  },

  {
    id: "agu",
    number: "06",
    label: "АГҮ-ийн тэргүүлэгч",
    short: "TOP",
    eyebrow: "TOP PERFORMANCE",
    title: "АГҮ-ийн\nтэргүүлэгч",
    description:
      "Ажлын гүйцэтгэлийн үнэлгээгээр тогтмол өндөр үр дүн үзүүлж, зорилгоо амжилттай биелүүлсэн ажилтны гүйцэтгэлийг бодитоор үнэлнэ.",
    highlight: "TOP",
    highlightLabel: "Гүйцэтгэлийн тэргүүлэгч",
    extra: "Үр дүн, бүтээмж, хариуцлага болон ажлын чанарт тулгуурлан тэргүүлэгч ажилтныг тодорхойлно.",

    gallery: [
      {
        src: "/benefits/professional/01.jpg",
        caption: "Ажлын зорилт болон гүйцэтгэлийг бодит үр дүнгээр үнэлнэ.",
      },
      {
        src: "/benefits/professional/02.jpg",
        caption: "Тогтвортой өндөр үзүүлэлттэй ажилтнуудыг онцолно.",
      },
      {
        src: "/benefits/professional/03.jpg",
        caption: "Үр дүн, бүтээмж, хариуцлага, ажлын чанарыг харгалзан үнэлнэ.",
      },
    ],
  },

  {
    id: "trainer",
    number: "07",
    label: "Сургагч багшийн нэмэгдэл",
    short: "TRAINER",
    eyebrow: "TRAINER BENEFIT",
    title: "Сургагч багшийн\nнэмэгдэл",
    description:
      "Байгууллагын мэдлэг, туршлагыг дараагийн ажилтанд зөв дамжуулж, шинэ ажилтныг богино хугацаанд дадлагажуулахад хувь нэмэр оруулсан ажилтны хөдөлмөрийг үнэлнэ.",
    highlight: "TRAINER",
    highlightLabel: "Мэдлэг түгээх урамшуулал",
    extra: "Шинэ ажилтан сургах, дадлагажуулах болон багийн ур чадварын хөгжлийг дэмжсэн ажилтанд нэмэгдэл олгоно.",

    gallery: [
      {
        src: "/benefits/best/01.jpg",
        caption: "Шинэ ажилтныг ажлын байранд сургаж, дадлагажуулна.",
      },
      {
        src: "/benefits/best/02.jpg",
        caption: "Туршлага, мэдлэгээ бусад ажилтантай хуваалцана.",
      },
      {
        src: "/benefits/best/03.jpg",
        caption: "Багийн нийт ур чадварын хөгжлийг дэмжсэн сургагч багшийн хөдөлмөрийг үнэлнэ.",
      },
    ],
  },
];

export default function BenefitsSection() {
  const sectionRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Gallery зөвхөн "Зургаар дэлгэрэнгүй үзэх" товчоор нээгдэнэ
  const [galleryBenefit, setGalleryBenefit] = useState(null);

  const active = BENEFIT_ITEMS[activeIndex];

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;

      if (!section) return;

      const rect = section.getBoundingClientRect();

      const scrollableHeight = section.offsetHeight - window.innerHeight;

      if (scrollableHeight <= 0) return;

      const currentProgress = Math.min(1, Math.max(0, -rect.top / scrollableHeight));

      setProgress(currentProgress);

      const nextIndex = Math.min(BENEFIT_ITEMS.length - 1, Math.floor(currentProgress * BENEFIT_ITEMS.length));

      setActiveIndex(nextIndex);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);

      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const goToBenefit = (index) => {
    const section = sectionRef.current;

    if (!section) return;

    const sectionTop = window.scrollY + section.getBoundingClientRect().top;

    const scrollableHeight = section.offsetHeight - window.innerHeight;

    const targetProgress = index / BENEFIT_ITEMS.length + 0.01;

    window.scrollTo({
      top: sectionTop + scrollableHeight * targetProgress,

      behavior: "smooth",
    });
  };

  const openGallery = () => {
    setGalleryBenefit(active);
  };

  const closeGallery = () => {
    setGalleryBenefit(null);
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="benefits"
        className="relative bg-black text-white"
        style={{
          height: `${BENEFIT_ITEMS.length * 95 + 100}vh`,
        }}
      >
        <div className="sticky top-0 h-screen overflow-hidden bg-black">
          {/* BACKGROUND */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.035]" />

            <div className="absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04]" />

            <div className="absolute left-[20%] top-[38%] h-[450px] w-[450px] rounded-full bg-[#C71920]/10 blur-[150px]" />

            <div className="absolute right-0 top-0 h-full w-[45%] bg-gradient-to-l from-[#C71920]/[0.045] to-transparent" />
          </div>

          {/* HEADER */}
          <div className="absolute left-0 right-0 top-0 z-30 px-6 pt-7 md:px-10 lg:px-14 lg:pt-10">
            <div className="mx-auto flex max-w-[1500px] items-start justify-between border-b border-white/10 pb-5">
              <div className="flex items-center gap-4">
                <span className="h-[2px] w-8 bg-[#C71920]" />

                <span className="text-[9px] font-semibold uppercase tracking-[0.35em] text-[#E1272F] md:text-[10px]">
                  People & Culture / Rewards
                </span>
              </div>

              <div className="hidden text-[9px] uppercase tracking-[0.28em] text-white/35 md:block">
                Scroll to discover
              </div>
            </div>
          </div>

          {/* MAIN */}
          <div className="relative z-10 mx-auto grid h-full max-w-[1600px] items-center px-5 pt-20 md:px-10 lg:grid-cols-[58%_42%] lg:px-14">
            {/* ================================================= */}
            {/* LEFT ORBIT */}
            {/* ================================================= */}

            <div className="relative flex h-[54vh] items-center justify-center lg:h-[78vh]">
              {/* OUTER CIRCLE */}
              <div className="pointer-events-none absolute h-[clamp(290px,42vw,600px)] w-[clamp(290px,42vw,600px)] rounded-full border border-white/10" />

              {/* INNER CIRCLE */}
              <div className="pointer-events-none absolute h-[clamp(210px,30vw,430px)] w-[clamp(210px,30vw,430px)] rounded-full border border-dashed border-white/[0.055]" />

              {/* CENTER */}
              <div className="absolute z-20 flex h-36 w-36 flex-col items-center justify-center rounded-full border border-white/10 bg-black text-center shadow-[0_0_100px_rgba(0,0,0,1)] md:h-48 md:w-48">
                <span className="mb-3 text-[8px] font-semibold uppercase tracking-[0.35em] text-[#E1272F] md:text-[9px]">
                  THE BULL
                </span>

                <h3 className="font-serif text-xl leading-[0.95] tracking-[-0.04em] md:text-3xl">
                  Нэмэгдэл
                  <span className="block italic text-[#E1272F]">& урамшуулал</span>
                </h3>

                <div className="mt-4 flex items-center gap-2">
                  <span className="h-px w-5 bg-white/20" />

                  <span className="text-[8px] tracking-[0.18em] text-white/35">
                    {String(activeIndex + 1).padStart(2, "0")}
                    {" / "}
                    {String(BENEFIT_ITEMS.length).padStart(2, "0")}
                  </span>

                  <span className="h-px w-5 bg-white/20" />
                </div>
              </div>

              {/* ================================================= */}
              {/* ROTATING BENEFITS */}
              {/* ================================================= */}

              <div className="orbit-ring absolute inset-0">
                {BENEFIT_ITEMS.map((item, index) => {
                  const angle = (360 / BENEFIT_ITEMS.length) * index;

                  const isActive = activeIndex === index;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      /*
                       * ЭНЭ ДЭЭР GALLERY НЭЭГДЭХГҮЙ.
                       * Зөвхөн тухайн benefit рүү scroll хийнэ.
                       */
                      onClick={() => goToBenefit(index)}
                      aria-label={item.label}
                      className="orbit-anchor absolute left-1/2 top-1/2"
                      style={{
                        transform: `
                            rotate(${angle}deg)
                            translateX(
                              clamp(
                                145px,
                                20vw,
                                300px
                              )
                            )
                          `,
                      }}
                    >
                      <div
                        style={{
                          transform: `rotate(-${angle}deg)`,
                        }}
                      >
                        <div className="orbit-counter">
                          <div
                            className={`
                                relative
                                flex
                                items-center
                                justify-center
                                rounded-full
                                border
                                transition-all
                                duration-[900ms]

                                ${
                                  isActive
                                    ? `
                                      h-32 w-32
                                      border-[#E1272F]
                                      bg-[#C71920]
                                      shadow-[0_0_70px_rgba(199,25,32,0.42)]
                                      md:h-44 md:w-44
                                    `
                                    : `
                                      h-[72px] w-[72px]
                                      border-white/15
                                      bg-[#080808]
                                      hover:border-[#C71920]/70
                                      hover:bg-[#140506]
                                      md:h-24 md:w-24
                                    `
                                }
                              `}
                          >
                            {isActive && (
                              <>
                                <div className="absolute -inset-2 rounded-full border border-[#C71920]/30" />
                                <div className="absolute -inset-5 rounded-full border border-[#C71920]/10" />
                              </>
                            )}

                            <div className="px-3 text-center">
                              <span
                                className={`
                                    block
                                    font-semibold
                                    uppercase
                                    tracking-[0.17em]
                                    transition-all
                                    duration-700

                                    ${isActive ? "mb-2 text-[9px] text-white/65" : "mb-1 text-[7px] text-white/25"}
                                  `}
                              >
                                {item.number}
                              </span>

                              <strong
                                className={`
                                    block
                                    leading-tight
                                    transition-all
                                    duration-700

                                    ${
                                      isActive
                                        ? "text-sm text-white md:text-base"
                                        : "text-[8px] font-medium uppercase tracking-[0.08em] text-white/60 md:text-[9px]"
                                    }
                                  `}
                              >
                                {isActive ? item.label : item.short}
                              </strong>

                              {isActive && <span className="mx-auto mt-3 block h-[2px] w-7 bg-white" />}
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ================================================= */}
            {/* RIGHT DETAIL */}
            {/* ================================================= */}

            <div className="relative flex items-center lg:min-h-[70vh]">
              <article key={active.id} className="benefit-detail w-full pb-10 lg:pl-0">
                {/* CATEGORY */}
                <div className="mb-6 flex items-center gap-4">
                  <span className="text-[10px] font-semibold tracking-[0.3em] text-[#E1272F]">{active.number}</span>
                  <span className="h-px w-10 bg-[#C71920]" />
                  <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white/35">
                    {active.eyebrow}
                  </span>
                </div>

                {/* TITLE */}
                <h2 className="whitespace-pre-line font-serif text-[clamp(2rem,4vw,3.5rem)] font-normal leading-[0.91] tracking-[-0.045em] text-white">
                  {active.title}
                </h2>

                {/* DESCRIPTION */}
                <p className="mt-7 max-w-xl text-sm leading-7 text-white/60 md:text-base md:leading-8">
                  {active.description}
                </p>

                {/* MAIN VALUE */}
                <div className="mt-8 flex items-end gap-5 border-t border-white/10 pt-7">
                  <strong className="text-[clamp(2.8rem,5vw,5.5rem)] leading-none tracking-[-0.05em] text-[#E1272F]">
                    {active.highlight}
                  </strong>

                  <span className="max-w-[190px] pb-1 text-[9px] font-semibold uppercase leading-5 tracking-[0.18em] text-white/40">
                    {active.highlightLabel}
                  </span>
                </div>

                {/* VALUES */}
                {active.values && (
                  <div
                    className={`mt-8 grid gap-px overflow-hidden border border-white/10
                      bg-white/10
                      ${active.values.length === 4 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-3"}
                    `}
                  >
                    {active.values.map(([label, value]) => (
                      <div
                        key={label}
                        className="
                            group
                            bg-black
                            p-4
                            transition-colors
                            duration-300
                            hover:bg-[#C71920]
                            md:p-5
                          "
                      >
                        <span className="block text-[8px] font-semibold uppercase tracking-[0.18em] text-white/35 transition-colors group-hover:text-white/70">
                          {label}
                        </span>

                        <strong className="mt-3 block text-base font-semibold text-white md:text-lg">{value}</strong>
                      </div>
                    ))}
                  </div>
                )}

                {/* EXTRA */}
                <div className="mt-7 flex max-w-xl items-start gap-4">
                  <span className="mt-[9px] h-[6px] w-[6px] shrink-0 rounded-full bg-[#C71920]" />

                  <p className="text-xs leading-6 text-white/45 md:text-sm">{active.extra}</p>
                </div>

                {/* ================================================= */}
                {/* ЗӨВХӨН ЭНЭ ТОВЧ GALLERY НЭЭНЭ */}
                {/* ================================================= */}
                {/* GALLERY PREVIEW BUTTON */}
                <div className="mt-10 flex items-end justify-between gap-6">
                  {/* SCROLL INDICATOR */}
                  <div className="hidden items-center gap-4 md:flex">
                    <div className="scroll-preview-icon flex h-9 w-9 items-center justify-center rounded-full border border-dashed border-white/40">
                      <span className="text-sm text-white/80">↓</span>
                    </div>

                    <div>
                      <span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-white/70">
                        Scroll to continue
                      </span>

                      <span className="mt-1 block text-[8px] uppercase tracking-[0.15em] text-white/25">
                        Discover more
                      </span>
                    </div>
                  </div>

                  {/* IMAGE PREVIEW */}
                  <button
                    type="button"
                    onClick={openGallery}
                    aria-label={`${active.label} зургаар дэлгэрэнгүй үзэх`}
                    className="gallery-preview-button"
                  >
                    <div className="gallery-preview-media">
                      <img
                        src={active.gallery?.[0]?.src || "/banner.png"}
                        alt={active.gallery?.[0]?.alt || active.label}
                      />

                      <div className="gallery-preview-overlay" />
                      <div className="gallery-preview-gradient" />

                      <div className="gallery-preview-top">
                        <span className="gallery-preview-top-line" />
                        <span className="gallery-preview-top-num">{active.number}</span>
                      </div>

                      <div className="gallery-preview-bottom">
                        <span className="gallery-preview-label">{active.label}</span>
                      </div>
                    </div>
                    <div className="gallery-preview-progress">
                      <div className="gallery-preview-progress-bar" />
                    </div>
                  </button>
                </div>
              </article>
            </div>
          </div>

          {/* ================================================= */}
          {/* SIDE NAVIGATION */}
          {/* ================================================= */}

          <div className="absolute right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 xl:flex">
            {BENEFIT_ITEMS.map((item, index) => (
              <button
                key={item.id}
                type="button"
                /*
                 * SIDE NAVIGATION
                 * Gallery нээхгүй.
                 */
                onClick={() => goToBenefit(index)}
                className="group flex items-center justify-end gap-3"
              >
                <span
                  className={`
                      text-[8px]
                      uppercase
                      tracking-[0.14em]
                      transition-all
                      duration-500

                      ${
                        activeIndex === index
                          ? `
                            translate-x-0
                            opacity-100
                            text-white
                          `
                          : `
                            translate-x-2
                            opacity-0
                            text-white/30

                            group-hover:
                            translate-x-0

                            group-hover:
                            opacity-100
                          `
                      }
                    `}
                >
                  {item.label}
                </span>

                <span
                  className={`
                      block
                      rounded-full
                      transition-all
                      duration-500

                      ${
                        activeIndex === index
                          ? `
                            h-2 w-2
                            bg-[#C71920]

                            shadow[
                              0_0_15px_
                              rgba(
                                199,
                                25,
                                32,
                                0.9
                              )
                            ]
                          `
                          : `
                            h-1 w-1
                            bg-white/25
                          `
                      }
                    `}
                />
              </button>
            ))}
          </div>

          {/* ================================================= */}
          {/* BOTTOM PROGRESS */}
          {/* ================================================= */}

          <div className="absolute bottom-0 left-0 right-0 z-40">
            <div className="h-px bg-white/10">
              <div
                className="
                  h-full
                  bg-[#C71920]
                  transition-[width]
                  duration-300
                "
                style={{
                  width: `${progress * 100}%`,
                }}
              />
            </div>
          </div>

          {/* ================================================= */}
          {/* SCROLL INDICATOR */}
          {/* ================================================= */}

          <div className="absolute bottom-7 left-7 z-30 hidden items-center gap-3 text-[8px] uppercase tracking-[0.3em] text-white/25 md:flex lg:left-14">
            <span className="scroll-line block h-8 w-px bg-[#C71920]/60" />
            Доош гүйлгэж үзнэ үү
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* FULLSCREEN BENEFITS GALLERY */}
      {/* ================================================= */}

      {galleryBenefit && <BenefitsGallery benefit={galleryBenefit} onClose={closeGallery} />}
    </>
  );
}
