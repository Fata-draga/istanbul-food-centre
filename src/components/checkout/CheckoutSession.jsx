import { useEffect, useState } from 'react'
import { Outlet, useLocation, useOutletContext } from 'react-router'
import useDeliverySelection from '../delivery/useDeliverySelection.js'

export default function CheckoutSession() {
  const delivery = useDeliverySelection()
  const { pathname, search } = useLocation()
  const editingDelivery = pathname === '/delivery' && new URLSearchParams(search).get('return') === 'checkout'
  const [details, setDetails] = useState({})
  const [step, setStep] = useState(0)
  const [detailsConfirmed, setDetailsConfirmed] = useState(false)

  useEffect(() => {
    if (pathname === '/delivery' && !editingDelivery) {
      setDetails({})
      setStep(0)
      setDetailsConfirmed(false)
    }
  }, [pathname, editingDelivery])

  return <Outlet context={{
    delivery, editingDelivery,
    details, setDetails,
    step, setStep,
    detailsConfirmed, setDetailsConfirmed,
  }} />
}

export function useCheckoutSession() {
  return useOutletContext()
}
