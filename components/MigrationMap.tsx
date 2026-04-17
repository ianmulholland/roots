'use client'

import { useEffect, useRef, useState } from 'react'
import { LINE_COLORS } from '@/lib/family-lines'

// ── Migration paths ───────────────────────────────────────────────────────────
// Each path is a series of [lat, lng] waypoints tracing the family's journey.
// Paths converge at Winthrop, MA.

const WINTHROP: [number, number] = [42.375, -70.989]

const PATHS = [
  {
    key: 'smith',
    color: LINE_COLORS.smith,
    label: 'Smith · Mayflower → Nova Scotia → Boston',
    description: 'Stephen Hopkins crossed the Atlantic on the Mayflower (1620), landing at Plymouth. His descendants moved to Cape Cod, then north to Cape Sable Island, Nova Scotia (c.1760), founding a fishing community. Gladys Mildred Smith emigrated to Massachusetts in the 1940s.',
    coords: [
      [51.5, -0.12],     // London / Southampton, England
      [41.96, -70.67],   // Plymouth, MA — Mayflower landing
      [41.84, -69.98],   // Eastham, Cape Cod
      [43.48, -65.62],   // Cape Sable Island, Nova Scotia
      WINTHROP,          // Winthrop, MA — convergence
    ] as [number, number][],
    originLabel: 'England',
    originCoords: [51.5, -0.12] as [number, number],
  },
  {
    key: 'frese',
    color: LINE_COLORS.frese,
    label: 'Frese · North Sea → Waldeck → Berlin → Boston',
    description: 'After the catastrophic North Sea floods of 1634/1651, the Frisian ancestors of the Frese line fled inland to Waldeck, Germany. Generations of Lutheran farmers and pastors followed. Iris Margarete Frese, born in Berlin in 1928, crossed the Atlantic after WWII to marry Dan Mulholland.',
    coords: [
      [55.0, 8.6],       // Frisian Islands / North Sea coast
      [51.44, 8.86],     // Hesperinghausen, Waldeck, Germany
      [52.52, 13.41],    // Berlin, Germany
      [42.36, -71.06],   // Boston area
      WINTHROP,
    ] as [number, number][],
    originLabel: 'Frisian Islands',
    originCoords: [55.0, 8.6] as [number, number],
  },
  {
    key: 'mulholland',
    color: LINE_COLORS.mulholland,
    label: 'Mulholland · Ireland → Chicago → Boston',
    description: 'Bartholomew Mulholland fled Ireland during the Great Famine (c.1848), crossing the Atlantic to America. His family settled in Chicago, where Dan Mulholland was born in 1935. Dan later moved to the Boston area after marrying Iris Margarete Frese.',
    coords: [
      [53.41, -8.24],    // Ireland
      [41.88, -87.63],   // Chicago, IL
      [42.36, -71.06],   // Boston area
      WINTHROP,
    ] as [number, number][],
    originLabel: 'Ireland',
    originCoords: [53.41, -8.24] as [number, number],
  },
  {
    key: 'walker',
    color: LINE_COLORS.walker,
    label: 'Walker · East Boston → Winthrop',
    description: 'The Walker family\'s roots are the most local: East Boston, a working-class waterfront neighborhood. George Vincent Walker was born there in 1919. Their daughter Lynn married Maxwell Mulholland, and the family moved to Winthrop — barely three miles away across the harbor.',
    coords: [
      [42.378, -71.033], // East Boston
      WINTHROP,
    ] as [number, number][],
    originLabel: 'East Boston',
    originCoords: [42.378, -71.033] as [number, number],
  },
]

// ── Key places to label on the map ───────────────────────────────────────────
const PLACES = [
  { label: 'Winthrop, MA\n(Convergence)', coords: WINTHROP, isConvergence: true },
  { label: 'Plymouth, MA\n(Mayflower 1620)', coords: [41.96, -70.67] as [number, number], isConvergence: false },
  { label: 'Cape Sable Island, NS', coords: [43.48, -65.62] as [number, number], isConvergence: false },
  { label: 'Waldeck, Germany', coords: [51.44, 8.86] as [number, number], isConvergence: false },
  { label: 'Berlin', coords: [52.52, 13.41] as [number, number], isConvergence: false },
  { label: 'Ireland', coords: [53.41, -8.24] as [number, number], isConvergence: false },
  { label: 'Chicago', coords: [41.88, -87.63] as [number, number], isConvergence: false },
]

export default function MigrationMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<unknown>(null)
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (document.getElementById('leaflet-css')) return
    const link = document.createElement('link')
    link.id = 'leaflet-css'
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    document.head.appendChild(link)
  }, [])

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return

    import('leaflet').then(L => {
      const map = L.map(mapRef.current!, {
        center: [45, -25],
        zoom: 3,
        zoomControl: true,
        scrollWheelZoom: true,
      })
      mapInstance.current = map

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map)

      // Draw each migration path
      PATHS.forEach(path => {
        // Main line — slightly transparent
        const line = L.polyline(path.coords, {
          color: path.color,
          weight: 3,
          opacity: 0.65,
          dashArray: undefined,
        }).addTo(map)

        line.bindPopup(`
          <div style="font-family: system-ui, sans-serif; min-width: 200px; max-width: 280px;">
            <div style="font-size: 12px; font-weight: 700; color: ${path.color}; margin-bottom: 6px; letter-spacing: 0.04em;">
              ${path.label}
            </div>
            <div style="font-size: 11.5px; color: #aaa; line-height: 1.6;">
              ${path.description}
            </div>
          </div>
        `)

        // Direction arrows along the path — small circles at midpoints
        for (let i = 0; i < path.coords.length - 1; i++) {
          const [lat1, lng1] = path.coords[i]
          const [lat2, lng2] = path.coords[i + 1]
          const midLat = (lat1 + lat2) / 2
          const midLng = (lng1 + lng2) / 2

          L.circleMarker([midLat, midLng], {
            radius: 3,
            color: path.color,
            fillColor: path.color,
            fillOpacity: 0.7,
            weight: 0,
          }).addTo(map)
        }

        // Origin marker
        const originIcon = L.divIcon({
          className: '',
          html: `<div style="
            width: 10px; height: 10px;
            background: ${path.color};
            border: 2px solid rgba(255,255,255,0.4);
            border-radius: 50%;
            box-shadow: 0 0 6px ${path.color}88;
          "></div>`,
          iconSize: [10, 10],
          iconAnchor: [5, 5],
        })

        L.marker(path.originCoords, { icon: originIcon }).addTo(map)
          .bindTooltip(path.originLabel, {
            permanent: false,
            direction: 'top',
            className: 'migration-tooltip',
          })
      })

      // Convergence marker — Winthrop, MA
      const convergenceIcon = L.divIcon({
        className: '',
        html: `<div style="
          width: 20px; height: 20px;
          background: #c9a96e;
          border: 3px solid rgba(255,255,255,0.7);
          border-radius: 50%;
          box-shadow: 0 0 14px rgba(201,169,110,0.7), 0 0 4px rgba(0,0,0,0.5);
          position: relative;
        ">
          <div style="
            position: absolute; inset: -8px;
            border-radius: 50%;
            border: 1.5px solid rgba(201,169,110,0.3);
          "></div>
        </div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        popupAnchor: [0, -14],
      })

      L.marker(WINTHROP, { icon: convergenceIcon }).addTo(map)
        .bindPopup(`
          <div style="font-family: system-ui, sans-serif; text-align: center; padding: 4px;">
            <div style="font-size: 13px; font-weight: 700; color: #c9a96e; margin-bottom: 4px;">Winthrop, Massachusetts</div>
            <div style="font-size: 11px; color: #aaa; line-height: 1.6;">Where all four lines converge.<br/>Ian born 1991 · Ross born 1996.</div>
          </div>
        `)
        .openPopup()
    })

    return () => {
      if (mapInstance.current) {
        ;(mapInstance.current as { remove: () => void }).remove()
        mapInstance.current = null
      }
    }
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      {/* Path legend / selector */}
      <div style={{
        display: 'flex', gap: '8px', padding: '12px 16px',
        borderBottom: '1px solid var(--border)',
        flexWrap: 'wrap', alignItems: 'center',
        background: 'var(--surface)',
      }}>
        <span style={{ fontSize: '0.7rem', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginRight: '4px', fontWeight: 600 }}>
          Lines:
        </span>
        {PATHS.map(p => (
          <button
            key={p.key}
            onClick={() => setActive(a => a === p.key ? null : p.key)}
            style={{
              display: 'flex', alignItems: 'center', gap: '7px',
              padding: '5px 12px', borderRadius: '6px',
              border: `1px solid ${active === p.key ? p.color : 'var(--border)'}`,
              background: active === p.key ? p.color + '20' : 'transparent',
              color: active === p.key ? p.color : 'var(--muted)',
              fontSize: '0.78rem', fontWeight: 500, cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, display: 'inline-block' }} />
            {p.key.charAt(0).toUpperCase() + p.key.slice(1)}
          </button>
        ))}
        {/* Convergence */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--muted)' }}>
          <span style={{
            width: 10, height: 10, borderRadius: '50%',
            background: '#c9a96e', display: 'inline-block',
            boxShadow: '0 0 6px rgba(201,169,110,0.6)',
          }} />
          Winthrop (convergence)
        </div>
      </div>

      {/* Selected path description */}
      {active && (() => {
        const p = PATHS.find(x => x.key === active)!
        return (
          <div style={{
            padding: '12px 16px',
            borderBottom: '1px solid var(--border)',
            background: p.color + '10',
            fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.65,
          }}>
            <span style={{ fontWeight: 700, color: p.color }}>{p.label} — </span>
            {p.description}
          </div>
        )
      })()}

      {/* Map */}
      <div ref={mapRef} style={{ flex: 1 }} />

      <style>{`
        .migration-tooltip {
          background: rgba(19, 19, 31, 0.9) !important;
          border: 1px solid rgba(255,255,255,0.12) !important;
          color: #e8e8f2 !important;
          font-family: system-ui, sans-serif !important;
          font-size: 11px !important;
          border-radius: 6px !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.4) !important;
        }
        .migration-tooltip::before { display: none; }
      `}</style>
    </div>
  )
}
