import { createContext, useContext, useEffect, useState } from 'react'
import { createDemoData, persistDemoData, restoreDemoData } from './demoData.js'

const DemoContext = createContext(null)

export function DemoProvider({ children }) {
  const [data, setData] = useState(restoreDemoData)
  const [resetCount, setResetCount] = useState(0)
  const [notice, setNotice] = useState('')
  const [storageError, setStorageError] = useState(false)

  useEffect(() => {
    try {
      persistDemoData(data)
      setStorageError(false)
    } catch {
      setStorageError(true)
    }
  }, [data])

  function update(section, change, message) {
    setData(current => ({ ...current, [section]: change(current[section]) }))
    if (message) setNotice(message)
  }

  function reset() {
    setData(createDemoData())
    setResetCount(count => count + 1)
    setNotice('Demo data reset to its starting values.')
  }

  return (
    <DemoContext.Provider value={{ data, update, reset, resetCount, notice, setNotice, storageError }}>
      {children}
    </DemoContext.Provider>
  )
}

export const useDemo = () => useContext(DemoContext)
