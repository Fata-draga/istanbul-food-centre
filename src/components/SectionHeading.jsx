export default function SectionHeading({ as: Heading = 'h2', id, title, description, centered = false }) {
  const headingSize = Heading === 'h1'
    ? 'text-[clamp(2rem,6vw,4rem)] leading-[1.1]'
    : 'text-2xl leading-tight sm:text-4xl'
  const alignment = centered ? 'items-center text-center' : 'items-start'

  return (
    <div className={`flex flex-col gap-4 ${alignment}`}>
      <Heading id={id} className={`text-balance ${headingSize}`}>{title}</Heading>
      {description && (
        <p className="max-w-prose text-pretty text-base text-muted sm:text-lg">
          {description}
        </p>
      )}
    </div>
  )
}
