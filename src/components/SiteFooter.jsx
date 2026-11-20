import { ArrowUpRight, MapPin } from 'lucide-react'
import { Link, useLocation } from 'react-router'
import { departmentShopPath, departments } from '../data/departments.js'
import { navigation } from '../data/navigation.js'
import { store, storeDirectionsUrl } from '../data/store.js'
import Container from './Container.jsx'
import StoreAddress from './StoreAddress.jsx'

const quickPaths = new Set(['/', '/shop', '/about', '/contact'])
const quickLinks = navigation.filter(({ path }) => quickPaths.has(path))
const footerDepartments = new Set(['fresh-produce', 'halal-butcher', 'bakery-and-patisserie', 'international-groceries'])
const departmentLinks = departments.filter(({ id }) => footerDepartments.has(id)).map(({ id, name }) => ({
  label: name,
  path: departmentShopPath(id),
}))
const futurePages = ['Privacy Policy', 'Terms & Conditions', 'Delivery Information']
const linkStyle = 'inline-flex min-h-11 items-center gap-2 rounded-sm text-sm text-muted underline-offset-4 hover:text-brand-red hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red'

function FooterNavigation({ id, title, links }) {
  const { pathname, search } = useLocation()

  return (
    <nav aria-labelledby={id} className="min-w-0">
      <h2 id={id} className="mb-2 text-xs font-bold tracking-[0.12em] uppercase">{title}</h2>
      <ul>
        {links.map(({ label, path }) => (
          <li key={path}>
            <Link
              to={path}
              aria-current={pathname + search === path ? 'page' : undefined}
              onClick={(event) => {
                if (!event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) window.scrollTo(0, 0)
              }}
              className={linkStyle}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default function SiteFooter() {
  const year = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', year: 'numeric' }).format(new Date())

  return (
    <footer className="border-t border-line bg-surface">
      <Container className="grid grid-cols-2 gap-x-4 gap-y-8 py-10 sm:gap-x-7 lg:grid-cols-[1.2fr_0.7fr_1fr_1fr] lg:py-12">
        <div className="col-span-2 min-w-0 lg:col-span-1">
          <h2 className="font-heading text-lg font-extrabold leading-snug text-brand-red uppercase">{store.name}</h2>
          <p className="mt-3 max-w-[32ch] text-sm leading-relaxed text-muted">
            Your local family-run international supermarket, bringing flavours from around the world to Reading.
          </p>
        </div>
        <FooterNavigation id="footer-quick-links" title="Quick Links" links={quickLinks} />
        <FooterNavigation id="footer-departments" title="Shop Departments" links={departmentLinks} />
        <section aria-labelledby="footer-visit" className="col-span-2 min-w-0 lg:col-span-1">
          <h2 id="footer-visit" className="mb-3 text-xs font-bold tracking-[0.12em] uppercase">Visit Us</h2>
          <div className="flex items-start gap-2.5">
            <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-red" />
            <StoreAddress />
          </div>
          {store.phone && <a href={'tel:' + store.phone.number} className={linkStyle}>{store.phone.label}</a>}
          {store.email && <a href={'mailto:' + store.email} className={linkStyle}>{store.email}</a>}
          <a href={storeDirectionsUrl} className={linkStyle + ' mt-2 font-semibold text-brand-red'}>
            Get Directions <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
        </section>
      </Container>

      <div className="border-t border-line bg-white">
        <Container className="flex flex-col gap-3 py-5 text-xs leading-relaxed text-muted lg:flex-row lg:items-center lg:justify-between">
          <p>© {year} {store.name}. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-3 gap-y-1.5">
            <span className="font-semibold">Coming soon</span>
            <ul aria-label="Pages coming soon" className="flex flex-wrap gap-x-3 gap-y-1.5">
              {futurePages.map(label => <li key={label}>{label}</li>)}
            </ul>
          </div>
        </Container>
      </div>
    </footer>
  )
}
