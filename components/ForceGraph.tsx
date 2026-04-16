'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { Person, Relationship } from '@/lib/supabase'
import { lineColor, LINE_COLORS, LINE_LABELS } from '@/lib/family-lines'

type NodeDatum = {
  id: string
  name: string
  first: string
  initials: string
  birthYear: number | null
  color: string
  x?: number
  y?: number
  fx?: number | null
  fy?: number | null
}

type LinkDatum = {
  source: string | NodeDatum
  target: string | NodeDatum
  type: 'parent-child' | 'spouse'
}

/** Assign a rough generation depth by walking parent-child edges from roots */
function computeDepths(
  people: Person[],
  parentChildRels: { person1_id: string; person2_id: string }[]
): Map<string, number> {
  const childIds = new Set(parentChildRels.map(r => r.person2_id))
  const roots = people.filter(p => !childIds.has(p.id)).map(p => p.id)
  const depths = new Map<string, number>()
  const queue: { id: string; depth: number }[] = roots.map(id => ({ id, depth: 0 }))
  while (queue.length) {
    const { id, depth } = queue.shift()!
    if (depths.has(id) && depths.get(id)! <= depth) continue
    depths.set(id, depth)
    parentChildRels
      .filter(r => r.person1_id === id)
      .forEach(r => queue.push({ id: r.person2_id, depth: depth + 1 }))
  }
  // Fill any unvisited
  people.forEach(p => { if (!depths.has(p.id)) depths.set(p.id, 3) })
  return depths
}

export default function ForceGraph({ people, relationships }: { people: Person[]; relationships: Relationship[] }) {
  const svgRef = useRef<SVGSVGElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (!svgRef.current || !people.length) return

    import('d3').then(d3 => {
      const el = svgRef.current!
      const rect = el.parentElement?.getBoundingClientRect()
      const W = rect?.width || el.clientWidth || 900
      const H = rect?.height || el.clientHeight || 440

      d3.select(el).selectAll('*').remove()

      const parentChildRels = relationships.filter(r => r.relationship_type === 'parent-child')

      const depths = computeDepths(people, parentChildRels)
      const maxDepth = Math.max(...depths.values())

      // Group nodes by depth, sort within each group by birth year
      const byDepth = new Map<number, Person[]>()
      people.forEach(p => {
        const d = depths.get(p.id) ?? 0
        if (!byDepth.has(d)) byDepth.set(d, [])
        byDepth.get(d)!.push(p)
      })

      const nodes: NodeDatum[] = people.map(p => {
        const depth = depths.get(p.id) ?? 0
        const peers = byDepth.get(depth)!.sort((a, b) => (a.birth_year ?? 9999) - (b.birth_year ?? 9999))
        const idx = peers.findIndex(q => q.id === p.id)
        const total = peers.length
        const x = (W * 0.1) + (idx + 0.5) * (W * 0.8 / total)
        const y = (H * 0.08) + depth * (H * 0.85 / (maxDepth || 1))
        return {
          id: p.id,
          name: `${p.first_name}${p.last_name ? ' ' + p.last_name : ''}`,
          first: p.first_name.split(' ')[0],
          initials: (p.first_name[0] + (p.last_name ? p.last_name[0] : '')).toUpperCase(),
          birthYear: p.birth_year,
          color: lineColor(p.id),
          x, y,
        }
      })

      const links: LinkDatum[] = relationships.map(r => ({
        source: r.person1_id,
        target: r.person2_id,
        type: r.relationship_type,
      }))

      // Light simulation to polish positions
      const simulation = d3.forceSimulation<NodeDatum>(nodes)
        .force('link', d3.forceLink<NodeDatum, LinkDatum>(links)
          .id(d => d.id)
          .distance(d => (d as LinkDatum).type === 'spouse' ? 50 : 80)
          .strength(0.15)
        )
        .force('charge', d3.forceManyBody().strength(-180))
        .force('collision', d3.forceCollide(36))
        .alphaDecay(0.04)
        .stop()

      for (let i = 0; i < 300; i++) simulation.tick()

      // Fit to canvas
      const xs = nodes.map(n => n.x ?? 0)
      const ys = nodes.map(n => n.y ?? 0)
      const pad = 50
      const bW = Math.max(...xs) - Math.min(...xs) + pad * 2
      const bH = Math.max(...ys) - Math.min(...ys) + pad * 2
      const scale = Math.min(W / bW, H / bH, 1.4) * 0.9
      const tx = (W - scale * (Math.min(...xs) + Math.max(...xs))) / 2
      const ty = (H - scale * (Math.min(...ys) + Math.max(...ys))) / 2
      const initT = d3.zoomIdentity.translate(tx, ty).scale(scale)

      const svg = d3.select(el).attr('viewBox', `0 0 ${W} ${H}`)
      const g = svg.append('g').attr('transform', initT.toString())

      const zoom = d3.zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.1, 3])
        .on('zoom', e => g.attr('transform', e.transform))
      svg.call(zoom).call(zoom.transform, initT)

      // Defs — one glow filter per line color
      const defs = svg.append('defs')
      Object.entries(LINE_COLORS).forEach(([line, color]) => {
        const f = defs.append('filter').attr('id', `glow-${line}`)
        f.append('feGaussianBlur').attr('stdDeviation', '3').attr('result', 'b')
        const m = f.append('feMerge')
        m.append('feMergeNode').attr('in', 'b')
        m.append('feMergeNode').attr('in', 'SourceGraphic')
        // Colorize the glow
        const flood = defs.append('filter').attr('id', `colored-glow-${line}`)
        flood.append('feFlood').attr('flood-color', color).attr('flood-opacity', '0.4').attr('result', 'fc')
        flood.append('feComposite').attr('in', 'fc').attr('in2', 'SourceGraphic').attr('operator', 'in').attr('result', 'colored')
        flood.append('feGaussianBlur').attr('in', 'colored').attr('stdDeviation', '4').attr('result', 'blurred')
        const fm = flood.append('feMerge')
        fm.append('feMergeNode').attr('in', 'blurred')
        fm.append('feMergeNode').attr('in', 'SourceGraphic')
      })

      // Build a lookup: node id → color (after simulation resolves source/target)
      const nodeById = new Map(nodes.map(n => [n.id, n]))

      // Links — color by source node's family line
      g.append('g').selectAll('line')
        .data(links).join('line')
        .attr('x1', d => (d.source as NodeDatum).x ?? 0)
        .attr('y1', d => (d.source as NodeDatum).y ?? 0)
        .attr('x2', d => (d.target as NodeDatum).x ?? 0)
        .attr('y2', d => (d.target as NodeDatum).y ?? 0)
        .attr('stroke', (d: LinkDatum) => {
          if (d.type === 'spouse') return 'rgba(201,169,110,0.5)'
          const srcId = typeof d.source === 'string' ? d.source : d.source.id
          const src = nodeById.get(srcId)
          return src ? src.color + '55' : 'rgba(255,255,255,0.12)'
        })
        .attr('stroke-width', (d: LinkDatum) => d.type === 'spouse' ? 1.5 : 1.2)
        .attr('stroke-dasharray', (d: LinkDatum) => d.type === 'spouse' ? '4 3' : 'none')

      // Nodes
      const node = g.append('g').selectAll<SVGGElement, NodeDatum>('g')
        .data(nodes).join('g')
        .attr('transform', d => `translate(${d.x},${d.y})`)
        .style('cursor', 'pointer')
        .on('click', (_e, d) => router.push(`/people/${d.id}`))

      node.append('circle').attr('r', 18)
        .attr('fill', '#0c0c14')
        .attr('stroke', d => d.color)
        .attr('stroke-width', 2)
        .attr('filter', d => `url(#colored-glow-${Object.entries(LINE_COLORS).find(([, v]) => v === d.color)?.[0] ?? 'unknown'})`)

      node.append('text')
        .text(d => d.initials.slice(0, 2))
        .attr('text-anchor', 'middle').attr('dominant-baseline', 'central')
        .attr('font-size', '8.5px').attr('font-weight', '700')
        .attr('fill', d => d.color)
        .attr('font-family', 'system-ui, sans-serif')
        .style('pointer-events', 'none')

      node.append('text')
        .text(d => d.first)
        .attr('text-anchor', 'middle').attr('y', 28)
        .attr('font-size', '8.5px').attr('font-weight', '600')
        .attr('fill', '#e8e8e8').attr('font-family', 'system-ui, sans-serif')
        .style('pointer-events', 'none')

      node.append('text')
        .text(d => d.birthYear ? `${d.birthYear}` : '')
        .attr('text-anchor', 'middle').attr('y', 38)
        .attr('font-size', '7px').attr('fill', '#888')
        .attr('font-family', 'system-ui, sans-serif')
        .style('pointer-events', 'none')

      node
        .on('mouseenter', function (_, d) {
          d3.select(this).select('circle')
            .attr('stroke-width', 3)
            .attr('fill', d.color + '22')
        })
        .on('mouseleave', function (_, d) {
          d3.select(this).select('circle')
            .attr('stroke-width', 2)
            .attr('fill', '#0c0c14')
        })

      // Legend
      const legend = svg.append('g').attr('transform', `translate(16, ${H - 16})`)
      const lines = Object.entries(LINE_LABELS).filter(([k]) => k !== 'unknown')
      lines.forEach(([key, label], i) => {
        const color = LINE_COLORS[key as keyof typeof LINE_COLORS]
        const lg = legend.append('g').attr('transform', `translate(${i * 90}, 0)`)
        lg.append('circle').attr('r', 5).attr('fill', color).attr('cy', -5)
        lg.append('text').text(label)
          .attr('x', 10).attr('y', -1)
          .attr('font-size', '9px').attr('fill', '#aaa')
          .attr('font-family', 'system-ui, sans-serif')
      })
    })
  }, [people, relationships, router])

  return <svg ref={svgRef} width="100%" height="100%" style={{ display: 'block', minHeight: '440px' }} />
}
