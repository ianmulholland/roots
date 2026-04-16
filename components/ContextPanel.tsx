import type { Person } from '@/lib/supabase'
import { CONTEXT } from '@/lib/context'

export default function ContextPanel({ person }: { person: Person }) {
  const items = CONTEXT[person.id] ?? null

  return (
    <div style={{
      borderRadius: '16px', padding: '24px',
      border: '1px solid var(--border)', background: 'var(--surface)',
      display: 'flex', flexDirection: 'column',
    }}>
      <p style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '16px', fontWeight: 600 }}>
        Historical Context
      </p>

      {items ? (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {items.map((item, i) => (
            <li key={i} style={{ display: 'flex', gap: '10px', fontSize: '0.875rem', color: 'var(--fg)', lineHeight: 1.65 }}>
              <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }}>▸</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6, textAlign: 'center', padding: '24px 0' }}>
          Historical context for {person.first_name} hasn't been added yet.
        </p>
      )}
    </div>
  )
}
