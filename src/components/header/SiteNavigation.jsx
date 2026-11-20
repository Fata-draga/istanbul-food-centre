import { Link, useLocation, useSearchParams } from 'react-router'
import { departmentShopPath, departments } from '../../data/departments.js'
import { navigation } from '../../data/navigation.js'
import Container from '../Container.jsx'

const departmentByPath = new Map(departments.map(({ path, id }) => [path, id]))
const departmentIds = new Set(departmentByPath.values())

export default function SiteNavigation({ mobileOpen, onNavigate }) {
  const { pathname } = useLocation()
  const [params] = useSearchParams()
  const category = pathname === '/shop' && params.get('category')
  const navCategory = departmentIds.has(category) ? category : null
  const categoryHasLink = navigation.some(({ path }) => departmentByPath.get(path) === navCategory)

  return (
    <nav
      id="primary-navigation"
      aria-label="Primary navigation"
      className={`max-h-[42svh] overflow-y-auto overscroll-contain border-t border-line lg:block lg:max-h-none lg:overflow-visible ${mobileOpen ? 'block' : 'hidden'}`}
    >
      <Container>
        <ul className="grid gap-1 py-3 lg:flex lg:items-stretch lg:justify-between lg:gap-0 lg:py-0">
          {navigation.map(({ label, path }) => {
            const department = departmentByPath.get(path)
            const active = department
              ? navCategory === department
              : path === pathname && (path !== '/shop' || !categoryHasLink)
            return (
              <li key={path}>
                <Link
                  to={department ? departmentShopPath(department) : path}
                  aria-current={active ? 'page' : undefined}
                  onClick={onNavigate}
                  className={`flex min-h-11 items-center rounded-control px-3 py-2 text-sm font-semibold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-red lg:min-h-13 lg:rounded-none lg:border-b-2 lg:px-2 xl:px-4 ${active
                    ? 'bg-cream text-brand-red lg:border-brand-red lg:bg-transparent'
                    : 'text-ink hover:bg-surface hover:text-brand-red lg:border-transparent'}`}
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </Container>
    </nav>
  )
}
