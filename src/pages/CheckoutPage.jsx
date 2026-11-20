import { ArrowLeft, CreditCard, Info } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import Button from '../components/Button.jsx'
import Container from '../components/Container.jsx'
import { formatPrice, useBasket } from '../components/basket/BasketContext.jsx'
import { useCheckoutSession } from '../components/checkout/CheckoutSession.jsx'
import CheckoutSummary from '../components/checkout/CheckoutSummary.jsx'
import CustomerDetailsForm from '../components/checkout/CustomerDetailsForm.jsx'
import { deliveryConfig } from '../data/deliveryConfig.js'

const steps = ['Your Details', 'Delivery', 'Review & Payment']
const editDeliveryPath = '/delivery?return=checkout'

function DeliveryDetails({ postcode, date, slot }) {
  return (
    <dl className="grid gap-3 text-sm">
      {[
        ['Delivery postcode', postcode || 'Not selected'],
        ['Selected date', date?.fullLabel ?? 'Not selected'],
        ['Selected time window', slot?.label ?? 'Not selected'],
        ['Illustrative delivery fee', formatPrice(deliveryConfig.feeInPence)],
      ].map(([label, value]) => (
        <div key={label} className="flex flex-wrap justify-between gap-x-4 gap-y-1">
          <dt className="text-muted">{label}</dt>
          <dd className="font-semibold">{value}</dd>
        </div>
      ))}
    </dl>
  )
}

export default function CheckoutPage() {
  const { itemCount } = useBasket()
  const { delivery, details, setDetails, step, setStep, detailsConfirmed, setDetailsConfirmed } = useCheckoutSession()
  const { selection, dates, setPostcode } = delivery
  const date = dates.find(({ id }) => id === selection.dateId)
  const slot = deliveryConfig.timeWindows.find(({ id }) => id === selection.slotId)
  const ready = Boolean(selection.postcode && date && slot)
  const currentDetails = { ...details, postcode: details.postcode ?? selection.postcode }
  const matched = ready && currentDetails.postcode === selection.postcode
  const activeStep = step === 2 && !matched ? 1 : step
  const canStart = itemCount > 0 && (ready || detailsConfirmed)
  const activeHeading = useRef(null)
  const pageHeading = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    const frame = requestAnimationFrame(() => pageHeading.current?.focus({ preventScroll: true }))
    return () => cancelAnimationFrame(frame)
  }, [])

  function goToStep(next) {
    setStep(next)
    requestAnimationFrame(() => activeHeading.current?.focus())
  }

  function confirmDetails(values) {
    if (selection.postcode && selection.postcode !== values.postcode) setPostcode('')
    setDetails(values)
    setDetailsConfirmed(true)
    goToStep(1)
  }

  return (
    <main id="main-content" tabIndex={-1} className="flex-1 bg-white py-10 sm:py-14">
      <Container>
        <Link to="/basket" className="mb-4 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-brand-red hover:underline focus-visible:outline-2 focus-visible:outline-brand-red">
          <ArrowLeft aria-hidden="true" className="size-4" /> Back to Basket
        </Link>
        <h1 ref={pageHeading} tabIndex={-1} className="text-3xl sm:text-5xl">Checkout</h1>
        <p className="mt-3 text-muted sm:text-lg">Review your groceries and delivery details.</p>
        <p id="checkout-notice" className="my-6 flex items-start gap-3 rounded-control border border-brand-red/15 bg-cream p-4 text-sm">
          <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-red" />
          Demonstration checkout only. No orders or payments will be processed.
        </p>
        {!canStart ? (
          <section className="max-w-xl rounded-2xl border border-line bg-white p-5 sm:p-6">
            <h2 className="text-xl">{itemCount ? 'Choose a delivery slot' : 'Your basket is empty.'}</h2>
            <p className="my-3 text-sm text-muted">{itemCount ? 'Select an example delivery postcode, a date and a time to continue to checkout.' : 'Add groceries to your basket to start the checkout demonstration.'}</p>
            {itemCount ? <Button as={Link} to={editDeliveryPath}>Choose Delivery</Button> : <Button as={Link} to="/shop">Start Shopping</Button>}
          </section>
        ) : (
          <>
            <ol aria-label="Checkout progress" className="mb-6 grid grid-cols-3 gap-1.5 sm:gap-3">
              {steps.map((label, index) => (
                <li key={label} aria-current={index === activeStep ? 'step' : undefined}>
                  <button
                    type="button"
                    disabled={index >= activeStep}
                    onClick={() => goToStep(index)}
                    className={`flex min-h-14 w-full flex-col items-center justify-center gap-1 rounded-control border px-1 py-2 text-center text-xs font-semibold leading-tight enabled:hover:bg-surface focus-visible:outline-2 focus-visible:outline-brand-red sm:flex-row sm:gap-2 sm:text-sm ${index === activeStep ? 'border-brand-red bg-cream text-brand-red' : 'border-line text-muted'}`}
                  >
                    <span aria-hidden="true" className="grid size-5 shrink-0 place-items-center rounded-full bg-surface">{index + 1}</span>
                    {label}
                  </button>
                </li>
              ))}
            </ol>
            <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.55fr)]">
              <section className="min-w-0 rounded-2xl border border-line bg-white p-5 sm:p-6" aria-labelledby="checkout-step-title">
                <h2 id="checkout-step-title" ref={activeHeading} tabIndex={-1} className="mb-5 scroll-mt-48 text-xl">{steps[activeStep]}</h2>
                {activeStep === 0 && (
                  <CustomerDetailsForm
                    details={currentDetails}
                    onChange={(id, value) => setDetails(current => ({ ...current, [id]: value }))}
                    onContinue={confirmDetails}
                  />
                )}
                {activeStep === 1 && (
                  <>
                    <DeliveryDetails postcode={selection.postcode} date={date} slot={slot} />
                    {!matched && <p role="status" className="mt-4 rounded-control bg-cream p-3 text-sm">Choose a delivery date and time for {currentDetails.postcode || 'your address postcode'} before moving to review.</p>}
                    <div className="mt-5 flex flex-wrap gap-3">
                      <Button as={Link} to={editDeliveryPath} variant={matched ? 'outline' : 'primary'}>Edit Delivery</Button>
                      {matched && <Button onClick={() => goToStep(2)}>Continue to Review</Button>}
                    </div>
                  </>
                )}
                {activeStep === 2 && (
                  <div className="grid gap-5">
                    <div className="grid gap-5 break-words sm:grid-cols-2">
                      <div>
                        <h3 className="mb-1 font-bold">Customer Details</h3>
                        <p>{details.firstName} {details.lastName}</p>
                        <p>{details.email}</p>
                        <p>{details.phone}</p>
                      </div>
                      <div>
                        <h3 className="mb-1 font-bold">Delivery Address</h3>
                        <address className="not-italic">
                          {details.address1}<br />
                          {details.address2 && <>{details.address2}<br /></>}
                          {details.town}<br />
                          {details.postcode}
                        </address>
                      </div>
                    </div>
                    <DeliveryDetails postcode={selection.postcode} date={date} slot={slot} />
                    <div className="flex items-start gap-3 rounded-control border border-line bg-surface p-4">
                      <CreditCard aria-hidden="true" className="size-5 shrink-0 text-brand-red" />
                      <div>
                        <h3 className="font-bold">Card Payment</h3>
                        <p className="mt-1 text-sm text-muted">Secure online payments will be available when ordering launches.</p>
                      </div>
                    </div>
                    <div>
                      <Button disabled aria-describedby="checkout-notice" className="disabled:border-line disabled:bg-surface disabled:text-muted disabled:shadow-none">Place Order — Coming Soon</Button>
                      <p className="mt-2 text-sm text-muted">This preview cannot submit an order.</p>
                    </div>
                  </div>
                )}
              </section>
              <CheckoutSummary />
            </div>
          </>
        )}
      </Container>
    </main>
  )
}
