'use client'

import type { Person } from '@/lib/supabase'
import { STORIES } from '@/lib/stories'

export default function StoryPanel({ person }: { person: Person; relatedPeople: Person[] }) {
  const story = STORIES[person.id] ?? null

  return (
    <div style={{
      borderRadius: '16px', padding: '24px',
      border: '1px solid var(--border)', background: 'var(--surface)',
      display: 'flex', flexDirection: 'column',
    }}>
      <p style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '16px', fontWeight: 600 }}>
        Their Story
      </p>

      {story ? (
        <p style={{ fontSize: '0.875rem', lineHeight: 1.75, color: 'var(--fg)', whiteSpace: 'pre-line' }}>{story}</p>
      ) : (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '24px 0' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6 }}>
            No story has been written for {person.first_name} yet.
          </p>
        </div>
      )}
    </div>
  )
}
