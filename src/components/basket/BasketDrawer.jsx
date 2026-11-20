import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import Button from '../Button.jsx'
import { basketNotice, useBasket } from './BasketContext.jsx'
import BasketItems from './BasketItems.jsx'
import BasketSummary from './BasketSummary.jsx'
import EmptyBasket from './EmptyBasket.jsx'

export default function BasketDrawer({ open, onClose }) {
  const dialog = useRef(null)
  const closeButton = useRef(null)
  const { items } = useBasket()

  useEffect(() => {
    if (!open) return
    const element = dialog.current
    const previousOverflow = document.body.style.overflow
    element.showModal()
    closeButton.current.focus()
    document.body.style.overflow = 'hidden'

    return () => {
      element.close()
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  function closeForNavigation() {
    dialog.current.close()
    onClose()
  }

  return (
    <dialog
      ref={dialog}
      id="basket-drawer"
      aria-labelledby="basket-drawer-title"
      aria-describedby="basket-drawer-notice"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-hidden bg-transparent p-0 text-ink backdrop:bg-ink/50"
    >
      <div className="ml-auto flex h-full w-[calc(100%-0.75rem)] max-w-md flex-col overflow-y-auto overscroll-contain bg-white shadow-xl motion-safe:animate-[basket-enter_220ms_ease-out]">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-line bg-white px-5 py-4 sm:px-6">
          <h2 id="basket-drawer-title" className="text-2xl">Your Basket</h2>
          <button ref={closeButton} type="button" aria-label="Close basket" onClick={onClose} className="grid size-11 shrink-0 place-items-center rounded-control hover:bg-surface focus-visible:outline-2 focus-visible:outline-brand-red">
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>
        <div className="px-5 pt-5 sm:px-6">
          <p id="basket-drawer-notice" className="rounded-control border border-brand-red/15 bg-cream p-3 text-sm text-muted">
            {basketNotice}
          </p>
          {items.length ? <BasketItems fallbackFocus={closeButton} /> : <EmptyBasket onNavigate={closeForNavigation} />}
        </div>
        {items.length === 0 && (
          <div className="px-5 pb-5 sm:px-6">
            <Button as={Link} to="/delivery" onClick={closeForNavigation} variant="outline" className="w-full">Choose Delivery</Button>
          </div>
        )}
        {items.length > 0 && (
          <div className="mt-auto border-t border-line px-5 py-5 sm:px-6">
            <BasketSummary onNavigate={closeForNavigation}>
              <Button as={Link} to="/basket" onClick={closeForNavigation} variant="outline" className="w-full">View Basket</Button>
              <Button as={Link} to="/delivery" onClick={closeForNavigation} variant="outline" className="w-full">Choose Delivery</Button>
            </BasketSummary>
          </div>
        )}
      </div>
    </dialog>
  )
}
