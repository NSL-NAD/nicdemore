import { useEffect } from 'react'
import { useRetro } from '@/contexts/RetroContext'

export function useNeonScroll() {
  const { isRetro } = useRetro()

  useEffect(() => {
    const headers = document.querySelectorAll('[data-neon-header]')
    if (!isRetro) {
      headers.forEach(h => h.classList.remove('neon-lit'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('neon-lit')
          }
        })
      },
      { threshold: 0.4 }
    )

    headers.forEach(h => observer.observe(h))
    return () => observer.disconnect()
  }, [isRetro])
}
