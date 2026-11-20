import { ImageOff } from 'lucide-react'
import { shopRegionNames } from '../data/shopRegions.js'
import Button from './Button.jsx'
import { formatPrice, maxBasketQuantity, useBasket } from './basket/BasketContext.jsx'

export default function ProductCard({ product, orderingDescriptionId, catalogue = false }) {
  const { addProduct, items } = useBasket()
  const atLimit = items.some(item => item.product.id === product.id && item.quantity >= maxBasketQuantity)

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-control transition-[border-color,box-shadow] hover:border-brand-red/30 hover:shadow-md motion-reduce:transition-none">
      {product.image ? (
        <img
          src={product.image}
          alt=""
          width="640"
          height="480"
          loading="lazy"
          decoding="async"
          className="aspect-[4/3] w-full bg-surface object-cover"
        />
      ) : (
        <div className="grid aspect-[4/3] place-items-center bg-surface px-2 text-center">
          <div className="grid justify-items-center gap-2 text-xs text-muted">
            <ImageOff aria-hidden="true" className="size-6" />
            <span>Photo unavailable</span>
          </div>
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-3 sm:p-5">
        <div>
          <h3 className="text-base leading-snug sm:text-lg">{product.name}</h3>
          <p className="mt-1 text-sm text-muted">{product.unit}</p>
          {catalogue && product.region !== 'international' && (
            <p className="mt-1 text-xs text-muted">{shopRegionNames.get(product.region)} · Food tradition</p>
          )}
          {product.category === 'halal-butcher' && product.demonstration && (
            <p className="mt-2 inline-block rounded-sm bg-cream px-2 py-1 text-xs font-semibold text-brand-red">Demonstration example</p>
          )}
        </div>
        <p className="mt-auto text-lg leading-tight font-bold text-ink tabular-nums">
          {formatPrice(product.priceInPence)}
        </p>
        <Button
          compact
          disabled={atLimit}
          onClick={() => addProduct(product.id)}
          aria-label={atLimit ? `Maximum basket quantity reached for ${product.name}` : `Add to Basket: ${product.name}`}
          aria-describedby={orderingDescriptionId}
          className="w-full disabled:border-brand-red/20 disabled:bg-cream disabled:text-brand-red disabled:shadow-none"
        >
          Add to Basket
        </Button>
      </div>
    </article>
  )
}
