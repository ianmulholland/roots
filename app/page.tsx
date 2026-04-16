import Link from 'next/link'
import { DEMO_PEOPLE, DEMO_RELATIONSHIPS } from '@/lib/demo-data'
import ForceGraph from '@/components/ForceGraph'

export default function Home() {
  const people = DEMO_PEOPLE
  const relationships = DEMO_RELATIONSHIPS

  return (
    <div style={{ minHeight: 'calc(100vh - 57px)', display: 'flex', flexDirection: 'column' }}>

      {/* Hero */}
      <div style={{ padding: '64px 24px 40px', textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '16px', fontWeight: 600 }}>
          Mulholland · Walker · Freses
        </p>
        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1, color: 'var(--fg)', marginBottom: '16px', letterSpacing: '-0.02em' }}>
          Four families.<br />
          <span style={{ color: 'var(--accent)' }}>One story.</span>
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.6 }}>
          From Berlin and Waldeck to Chicago and Boston — explore the people who made your family.
        </p>
      </div>

      {/* Force graph */}
      <div style={{
        flex: 1,
        margin: '0 24px 32px',
        borderRadius: '16px',
        border: '1px solid var(--border)',
        background: 'var(--surface)',
        position: 'relative',
        minHeight: '440px',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '16px', left: '20px',
          fontSize: '0.7rem', letterSpacing: '0.12em', color: 'var(--muted)', textTransform: 'uppercase',
        }}>
          Click a node · Drag to explore
        </div>
        <ForceGraph people={people} relationships={relationships} />
      </div>

      {/* Quick links */}
      <div style={{ display: 'flex', gap: '12px', padding: '0 24px 48px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {[
          { href: '/tree', label: 'Family Tree' },
          { href: '/map', label: 'Ancestor Map' },
          { href: '/people', label: 'All Ancestors' },
        ].map(({ href, label }) => (
          <Link key={href} href={href} style={{
            padding: '10px 24px',
            borderRadius: '8px',
            border: '1px solid var(--border-strong)',
            background: 'var(--surface)',
            color: 'var(--fg)',
            fontSize: '0.85rem',
            fontWeight: 500,
            letterSpacing: '0.02em',
            transition: 'border-color 0.15s, color 0.15s',
          }}>
            {label}
          </Link>
        ))}
      </div>
    </div>
  )
}
