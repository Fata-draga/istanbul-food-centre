import { useState } from 'react'
import Button from '../components/Button.jsx'
import { useDemo } from './DemoContext.jsx'
import { dateLabel, validDate, validWindow, windowLabel } from './demoData.js'
import { Badge, Field, FormActions, PageIntro, Panel, controlClass, quietButton } from './ui.jsx'

function SlotForm({ initial, windows, onSave, onCancel }) {
  const [error, setError] = useState('')
  const [window, setWindow] = useState(initial.window ?? windows[0])
  const options = [...new Set([...(initial.window ? [initial.window] : []), ...windows])]
  return (
    <Panel className="mb-4">
      <h2 className="mb-4 text-xl">{initial.id ? 'Edit illustrative slot' : 'Add illustrative slot'}</h2>
      <form onSubmit={(event) => {
        event.preventDefault()
        const form = new FormData(event.currentTarget)
        const date = form.get('date')
        const capacityText = String(form.get('capacity'))
        const capacity = Number(capacityText)
        if (!validDate(date) || !validWindow(window)) return setError('Choose a valid date and time window.')
        if (!/^\d{1,3}$/.test(capacityText) || !Number.isInteger(capacity) || capacity < 0 || capacity > 999) return setError('Enter a whole-number capacity from 0 to 999.')
        const conflict = onSave({ id: initial.id ?? crypto.randomUUID(), date, capacity, window, enabled: form.has('enabled') })
        if (conflict) setError(conflict)
      }}>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <Field label="Example date"><input name="date" type="date" autoFocus required defaultValue={initial.date} className={controlClass} /></Field>
          <Field label="Time window"><select value={window} onChange={(event) => setWindow(event.target.value)} className={controlClass}>{options.map(value => <option key={value} value={value}>{windowLabel(value)}</option>)}</select></Field>
          <Field label="Illustrative capacity"><input name="capacity" type="number" required min="0" max="999" step="1" defaultValue={initial.capacity ?? 0} className={controlClass} /></Field>
        </div>
        <label className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold"><input type="checkbox" name="enabled" defaultChecked={initial.enabled ?? true} className="size-5 accent-brand-red focus-visible:outline-2 focus-visible:outline-brand-red" /> Enable demo slot</label>
        <FormActions error={error} onCancel={onCancel} label="Save Slot" />
      </form>
    </Panel>
  )
}

export default function DeliverySlotsPage() {
  const { data, update } = useDemo()
  const [editor, setEditor] = useState(null)
  const slots = [...data.slots].sort((a, b) => (a.date + a.window).localeCompare(b.date + b.window))
  return (
    <>
      <PageIntro title="Delivery Slots" description="Plan example time windows and illustrative capacity. This schedule is separate from the storefront scheduler.">
        <Button onClick={() => setEditor({})}>Add Slot</Button>
      </PageIntro>
      {editor && <SlotForm key={editor.id ?? 'new'} initial={editor} windows={data.settings.windows} onCancel={() => setEditor(null)} onSave={(slot) => {
        if (data.slots.some(item => item.id !== slot.id && item.date === slot.date && item.window === slot.window)) return 'That date and window already have a demonstration slot.'
        update('slots', current => editor.id ? current.map(item => item.id === slot.id ? slot : item) : [...current, slot], 'Illustrative slot saved.')
        setEditor(null)
      }} />}
      <div className="mb-4"><Badge>SAMPLE DATA</Badge></div>
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {slots.map(slot => (
          <li key={slot.id} className="min-w-0">
            <Panel className="h-full">
              <Badge>{slot.enabled ? 'Enabled' : 'Disabled'}</Badge>
              <h2 className="mt-3 text-xl">{windowLabel(slot.window)}</h2>
              <p className="mt-1 text-sm text-muted">{dateLabel(slot.date)}</p>
              <p className="mt-3 text-sm">Illustrative capacity <strong className="tabular-nums">{slot.capacity}</strong></p>
              <div className="mt-3 flex flex-wrap gap-1">
                <button type="button" className={quietButton} onClick={() => setEditor(slot)}>Edit</button>
                <button type="button" className={quietButton} onClick={() => update('slots', current => current.map(item => item.id === slot.id ? { ...item, enabled: !item.enabled } : item), 'Illustrative slot updated.')}>{slot.enabled ? 'Disable' : 'Enable'}</button>
                <button type="button" className={quietButton} onClick={() => {
                  if (!window.confirm('Remove this illustrative delivery slot?')) return
                  if (editor?.id === slot.id) setEditor(null)
                  update('slots', current => current.filter(item => item.id !== slot.id), 'Illustrative slot removed.')
                }}>Remove</button>
              </div>
            </Panel>
          </li>
        ))}
      </ul>
      {!slots.length && <Panel>No demonstration slots. Add a slot to begin.</Panel>}
    </>
  )
}
