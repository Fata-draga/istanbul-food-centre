import { CalendarDays, Layers3, Package, ShoppingBasket } from 'lucide-react'
import { Link } from 'react-router'
import { useDemo } from './DemoContext.jsx'
import { dateLabel, windowLabel } from './demoData.js'
import { Badge, PageIntro, Panel, quietButton } from './ui.jsx'

export default function OverviewPage() {
  const { data } = useDemo()
  const activeSlots = data.slots.filter(slot => slot.enabled)
  const cards = [
    { label: 'Demonstration products', value: data.products.length, Icon: Package, path: '/products' },
    { label: 'Departments', value: data.categories.length, Icon: Layers3, path: '/categories' },
    { label: 'Example orders', value: data.orders.length, Icon: ShoppingBasket, path: '/orders', sample: true },
    { label: 'Enabled delivery slots', value: activeSlots.length, Icon: CalendarDays, path: '/delivery-slots', sample: true },
  ]
  return (
    <>
      <PageIntro title="Overview" description="Review the local catalogue and explore sample order and delivery workflows." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ label, value, Icon, path, sample }) => (
          <Panel key={label}>
            <span className="mb-4 grid size-11 place-items-center rounded-xl bg-cream text-brand-red"><Icon aria-hidden="true" className="size-5" /></span>
            <p className="text-3xl font-bold tabular-nums">{value}</p>
            <h2 className="mt-1 text-base leading-tight"><Link to={path} className="rounded-sm hover:text-brand-red hover:underline focus-visible:outline-2 focus-visible:outline-brand-red">{label}</Link></h2>
            {sample && <div className="mt-2"><Badge>SAMPLE DATA</Badge></div>}
          </Panel>
        ))}
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <Panel>
          <Badge>SAMPLE DATA</Badge>
          <h2 className="mt-3 text-xl">Example orders</h2>
          <ul className="mt-3 divide-y divide-line">
            {data.orders.map(order => <li key={order.id} className="flex flex-wrap justify-between gap-2 py-3 text-sm"><strong>{order.id}</strong><span className="text-muted">{order.status}</span></li>)}
          </ul>
          <Link to="/orders" className={quietButton}>Manage sample orders</Link>
        </Panel>
        <Panel>
          <Badge>SAMPLE DATA</Badge>
          <h2 className="mt-3 text-xl">Delivery schedule</h2>
          <ul className="mt-3 divide-y divide-line">
            {[...activeSlots].sort((a, b) => (a.date + a.window).localeCompare(b.date + b.window)).slice(0, 4).map(slot => (
              <li key={slot.id} className="flex flex-wrap justify-between gap-2 py-3 text-sm"><strong>{dateLabel(slot.date)} · {windowLabel(slot.window)}</strong><span className="text-muted">Sample capacity {slot.capacity}</span></li>
            ))}
          </ul>
          {!activeSlots.length && <p className="mt-3 text-sm text-muted">No enabled demonstration slots.</p>}
          <Link to="/delivery-slots" className={quietButton}>Manage delivery slots</Link>
        </Panel>
      </div>
    </>
  )
}
