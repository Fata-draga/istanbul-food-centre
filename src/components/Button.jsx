const variants = {
  primary: 'border-transparent bg-brand-red text-white shadow-control hover:bg-brand-red-hover',
  outline: 'border-brand-red bg-white text-brand-red hover:bg-cream',
}

export default function Button({
  as: Component = 'button',
  children,
  className = '',
  variant = 'primary',
  compact = false,
  ...props
}) {
  return (
    <Component
      {...(Component === 'button' ? { type: 'button' } : {})}
      {...props}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-control border py-3 text-center text-sm font-semibold leading-normal transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red disabled:pointer-events-none motion-reduce:transition-none ${compact ? 'px-2' : 'px-6'} ${variants[variant]} ${className}`}
    >
      {children}
    </Component>
  )
}
