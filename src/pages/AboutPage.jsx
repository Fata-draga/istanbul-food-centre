import { Apple, ArrowRight, Beef, Globe, MapPin, Wheat } from 'lucide-react'
import { Link } from 'react-router'
import marketSmall from '../assets/about-market-640.webp'
import marketLarge from '../assets/about-market-1200.webp'
import Button from '../components/Button.jsx'
import Container from '../components/Container.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { store } from '../data/store.js'

const departments = [
  {
    name: 'International Groceries',
    description: 'Discover pantry staples, snacks and specialities from Romania, Bulgaria, Greece, Turkey, the Balkans and beyond.',
    Icon: Globe,
  },
  {
    name: 'Fresh Fruit & Vegetables',
    description: 'Find colourful produce for everyday meals, family recipes and something new to try.',
    Icon: Apple,
  },
  {
    name: 'Halal Meat & Poultry',
    description: 'Explore fresh halal meat and poultry for family meals and special occasions.',
    Icon: Beef,
  },
  {
    name: 'Fresh Bakery & Patisserie',
    description: 'Pick up traditional breads, savoury burek, sesame rings and sweet treats like baklava.',
    Icon: Wheat,
  },
]

// Market photograph by Jacob Moseholt, https://www.pexels.com/photo/4453879/
export default function AboutPage() {
  return (
    <main id="main-content" tabIndex={-1} className="flex-1">
      <section aria-labelledby="about-intro-title" className="border-b border-line bg-cream/50 py-section">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-5 flex items-center justify-center gap-2.5 text-xs font-bold tracking-[0.12em] text-brand-red">
              <span aria-hidden="true" className="h-px w-5 bg-brand-red" />
              GET TO KNOW US
            </p>
            <SectionHeading
              as="h1"
              id="about-intro-title"
              title="Bringing the World's Flavours to Reading."
              description="Welcome to Istanbul Food Centre, your local family-run international supermarket in the heart of Reading. We bring together everyday essentials, fresh produce and delicious food specialities from across the world, making it easier to find the flavours you know and love."
              centered
            />
          </div>
        </Container>
      </section>

      <section aria-labelledby="about-story-title" className="bg-white py-section">
        <Container className="grid items-center gap-8 md:grid-cols-2 md:gap-10 lg:gap-16">
          <div>
            <SectionHeading id="about-story-title" title="More Than Just a Supermarket." />
            <div className="mt-5 space-y-4 text-base leading-relaxed text-muted lg:text-lg">
              <p>Food brings people together. At Istanbul Food Centre, we celebrate the different cultures, traditions and flavours that make our community special.</p>
              <p>From Romanian and Bulgarian favourites to Balkan specialities, Mediterranean ingredients and everyday groceries, our shelves offer something for everyone.</p>
              <p>Whether you're searching for ingredients from home, preparing a family meal or discovering something new, we're here to make your shopping experience welcoming and convenient.</p>
            </div>
          </div>
          <img
            src={marketLarge}
            srcSet={`${marketSmall} 640w, ${marketLarge} 1200w`}
            sizes="(min-width: 1280px) 560px, (min-width: 768px) 44vw, 92vw"
            width="1200"
            height="900"
            loading="lazy"
            decoding="async"
            alt="Bowls of colourful spices and seasonings at a market stall"
            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-control lg:rounded-3xl"
          />
        </Container>
      </section>

      <section aria-labelledby="about-departments-title" className="border-y border-line bg-surface py-section">
        <Container>
          <SectionHeading id="about-departments-title" title="What You'll Find in Store" centered />
          <ul className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6">
            {departments.map(({ name, description, Icon }) => (
              <li key={name} className="min-w-0 rounded-2xl border border-line bg-white p-5 shadow-control xl:p-6">
                <span className="mb-5 grid size-12 place-items-center rounded-xl bg-cream text-brand-red">
                  <Icon aria-hidden="true" className="size-6" strokeWidth={1.75} />
                </span>
                <h3 className="text-lg leading-snug">{name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="about-reading-title" className="bg-white py-section">
        <Container>
          <div className="grid items-center gap-8 rounded-2xl border border-brand-red/10 bg-cream p-5 sm:p-8 md:grid-cols-[minmax(0,1fr)_minmax(0,0.6fr)] lg:gap-12 lg:rounded-3xl lg:p-12">
            <SectionHeading
              id="about-reading-title"
              title="Proud to Be Part of the Reading Community."
              description="As a local family business, we're proud to welcome customers from across Reading and the surrounding areas. Our store brings together international flavours, fresh food and everyday essentials under one roof."
            />
            <div className="rounded-2xl border border-line bg-white p-5 shadow-control sm:p-6">
              <div className="flex items-start gap-3">
                <MapPin aria-hidden="true" className="mt-1 size-5 shrink-0 text-brand-red" />
                <address className="leading-relaxed text-muted not-italic">
                  <strong className="block font-heading text-ink">{store.name}</strong>
                  {store.street}<br />
                  {store.town}, {store.postcode}
                </address>
              </div>
              <Button as={Link} to="/contact" className="mt-5">
                Get in Touch
                <ArrowRight aria-hidden="true" className="size-4" />
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
