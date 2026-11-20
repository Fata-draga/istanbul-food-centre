import { ImageOff, Minus, Plus } from 'lucide-react'
import { formatPrice, maxBasketQuantity, useBasket } from './BasketContext.jsx'

const quantityStyle = 'grid size-11 shrink-0 place-items-center rounded-control text-ink enabled:hover:bg-cream disabled:text-muted disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-brand-red'

export default function BasketItems({ fallbackFocus }) {
  const { items, changeQuantity, removeProduct } = useBasket()

  function remove(event, id) {
    const item = event.currentTarget.closest('li')
    const neighbour = item.nextElementSibling ?? item.previousElementSibling
    const focusTarget = neighbour?.querySelector('[data-remove-item]') ?? fallbackFocus.current
    focusTarget?.focus()
    removeProduct(id)
  }

  return (
    <ul aria-label="Basket items" className="divide-y divide-line">
      {items.map(({ product, quantity, lineTotal }) => (
        <li key={product.id} className="grid grid-cols-[3.5rem_minmax(0,1fr)] items-start gap-3 py-5 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-4">
          {product.image ? (
            <img src={product.image} alt="" width="72" height="72" loading="lazy" className="aspect-square w-full rounded-control border border-line object-cover" />
          ) : (
            <div className="grid aspect-square place-items-center rounded-control border border-line bg-surface">
              <ImageOff aria-hidden="true" className="size-5 text-muted" />
            </div>
          )}
          <div className="min-w-0">
            <h2 className="font-heading text-base leading-snug">{product.name}</h2>
            <p className="mt-1 text-sm text-muted">{product.unit} · {formatPrice(product.priceInPence)} each</p>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <div role="group" aria-label={`Quantity for ${product.name}`} className="inline-flex items-center rounded-control border border-field bg-white">
                <button type="button" className={quantityStyle} disabled={quantity === 1} aria-label={`Decrease quantity for ${product.name}`} onClick={() => changeQuantity(product.id, -1)}>
                  <Minus aria-hidden="true" className="size-4" />
                </button>
                <span className="min-w-6 text-center text-sm font-semibold tabular-nums" aria-live="polite">{quantity}</span>
                <button type="button" className={quantityStyle} disabled={quantity === maxBasketQuantity} aria-label={`Increase quantity for ${product.name}`} onClick={() => changeQuantity(product.id, 1)}>
                  <Plus aria-hidden="true" className="size-4" />
                </button>
              </div>
              <p className="text-sm font-bold tabular-nums"><span className="sr-only">Line total: </span>{formatPrice(lineTotal)}</p>
            </div>
            <button
              type="button"
              data-remove-item
              aria-label={`Remove ${product.name}`}
              className="mt-1 min-h-11 rounded-sm text-sm font-semibold text-brand-red underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-brand-red"
              onClick={(event) => remove(event, product.id)}
            >
              Remove
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
