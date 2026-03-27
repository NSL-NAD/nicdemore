export interface FeedItem {
  id: string
  venture: string
  event: string
  timestamp: string
  /** Source URL — swap to live API endpoint when The Grid is ready */
  source?: string
}

export const ventureOSFeed: FeedItem[] = [
  {
    id: 'f1',
    venture: 'GAS Studio',
    event: 'nicdemore.com v4 deployed',
    timestamp: '2026-03-27',
  },
  {
    id: 'f2',
    venture: 'Giveable',
    event: 'MVP milestone reached — registry flow live',
    timestamp: '2026-03-25',
  },
  {
    id: 'f3',
    venture: 'FOA Course',
    event: 'New lesson published: Fenestration & Light',
    timestamp: '2026-03-22',
  },
  {
    id: 'f4',
    venture: 'The Grid',
    event: 'Agent infrastructure v0.3 deployed',
    timestamp: '2026-03-20',
  },
  {
    id: 'f5',
    venture: 'GAS Merch',
    event: 'Order fulfilled — "Builder Mode" tee',
    timestamp: '2026-03-18',
  },
  {
    id: 'f6',
    venture: 'Giveable',
    event: 'Stripe Connect onboarding flow complete',
    timestamp: '2026-03-15',
  },
  {
    id: 'f7',
    venture: 'FOA Course',
    event: 'Student milestone: 50 enrollments',
    timestamp: '2026-03-12',
  },
  {
    id: 'f8',
    venture: 'The Grid',
    event: 'MCP protocol integration tested',
    timestamp: '2026-03-10',
  },
  {
    id: 'f9',
    venture: 'GAS Studio',
    event: '12×12 challenge: venture 3 scoped',
    timestamp: '2026-03-08',
  },
  {
    id: 'f10',
    venture: 'Blue Hut',
    event: 'Concept brief finalized',
    timestamp: '2026-03-05',
  },
]
