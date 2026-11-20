import { Suspense } from 'react'
import { Outlet } from 'react-router'
import SiteFooter from './SiteFooter.jsx'
import SiteHeader from './header/SiteHeader.jsx'

export default function SiteLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      <a
        href="#main-content"
        onClick={(event) => {
          const main = document.getElementById('main-content')
          if (!main) return
          event.preventDefault()
          main.focus({ preventScroll: true })
          main.scrollIntoView({ block: 'start' })
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-30 focus:rounded-control focus:bg-white focus:px-4 focus:py-3 focus:font-semibold focus:text-brand-red focus:outline-2 focus:outline-brand-red"
      >
        Skip to main content
      </a>
      <SiteHeader />
      <Suspense fallback={<main id="main-content" tabIndex={-1} className="mx-auto w-full max-w-site flex-1 px-gutter py-section"><p role="status">Loading page…</p></main>}>
        <Outlet />
      </Suspense>
      <SiteFooter />
    </div>
  )
}
