import { formatPrice, useBasket } from '../basket/BasketContext.jsx'
import { deliveryConfig } from '../../data/deliveryConfig.js'

export default function DeliverySummary({ postcode, date, slot }) {
  const { subtotal } = useBasket()
  const fee = deliveryConfig.feeInPence
  const rows = [
    ['Basket subtotal', formatPrice(subtotal)],
    ['Illustrative delivery fee', formatPrice(fee)],
  ]
  const scheduleRows = [
    ['Delivery postcode', postcode || 'Not checked'],
    ['Selected date', date?.fullLabel ?? 'Not selected'],
    ['Selected time window', slot?.label ?? 'Not selected'],
  ]

  return (
    <aside aria-labelledby="delivery-summary-title" className="min-w-0 rounded-2xl border border-line bg-surface p-5 sm:p-6">
      <h2 id="delivery-summary-title" className="mb-5 text-xl">Order Summary</h2>
      <dl className="grid gap-3 text-sm">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-3">
            <dt>{label}</dt>
            <dd className="shrink-0 font-semibold tabular-nums">{value}</dd>
          </div>
        ))}
        <div className="flex justify-between gap-3 border-t border-line pt-3 text-base font-bold">
          <dt>Estimated total</dt>
          <dd className="shrink-0 tabular-nums">{formatPrice(subtotal + fee)}</dd>
        </div>
      </dl>
      <p className="mt-3 text-sm text-muted">The final delivery charge will be confirmed by the shop.</p>
      <dl aria-live="polite" className="mt-5 grid gap-2 border-t border-line pt-4 text-sm">
        {scheduleRows.map(([label, value]) => (
          <div key={label} className="flex flex-wrap justify-between gap-x-3 gap-y-1">
            <dt className="text-muted">{label}</dt>
            <dd className="font-medium">{value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  )
}
