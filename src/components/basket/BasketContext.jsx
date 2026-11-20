import { createContext, useContext, useEffect, useState } from 'react'
import { products } from '../../data/products.js'

const BasketContext = createContext(null)
const storageKey = 'ifc-basket'
const storageVersion = 1
const productsById = new Map(products.map(product => [product.id, product]))

export const maxBasketQuantity = 999
export const basketNotice = 'Demonstration basket — products and prices are illustrative. Online ordering is not yet available.'

const gbp = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' })
export const formatPrice = (pence) => gbp.format(pence / 100)

function restoreQuantities() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey))
    if (saved?.version !== storageVersion || !Array.isArray(saved.items)) return {}

    return Object.fromEntries(saved.items.filter(entry =>
      Array.isArray(entry) && productsById.has(entry[0]) &&
      Number.isInteger(entry[1]) && entry[1] >= 1 && entry[1] <= maxBasketQuantity
    ))
  } catch {
    return {}
  }
}

export function BasketProvider({ children }) {
  const [{ quantities, announcement }, setBasket] = useState(() => ({
    quantities: restoreQuantities(),
    announcement: '',
  }))

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ version: storageVersion, items: Object.entries(quantities) }))
    } catch {
      // The basket remains usable in memory when storage is unavailable.
    }
  }, [quantities])

  const items = Object.entries(quantities).map(([id, quantity]) => {
    const product = productsById.get(id)
    return { product, quantity, lineTotal: product.priceInPence * quantity }
  })
  const itemCount = items.reduce((count, item) => count + item.quantity, 0)
  const subtotal = items.reduce((total, item) => total + item.lineTotal, 0)

  function changeQuantity(id, difference, announceAdd = false) {
    if (!productsById.has(id)) return
    setBasket(current => {
      const previous = current.quantities[id] ?? 0
      if (!previous && !announceAdd) return current
      const quantity = Math.max(1, Math.min(previous + difference, maxBasketQuantity))
      if (quantity === previous) return current
      return {
        quantities: { ...current.quantities, [id]: quantity },
        announcement: announceAdd ? `${productsById.get(id).name} added to your basket. Quantity: ${quantity}.` : '',
      }
    })
  }

  function removeProduct(id) {
    setBasket(current => {
      const quantities = { ...current.quantities }
      delete quantities[id]
      return { quantities, announcement: '' }
    })
  }

  return (
    <BasketContext.Provider value={{
      items, itemCount, subtotal,
      addProduct: (id) => changeQuantity(id, 1, true),
      changeQuantity,
      removeProduct,
      clearBasket: () => setBasket({ quantities: {}, announcement: '' }),
    }}>
      {children}
      <p className="sr-only" role="status" aria-atomic="true">{announcement}</p>
    </BasketContext.Provider>
  )
}

export function useBasket() {
  return useContext(BasketContext)
}
