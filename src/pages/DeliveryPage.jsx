import { ArrowLeft, Info } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import Container from '../components/Container.jsx'
import { DeliveryDatePicker, DeliveryTimeSlots } from '../components/delivery/DeliveryChoices.jsx'
import DeliveryPostcodeChecker from '../components/delivery/DeliveryPostcodeChecker.jsx'
import DeliverySummary from '../components/delivery/DeliverySummary.jsx'
import Button from '../components/Button.jsx'
import { useCheckoutSession } from '../components/checkout/CheckoutSession.jsx'
import { deliveryConfig } from '../data/deliveryConfig.js'

export default function DeliveryPage() {
  const heading = useRef(null)
  const { delivery, details, editingDelivery } = useCheckoutSession()
  const { selection, dates, setPostcode, setDate, setSlot, useMemoryOnly } = delivery

  function updateSelection(change, value) {
    if (editingDelivery) useMemoryOnly()
    change(value)
  }
  const date = dates.find(({ id }) => id === selection.dateId)
  const slot = deliveryConfig.timeWindows.find(({ id }) => id === selection.slotId)

  useEffect(() => {
    window.scrollTo(0, 0)
    const frame = window.requestAnimationFrame(() => heading.current?.focus({ preventScroll: true }))
    return () => window.cancelAnimationFrame(frame)
  }, [])

  return (
    <main id="main-content" tabIndex={-1} className="flex-1 bg-white py-10 sm:py-14">
      <Container>
        <Link to={editingDelivery ? "/checkout" : "/basket"} className="mb-4 inline-flex min-h-10 items-center gap-2 rounded-sm text-sm font-semibold text-brand-red underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-brand-red">
          <ArrowLeft aria-hidden="true" className="size-4" /> {editingDelivery ? "Back to Checkout" : "Back to Basket"}
        </Link>
        <h1 ref={heading} tabIndex={-1} className="text-3xl leading-tight sm:text-5xl">Choose Your Delivery</h1>
        <p className="mt-3 text-base text-muted sm:text-lg">Plan your grocery delivery at a time that works for you.</p>
        <p className="my-6 flex items-start gap-3 rounded-control border border-brand-red/15 bg-cream p-4 text-sm">
          <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-red" />
          Delivery options shown are for demonstration purposes only. Online ordering is not yet available.
        </p>
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.52fr)] lg:gap-8">
          <div className="grid min-w-0 gap-6">
            <DeliveryPostcodeChecker postcode={selection.postcode} initialDraft={editingDelivery ? details.postcode : undefined} onPostcodeChange={(value) => updateSelection(setPostcode, value)} />
            {selection.postcode && (
              <>
                <DeliveryDatePicker dates={dates} value={selection.dateId} onChange={(value) => updateSelection(setDate, value)} />
                <DeliveryTimeSlots slots={deliveryConfig.timeWindows} value={selection.slotId} onChange={(value) => updateSelection(setSlot, value)} hasDate={Boolean(date)} />
              </>
            )}
          </div>
          <div className="grid min-w-0 gap-3">
            <DeliverySummary postcode={selection.postcode} date={date} slot={slot} />
            {editingDelivery && date && slot && <Button as={Link} to="/checkout">Return to Checkout</Button>}
          </div>
        </div>
      </Container>
    </main>
  )
}
