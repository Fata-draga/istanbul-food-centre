import StoreAddress from '../components/StoreAddress.jsx'
import { store } from '../data/store.js'
import { PageIntro, Panel } from './ui.jsx'

export default function StoreSettingsPage() {
  const details = [
    ['Business name', store.name],
    ['Store address', <StoreAddress key="address" />],
    ['Telephone', store.phone?.label ?? 'Pending confirmation'],
    ['Email', store.email ?? 'Pending confirmation'],
    ['Opening hours', store.openingHours.length ? store.openingHours.map(({ days, hours }) => days + ' ' + hours).join(' · ') : 'Pending confirmation'],
    ['Online ordering', 'Coming soon'],
  ]
  return (
    <>
      <PageIntro title="Store Settings" description="Read-only overview from the central store information." />
      <Panel className="max-w-3xl">
        <dl className="divide-y divide-line">
          {details.map(([label, value]) => (
            <div key={label} className="grid gap-1 py-4 first:pt-0 last:pb-0 sm:grid-cols-[10rem_minmax(0,1fr)]">
              <dt className="text-sm font-semibold">{label}</dt>
              <dd className="break-words text-sm text-muted">{value}</dd>
            </div>
          ))}
        </dl>
      </Panel>
    </>
  )
}
