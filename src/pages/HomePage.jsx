import BakerySection from '../components/BakerySection.jsx'
import DepartmentSection from '../components/DepartmentSection.jsx'
import HomeHero from '../components/HomeHero.jsx'
import PopularPicksSection from '../components/PopularPicksSection.jsx'
import ShopByCountrySection from '../components/ShopByCountrySection.jsx'
import WhyShopSection from '../components/WhyShopSection.jsx'

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1} className="flex-1">
      <HomeHero />
      <DepartmentSection />
      <ShopByCountrySection />
      <PopularPicksSection />
      <BakerySection />
      <WhyShopSection />
    </main>
  )
}
