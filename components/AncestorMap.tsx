'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import type { Person } from '@/lib/supabase'
import { fullName, lifespan } from '@/lib/supabase'

export default function AncestorMap({ people }: { people: Person[] }) {
  const router = useRouter()
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<unknown>(null)

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return

    // Dynamically import Leaflet (client-only)
    import('leaflet').then(L => {
      // Fix default marker icon paths broken by webpack
      delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      const map = L.map(mapRef.current!).setView([45, 10], 3)
      mapInstance.current = map

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map)

      // Custom icon with a warm color
      const ancestorIcon = L.divIcon({
        className: '',
        html: `<div style="
          width: 28px; height: 28px;
          background: #7c3d12;
          border: 3px solid #fed7aa;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        "></div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 28],
        popupAnchor: [0, -30],
      })

      people.forEach(person => {
        if (person.birth_lat == null || person.birth_lng == null) return

        const marker = L.marker([person.birth_lat, person.birth_lng], { icon: ancestorIcon })
        marker.bindPopup(`
          <div style="font-family: Georgia, serif; min-width: 160px;">
            <strong style="font-size: 15px; color: #7c3d12;">${fullName(person)}</strong><br/>
            <span style="color: #78716c; font-size: 12px;">${lifespan(person)}</span><br/>
            <span style="color: #57534e; font-size: 12px;">${person.birth_place ?? ''}</span><br/>
            <a href="/people/${person.id}" style="color: #7c3d12; font-size: 12px; text-decoration: underline;">View profile →</a>
          </div>
        `)
        marker.addTo(map)
      })
    })

    return () => {
      if (mapInstance.current) {
        ;(mapInstance.current as { remove: () => void }).remove()
        mapInstance.current = null
      }
    }
  }, [people, router])

  // Also link leaflet CSS
  useEffect(() => {
    if (document.getElementById('leaflet-css')) return
    const link = document.createElement('link')
    link.id = 'leaflet-css'
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    document.head.appendChild(link)
  }, [])

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
}
