import Header from './components/Header'
import IntroSection from './components/IntroSection'
import BenefitsSection, { GALLERIES_NEW_EMPLOYEE,GALLERIES_LONG_SERVICE  } from './components/BenefitsSection'
import BenefitsGallery from './components/BenefitsGallery'
import SketchSection from './components/SketchSection'
import SoupSelector from './components/Soups'
import ManagerSection from './components/ManagersSection'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <ManagerSection/>
        <SoupSelector/>
        <SketchSection />
        <BenefitsGallery
          eyebrow={GALLERIES_NEW_EMPLOYEE.eyebrow}
          title="Нэмэгдэл"
          subtitle="& урамшуулал"
          images={GALLERIES_NEW_EMPLOYEE.gallery}
        />
        <BenefitsSection />
        <BenefitsGallery
          eyebrow={GALLERIES_LONG_SERVICE.eyebrow}
          title="Нэмэгдэл"
          subtitle="& урамшуулал"
          images={GALLERIES_LONG_SERVICE.gallery}
        />
        <IntroSection />
      </main>
    </>
  )
}
