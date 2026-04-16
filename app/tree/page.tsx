export const dynamic = 'force-dynamic'

import FamilyTree from '@/components/FamilyTree'
import { DEMO_PEOPLE, DEMO_RELATIONSHIPS } from '@/lib/demo-data'

async function getData() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith('your_')) {
    return { people: DEMO_PEOPLE, relationships: DEMO_RELATIONSHIPS }
  }
  const { supabase } = await import('@/lib/supabase')
  const [{ data: people }, { data: relationships }] = await Promise.all([
    supabase.from('people').select('*').order('birth_year'),
    supabase.from('relationships').select('*'),
  ])
  return { people: people ?? [], relationships: relationships ?? [] }
}

export default async function TreePage() {
  const { people, relationships } = await getData()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 57px)' }}>
      <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid var(--border)' }}>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--fg)', margin: 0, letterSpacing: '-0.02em' }}>Family Tree</h1>
        <p style={{ fontSize: '0.8rem', color: 'var(--muted)', margin: '4px 0 0' }}>
          Click any node to view a profile · drag to pan · scroll to zoom
        </p>
      </div>
      <div style={{ flex: 1 }}>
        <FamilyTree people={people} relationships={relationships} />
      </div>
    </div>
  )
}
