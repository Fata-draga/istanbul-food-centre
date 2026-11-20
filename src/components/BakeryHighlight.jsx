export default function BakeryHighlight({ title, description, image, imageAlt }) {
  return (
    <li className="min-w-0 overflow-hidden rounded-2xl border border-line bg-white shadow-control transition-[border-color,box-shadow] hover:border-brand-red/25 hover:shadow-md motion-reduce:transition-none">
      <img
        src={image}
        alt={imageAlt}
        width="640"
        height="480"
        loading="lazy"
        decoding="async"
        className="aspect-[4/3] w-full bg-surface object-cover"
      />
      <div className="p-5 lg:p-6">
        <h3 className="text-lg leading-snug lg:text-xl">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
      </div>
    </li>
  )
}
