export const dynamic = 'force-dynamic'

import { fullName, lifespan } from '@/lib/supabase'
import { DEMO_PEOPLE } from '@/lib/demo-data'
import Link from 'next/link'

async function getData() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith('your_')) {
    return DEMO_PEOPLE
  }
  const { supabase } = await import('@/lib/supabase')
  const { data } = await supabase.from('people').select('*').order('birth_year')
  return data ?? []
}

export default async function PeoplePage() {
  const people = await getData()

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '48px 24px' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--fg)', marginBottom: '6px', letterSpacing: '-0.02em' }}>Ancestors</h1>
      <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '36px' }}>
        {people.length} people on record — click any name to read their story.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {people.map(person => (
          <Link
            key={person.id}
            href={`/people/${person.id}`}
            style={{
              display: 'flex', alignItems: 'center', gap: '16px',
              padding: '16px 20px',
              borderRadius: '12px',
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              transition: 'border-color 0.15s, background 0.15s',
              textDecoration: 'none',
            }}
          >
            <div style={{
              width: '44px', height: '44px', borderRadius: '50%',
              background: 'var(--accent-dim)', border: '1px solid rgba(201,169,110,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent)',
            }}>
              {person.first_name[0]}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--fg)', margin: 0 }}>{fullName(person)}</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--muted)', margin: 0, marginTop: '2px' }}>
                {lifespan(person)}{person.birth_place ? ` · ${person.birth_place}` : ''}
              </p>
            </div>
            <span style={{ color: 'var(--muted)', fontSize: '0.8rem', flexShrink: 0 }}>→</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
