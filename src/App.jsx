import Header from './components/Header.jsx'
import IntroSection from './components/IntroSection.jsx'
import BenefitsSection from './components/BenefitsSection.jsx'
import SketchSection from './components/SketchSection.jsx'

export default function App() {
  return (
    <>
      {/* <Header /> */}
      <main>
        <SketchSection />
        <BenefitsSection />
        <IntroSection />
      </main>
    </>
  )
}
