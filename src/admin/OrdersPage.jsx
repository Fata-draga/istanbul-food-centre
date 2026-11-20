import { useDemo } from './DemoContext.jsx'
import { dateLabel, money, orderStatuses, windowLabel } from './demoData.js'
import { Badge, PageIntro, Panel, Table, controlClass } from './ui.jsx'

export default function OrdersPage() {
  const { data, update } = useDemo()
  return (
    <>
      <PageIntro title="Orders" description="Fictional orders for practising status changes. These changes stay in this browser."><Badge>SAMPLE DATA</Badge></PageIntro>
      <Panel>
        <Table columns={['Reference', 'Sample customer', 'Items', 'Illustrative total', 'Example delivery', 'Status']} label="Fictional sample orders">
          {data.orders.map(order => (
            <tr key={order.id}>
              <th scope="row" className="px-4 py-3 whitespace-nowrap">{order.id}</th>
              <td className="min-w-35 px-4 py-3">{order.customer}</td>
              <td className="px-4 py-3 tabular-nums">{order.items}</td>
              <td className="px-4 py-3 tabular-nums">{money(order.total)}</td>
              <td className="px-4 py-3 whitespace-nowrap">{dateLabel(order.date)}<span className="block text-muted">{windowLabel(order.window)}</span></td>
              <td className="min-w-44 px-4 py-3">
                <select aria-label={`Status for ${order.id}`} value={order.status} className={controlClass} onChange={(event) => {
                  const status = event.target.value
                  update('orders', current => current.map(item => item.id === order.id ? { ...item, status } : item), 'Sample order status saved.')
                }}>{orderStatuses.map(status => <option key={status}>{status}</option>)}</select>
              </td>
            </tr>
          ))}
        </Table>
      </Panel>
    </>
  )
}
