import { useLocation, useNavigate, useSearchParams } from 'react-router'
import CatalogueSearch from '../shop/CatalogueSearch.jsx'

export default function ProductSearch() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const onShop = pathname === '/shop'
  const query = onShop ? params.get('q') ?? '' : ''

  function updateQuery(value, clear = false) {
    const next = new URLSearchParams(onShop ? params : undefined)
    if (value) next.set('q', value)
    else next.delete('q')

    if (onShop) setParams(next, { replace: Boolean(query) && !clear })
    else if (value) navigate({ pathname: '/shop', search: next.toString() })
  }

  return (
    <CatalogueSearch
      id="product-search"
      label="Product search"
      value={query}
      onChange={updateQuery}
      onClear={() => updateQuery('', true)}
      className="col-span-2 lg:col-span-1 lg:col-start-2 lg:row-start-1"
    />
  )
}
