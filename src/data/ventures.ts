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
    description: 'Foundations of Architecture — for non-architects who want to design their dream home.',
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
    description: 'The curated registry where every gift does good.',
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
    description: 'Creative venture studio. Doing good at scale.',
    year: '2025–',
    tags: ['Studio', 'Brand'],
  },
  {
    id: 'the-grid',
    name: 'The Grid',
    shortName: 'the-grid',
    status: 'BUILD',
    description: 'AI agent infrastructure for venture building.',
    year: '2026–',
    tags: ['Internal Tool', 'AI'],
  },
  {
    id: 'gas-merch',
    name: 'GAS Merch Store',
    shortName: 'gas-merch',
    status: 'LIVE',
    url: 'https://merch.goodatscale.studio',
    description: 'Merch for builders and operators. Good at Scale, stitched in.',
    year: '2026–',
    tags: ['E-Commerce', 'Brand'],
  },
  {
    id: 'blue-hut',
    name: 'Blue Hut',
    shortName: 'blue-hut',
    status: 'CONCEPT',
    description: 'A synthwave-aesthetic retreat concept. Retrowave meets architecture.',
    year: '2026–',
    tags: ['Concept', 'Brand'],
  },
  {
    id: 'atb',
    name: 'ATB',
    shortName: 'atb',
    status: 'BUILD',
    description: 'Aerial Tool Bin — family business. Site and growth strategy coming.',
    year: '2026–',
    tags: ['Family Business', 'Strategy'],
  },
]
