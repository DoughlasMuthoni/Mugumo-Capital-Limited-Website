import { createContext, useContext, useState, useEffect } from 'react'
import { getPublicSettings } from '../services/api'

const SiteDataContext = createContext({ settings: {} })

export function SiteDataProvider({ children }) {
  const [settings, setSettings] = useState({})

  useEffect(() => {
    getPublicSettings()
      .then(d => setSettings(d.settings || {}))
      .catch(() => {}) // fall back to hardcoded defaults silently
  }, [])

  return (
    <SiteDataContext.Provider value={{ settings }}>
      {children}
    </SiteDataContext.Provider>
  )
}

export function useSiteData() {
  return useContext(SiteDataContext)
}
