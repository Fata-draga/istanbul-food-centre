import { deliveryConfig } from '../../data/deliveryConfig.js'

const londonCalendar = new Intl.DateTimeFormat('en-GB', {
  timeZone: deliveryConfig.timeZone,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})
const dateLabel = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'UTC',
  weekday: 'long',
  day: 'numeric',
  month: 'short',
})

// Validate postcode shape only. No address or delivery lookup is performed.
const ukPostcode = /^(?:GIR0AA|[A-PR-UWYZ](?:[0-9][0-9A-HJKSTUW]?|[A-HK-Y][0-9][0-9ABEHMNPRVWXY]?)\d[ABD-HJLNP-UW-Z]{2})$/

export function normalizePostcode(value) {
  if (typeof value !== 'string') return ''
  const compact = value.toUpperCase().replace(/\s+/g, '')
  if (!ukPostcode.test(compact)) return ''
  return compact.slice(0, -3) + ' ' + compact.slice(-3)
}

export function isExamplePostcode(postcode) {
  return deliveryConfig.exampleDistricts.includes(postcode.split(' ')[0])
}

export function londonDay(now = new Date()) {
  const parts = Object.fromEntries(londonCalendar.formatToParts(now).map(({ type, value }) => [type, value]))
  return `${parts.year}-${parts.month}-${parts.day}`
}

export function deliveryDates(today) {
  return Array.from({ length: deliveryConfig.daysAhead }, (_, index) => {
    // UTC here represents the London calendar date, avoiding DST shifts during date arithmetic.
    const date = new Date(today + 'T00:00:00Z')
    date.setUTCDate(date.getUTCDate() + index + 1)
    const parts = Object.fromEntries(dateLabel.formatToParts(date).map(({ type, value }) => [type, value]))
    return {
      id: date.toISOString().slice(0, 10),
      weekday: parts.weekday,
      label: `${parts.day} ${parts.month}`,
      fullLabel: dateLabel.format(date),
    }
  })
}
