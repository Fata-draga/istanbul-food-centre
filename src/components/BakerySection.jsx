import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import burekSmall from '../assets/bakery/burek-640.webp'
import burekLarge from '../assets/bakery/burek-1200.webp'
import burekHighlight from '../assets/bakery/burek-highlight.webp'
import simit from '../assets/products/turkish-bread.webp'
import baklava from '../assets/products/turkish-baklava.webp'
import BakeryHighlight from './BakeryHighlight.jsx'
import Button from './Button.jsx'
import Container from './Container.jsx'

const highlights = [
  {
    title: 'Burek & Savoury Pastries',
    description: 'Golden, flaky pastries filled with cheese, meat or potatoes.',
    image: burekHighlight, // Biea, https://pixabay.com/photos/5195471/
    imageAlt: 'Two golden rolls of burek with crisp, flaky layers',
  },
  {
    title: 'Fresh Bread & Sesame Rings',
    description: 'Traditional breads, sesame-covered simit and freshly baked favourites.',
    image: simit, // Yesim G. Ozdemir, https://www.pexels.com/photo/19199375/
    imageAlt: 'Golden simit rings coated in sesame seeds',
  },
  {
    title: 'Baklava & Sweet Treats',
    description: 'Delicious layered pastries, traditional baklava and sweet specialities.',
    image: baklava, // Engin Akyurt, https://www.pexels.com/photo/7803118/
    imageAlt: 'Layers of baklava topped with pistachios on a white plate',
  },
]

// Main photo by 灰灰 王, https://www.pexels.com/photo/26270263/
export default function BakerySection() {
  return (
    <section id="fresh-bakery" aria-labelledby="fresh-bakery-title" className="scroll-mt-48 border-t border-line bg-cream py-section">
      <Container>
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-10 lg:gap-16">
          <img
            src={burekLarge}
            srcSet={`${burekSmall} 640w, ${burekLarge} 1200w`}
            sizes="(min-width: 1280px) 560px, (min-width: 768px) 44vw, 92vw"
            width="1200"
            height="900"
            loading="lazy"
            decoding="async"
            alt="Golden burek pastries with black sesame and visible flaky layers"
            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-control lg:rounded-3xl"
          />

          <div>
            <p className="mb-4 flex items-center gap-2.5 text-xs font-bold tracking-[0.12em] text-brand-red">
              <span aria-hidden="true" className="h-px w-5 shrink-0 bg-brand-red" />
              FRESH FROM OUR BAKERY
            </p>
            <h2 id="fresh-bakery-title" className="max-w-[18ch] text-[clamp(2rem,4.4vw,3.75rem)] leading-[1.1] font-extrabold tracking-[-0.04em] text-balance">
              Freshly Baked. Loved by Everyone.
            </h2>
            <p className="mt-5 max-w-[50ch] text-base leading-relaxed text-muted lg:text-lg">
              Discover delicious freshly prepared pastries, traditional breads and sweet treats inspired by flavours from across the world. From golden, flaky burek filled with cheese, meat or potatoes to sesame bread rings and irresistible baklava, there's something for everyone.
            </p>
            <div className="mt-7">
              <Button as={Link} to="/bakery-and-patisserie">
                Explore Our Bakery
                <ArrowRight aria-hidden="true" className="size-4" />
              </Button>
            </div>
            <p className="mt-4 text-sm font-medium text-muted">Fresh pastries and bakery favourites every day.</p>
          </div>
        </div>

        <ul className="mt-10 grid gap-5 border-t border-brand-red/15 pt-6 sm:grid-cols-2 md:mt-12 md:grid-cols-3 lg:gap-6 lg:pt-8">
          {highlights.map(({ title, description, image, imageAlt }) => (
            <BakeryHighlight key={title} title={title} description={description} image={image} imageAlt={imageAlt} />
          ))}
        </ul>
      </Container>
    </section>
  )
}
