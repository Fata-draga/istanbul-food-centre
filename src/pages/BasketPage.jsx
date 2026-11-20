import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import { basketNotice, useBasket } from '../components/basket/BasketContext.jsx'
import BasketItems from '../components/basket/BasketItems.jsx'
import BasketSummary from '../components/basket/BasketSummary.jsx'
import EmptyBasket from '../components/basket/EmptyBasket.jsx'
import Button from '../components/Button.jsx'
import Container from '../components/Container.jsx'

export default function BasketPage() {
  const { items, itemCount, clearBasket } = useBasket()
  const heading = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    heading.current.focus({ preventScroll: true })
  }, [])

  return (
    <main id="main-content" tabIndex={-1} className="flex-1 bg-surface py-10 sm:py-14">
      <Container>
        <div className="mb-7">
          <Link to="/shop" className="mb-4 inline-flex min-h-10 items-center gap-2 rounded-sm text-sm font-semibold text-brand-red underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-brand-red">
            <ArrowLeft aria-hidden="true" className="size-4" />
            Continue Shopping
          </Link>
          <h1 ref={heading} tabIndex={-1} className="text-4xl sm:text-5xl">Your Basket</h1>
          <p className="mt-2 text-sm text-muted" role="status">{itemCount} {itemCount === 1 ? 'item' : 'items'}</p>
        </div>
        <p id="basket-page-notice" className="mb-6 rounded-control border border-brand-red/15 bg-cream p-4 text-sm text-muted">{basketNotice}</p>
        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,0.52fr)] lg:gap-8">
          <div className="rounded-2xl border border-line bg-white px-4 shadow-control sm:px-6">
            {items.length ? (
              <>
                <BasketItems fallbackFocus={heading} />
                <button
                  type="button"
                  onClick={() => {
                    heading.current.focus()
                    clearBasket()
                  }}
                  className="mb-4 min-h-11 rounded-sm text-sm font-semibold text-brand-red underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-brand-red"
                >
                  Clear Basket
                </button>
              </>
            ) : <EmptyBasket />}
          </div>
          <section aria-labelledby="basket-summary-title" className="rounded-2xl border border-line bg-white p-5 shadow-control sm:p-6">
            <h2 id="basket-summary-title" className="mb-4 text-xl">Basket Summary</h2>
            <BasketSummary>
              <Button as={Link} to="/delivery" variant="outline" className="w-full">Choose Delivery</Button>
            </BasketSummary>
          </section>
        </div>
      </Container>
    </main>
  )
}
