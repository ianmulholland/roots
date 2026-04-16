export const dynamic = 'force-dynamic'

import AncestorMap from '@/components/AncestorMap'
import { DEMO_PEOPLE } from '@/lib/demo-data'

async function getData() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith('your_')) {
    return DEMO_PEOPLE.filter(p => p.birth_lat != null)
  }
  const { supabase } = await import('@/lib/supabase')
  const { data } = await supabase.from('people').select('*').not('birth_lat', 'is', null).order('birth_year')
  return data ?? []
}

export default async function MapPage() {
  const people = await getData()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 57px)' }}>
      <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid var(--border)' }}>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--fg)', margin: 0, letterSpacing: '-0.02em' }}>Ancestor Map</h1>
        <p style={{ fontSize: '0.8rem', color: 'var(--muted)', margin: '4px 0 0' }}>
          Birthplaces of known ancestors · click a pin to view their profile
        </p>
      </div>
      <div style={{ flex: 1 }}>
        <AncestorMap people={people} />
      </div>
    </div>
  )
}
