import { useState } from 'react'
import Button from '../Button.jsx'
import { normalizePostcode } from '../delivery/deliveryDatesAndPostcode.js'

const fields = [
  { id: 'firstName', label: 'First name' },
  { id: 'lastName', label: 'Last name' },
  { id: 'email', label: 'Email address', type: 'email' },
  { id: 'phone', label: 'UK telephone number', type: 'tel' },
  { id: 'address1', label: 'Address line 1', wide: true },
  { id: 'address2', label: 'Address line 2 (optional)', optional: true, wide: true },
  { id: 'town', label: 'Town / City' },
  { id: 'postcode', label: 'Postcode' },
]

function validPhone(value) {
  if (!/^[+0-9()\s-]+$/.test(value)) return false
  const compact = value.replace(/[()\s-]/g, '').replace(/^(?:\+44|0044)0?/, '0')
  return /^0[1-9]\d{8,9}$/.test(compact)
}

export default function CustomerDetailsForm({ details, onChange, onContinue }) {
  const [errors, setErrors] = useState({})

  function submit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const cleaned = Object.fromEntries(fields.map(({ id }) => [id, (details[id] ?? '').trim()]))
    const errors = {}

    for (const { id, label, optional } of fields) {
      if (!optional && !cleaned[id]) errors[id] = `Enter your ${label.toLowerCase()}.`
    }
    if (cleaned.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned.email)) {
      errors.email = 'Enter an email address such as name@example.com.'
    }
    if (cleaned.phone && !validPhone(cleaned.phone)) {
      errors.phone = 'Enter a UK telephone number starting with 0, +44 or 0044.'
    }
    if (cleaned.postcode) {
      cleaned.postcode = normalizePostcode(cleaned.postcode)
      if (!cleaned.postcode) errors.postcode = 'Enter a full UK postcode such as RG1 1AA.'
    }
    setErrors(errors)
    const firstError = Object.keys(errors)[0]
    if (firstError) {
      requestAnimationFrame(() => form.querySelector('#checkout-' + firstError)?.focus())
      return
    }
    onContinue(cleaned)
  }

  return (
    <form noValidate autoComplete="off" onSubmit={submit}>
      <p className="mb-5 text-sm text-muted">Details are kept for this demonstration session. You can use example details. All fields are required unless marked optional.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map(({ id, label, type = 'text', optional, wide }) => (
          <div key={id} className={wide ? 'sm:col-span-2' : undefined}>
            <label htmlFor={'checkout-' + id} className="mb-1.5 block text-sm font-semibold">{label}</label>
            <input
              id={'checkout-' + id}
              type={type}
              value={details[id] ?? ''}
              required={!optional}
              autoCapitalize={id === 'postcode' ? 'characters' : undefined}
              aria-invalid={errors[id] ? true : undefined}
              aria-describedby={errors[id] ? 'checkout-error-' + id : undefined}
              onChange={(event) => {
                onChange(id, event.target.value)
                setErrors(current => ({ ...current, [id]: undefined }))
              }}
              className="min-h-12 w-full min-w-0 rounded-control border border-field bg-white px-3 text-base aria-invalid:border-brand-red focus-visible:outline-2 focus-visible:outline-brand-red"
            />
            {errors[id] && <p id={'checkout-error-' + id} className="mt-1 text-sm text-brand-red">{errors[id]}</p>}
          </div>
        ))}
      </div>
      <Button type="submit" className="mt-6">Continue to Delivery</Button>
    </form>
  )
}
