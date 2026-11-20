import { useRef, useState } from 'react'
import Button from '../Button.jsx'
import { deliveryConfig } from '../../data/deliveryConfig.js'
import { isExamplePostcode, normalizePostcode } from './deliveryDatesAndPostcode.js'

export default function DeliveryPostcodeChecker({ postcode, initialDraft, onPostcodeChange }) {
  const input = useRef(null)
  const [draft, setDraft] = useState(initialDraft ?? postcode)
  const [error, setError] = useState('')
  const [checked, setChecked] = useState(postcode)

  function checkAvailability(event) {
    event.preventDefault()
    const normalized = normalizePostcode(draft)
    if (!normalized) {
      setError(draft.trim() ? 'Enter a full UK postcode in a format such as RG1 1AA.' : 'Enter your delivery postcode.')
      setChecked('')
      onPostcodeChange('')
      input.current.focus()
      return
    }
    setError('')
    setDraft(normalized)
    setChecked(normalized)
    onPostcodeChange(normalized)
  }

  return (
    <form onSubmit={checkAvailability} className="rounded-2xl border border-line bg-white p-5 sm:p-6">
      <label htmlFor="delivery-postcode" className="block font-heading text-lg font-bold">Enter your delivery postcode</label>
      <p id="delivery-postcode-hint" className="mt-2 text-sm text-muted">
        Example Reading districts for this demonstration: {deliveryConfig.exampleDistricts.join(', ')}. The shop will confirm its delivery areas separately.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
        <input
          ref={input}
          id="delivery-postcode"
          name="postcode"
          type="text"
          value={draft}
          placeholder="e.g. RG1 1AA"
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? 'delivery-postcode-hint delivery-postcode-error' : 'delivery-postcode-hint'}
          onChange={(event) => {
            const value = event.target.value
            setDraft(value)
            setError('')
            if (normalizePostcode(value) !== checked) {
              setChecked('')
              onPostcodeChange('')
            }
          }}
          className="min-h-12 w-full min-w-0 rounded-control border border-field bg-surface px-4 text-base aria-invalid:border-brand-red focus-visible:outline-2 focus-visible:outline-brand-red"
        />
        <Button type="submit">Check Availability</Button>
      </div>
      {error && <p id="delivery-postcode-error" role="alert" className="mt-3 text-sm font-semibold text-brand-red">{error}</p>}
      <div role="status" className={checked ? 'mt-4 rounded-control bg-cream p-3 text-sm text-ink' : 'sr-only'}>
        {checked && (isExamplePostcode(checked)
          ? `${checked} matches an example district. Choose an illustrative delivery date and time below.`
          : 'Delivery availability for this postcode has not yet been confirmed.')}
      </div>
    </form>
  )
}
