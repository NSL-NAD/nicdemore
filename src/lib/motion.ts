export const ease = [0.25, 0.1, 0.25, 1] as const

// Premium easings
export const EASING_PREMIUM = [0.23, 1, 0.32, 1] as const
export const EASING_SMOOTH = [0.4, 0, 0.2, 1] as const
export const EASING_SNAPPY = [0.77, 0, 0.175, 1] as const

export const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: EASING_PREMIUM },
}

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6, ease },
}

export const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } },
}

export const staggerChild = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASING_PREMIUM },
  },
}

export const sectionHeader = {
  initial: { opacity: 0, x: -16 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: EASING_SMOOTH },
}

export const viewportOnce = {
  once: true,
  margin: '-80px' as const,
}

export const slideInLeft = {
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease },
}

export const slideInRight = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease },
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease },
}
