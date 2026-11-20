import { useState } from 'react'
import { deliveryConfig } from '../data/deliveryConfig.js'
import { useDemo } from './DemoContext.jsx'
import { parsePounds, validDistrict, validWindow } from './demoData.js'
import { Badge, Field, FormActions, PageIntro, Panel, controlClass } from './ui.jsx'

export default function DeliverySettingsPage() {
  const { data, update } = useDemo()
  const [error, setError] = useState('')
  const { districts, feeInPence, windows } = data.settings
  return (
    <>
      <PageIntro title="Delivery Areas & Fees" description="Configure local examples of delivery areas, fees and scheduling windows."><Badge>SAMPLE DATA</Badge></PageIntro>
      <Panel className="max-w-3xl">
        <p className="mb-4 text-sm text-muted">The storefront scheduler currently uses these example districts: {deliveryConfig.exampleDistricts.join(', ')}.</p>
        <form key={JSON.stringify(data.settings)} onSubmit={(event) => {
          event.preventDefault()
          const form = new FormData(event.currentTarget)
          const districts = [...new Set(String(form.get('districts')).toUpperCase().split(/[\s,]+/).filter(Boolean))]
          const feeInPence = parsePounds(form.get('fee'))
          const windows = [...new Set(String(form.get('windows')).split(/\r?\n/).map(value => value.trim().replace(/\s*[–-]\s*/g, '-')).filter(Boolean))]
          if (!districts.length || districts.length > 100 || districts.some(value => !validDistrict(value))) return setError('Enter between 1 and 100 valid outward postcode districts, such as RG1 or RG30.')
          if (feeInPence === null) return setError('Enter a non-negative fee with up to two decimal places.')
          if (!windows.length || windows.length > 24 || windows.some(value => !validWindow(value))) return setError('Enter 1 to 24 time windows, one per line in 24-hour format, such as 10:00–12:00.')
          setError('')
          update('settings', () => ({ districts, feeInPence, windows }), 'Demo delivery settings saved.')
        }}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Example postcode districts"><input name="districts" required maxLength={700} defaultValue={districts.join(', ')} className={controlClass} /></Field>
            <Field label="Illustrative delivery fee in GBP"><input name="fee" required inputMode="decimal" defaultValue={(feeInPence / 100).toFixed(2)} className={controlClass} /></Field>
            <Field label="Delivery windows (one per line)" className="sm:col-span-2"><textarea name="windows" required maxLength={500} rows={5} defaultValue={windows.join('\n')} className={controlClass} /></Field>
          </div>
          <FormActions error={error} label="Save Delivery Settings" />
        </form>
      </Panel>
    </>
  )
}
