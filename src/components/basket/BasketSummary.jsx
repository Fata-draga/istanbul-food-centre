import { Link } from 'react-router'
import Button from '../Button.jsx'
import { formatPrice, useBasket } from './BasketContext.jsx'

export default function BasketSummary({ onNavigate, children }) {
  const { subtotal, itemCount } = useBasket()

  return (
    <div className="grid gap-3">
      <p className="flex flex-wrap items-baseline justify-between gap-2 text-lg font-bold">
        <span>Subtotal</span>
        <span className="tabular-nums">{formatPrice(subtotal)}</span>
      </p>
      {children}
      {itemCount > 0 && <Button as={Link} to="/checkout" onClick={onNavigate} className="w-full">Continue to Checkout</Button>}
    </div>
  )
}
