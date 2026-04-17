'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Person } from '@/lib/supabase'
import { FAMILY_LINE, LINE_COLORS, LINE_LABELS } from '@/lib/family-lines'

// ── Layout constants ──────────────────────────────────────────────────────────
const CURRENT_YEAR = 2026
const MIN_YEAR = 1575
const MAX_YEAR = 2035
const NAME_W  = 190   // left name column
const CHART_W = 1300  // chart area
const TOTAL_W = NAME_W + CHART_W
const ROW_H   = 30    // height per person row
const GROUP_H = 42    // height per family-line section header
const GROUP_GAP = 14  // vertical gap between groups
const AXIS_H  = 50    // bottom year axis
const EVENT_H = 68    // top area for event labels
const BAR_H   = 14    // bar thickness
const BAR_R   = 3     // bar border-radius

const LINE_ORDER = ['smith', 'walker', 'frese', 'mulholland'] as const

// ── Historical events ─────────────────────────────────────────────────────────
const EVENTS: { year: number; label: string }[] = [
  { year: 1609, label: 'Sea Venture wreck' },
  { year: 1620, label: 'Mayflower' },
  { year: 1634, label: 'N. Sea Floods' },
  { year: 1755, label: 'Acadian Expulsion' },
  { year: 1776, label: 'Revolution' },
  { year: 1845, label: 'Irish Famine' },
  { year: 1871, label: 'German Empire' },
  { year: 1914, label: 'World War I' },
  { year: 1933, label: 'Nazi Germany' },
  { year: 1945, label: 'WWII ends' },
]

function xOf(year: number) {
  return NAME_W + ((year - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * CHART_W
}

function shortName(p: Person, max = 23): string {
  const full = `${p.first_name}${p.last_name ? ' ' + p.last_name : ''}`
  if (full.length <= max) return full
  const first = p.first_name.split(' ')[0]
  const candidate = p.last_name ? `${first} ${p.last_name}` : first
  if (candidate.length <= max) return candidate
  return candidate.slice(0, max - 1) + '…'
}

// ── Year tick positions ───────────────────────────────────────────────────────
const TICKS: number[] = []
for (let y = 1600; y <= 2000; y += 25) TICKS.push(y)

export default function TimelineChart({ people }: { people: Person[] }) {
  const router = useRouter()
  const [hovered, setHovered] = useState<string | null>(null)
  const [tooltip, setTooltip] = useState<{ x: number; y: number; label: string } | null>(null)

  // ── Group people by family line ─────────────────────────────────────────────
  const groups = useMemo(() => (
    LINE_ORDER
      .map(line => ({
        line,
        label: LINE_LABELS[line as keyof typeof LINE_LABELS],
        color: LINE_COLORS[line as keyof typeof LINE_COLORS],
        people: people
          .filter(p => p.birth_year != null && FAMILY_LINE[p.id] === line)
          .sort((a, b) => (a.birth_year ?? 0) - (b.birth_year ?? 0)),
      }))
      .filter(g => g.people.length > 0)
  ), [people])

  // ── Compute row layout ──────────────────────────────────────────────────────
  const { rows, headers, svgH } = useMemo(() => {
    const rows: { person: Person; rowY: number; barY: number; color: string; line: string }[] = []
    const headers: { line: string; label: string; color: string; y: number }[] = []
    let y = EVENT_H + 8

    for (const g of groups) {
      headers.push({ line: g.line, label: g.label, color: g.color, y })
      y += GROUP_H
      for (const p of g.people) {
        rows.push({ person: p, rowY: y, barY: y + (ROW_H - BAR_H) / 2, color: g.color, line: g.line })
        y += ROW_H
      }
      y += GROUP_GAP
    }
    return { rows, headers, svgH: y + AXIS_H }
  }, [groups])

  const axisY = svgH - AXIS_H

  return (
    <div style={{ position: 'relative', overflowX: 'auto', overflowY: 'visible', WebkitOverflowScrolling: 'touch' }}>

      {/* Tooltip */}
      {tooltip && (
        <div style={{
          position: 'absolute',
          left: tooltip.x + 12,
          top: tooltip.y - 10,
          background: 'var(--surface-raised)',
          border: '1px solid var(--border-strong)',
          borderRadius: '6px',
          padding: '5px 10px',
          fontSize: '11px',
          color: 'var(--fg)',
          pointerEvents: 'none',
          zIndex: 10,
          whiteSpace: 'nowrap',
        }}>
          {tooltip.label}
        </div>
      )}

      <svg
        width={TOTAL_W}
        height={svgH}
        style={{ display: 'block', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif' }}
      >
        <defs>
          {/* Gradient for living people — fades to transparent at the right */}
          {Object.entries(LINE_COLORS)
            .filter(([k]) => k !== 'unknown')
            .map(([line, color]) => (
              <linearGradient key={line} id={`grad-living-${line}`} x1="0" x2="1" y1="0" y2="0">
                <stop offset="75%" stopColor={color} stopOpacity={0.85} />
                <stop offset="100%" stopColor={color} stopOpacity={0.1} />
              </linearGradient>
            ))
          }
        </defs>

        {/* Dark background */}
        <rect width={TOTAL_W} height={svgH} fill="#0c0c14" />

        {/* Subtle zebra rows */}
        {rows.filter((_, i) => i % 2 === 0).map(({ rowY }) => (
          <rect key={rowY} x={0} y={rowY} width={TOTAL_W} height={ROW_H} fill="rgba(255,255,255,0.012)" />
        ))}

        {/* Year grid lines */}
        {TICKS.map(yr => {
          const x = xOf(yr)
          return (
            <g key={yr}>
              <line x1={x} y1={EVENT_H} x2={x} y2={axisY} stroke="rgba(255,255,255,0.045)" strokeWidth={1} />
              <line x1={x} y1={axisY} x2={x} y2={axisY + 6} stroke="rgba(255,255,255,0.18)" strokeWidth={1} />
              <text x={x} y={axisY + 20} textAnchor="middle" fill="rgba(255,255,255,0.32)" fontSize={10}>
                {yr}
              </text>
            </g>
          )
        })}

        {/* Axis baseline */}
        <line x1={NAME_W} y1={axisY} x2={TOTAL_W} y2={axisY} stroke="rgba(255,255,255,0.12)" strokeWidth={1} />
        <line x1={0} y1={axisY} x2={NAME_W} y2={axisY} stroke="rgba(255,255,255,0.04)" strokeWidth={1} />

        {/* Name column separator */}
        <line x1={NAME_W} y1={EVENT_H} x2={NAME_W} y2={axisY} stroke="rgba(255,255,255,0.07)" strokeWidth={1} />

        {/* "Today" marker */}
        {(() => {
          const x = xOf(CURRENT_YEAR)
          return (
            <g>
              <line x1={x} y1={EVENT_H} x2={x} y2={axisY} stroke="rgba(201,169,110,0.35)" strokeWidth={1} strokeDasharray="4 3" />
              <text x={x} y={axisY + 20} textAnchor="middle" fill="#c9a96e" fontSize={9} fontWeight={600}>
                Today
              </text>
            </g>
          )
        })()}

        {/* ── Historical event lines & labels ── */}
        {EVENTS.map((evt, i) => {
          const x = xOf(evt.year)
          // Alternate label height to prevent overlap
          const labelY = i % 2 === 0 ? EVENT_H - 8 : EVENT_H - 38
          return (
            <g key={evt.year}>
              <line x1={x} y1={0} x2={x} y2={axisY} stroke="rgba(255,255,255,0.09)" strokeWidth={0.75} strokeDasharray="2 3" />
              <text x={x + 3} y={labelY} fill="rgba(255,255,255,0.42)" fontSize={8} fontStyle="italic">
                {evt.label}
              </text>
              <text x={x + 3} y={labelY - 11} fill="rgba(255,255,255,0.25)" fontSize={7.5}>
                {evt.year}
              </text>
            </g>
          )
        })}

        {/* ── Family line section headers ── */}
        {headers.map(h => (
          <g key={h.line}>
            <rect x={0} y={h.y} width={TOTAL_W} height={GROUP_H} fill={h.color + '14'} />
            <rect x={0} y={h.y} width={5} height={GROUP_H} fill={h.color} rx={0} />
            <text
              x={16} y={h.y + GROUP_H / 2 + 5}
              fill={h.color} fontSize={11} fontWeight={700}
              letterSpacing="0.1em"
            >
              {h.label.toUpperCase()}
            </text>
          </g>
        ))}

        {/* ── Person bars ── */}
        {rows.map(({ person, rowY, barY, color, line }) => {
          const birth = person.birth_year!
          const death = person.death_year
          const isLiving = !death
          const x1 = xOf(birth)
          const x2 = xOf(death ?? CURRENT_YEAR)
          const barW = Math.max(x2 - x1, 3)
          const isHov = hovered === person.id
          const name = shortName(person)

          return (
            <g
              key={person.id}
              style={{ cursor: 'pointer' }}
              onClick={() => router.push(`/people/${person.id}`)}
              onMouseEnter={(e) => {
                setHovered(person.id)
                const rect = (e.currentTarget as SVGElement).closest('svg')?.getBoundingClientRect()
                const svgRect = (e.currentTarget as SVGElement).getBoundingClientRect()
                setTooltip({
                  x: svgRect.left - (rect?.left ?? 0) + 20,
                  y: rowY,
                  label: `${person.first_name}${person.last_name ? ' ' + person.last_name : ''} · ${birth}${death ? '–' + death : '–present'}`,
                })
              }}
              onMouseLeave={() => { setHovered(null); setTooltip(null) }}
            >
              {/* Hover highlight */}
              {isHov && <rect x={0} y={rowY} width={TOTAL_W} height={ROW_H} fill="rgba(255,255,255,0.035)" />}

              {/* Name label */}
              <text
                x={NAME_W - 10} y={rowY + ROW_H / 2 + 4}
                textAnchor="end"
                fill={isHov ? '#e8e8f2' : 'rgba(232,232,242,0.6)'}
                fontSize={10.5}
                fontWeight={isHov ? 600 : 400}
              >
                {name}
              </text>

              {/* Birth dot */}
              <circle cx={x1} cy={barY + BAR_H / 2} r={2.5} fill={color} opacity={0.9} />

              {/* Lifespan bar */}
              <rect
                x={x1} y={barY} width={barW} height={BAR_H} rx={BAR_R}
                fill={isLiving ? `url(#grad-living-${line})` : color}
                opacity={isHov ? 0.95 : 0.78}
              />

              {/* Death dot */}
              {!isLiving && (
                <circle cx={x2} cy={barY + BAR_H / 2} r={2} fill={color} opacity={0.5} />
              )}
            </g>
          )
        })}

        {/* ── Column headers at bottom axis ── */}
        <text x={NAME_W / 2} y={axisY + 20} textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize={9}>
          Ancestor
        </text>
        <text x={NAME_W + CHART_W / 2} y={axisY + 36} textAnchor="middle" fill="rgba(255,255,255,0.12)" fontSize={8.5}>
          Year
        </text>
      </svg>

      {/* Legend */}
      <div style={{
        display: 'flex', gap: '20px', padding: '12px 0 4px 0',
        flexWrap: 'wrap', justifyContent: 'center',
      }}>
        {LINE_ORDER.map(line => (
          <div key={line} style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '11px', color: 'rgba(255,255,255,0.55)' }}>
            <div style={{ width: 28, height: 10, background: LINE_COLORS[line as keyof typeof LINE_COLORS], borderRadius: 3, opacity: 0.85 }} />
            {LINE_LABELS[line as keyof typeof LINE_LABELS]}
          </div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>
          <div style={{ width: 28, height: 0, borderTop: '1.5px dashed rgba(201,169,110,0.6)' }} />
          Today
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>
          <div style={{ width: 28, height: 0, borderTop: '1px dashed rgba(255,255,255,0.25)' }} />
          Historical event
        </div>
      </div>
    </div>
  )
}
