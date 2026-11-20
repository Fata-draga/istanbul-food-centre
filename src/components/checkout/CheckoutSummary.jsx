import { ImageOff } from 'lucide-react'
import { formatPrice, useBasket } from '../basket/BasketContext.jsx'
import { deliveryConfig } from '../../data/deliveryConfig.js'

export default function CheckoutSummary() {
  const { items, subtotal } = useBasket()
  const fee = deliveryConfig.feeInPence

  return (
    <aside aria-labelledby="checkout-summary-title" className="min-w-0 rounded-2xl border border-line bg-white p-5 shadow-control sm:p-6">
      <h2 id="checkout-summary-title" className="text-xl">Order Summary</h2>
      <ul aria-label="Checkout items" className="mt-3 divide-y divide-line">
        {items.map(({ product, quantity, lineTotal }) => (
          <li key={product.id} className="grid grid-cols-[3rem_minmax(0,1fr)] items-start gap-3 py-3">
            {product.image ? (
              <img src={product.image} alt="" width="48" height="48" className="aspect-square w-full rounded-control object-cover" />
            ) : (
              <span className="grid size-12 place-items-center rounded-control bg-surface text-muted"><ImageOff aria-hidden="true" className="size-4" /></span>
            )}
            <div className="min-w-0">
              <p className="font-semibold leading-snug">{product.name}</p>
              <p className="mt-1 text-sm text-muted">{quantity} × {formatPrice(product.priceInPence)} · {product.unit}</p>
              <p className="mt-1 text-sm font-semibold tabular-nums"><span className="sr-only">Line total: </span>{formatPrice(lineTotal)}</p>
            </div>
          </li>
        ))}
      </ul>
      <dl className="mt-3 grid gap-2 border-t border-line pt-4 text-sm">
        <div className="flex justify-between gap-2"><dt>Basket subtotal</dt><dd className="tabular-nums">{formatPrice(subtotal)}</dd></div>
        <div className="flex justify-between gap-2"><dt>Illustrative delivery fee</dt><dd className="tabular-nums">{formatPrice(fee)}</dd></div>
        <div className="flex justify-between gap-2 border-t border-line pt-3 text-base font-bold"><dt>Estimated order total</dt><dd className="tabular-nums">{formatPrice(subtotal + fee)}</dd></div>
      </dl>
      <p className="mt-2 text-sm text-muted">The final delivery charge will be confirmed by the shop.</p>
    </aside>
  )
}
