'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/tree', label: 'Tree' },
  { href: '/map', label: 'Map' },
  { href: '/people', label: 'Ancestors' },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <header style={{
      background: 'rgba(12, 12, 20, 0.85)',
      borderBottom: '1px solid var(--border)',
      backdropFilter: 'blur(12px)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Roots
        </Link>
        <nav className="flex gap-8">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontSize: '0.85rem',
                fontWeight: 500,
                letterSpacing: '0.05em',
                color: pathname === href ? 'var(--accent)' : 'var(--muted)',
                transition: 'color 0.15s',
              }}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
