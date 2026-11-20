import { useEffect, useState } from 'react'
import { deliveryConfig } from '../../data/deliveryConfig.js'
import { deliveryDates, isExamplePostcode, londonDay, normalizePostcode } from './deliveryDatesAndPostcode.js'

const storageKey = 'ifc-delivery'
const emptySelection = { postcode: '', dateId: '', slotId: '' }

function restoreSelection() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey))
    const postcode = normalizePostcode(saved?.postcode)
    if (saved?.version !== 1 || !isExamplePostcode(postcode)) return emptySelection
    const dateId = deliveryDates(londonDay()).some(({ id }) => id === saved.dateId) ? saved.dateId : ''
    const slotId = dateId && deliveryConfig.timeWindows.some(({ id }) => id === saved.slotId) ? saved.slotId : ''
    return { postcode, dateId, slotId }
  } catch {
    return emptySelection
  }
}

export default function useDeliverySelection() {
  const [today, setToday] = useState(londonDay)
  const [selection, setSelection] = useState(restoreSelection)
  const [sessionOnly, setSessionOnly] = useState(false)
  const dates = deliveryDates(today)

  useEffect(() => {
    const refreshDay = () => {
      const day = londonDay()
      setToday(day)
      setSelection(current => current.dateId && !deliveryDates(day).some(({ id }) => id === current.dateId)
        ? { ...current, dateId: '', slotId: '' }
        : current)
    }
    const timer = window.setInterval(refreshDay, 15000)
    document.addEventListener('visibilitychange', refreshDay)
    return () => {
      window.clearInterval(timer)
      document.removeEventListener('visibilitychange', refreshDay)
    }
  }, [])

  useEffect(() => {
    try {
      if (selection.postcode && !sessionOnly) localStorage.setItem(storageKey, JSON.stringify({ version: 1, ...selection }))
      else localStorage.removeItem(storageKey)
    } catch {
      // The demonstration remains usable when storage is blocked.
    }
  }, [selection, sessionOnly])

  function setPostcode(postcode) {
    const eligible = isExamplePostcode(postcode) ? postcode : ''
    setSelection(current => current.postcode === eligible ? current : { ...emptySelection, postcode: eligible })
  }

  function setDate(dateId) {
    if (!deliveryDates(londonDay()).some(({ id }) => id === dateId)) return
    setSelection(current => current.postcode && current.dateId !== dateId ? { ...current, dateId, slotId: '' } : current)
  }

  function setSlot(slotId) {
    if (!deliveryConfig.timeWindows.some(({ id }) => id === slotId)) return
    const validDates = deliveryDates(londonDay())
    setSelection(current => validDates.some(({ id }) => id === current.dateId) ? { ...current, slotId } : current)
  }

  return { selection, dates, setPostcode, setDate, setSlot, useMemoryOnly: () => setSessionOnly(true) }
}
