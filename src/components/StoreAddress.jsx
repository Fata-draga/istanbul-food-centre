import { store } from '../data/store.js'

export default function StoreAddress({ className = '' }) {
  return (
    <address className={`text-sm leading-relaxed text-muted not-italic ${className}`}>
      <strong className="block font-semibold text-ink">{store.name}</strong>
      <span className="block">{store.street}</span>
      <span className="block">{store.town}</span>
      <span className="block">{store.postcode}</span>
      <span className="block">{store.country}</span>
    </address>
  )
}
