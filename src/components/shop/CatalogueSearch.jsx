import { Search, X } from 'lucide-react'

export default function CatalogueSearch({ id, label, value, onChange, onClear, className = '' }) {
  return (
    <div role="search" aria-label={label} className={`relative min-w-0 ${className}`}>
      <label className="sr-only" htmlFor={id}>{label}</label>
      <Search aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-4 my-auto size-5 text-muted" />
      <input
        id={id}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search for products"
        className="min-h-12 w-full rounded-full border border-field bg-white py-2 pr-12 pl-12 text-base text-ink placeholder:text-muted focus-visible:border-brand-red focus-visible:outline-2 focus-visible:outline-brand-red [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button
          type="button"
          aria-label={`Clear ${label.toLowerCase()}`}
          onClick={(event) => {
            event.currentTarget.previousElementSibling.focus()
            onClear()
          }}
          className="absolute inset-y-0 right-1 my-auto grid size-11 place-items-center rounded-full text-muted hover:bg-surface focus-visible:outline-2 focus-visible:outline-brand-red"
        >
          <X aria-hidden="true" className="size-5" />
        </button>
      )}
    </div>
  )
}
