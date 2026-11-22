import { useEffect } from 'react'
import { useSearchParams } from 'react-router'
import Button from '../components/Button.jsx'
import Container from '../components/Container.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import CatalogueSearch from '../components/shop/CatalogueSearch.jsx'
import CategoryFilters from '../components/shop/CategoryFilters.jsx'
import { departments } from '../data/departments.js'
import { deliCategory, storefrontProducts } from '../data/storefrontProducts.js'
import { shopRegionNames, shopRegions } from '../data/shopRegions.js'

const countries = [{ id: '', name: 'All Countries' }, ...shopRegions]
const categories = [{ id: '', name: 'All Products' }, ...departments, deliCategory]
const categoryNames = new Map(categories.map(({ id, name }) => [id, name]))
const sortOptions = [
  { id: '', name: 'Featured' },
  { id: 'price-asc', name: 'Price: Low to High', compare: (a, b) => a.priceInPence - b.priceInPence },
  { id: 'price-desc', name: 'Price: High to Low', compare: (a, b) => b.priceInPence - a.priceInPence },
  { id: 'name-asc', name: 'Name: A–Z', compare: (a, b) => a.name.localeCompare(b.name, 'en-GB') },
  { id: 'name-desc', name: 'Name: Z–A', compare: (a, b) => b.name.localeCompare(a.name, 'en-GB') },
]
const searchText = (value) => value.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '')

export default function ShopPage() {
  const [params, setParams] = useSearchParams()
  const query = params.get('q') ?? ''
  const categoryParam = params.get('category')
  const category = categoryNames.has(categoryParam) ? categoryParam : ''
  const countryParam = params.get('country')
  const country = shopRegionNames.has(countryParam) ? countryParam : ''
  const sorting = sortOptions.find(({ id }) => id === params.get('sort')) ?? sortOptions[0]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const terms = searchText(query).trim().split(/\s+/).filter(Boolean)
  const results = storefrontProducts.filter((product) => {
    if (category && product.category !== category) return false
    if (country && product.region !== country) return false
    const searchable = searchText(`${product.name} ${product.description} ${product.keywords ?? ''} ${product.unit} ${product.unit.replaceAll(' ', '')} ${categoryNames.get(product.category) ?? ''}`)
    return terms.every((term) => searchable.includes(term))
  })
  if (sorting.compare) results.sort(sorting.compare)

  function update(key, value, replace = false) {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace })
  }

  function resetFilters() {
    setParams({})
    document.getElementById('catalogue-search')?.focus()
  }

  return (
    <main id="main-content" tabIndex={-1} className="flex-1">
      <section aria-labelledby="shop-heading" className="border-b border-line bg-cream/60 py-10 sm:py-14">
        <Container>
          <p className="mb-4 flex items-center gap-2.5 text-xs font-bold tracking-[0.12em] text-brand-red">
            <span aria-hidden="true" className="h-px w-5 bg-brand-red" />
            EXPLORE OUR STORE
          </p>
          <SectionHeading
            as="h1"
            id="shop-heading"
            title="Shop International Groceries"
            description="Discover everyday essentials, fresh produce, bakery favourites and delicious products from around the world."
          />
        </Container>
      </section>
      <Container className="grid min-w-0 gap-5 py-6 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-8 lg:py-12 xl:grid-cols-[15rem_minmax(0,1fr)]">
        <div className="grid min-w-0 content-start gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:gap-6">
          <CategoryFilters options={countries} value={country} onChange={(value) => update('country', value)} label="Country or region" legend="Shop by Country" />
          <CategoryFilters options={categories} value={category} onChange={(value) => update('category', value)} />
        </div>
        <div className="min-w-0">
          <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
            <CatalogueSearch
              id="catalogue-search"
              label="Search the catalogue"
              value={query}
              onChange={(value) => update('q', value, Boolean(query))}
              onClear={() => update('q', '')}
            />
            <div>
              <label htmlFor="catalogue-sort" className="mb-2 block text-sm font-semibold">Sort by</label>
              <select
                id="catalogue-sort"
                value={sorting.id}
                onChange={(event) => update('sort', event.target.value)}
                className="min-h-12 w-full rounded-control border border-field bg-white px-3 text-base focus-visible:outline-2 focus-visible:outline-brand-red"
              >
                {sortOptions.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
              </select>
            </div>
          </div>
          <div className="my-5 grid gap-1 border-b border-line pb-4">
            <div className="flex flex-wrap items-center justify-between gap-x-3">
              <p role="status" className="text-sm font-semibold">{results.length} {results.length === 1 ? 'product' : 'products'}</p>
              {(query || category || country || sorting.id) && results.length > 0 && (
                <button type="button" onClick={resetFilters} className="min-h-11 rounded-sm text-sm font-semibold text-brand-red underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-brand-red">
                  Clear Filters
                </button>
              )}
            </div>
            <p id="shop-ordering-note" className="text-sm text-muted">
              Preview products and prices for demonstration purposes only. Online ordering is coming soon.
            </p>
          </div>
          {results.length ? (
            <ProductGrid products={results} orderingDescriptionId="shop-ordering-note" catalogue />
          ) : (
            <div className="rounded-2xl border border-line bg-surface px-5 py-12 text-center">
              <h2 className="text-2xl">No products found.</h2>
              <p className="mt-2 text-muted">Try another search, category or country filter.</p>
              <Button onClick={resetFilters} className="mt-5">Clear Filters</Button>
            </div>
          )}
        </div>
      </Container>
    </main>
  )
}
