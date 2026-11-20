import { ArrowRight, MapPin } from 'lucide-react'
import { Link } from 'react-router'
import heroSmall from '../assets/home-hero-640.webp'
import heroLarge from '../assets/home-hero-1280.webp'
import Button from './Button.jsx'
import Container from './Container.jsx'

// Timur Saglambilek, Pexels photo 915058, https://www.pexels.com/license/
export default function HomeHero() {
  return (
    <section aria-labelledby="home-hero-title" className="border-b border-line bg-cream/50">
      <Container className="grid items-center gap-10 py-10 sm:gap-12 sm:py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12 lg:py-16 xl:gap-16">
        <div>
          <p className="mb-4 flex items-center gap-2.5 text-xs leading-relaxed font-bold tracking-[0.12em] text-brand-red">
            <span aria-hidden="true" className="h-px w-5 shrink-0 bg-brand-red" />
            YOUR LOCAL INTERNATIONAL SUPERMARKET
          </p>
          <h1 id="home-hero-title" className="text-[clamp(2.125rem,5.2vw,4rem)] leading-[1.08] font-extrabold tracking-[-0.045em]">
            Fresh Food.{' '}
            <span className="block">Global Flavours.</span>{' '}
            <span className="block text-brand-red">Local to Reading.</span>
          </h1>
          <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-muted sm:text-lg">
            Discover fresh produce, fresh halal meat, bakery favourites and authentic international groceries from your favourite family-run supermarket in Reading.
          </p>
          <div className="mt-7 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap">
            <Button as={Link} to="/shop">
              Shop Groceries
              <ArrowRight aria-hidden="true" className="size-4" />
            </Button>
            <Button as="a" href="#departments" variant="outline">
              Explore Our Range
            </Button>
          </div>
          <p className="mt-6 flex items-center gap-2 text-sm font-medium text-muted">
            <MapPin aria-hidden="true" className="size-4 shrink-0 text-brand-red" />
            Proudly serving Reading, Berkshire.
          </p>
        </div>

        <img
          src={heroLarge}
          srcSet={`${heroSmall} 640w, ${heroLarge} 1280w`}
          sizes="(min-width: 1280px) 560px, (min-width: 1024px) 43vw, 92vw"
          width="1280"
          height="853"
          alt="A rustic loaf with colourful peppers, fresh herbs and spring onions"
          fetchPriority="high"
          className="aspect-[4/3] w-full rounded-2xl object-cover object-[45%_center] shadow-[0_12px_30px_-18px_rgb(32_33_36_/_35%)] lg:aspect-[6/5] lg:rounded-3xl"
        />
      </Container>
    </section>
  )
}
