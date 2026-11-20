export default function Container({ children, className = '' }) {
  return (
    <div className={`mx-auto w-full max-w-site px-gutter ${className}`}>
      {children}
    </div>
  )
}
