import { useState } from 'react'
import Button from '../components/Button.jsx'
import { useDemo } from './DemoContext.jsx'
import { Field, FormActions, PageIntro, Panel, controlClass } from './ui.jsx'

function CategoryEditor({ category, onSave, onCancel }) {
  const [error, setError] = useState('')
  return (
    <form onSubmit={(event) => {
      event.preventDefault()
      const form = new FormData(event.currentTarget)
      const name = String(form.get('name')).trim()
      const order = Number(form.get('order'))
      if (!name || !Number.isInteger(order) || order < 1 || order > 999) return setError('Enter a display name and a whole-number order from 1 to 999.')
      onSave({ ...category, name, order, description: String(form.get('description')).trim() })
    }}>
      <h2 className="mb-4 text-xl">Edit department</h2>
      <div className="grid gap-3">
        <Field label="Display name"><input autoFocus name="name" required maxLength={160} defaultValue={category.name} className={controlClass} /></Field>
        <Field label="Description"><textarea name="description" maxLength={400} rows={2} defaultValue={category.description} className={controlClass} /></Field>
        <Field label="Display order"><input name="order" type="number" required min="1" max="999" defaultValue={category.order} className={controlClass} /></Field>
      </div>
      <FormActions error={error} onCancel={onCancel} />
    </form>
  )
}

export default function DepartmentsPage() {
  const { data, update } = useDemo()
  const [editing, setEditing] = useState('')
  return (
    <>
      <PageIntro title="Departments" description="Edit how the six departments appear in this demonstration. Customer-facing routes stay independent." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {[...data.categories].sort((a, b) => a.order - b.order).map(category => (
          <Panel key={category.id}>
            {editing === category.id ? <CategoryEditor category={category} onCancel={() => setEditing('')} onSave={(next) => {
              update('categories', current => current.map(item => item.id === next.id ? next : item), 'Demo department saved.')
              setEditing('')
            }} /> : (
              <>
                <p className="mb-2 text-xs font-semibold text-brand-red">Display order {category.order}</p>
                <h2 className="text-xl">{category.name}</h2>
                <p className="mt-2 text-sm text-muted">{category.description}</p>
                <Button variant="outline" compact onClick={() => setEditing(category.id)} className="mt-4">Edit Department</Button>
              </>
            )}
          </Panel>
        ))}
      </div>
    </>
  )
}
