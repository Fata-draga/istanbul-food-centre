import { CalendarDays, ClipboardList, LayoutDashboard, Layers3, Package, Settings, Store } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router'
import Button from '../components/Button.jsx'
import { store } from '../data/store.js'
import { useDemo } from './DemoContext.jsx'
import { controlClass } from './ui.jsx'

const links = [
  { path: '/', label: 'Overview', Icon: LayoutDashboard },
  { path: '/products', label: 'Products', Icon: Package },
  { path: '/categories', label: 'Departments', Icon: Layers3 },
  { path: '/orders', label: 'Orders', Icon: ClipboardList },
  { path: '/delivery-slots', label: 'Delivery Slots', Icon: CalendarDays },
  { path: '/delivery-settings', label: 'Delivery Areas & Fees', Icon: Settings },
  { path: '/store-settings', label: 'Store Settings', Icon: Store },
]

export default function AdminLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const main = useRef(null)
  const { reset, resetCount, notice, setNotice, storageError } = useDemo()
  const selected = links.find(link => link.path === pathname)?.path ?? '/'

  useEffect(() => {
    window.scrollTo(0, 0)
    setNotice('')
    main.current.querySelector('h1')?.focus({ preventScroll: true })
  }, [pathname, setNotice])

  function resetDemo() {
    if (window.confirm('Reset all local demonstration data to its starting values?')) reset()
  }

  return (
    <div className="min-h-svh bg-surface lg:grid lg:grid-cols-[15rem_minmax(0,1fr)]">
      <a href="#admin-content" className="sr-only focus:not-sr-only focus:absolute focus:z-10 focus:m-2 focus:rounded-control focus:bg-white focus:p-3 focus:text-brand-red">Skip to admin content</a>
      <aside className="min-w-0 border-b border-line bg-white px-4 py-4 sm:px-6 lg:border-r lg:border-b-0 lg:px-4 lg:py-6">
        <p className="font-heading text-lg font-extrabold tracking-tight text-brand-red">{store.name}</p>
        <p className="mt-1 text-xs font-semibold text-muted">Admin Dashboard Prototype</p>
        <div className="mt-4 lg:hidden">
          <label htmlFor="admin-navigation" className="mb-1 block text-sm font-semibold">Admin navigation</label>
          <select id="admin-navigation" value={selected} onChange={(event) => navigate(event.target.value)} className={controlClass}>
            {links.map(({ path, label }) => <option key={path} value={path}>{label}</option>)}
          </select>
        </div>
        <nav aria-label="Admin navigation" className="mt-6 hidden lg:block">
          <ul className="grid gap-1">
            {links.map(({ path, label, Icon }) => (
              <li key={path}>
                <NavLink to={path} end className={({ isActive }) => `flex min-h-11 items-center gap-3 rounded-control px-3 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-brand-red ${isActive ? 'bg-cream text-brand-red' : 'text-ink hover:bg-surface'}`}>
                  <Icon aria-hidden="true" className="size-4 shrink-0" />{label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <div className="min-w-0">
        <header className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-white px-4 py-3 sm:px-6 lg:px-8">
          <p className="rounded-control bg-cream px-3 py-2 text-xs font-bold text-brand-red sm:text-sm">Local Demonstration — Not a Live Admin System</p>
          <div className="flex flex-wrap items-center gap-2">
            <a href="/" className="inline-flex min-h-11 items-center px-2 text-sm font-semibold text-brand-red hover:underline focus-visible:outline-2 focus-visible:outline-brand-red">View Storefront</a>
            <Button variant="outline" compact onClick={resetDemo}>Reset Demo Data</Button>
          </div>
        </header>
        <main id="admin-content" ref={main} tabIndex={-1} className="mx-auto w-full max-w-[96rem] min-w-0 px-4 py-6 sm:px-6 lg:px-8">
          <p role="status" className={notice ? 'mb-4 rounded-control border border-line bg-white p-3 text-sm text-ink' : 'sr-only'}>{notice}</p>
          {storageError && <p role="alert" className="mb-4 rounded-control bg-cream p-3 text-sm text-brand-red">Browser storage is unavailable. Changes will last until this page closes.</p>}
          <Outlet key={resetCount} />
        </main>
      </div>
    </div>
  )
}
