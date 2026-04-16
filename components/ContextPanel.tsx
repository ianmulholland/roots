'use client'

import { useState } from 'react'
import type { Person } from '@/lib/supabase'

export default function ContextPanel({ person }: { person: Person }) {
  const [items, setItems] = useState<string[] | null>(null)
  const [loading, setLoading] = useState(false)

  async function loadContext() {
    setLoading(true)
    try {
      const res = await fetch('/api/context', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ person }),
      })
      const data = await res.json()
      setItems(data.items)
    } finally {
      setLoading(false)
    }
  }

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
        <div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {items.map((item, i) => (
              <li key={i} style={{ display: 'flex', gap: '10px', fontSize: '0.875rem', color: 'var(--fg)', lineHeight: 1.65 }}>
                <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }}>▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <button onClick={loadContext} disabled={loading} style={{
            marginTop: '16px', fontSize: '0.8rem', color: 'var(--muted)',
            background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline',
          }}>
            {loading ? 'Loading…' : 'Refresh'}
          </button>
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '24px 0' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '20px', lineHeight: 1.6 }}>
            What was the world like during {person.first_name}'s lifetime?
          </p>
          <button onClick={loadContext} disabled={loading} style={{
            padding: '10px 24px', borderRadius: '8px',
            background: 'var(--accent)', color: '#0c0c14',
            fontSize: '0.85rem', fontWeight: 700, border: 'none', cursor: 'pointer',
            opacity: loading ? 0.6 : 1, letterSpacing: '0.02em',
          }}>
            {loading ? 'Loading…' : 'Show context'}
          </button>
        </div>
      )}
    </div>
  )
}
