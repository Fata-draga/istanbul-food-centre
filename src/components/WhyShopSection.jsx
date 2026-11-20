import { Beef, Croissant, Globe, HeartHandshake } from 'lucide-react'
import Container from './Container.jsx'
import SectionHeading from './SectionHeading.jsx'

const features = [
  {
    title: 'International Food Selection',
    description: 'Explore groceries, snacks and specialities from Romania, Bulgaria, the Balkans and around the world.',
    Icon: Globe,
  },
  {
    title: 'Fresh Halal Meat',
    description: 'Discover our selection of fresh halal meat and poultry.',
    Icon: Beef,
  },
  {
    title: 'Fresh Bakery Favourites',
    description: 'Enjoy savoury burek, sesame breads, delicious baklava and other fresh bakery favourites.',
    Icon: Croissant,
  },
  {
    title: 'Family-Run & Local',
    description: 'A welcoming, independent supermarket proudly serving the Reading community.',
    Icon: HeartHandshake,
  },
]

export default function WhyShopSection() {
  return (
    <section id="why-shop-with-us" aria-labelledby="why-shop-title" className="scroll-mt-48 border-t border-line bg-white py-section">
      <Container>
        <p className="mb-4 flex items-center justify-center gap-2.5 text-xs font-bold tracking-[0.12em] text-brand-red">
          <span aria-hidden="true" className="h-px w-5 bg-brand-red" />
          WHY CHOOSE US
        </p>
        <SectionHeading
          id="why-shop-title"
          title="A World of Flavours, Right on Your Doorstep."
          description="Discover what makes Istanbul Food Centre a favourite destination for international groceries and everyday essentials."
          centered
        />

        <ul className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6">
          {features.map(({ title, description, Icon }) => (
            <li key={title} className="rounded-2xl border border-line bg-surface p-5 transition-[border-color,box-shadow] hover:border-brand-red/25 hover:shadow-control motion-reduce:transition-none xl:p-6">
              <span className="mb-5 grid size-12 place-items-center rounded-xl bg-cream text-brand-red">
                <Icon aria-hidden="true" className="size-6" strokeWidth={1.75} />
              </span>
              <h3 className="text-lg leading-snug">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
