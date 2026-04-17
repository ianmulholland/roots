export const dynamic = 'force-dynamic'

import TimelineChart from '@/components/TimelineChart'
import { DEMO_PEOPLE } from '@/lib/demo-data'

async function getData() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith('your_')) {
    return DEMO_PEOPLE
  }
  const { supabase } = await import('@/lib/supabase')
  const { data } = await supabase.from('people').select('*').order('birth_year')
  return data ?? []
}

export default async function TimelinePage() {
  const people = await getData()

  return (
    <div style={{ minHeight: 'calc(100vh - 57px)', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <div style={{ padding: '24px 28px 20px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '800px' }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.16em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600 }}>
            1581 – Present
          </p>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--fg)', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
            450 Years at a Glance
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--muted)', margin: 0, lineHeight: 1.6 }}>
            Each bar is a life. Hover for details · click to open a profile. Historical events run as dashed lines — see which ancestors lived through which moments.
          </p>
        </div>
      </div>

      {/* Chart */}
      <div style={{ flex: 1, padding: '24px 0 32px', overflowX: 'auto' }}>
        <TimelineChart people={people} />
      </div>
    </div>
  )
}
