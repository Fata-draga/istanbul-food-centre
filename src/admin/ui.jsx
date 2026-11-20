import Button from '../components/Button.jsx'

export const controlClass = 'min-h-11 w-full min-w-0 rounded-control border border-field bg-white px-3 py-2 text-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-red'
export const quietButton = 'inline-flex min-h-11 items-center rounded-sm px-2 text-sm font-semibold text-brand-red underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-brand-red'

export function Panel({ children, className = '' }) {
  return <div className={`min-w-0 rounded-2xl border border-line bg-white p-4 shadow-control sm:p-6 ${className}`}>{children}</div>
}

export function PageIntro({ title, description, children }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 tabIndex={-1} className="text-3xl leading-tight focus:outline-none sm:text-4xl">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">{description}</p>
      </div>
      {children}
    </div>
  )
}

export function Field({ label, children, className = '' }) {
  return <label className={`grid min-w-0 content-start gap-1.5 text-sm font-semibold ${className}`}>{label}{children}</label>
}

export function Badge({ children }) {
  return <span className="inline-flex w-fit rounded-full bg-cream px-2.5 py-1 text-xs font-semibold text-brand-red">{children}</span>
}

export function Table({ columns, label, children, empty }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-line focus-visible:outline-2 focus-visible:outline-brand-red" tabIndex={0} role="region" aria-label={label + ' table'}>
      <table className="w-full border-collapse text-left text-sm">
        <caption className="sr-only">{label}</caption>
        <thead className="bg-surface text-ink">
          <tr>{columns.map(column => <th key={column} scope="col" className="px-4 py-3 whitespace-nowrap">{column}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-line">{children}</tbody>
      </table>
      {empty && <p className="px-4 py-5 text-sm text-muted">{empty}</p>}
    </div>
  )
}

export function FormActions({ error, onCancel, label = 'Save changes' }) {
  return (
    <div className="mt-4">
      {error && <p role="alert" className="mb-3 rounded-control bg-cream p-3 text-sm font-semibold text-brand-red">{error}</p>}
      <div className="flex flex-wrap gap-2">
        <Button type="submit">{label}</Button>
        {onCancel && <Button variant="outline" onClick={onCancel}>Cancel</Button>}
      </div>
    </div>
  )
}
