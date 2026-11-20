import { useId } from 'react'

export default function CategoryFilters({ options, value, onChange, label = 'Category', legend = 'Categories' }) {
  const radioName = useId()
  const selectId = useId()

  return (
    <div className="min-w-0">
      <div className="lg:hidden">
        <label htmlFor={selectId} className="mb-2 block text-sm font-semibold">{label}</label>
        <select
          id={selectId}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-h-12 w-full rounded-control border border-field bg-white px-3 text-base focus-visible:outline-2 focus-visible:outline-brand-red"
        >
          {options.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
        </select>
      </div>
      <fieldset className="hidden min-w-0 lg:block">
        <legend className="mb-4 font-heading text-lg font-bold">{legend}</legend>
        <div className="grid gap-1 rounded-2xl border border-line bg-white p-2">
          {options.map(({ id, name }) => (
            <label key={id} className="relative cursor-pointer">
              <input
                type="radio"
                name={radioName}
                value={id}
                checked={value === id}
                onChange={() => onChange(id)}
                className="peer sr-only"
              />
              <span className="flex min-h-11 items-center rounded-control px-3 py-2 text-sm font-medium hover:bg-surface peer-checked:bg-cream peer-checked:font-semibold peer-checked:text-brand-red peer-focus-visible:outline-2 peer-focus-visible:outline-brand-red">
                {name}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  )
}
