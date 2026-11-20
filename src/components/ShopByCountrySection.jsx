import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import { regionShopPath, shopRegions } from '../data/shopRegions.js'
import Container from './Container.jsx'
import SectionHeading from './SectionHeading.jsx'

export default function ShopByCountrySection() {
  return (
    <section aria-labelledby="shop-by-country-title" className="border-t border-line bg-white py-section">
      <Container>
        <SectionHeading id="shop-by-country-title" title="Explore Flavours From Around the World" centered />
        <ul className="mt-7 grid grid-cols-2 gap-3 sm:mt-9 sm:gap-4 md:grid-cols-3 lg:gap-5">
          {shopRegions.filter(({ feature }) => feature).map(({ id, name, heading, feature }) => (
            <li key={id} className="min-w-0">
              <Link to={regionShopPath(id)} className="group flex h-full flex-col gap-2 rounded-2xl border border-line bg-cream/70 p-3.5 hover:border-brand-red/50 hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red sm:p-5">
                <h3 className="text-sm leading-snug text-ink group-hover:text-brand-red sm:text-lg">{heading ?? name}</h3>
                <p className="text-xs leading-relaxed text-muted sm:text-sm">{feature}</p>
                <ArrowUpRight aria-hidden="true" className="mt-auto size-4 self-end text-brand-red" />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
