import { departments } from '../data/departments.js'
import { products } from '../data/products.js'
import { shopRegionNames } from '../data/shopRegions.js'
import { deliveryConfig } from '../data/deliveryConfig.js'
import { deliveryDates, londonDay } from '../components/delivery/deliveryDatesAndPostcode.js'

export const adminStorageKey = 'ifc-admin-demo'
export const orderStatuses = ['New', 'Preparing', 'Ready for Delivery', 'Out for Delivery', 'Completed', 'Cancelled']
export const productStatuses = ['Active', 'Draft', 'Archived']
export const gbp = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' })
export const money = (pence) => gbp.format(pence / 100)

const departmentIds = new Set(departments.map(({ id }) => id))
const categoryDescriptions = [
  'Fresh fruit and vegetables for everyday meals.',
  'Illustrative halal meat and poultry catalogue examples.',
  'Traditional breads, savoury pastries and sweet treats.',
  'Cheeses, yoghurt and other chilled groceries.',
  'Groceries and specialities from around the world.',
  'Cooking essentials, grains, seasonings and snacks.',
]

export function createDemoData() {
  const dates = deliveryDates(londonDay())
  const windows = deliveryConfig.timeWindows.map(({ label }) => label.split('–').join('-'))

  return {
    products: products.map(({ id, name, category, region, priceInPence, unit, description }) => ({
      id, name, category, region, priceInPence, unit, description, status: 'Active',
    })),
    categories: departments.map(({ id, name }, index) => ({
      id, name, description: categoryDescriptions[index], order: index + 1,
    })),
    orders: [
      { id: 'DEMO-001', customer: 'Sample Shopper A', items: 4, total: 1847, date: dates[0].id, window: windows[0], status: 'New' },
      { id: 'DEMO-002', customer: 'Sample Shopper B', items: 7, total: 3294, date: dates[0].id, window: windows[2], status: 'Preparing' },
      { id: 'DEMO-003', customer: 'Sample Shopper C', items: 3, total: 1516, date: dates[1].id, window: windows[1], status: 'Ready for Delivery' },
    ],
    slots: windows.map((window, index) => ({
      id: 'demo-slot-' + index, date: dates[0].id, window, capacity: [8, 6, 6, 4][index] ?? 0, enabled: index !== 3,
    })),
    settings: { districts: [...deliveryConfig.exampleDistricts], feeInPence: deliveryConfig.feeInPence, windows },
  }
}

const text = (value, max = 160) => typeof value === 'string' && value.trim().length > 0 && value.length <= max
const whole = (value, min, max) => Number.isInteger(value) && value >= min && value <= max
const validId = (value) => typeof value === 'string' && /^[a-z0-9-]{1,100}$/i.test(value)
const list = (value, validator, max = 1000) =>
  Array.isArray(value) && value.length <= max && value.every(validator) &&
  new Set(value.map(({ id }) => id)).size === value.length

export function parsePounds(value) {
  const cleaned = String(value).trim()
  if (!/^\d{1,5}(?:\.\d{1,2})?$/.test(cleaned)) return null
  const [pounds, fraction = ''] = cleaned.split('.')
  return Number(pounds) * 100 + Number(fraction.padEnd(2, '0'))
}

export function validDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const date = new Date(value + 'T00:00:00Z')
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value
}

export function validWindow(value) {
  if (typeof value !== 'string' || !/^(?:[01]\d|2[0-3]):[0-5]\d-(?:[01]\d|2[0-3]):[0-5]\d$/.test(value)) return false
  const [start, end] = value.split('-')
  return start < end
}

export const windowLabel = (value) => value.replace('-', '–')
const dateFormat = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
export const dateLabel = (value) => dateFormat.format(new Date(value + 'T00:00:00Z'))

export const validDistrict = (value) => typeof value === 'string' && /^[A-PR-UWYZ](?:\d[\dA-HJKSTUW]?|[A-HK-Y]\d[\dABEHMNPRVWXY]?)$/.test(value)

function validProduct(product) {
  return product && validId(product.id) && text(product.name) && text(product.unit, 40) &&
    typeof product.description === 'string' && product.description.length <= 400 &&
    departmentIds.has(product.category) && shopRegionNames.has(product.region) &&
    whole(product.priceInPence, 0, 9999999) && productStatuses.includes(product.status)
}

function validCategory(category) {
  return category && departmentIds.has(category.id) && text(category.name) &&
    typeof category.description === 'string' && category.description.length <= 400 && whole(category.order, 1, 999)
}

function validSlot(slot) {
  return slot && validId(slot.id) && validDate(slot.date) && validWindow(slot.window) &&
    whole(slot.capacity, 0, 999) && typeof slot.enabled === 'boolean'
}

function validSettings(settings) {
  return settings && whole(settings.feeInPence, 0, 9999999) &&
    Array.isArray(settings.districts) && settings.districts.length > 0 && settings.districts.length <= 100 &&
    settings.districts.every(validDistrict) && new Set(settings.districts).size === settings.districts.length &&
    Array.isArray(settings.windows) && settings.windows.length > 0 && settings.windows.length <= 24 &&
    settings.windows.every(validWindow) && new Set(settings.windows).size === settings.windows.length
}

export function restoreDemoData() {
  const defaults = createDemoData()
  try {
    const saved = JSON.parse(localStorage.getItem(adminStorageKey))
    if (saved?.version !== 1) return defaults
    return {
      products: list(saved.products, validProduct) ? saved.products : defaults.products,
      categories: list(saved.categories, validCategory) && saved.categories.length === departmentIds.size ? saved.categories : defaults.categories,
      slots: list(saved.slots, validSlot) ? saved.slots : defaults.slots,
      settings: validSettings(saved.settings) ? saved.settings : defaults.settings,
      // Restore only status values onto fixed fictional orders.
      orders: defaults.orders.map(order => ({
        ...order,
        status: orderStatuses.includes(saved.orderStatuses?.[order.id]) ? saved.orderStatuses[order.id] : order.status,
      })),
    }
  } catch {
    return defaults
  }
}

export function persistDemoData({ products, categories, slots, settings, orders }) {
  localStorage.setItem(adminStorageKey, JSON.stringify({
    version: 1, products, categories, slots, settings,
    orderStatuses: Object.fromEntries(orders.map(({ id, status }) => [id, status])),
  }))
}
