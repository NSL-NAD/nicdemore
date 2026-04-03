export type VentureStatus = 'LIVE' | 'BUILD' | 'TEST' | 'QUEUE' | 'STEALTH' | 'CONCEPT'

export interface Venture {
  id: string
  name: string
  shortName: string
  status: VentureStatus
  url?: string
  description: string
  year: string
  tags?: string[]
  stack?: string[]
  featured?: boolean
}

export const ventures: Venture[] = [
  {
    id: 'foa',
    name: 'FOA Course',
    shortName: 'foa-course',
    status: 'LIVE',
    url: 'https://foacourse.com',
    description: 'After two years studying architectural design to build my dream home, I distilled that obsession into a structured course for non-architects. FOA covers spatial flow, materiality, proportion, and the design language needed to work confidently alongside professionals — without pretending to be one.',
    year: '2025–',
    tags: ['Education', 'Architecture'],
    stack: ['Next.js', 'Supabase', 'Stripe'],
    featured: true,
  },
  {
    id: 'giveable',
    name: 'Giveable',
    shortName: 'giveable',
    status: 'BUILD',
    url: 'https://giveable.vercel.app',
    description: 'A curated marketplace where every gift does good. Building infrastructure for conscious gifting — connecting buyers with products that generate verified charitable impact. The gift registry reimagined around values, not just wishlists. Every purchase moves something in the world.',
    year: '2025–',
    tags: ['Marketplace', 'Social Impact'],
    stack: ['Next.js', 'Supabase', 'Stripe Connect'],
  },
  {
    id: 'gas-studio',
    name: 'GAS Studio',
    shortName: 'gas-studio',
    status: 'LIVE',
    url: 'https://goodatscale.studio',
    description: 'Good at Scale Studio is the creative and operational engine behind everything I build. A venture studio built on a simple thesis: do genuinely good work, at scale. Home to the 12×12 challenge — 12 ventures in 12 months — and the infrastructure, brand, and systems that make it possible.',
    year: '2025–',
    tags: ['Studio', 'Brand'],
  },
  {
    id: 'the-grid',
    name: 'The Grid',
    shortName: 'the-grid',
    status: 'BUILD',
    description: 'AI agent infrastructure for venture building at GAS Studio. Autonomous systems that compress months of startup groundwork into days — handling research, drafting, ops workflows, and decision support. The internal backbone powering the 12×12 challenge from the inside.',
    year: '2026–',
    tags: ['Internal Tool', 'AI'],
  },
  {
    id: 'gas-merch',
    name: 'GAS Merch Store',
    shortName: 'gas-merch',
    status: 'LIVE',
    url: 'https://merch.goodatscale.studio',
    description: 'A brand extension for builders who move with intention. Designed in-house at GAS Studio and sold direct — pieces that say something about how you work, not just how you dress. Good at Scale, stitched in. For operators who build things that actually matter.',
    year: '2026–',
    tags: ['E-Commerce', 'Brand'],
  },
  {
    id: 'blue-hut',
    name: 'Blue Hut',
    shortName: 'blue-hut',
    status: 'CONCEPT',
    description: 'A retreat concept at the intersection of synthwave culture and modern architecture. Warm brutalism meets neon nostalgia — a physical space designed as much for atmosphere as experience. Early concept stage with a clear vision: the kind of place that earns its own mythology.',
    year: '2026–',
    tags: ['Concept', 'Brand'],
  },
  {
    id: 'atb',
    name: 'ATB',
    shortName: 'atb',
    status: 'BUILD',
    description: 'Aerial Tool Bin is a family business built around solving real problems in the field. Developing the brand, digital presence, and growth strategy to bring a proven product to the market it deserves — with the people who built it, and the care it took to get here.',
    year: '2026–',
    tags: ['Family Business', 'Strategy'],
  },
]
