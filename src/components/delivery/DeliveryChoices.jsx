function DeliveryChoices({ legend, hint, name, choices, value, onChange, disabled = false }) {
  return (
    <fieldset disabled={disabled} aria-describedby={name + '-hint'} className="min-w-0 rounded-2xl border border-line bg-white p-5 sm:p-6">
      <legend className="px-2 font-heading text-lg font-bold">{legend}</legend>
      <p id={name + '-hint'} className="mb-4 text-sm text-muted">{hint}</p>
      <div className="grid grid-cols-2 gap-2 min-[420px]:grid-cols-3 sm:gap-3 xl:grid-cols-4">
        {choices.map(({ id, label, weekday, fullLabel }) => (
          <label key={id} className="relative cursor-pointer has-disabled:cursor-default">
            <input
              type="radio"
              name={name}
              value={id}
              checked={id === value}
              onChange={() => onChange(id)}
              aria-label={fullLabel ?? label}
              className="peer sr-only"
            />
            <span className="flex h-full min-h-14 flex-col justify-center gap-1 rounded-control border border-field px-2 py-2 text-center text-sm font-semibold peer-enabled:hover:bg-cream peer-checked:border-brand-red peer-checked:shadow-[inset_0_0_0_1px_#c62828] peer-checked:bg-cream peer-checked:text-brand-red peer-disabled:border-line peer-disabled:bg-surface peer-disabled:text-muted peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-red">
              {weekday && <span className="text-xs font-medium">{weekday}</span>}
              <span>{label}</span>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export function DeliveryDatePicker({ dates, value, onChange }) {
  return (
    <DeliveryChoices legend="Choose a delivery date" hint="The next seven calendar days, starting tomorrow, in London time." name="delivery-date" choices={dates} value={value} onChange={onChange} />
  )
}

export function DeliveryTimeSlots({ slots, value, onChange, hasDate }) {
  return (
    <DeliveryChoices legend="Choose a delivery time" hint={hasDate ? 'All time windows are illustrative. Selecting one does not reserve delivery capacity.' : 'Select a date to choose an illustrative time window.'} name="delivery-slot" choices={slots} value={value} onChange={onChange} disabled={!hasDate} />
  )
}
