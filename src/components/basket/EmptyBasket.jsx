import { ShoppingBasket } from 'lucide-react'
import { Link } from 'react-router'
import Button from '../Button.jsx'

export default function EmptyBasket({ onNavigate }) {
  return (
    <div className="grid justify-items-center gap-3 py-8 text-center">
      <span className="grid size-14 place-items-center rounded-full bg-cream text-brand-red">
        <ShoppingBasket aria-hidden="true" className="size-6" />
      </span>
      <p className="font-heading text-xl font-bold">Your basket is empty.</p>
      <p className="max-w-72 text-sm text-muted">Explore our international groceries and discover something delicious.</p>
      <Button as={Link} to="/shop" onClick={onNavigate} className="mt-2">Start Shopping</Button>
    </div>
  )
}
