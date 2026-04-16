export const dynamic = 'force-dynamic'

import { fullName, lifespan } from '@/lib/supabase'
import { DEMO_PEOPLE, DEMO_RELATIONSHIPS } from '@/lib/demo-data'
import { notFound } from 'next/navigation'
import StoryPanel from '@/components/StoryPanel'
import ContextPanel from '@/components/ContextPanel'
import Link from 'next/link'
import type { Person, Relationship } from '@/lib/supabase'

async function getData(id: string): Promise<{ person: Person | null; relationships: Relationship[]; relatedPeople: Person[] }> {
  let people: Person[]
  let relationships: Relationship[]

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith('your_')) {
    people = DEMO_PEOPLE
    relationships = DEMO_RELATIONSHIPS
  } else {
    const { supabase } = await import('@/lib/supabase')
    const [{ data: p }, { data: r }] = await Promise.all([
      supabase.from('people').select('*'),
      supabase.from('relationships').select('*').or(`person1_id.eq.${id},person2_id.eq.${id}`),
    ])
    people = p ?? []
    relationships = r ?? []
  }

  const person = people.find(p => p.id === id) ?? null
  const personRels = relationships.filter(r => r.person1_id === id || r.person2_id === id)
  const relatedIds = personRels.flatMap(r => [r.person1_id, r.person2_id]).filter(rid => rid !== id)
  const relatedPeople = people.filter(p => relatedIds.includes(p.id))

  return { person, relationships: personRels, relatedPeople }
}

export default async function PersonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { person, relationships, relatedPeople } = await getData(id)

  if (!person) notFound()

  function relationLabel(relPersonId: string) {
    const rel = relationships.find(r => r.person1_id === relPersonId || r.person2_id === relPersonId)
    if (!rel) return ''
    if (rel.relationship_type === 'spouse') return 'Spouse'
    if (rel.person1_id === relPersonId) return 'Parent'
    return 'Child'
  }

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '40px 24px' }}>
      <Link href="/people" style={{ fontSize: '0.8rem', color: 'var(--muted)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '32px' }}>
        ← All ancestors
      </Link>

      {/* Header card */}
      <div style={{
        borderRadius: '16px', padding: '32px',
        border: '1px solid var(--border)', background: 'var(--surface)',
        marginBottom: '20px',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
          <div style={{
            width: '72px', height: '72px', borderRadius: '50%', flexShrink: 0,
            background: 'var(--accent-dim)', border: '1px solid rgba(201,169,110,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent)',
          }}>
            {person.first_name[0]}
          </div>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--fg)', margin: 0, letterSpacing: '-0.02em' }}>
              {fullName(person)}
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginTop: '4px', margin: 0 }}>{lifespan(person)}</p>
            {person.birth_place && <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginTop: '2px' }}>Born in {person.birth_place}</p>}
            {person.death_place && <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Died in {person.death_place}</p>}
          </div>
        </div>
        {person.notes && (
          <p style={{
            marginTop: '24px', paddingTop: '20px',
            borderTop: '1px solid var(--border)',
            fontSize: '0.9rem', color: 'var(--fg)', lineHeight: 1.65,
          }}>
            {person.notes}
          </p>
        )}
      </div>

      {/* Family connections */}
      {relatedPeople.length > 0 && (
        <div style={{
          borderRadius: '16px', padding: '24px',
          border: '1px solid var(--border)', background: 'var(--surface)',
          marginBottom: '20px',
        }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '14px', fontWeight: 600 }}>
            Family Connections
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {relatedPeople.map(rel => (
              <Link key={rel.id} href={`/people/${rel.id}`} style={{
                padding: '8px 14px', borderRadius: '8px',
                border: '1px solid var(--border-strong)', background: 'var(--surface-raised)',
                textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <span style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--fg)' }}>{fullName(rel)}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>
                  {relationLabel(rel.id)}{rel.birth_year ? ` · ${rel.birth_year}` : ''}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Story + Context panels */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <StoryPanel person={person} relatedPeople={relatedPeople} />
        <ContextPanel person={person} />
      </div>
    </div>
  )
}
