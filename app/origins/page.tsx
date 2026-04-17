export const dynamic = 'force-dynamic'

import MigrationMap from '@/components/MigrationMap'

export default function OriginsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 57px)' }}>

      {/* Header */}
      <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: '0.7rem', letterSpacing: '0.16em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '6px', fontWeight: 600 }}>
          Migration Map
        </p>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--fg)', margin: '0 0 6px', letterSpacing: '-0.02em' }}>
          Four Journeys, One Destination
        </h1>
        <p style={{ fontSize: '0.8rem', color: 'var(--muted)', margin: 0, lineHeight: 1.6 }}>
          From the Frisian Islands, Ireland, Plymouth Rock, and East Boston — all roads led to Winthrop, MA.
          Click a line or path for more detail.
        </p>
      </div>

      {/* Map — fills remaining height */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <MigrationMap />
      </div>
    </div>
  )
}
