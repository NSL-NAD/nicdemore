import { useState } from 'react'

export type VentureOSState = 'collapsed' | 'hover' | 'open'

export function useVentureOS() {
  const [state, setState] = useState<VentureOSState>('collapsed')

  const open = () => setState('open')
  const close = () => setState('collapsed')
  const setHover = (h: boolean) => {
    if (state === 'open') return
    setState(h ? 'hover' : 'collapsed')
  }
  const toggle = () => setState(s => s === 'open' ? 'collapsed' : 'open')

  return { state, open, close, setHover, toggle }
}
