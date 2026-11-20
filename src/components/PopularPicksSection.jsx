import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { popularProducts } from '../data/products.js'
import Container from './Container.jsx'
import ProductGrid from './ProductGrid.jsx'
import SectionHeading from './SectionHeading.jsx'

export default function PopularPicksSection() {
  return (
    <section id="popular-picks" aria-labelledby="popular-picks-title" className="border-t border-line bg-surface py-section">
      <Container>
        <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="popular-picks-title"
            title="Popular Picks"
            description="Discover some of the delicious essentials and international favourites available at Istanbul Food Centre."
          />
          <Link
            to="/shop"
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-sm text-sm font-semibold text-brand-red underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red"
          >
            View All Products
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <p id="popular-picks-ordering" className="mt-4 mb-7 text-sm text-muted">
          Preview products and prices for demonstration purposes only. Online ordering is coming soon.
        </p>
        <ProductGrid products={popularProducts} orderingDescriptionId="popular-picks-ordering" />
      </Container>
    </section>
  )
}
