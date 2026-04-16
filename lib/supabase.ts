import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let _client: SupabaseClient | null = null

function getClient() {
  if (!_client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) throw new Error('Supabase env vars not set. Fill in .env.local')
    _client = createClient(url, key)
  }
  return _client
}

export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return (getClient() as unknown as Record<string, unknown>)[prop as string]
  },
})

export type Person = {
  id: string
  first_name: string
  last_name: string | null
  birth_year: number | null
  birth_place: string | null
  birth_lat: number | null
  birth_lng: number | null
  death_year: number | null
  death_place: string | null
  photo_url: string | null
  notes: string | null
  created_at: string
}

export type Relationship = {
  id: string
  person1_id: string
  person2_id: string
  relationship_type: 'parent-child' | 'spouse'
}

export type Story = {
  id: string
  person_id: string
  content: string
  generated_at: string
}

export function fullName(person: Person) {
  return [person.first_name, person.last_name].filter(Boolean).join(' ')
}

export function lifespan(person: Person) {
  const birth = person.birth_year ?? '?'
  const death = person.death_year ?? 'present'
  return `${birth} – ${death}`
}
