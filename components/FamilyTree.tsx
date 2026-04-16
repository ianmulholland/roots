'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import dynamic from 'next/dynamic'
import type { Person, Relationship } from '@/lib/supabase'
import type { HierarchyPointNode } from 'd3-hierarchy'
import type { TreeNodeDatum, CustomNodeElementProps } from 'react-d3-tree'
import { lineColor } from '@/lib/family-lines'

const Tree = dynamic(() => import('react-d3-tree').then(m => m.Tree), { ssr: false })

type TreeNode = {
  name: string
  personId?: string
  birthYear?: string
  children?: TreeNode[]
}

function buildTree(people: Person[], relationships: Relationship[]): TreeNode[] {
  const parentChildRels = relationships.filter(r => r.relationship_type === 'parent-child')
  const childIds = new Set(parentChildRels.map(r => r.person2_id))
  const roots = people.filter(p => !childIds.has(p.id))
  const personById = new Map(people.map(p => [p.id, p]))

  const rendered = new Set<string>()

  function buildNode(person: Person): TreeNode | null {
    if (rendered.has(person.id)) return null
    rendered.add(person.id)

    const children = parentChildRels
      .filter(r => r.person1_id === person.id)
      .map(r => personById.get(r.person2_id))
      .filter((c): c is Person => !!c)
      .map(child => buildNode(child))
      .filter((n): n is TreeNode => n !== null)

    return {
      name: `${person.first_name}${person.last_name ? ' ' + person.last_name : ''}`,
      personId: person.id,
      birthYear: person.birth_year ? String(person.birth_year) : undefined,
      ...(children.length > 0 ? { children } : {}),
    }
  }

  const rootNodes = roots
    .map(r => buildNode(r))
    .filter((n): n is TreeNode => n !== null)

  if (rootNodes.length === 1) return rootNodes
  return [{ name: 'Family', children: rootNodes }]
}

function renderNode({ nodeDatum }: CustomNodeElementProps) {
  const node = nodeDatum as unknown as TreeNode
  const color = node.personId ? lineColor(node.personId) : '#666'
  const isRoot = !node.personId  // the synthetic "Family" root

  // Split long names across two lines
  const parts = node.name.split(' ')
  const mid = Math.ceil(parts.length / 2)
  const line1 = parts.slice(0, mid).join(' ')
  const line2 = parts.slice(mid).join(' ')

  if (isRoot) {
    return (
      <g>
        <text
          textAnchor="middle"
          y={6}
          fontSize={13}
          fontWeight={700}
          fill="#666"
          fontFamily="system-ui, sans-serif"
          style={{ pointerEvents: 'none' }}
        >
          {node.name}
        </text>
      </g>
    )
  }

  return (
    <g style={{ cursor: 'pointer' }}>
      {/* Glow ring */}
      <circle r={16} fill="none" stroke={color} strokeWidth={6} opacity={0.15} />
      {/* Main circle */}
      <circle r={14} fill="#0c0c14" stroke={color} strokeWidth={2} />
      {/* Name — split across up to two lines above node */}
      <text
        textAnchor="middle"
        y={-26}
        fontSize={10}
        fontWeight={600}
        fill="#e8e8e8"
        fontFamily="system-ui, sans-serif"
        style={{ pointerEvents: 'none' }}
      >
        {line2 ? line1 : node.name}
      </text>
      {line2 && (
        <text
          textAnchor="middle"
          y={-14}
          fontSize={10}
          fontWeight={600}
          fill="#e8e8e8"
          fontFamily="system-ui, sans-serif"
          style={{ pointerEvents: 'none' }}
        >
          {line2}
        </text>
      )}
      {/* Birth year below */}
      {node.birthYear && (
        <text
          textAnchor="middle"
          y={28}
          fontSize={8.5}
          fill="#888"
          fontFamily="system-ui, sans-serif"
          style={{ pointerEvents: 'none' }}
        >
          b. {node.birthYear}
        </text>
      )}
    </g>
  )
}

export default function FamilyTree({ people, relationships }: { people: Person[]; relationships: Relationship[] }) {
  const router = useRouter()
  const treeData = useMemo(() => buildTree(people, relationships), [people, relationships])

  const handleNodeClick = useCallback((nodeData: HierarchyPointNode<TreeNodeDatum>) => {
    const personId = (nodeData.data as TreeNode).personId
    if (personId) router.push(`/people/${personId}`)
  }, [router])

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Tree
        data={treeData[0]}
        orientation="vertical"
        pathFunc="step"
        pathClassFunc={() => 'tree-path'}
        translate={{ x: 700, y: 80 }}
        nodeSize={{ x: 220, y: 130 }}
        separation={{ siblings: 1.1, nonSiblings: 1.5 }}
        renderCustomNodeElement={renderNode}
        onNodeClick={handleNodeClick}
        zoom={0.5}
        scaleExtent={{ min: 0.1, max: 2 }}
      />
    </div>
  )
}
