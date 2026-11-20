import { Menu, ShoppingBasket, UserRound, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { useBasket } from '../basket/BasketContext.jsx'
import BasketDrawer from '../basket/BasketDrawer.jsx'
import Container from '../Container.jsx'
import ProductSearch from './ProductSearch.jsx'
import SiteNavigation from './SiteNavigation.jsx'

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [basketOpen, setBasketOpen] = useState(false)
  const { itemCount } = useBasket()
  const menuButton = useRef(null)
  const { key } = useLocation()

  useEffect(() => {
    setMobileOpen(false)
    setBasketOpen(false)
  }, [key])

  function closeMenu() {
    if (mobileOpen) {
      setMobileOpen(false)
      menuButton.current?.focus()
    }
  }

  return (
    <>
      <header
        className="sticky top-0 z-20 border-b border-line bg-white shadow-control"
        onKeyDown={(event) => {
          if (event.key === 'Escape' && mobileOpen) closeMenu()
        }}
      >
        <div className="bg-brand-red py-2 text-center text-xs font-medium leading-relaxed text-white sm:text-sm">
          <Container>Fresh groceries, global flavours — local delivery coming soon.</Container>
        </div>
        <Container className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2.5 py-3 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-x-8 lg:py-6 xl:gap-x-12">
          <Link
            to="/"
            onClick={closeMenu}
            className="w-fit rounded-sm font-heading leading-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red"
          >
            <span className="block text-lg font-extrabold tracking-tight text-brand-red sm:text-2xl">Istanbul</span>
            <span className="mt-1 block text-[0.625rem] font-bold tracking-[0.14em] text-ink uppercase sm:text-xs">Food Centre</span>
          </Link>
          <div className="col-start-2 row-start-1 flex items-center gap-1 sm:gap-3 lg:col-start-3 lg:gap-5">
            <button type="button" disabled aria-label="My Account" aria-describedby="account-status" className="grid min-h-11 min-w-11 justify-items-center gap-1 text-[0.625rem] font-medium leading-none text-muted sm:text-xs">
              <UserRound aria-hidden="true" className="self-end size-5" />
              <span>My Account</span>
              <span id="account-status" className="sr-only">Online accounts are coming soon.</span>
            </button>
            <button
              type="button"
              aria-label={`Basket, ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
              aria-haspopup="dialog"
              aria-controls="basket-drawer"
              onClick={(event) => {
                event.currentTarget.focus({ preventScroll: true })
                setBasketOpen(true)
              }}
              className="grid min-h-11 min-w-11 justify-items-center gap-1 rounded-control text-[0.625rem] font-medium leading-none text-ink hover:text-brand-red focus-visible:outline-2 focus-visible:outline-brand-red sm:text-xs"
            >
              <span className="relative self-end">
                <ShoppingBasket aria-hidden="true" className="size-5" />
                <span aria-hidden="true" className="absolute -top-1.5 -right-2 grid h-4 min-w-4 place-items-center rounded-full bg-brand-red px-0.5 text-[0.625rem] font-bold text-white">{itemCount}</span>
              </span>
              <span>Basket</span>
            </button>
            <button
              ref={menuButton}
              type="button"
              aria-expanded={mobileOpen}
              aria-controls="primary-navigation"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="grid size-11 place-items-center rounded-control border border-field text-ink hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red lg:hidden"
            >
              {mobileOpen ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
            </button>
          </div>
          <ProductSearch />
        </Container>
        <SiteNavigation mobileOpen={mobileOpen} onNavigate={closeMenu} />
      </header>
      <BasketDrawer open={basketOpen} onClose={() => setBasketOpen(false)} />
    </>
  )
}
