import Header from './components/Header.jsx'
import IntroSection from './components/IntroSection.jsx'
import BenefitsSection, { GALLERY_BENEFIT } from './components/BenefitsSection.jsx'
import BenefitsGallery from './components/BenefitsGallery.jsx'
import SketchSection from './components/SketchSection.jsx'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <SketchSection />
        <BenefitsSection />
        <BenefitsGallery
          eyebrow={GALLERY_BENEFIT.eyebrow}
          title="Нэмэгдэл"
          subtitle="& урамшуулал"
          images={GALLERY_BENEFIT.gallery}
        />
        <IntroSection />
      </main>
    </>
  )
}
