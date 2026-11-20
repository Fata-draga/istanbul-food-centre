import { ArrowUpRight, Clock, Mail, MapPin, Phone } from 'lucide-react'
import Button from '../components/Button.jsx'
import Container from '../components/Container.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import StoreAddress from '../components/StoreAddress.jsx'
import { store, storeDirectionsUrl, storeMapUrl } from '../data/store.js'

const contactLink = 'break-words rounded-sm font-semibold text-brand-red underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-brand-red'

function ContactMethod({ icon: Icon, title, children }) {
  return (
    <div className="flex min-w-0 items-start gap-3 py-4">
      <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-cream text-brand-red">
        <Icon aria-hidden="true" className="size-5" />
      </span>
      <div className="min-w-0">
        <h3 className="text-base">{title}</h3>
        <div className="mt-1 text-sm leading-relaxed text-muted">{children}</div>
      </div>
    </div>
  )
}

export default function ContactPage() {
  return (
    <main id="main-content" tabIndex={-1} className="flex-1 bg-white">
      <section aria-labelledby="contact-title" className="border-b border-line bg-cream/60 py-section">
        <Container>
          <p className="mb-4 flex items-center gap-2.5 text-xs font-bold tracking-[0.12em] text-brand-red">
            <span aria-hidden="true" className="h-px w-5 bg-brand-red" />
            VISIT OR CONTACT US
          </p>
          <SectionHeading
            as="h1"
            id="contact-title"
            title="We'd Love to Hear From You."
            description="Have a question about our products or looking for something special? Get in touch or visit Istanbul Food Centre in Reading."
          />
        </Container>
      </section>

      <section aria-labelledby="visit-title" className="py-section">
        <Container className="grid items-stretch gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-8">
          <div className="min-w-0 rounded-2xl border border-line bg-white p-5 shadow-control sm:p-7">
            <div className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-cream text-brand-red">
                <MapPin aria-hidden="true" className="size-5" />
              </span>
              <div>
                <h2 id="visit-title" className="text-xl">Visit us on Oxford Road</h2>
                <StoreAddress className="mt-2" />
              </div>
            </div>
            <Button as="a" href={storeDirectionsUrl} className="mt-5">
              Get Directions <ArrowUpRight aria-hidden="true" className="size-4" />
            </Button>
            <div className="mt-5 divide-y divide-line border-t border-line">
              <ContactMethod icon={Phone} title="Telephone">
                {store.phone ? <a href={'tel:' + store.phone.number} className={contactLink}>{store.phone.label}</a> : 'Store telephone number pending confirmation.'}
              </ContactMethod>
              <ContactMethod icon={Mail} title="Email">
                {store.email ? <a href={'mailto:' + store.email} className={contactLink}>{store.email}</a> : 'Store email address pending confirmation.'}
              </ContactMethod>
              <ContactMethod icon={Clock} title="Opening hours">
                {store.openingHours.length ? (
                  <dl>
                    {store.openingHours.map(({ days, hours }) => (
                      <div key={days} className="flex flex-wrap gap-x-2"><dt>{days}</dt><dd>{hours}</dd></div>
                    ))}
                  </dl>
                ) : 'Store opening hours pending confirmation.'}
              </ContactMethod>
            </div>
          </div>

          <section aria-labelledby="contact-map-title" className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-control">
            <div className="border-b border-line bg-white px-5 py-4 sm:px-6">
              <h2 id="contact-map-title" className="text-xl">Find us in Reading</h2>
              <p className="mt-1 text-sm text-muted">{store.street}, {store.postcode}</p>
            </div>
            <iframe
              src={storeMapUrl}
              title="Google Maps location of Istanbul Food Centre on Oxford Road, Reading"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              className="min-h-80 w-full flex-1 border-0 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-red sm:min-h-96"
            />
          </section>
        </Container>
      </section>
    </main>
  )
}
