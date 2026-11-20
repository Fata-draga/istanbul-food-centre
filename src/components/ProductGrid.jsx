import ProductCard from './ProductCard.jsx'

export default function ProductGrid({ products, orderingDescriptionId, catalogue = false }) {
  return (
    <ul className={`grid auto-rows-fr grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:gap-6 ${catalogue ? 'xl:grid-cols-4' : 'lg:grid-cols-4'}`}>
      {products.map((product) => (
        <li key={product.id} className="min-w-0">
          <ProductCard product={product} orderingDescriptionId={orderingDescriptionId} catalogue={catalogue} />
        </li>
      ))}
    </ul>
  )
}
