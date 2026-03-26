'use client'
import { createContext, useContext, useState } from 'react'

interface RetroContextType {
  isRetro: boolean
  toggleRetro: () => void
}

const RetroContext = createContext<RetroContextType>({
  isRetro: false,
  toggleRetro: () => {},
})

export function RetroProvider({ children }: { children: React.ReactNode }) {
  const [isRetro, setIsRetro] = useState(false)

  const toggleRetro = () => {
    const next = !isRetro
    setIsRetro(next)
    document.documentElement.dataset.theme = next ? 'retro' : ''
  }

  return (
    <RetroContext.Provider value={{ isRetro, toggleRetro }}>
      {children}
    </RetroContext.Provider>
  )
}

export const useRetro = () => useContext(RetroContext)
