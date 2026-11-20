import { useRef, useState } from 'react'
import { Plus, Search } from 'lucide-react'
import Button from '../components/Button.jsx'
import { shopRegions } from '../data/shopRegions.js'
import { useDemo } from './DemoContext.jsx'
import { money, parsePounds, productStatuses } from './demoData.js'
import { Badge, Field, FormActions, PageIntro, Panel, Table, controlClass, quietButton } from './ui.jsx'

function ProductForm({ initial, categories, onSave, onCancel }) {
  const [error, setError] = useState('')
  return (
    <Panel className="mb-5">
      <h2 className="mb-4 text-xl">{initial.id ? 'Edit Product' : 'Add Product'}</h2>
      <form onSubmit={(event) => {
        event.preventDefault()
        const form = new FormData(event.currentTarget)
        const values = Object.fromEntries(form.entries())
        const priceInPence = parsePounds(values.price)
        if (!values.name.trim() || !values.unit.trim()) return setError('Enter a product name and unit.')
        if (priceInPence === null) return setError('Enter a price from £0.00 to £99,999.99 with up to two decimal places.')
        onSave({
          id: initial.id ?? crypto.randomUUID(),
          name: values.name.trim(), unit: values.unit.trim(), description: values.description.trim(),
          category: values.category, region: values.region, status: values.status, priceInPence,
        })
      }}>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <Field label="Product name"><input autoFocus name="name" required maxLength={160} defaultValue={initial.name} className={controlClass} /></Field>
          <Field label="Price in GBP"><input name="price" required inputMode="decimal" defaultValue={initial.id ? (initial.priceInPence / 100).toFixed(2) : ''} className={controlClass} /></Field>
          <Field label="Unit or weight"><input name="unit" required maxLength={40} defaultValue={initial.unit} className={controlClass} /></Field>
          <Field label="Department"><select name="category" defaultValue={initial.category ?? categories[0].id} className={controlClass}>{categories.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}</select></Field>
          <Field label="Country or region"><select name="region" defaultValue={initial.region ?? 'international'} className={controlClass}>{shopRegions.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}</select></Field>
          <Field label="Product status"><select name="status" defaultValue={initial.status ?? 'Draft'} className={controlClass}>{productStatuses.map(status => <option key={status}>{status}</option>)}</select></Field>
          <Field label="Description" className="sm:col-span-2 xl:col-span-3"><textarea name="description" rows={2} maxLength={400} defaultValue={initial.description} className={controlClass} /></Field>
        </div>
        <FormActions error={error} onCancel={onCancel} label={initial.id ? 'Save Product' : 'Add Demo Product'} />
      </form>
    </Panel>
  )
}

export default function ProductsPage() {
  const { data, update } = useDemo()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [region, setRegion] = useState('')
  const [editor, setEditor] = useState(null)
  const add = useRef(null)
  const categories = [...data.categories].sort((a, b) => a.order - b.order)
  const categoryNames = new Map(categories.map(({ id, name }) => [id, name]))
  const regionNames = new Map(shopRegions.map(({ id, name }) => [id, name]))
  const filtered = data.products.filter(product => (!category || product.category === category) && (!region || product.region === region) &&
    [product.name, product.description, product.id].some(value => value.toLocaleLowerCase('en-GB').includes(query.trim().toLocaleLowerCase('en-GB'))))

  function closeEditor() {
    setEditor(null)
    add.current?.focus()
  }

  return (
    <>
      <PageIntro title="Products" description="Search and manage local catalogue examples. The storefront uses its own catalogue.">
        <Button ref={add} onClick={() => setEditor({})}><Plus aria-hidden="true" className="size-4" /> Add Product</Button>
      </PageIntro>
      {editor && <ProductForm key={editor.id ?? 'new'} initial={editor} categories={categories} onCancel={closeEditor} onSave={(product) => {
        update('products', current => editor.id ? current.map(item => item.id === product.id ? product : item) : [product, ...current], 'Demo product saved.')
        closeEditor()
      }} />}
      <Panel>
        <div className="mb-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-[1.2fr_1fr_1fr]">
          <Field label="Search products">
            <div className="relative">
              <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-3.5 size-4 text-muted" />
              <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name or ID" className={controlClass + ' pl-9'} />
            </div>
          </Field>
          <Field label="Filter by department"><select value={category} onChange={(event) => setCategory(event.target.value)} className={controlClass}><option value="">All departments</option>{categories.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}</select></Field>
          <Field label="Filter by country or region"><select value={region} onChange={(event) => setRegion(event.target.value)} className={controlClass}><option value="">All regions</option>{shopRegions.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}</select></Field>
        </div>
        <p className="mb-3 text-sm text-muted" role="status">{filtered.length} of {data.products.length} demonstration products</p>
        <Table columns={['Product', 'Price', 'Department', 'Region', 'Status', 'Actions']} label="Demo products" empty={!filtered.length && 'No products match these filters.'}>
          {filtered.map(product => (
            <tr key={product.id} className="hover:bg-surface">
              <th scope="row" className="min-w-40 px-4 py-3 font-semibold">{product.name}<span className="block text-xs font-normal text-muted">{product.unit}</span></th>
              <td className="px-4 py-3 whitespace-nowrap tabular-nums">{money(product.priceInPence)}</td>
              <td className="min-w-36 px-4 py-3">{categoryNames.get(product.category)}</td>
              <td className="px-4 py-3">{regionNames.get(product.region)}</td>
              <td className="px-4 py-3"><Badge>{product.status}</Badge></td>
              <td className="px-4 py-3">
                <div className="flex">
                  <button type="button" aria-label={`Edit ${product.name}`} className={quietButton} onClick={() => setEditor(product)}>Edit</button>
                  <button type="button" aria-label={`Delete ${product.name}`} className={quietButton} onClick={() => {
                    if (!window.confirm('Delete this product from the local demo catalogue?')) return
                    if (editor?.id === product.id) setEditor(null)
                    update('products', current => current.filter(item => item.id !== product.id), 'Demo product deleted.')
                    add.current?.focus()
                  }}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </Panel>
    </>
  )
}
