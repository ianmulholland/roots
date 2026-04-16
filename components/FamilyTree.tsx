'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import dynamic from 'next/dynamic'
import type { Person, Relationship } from '@/lib/supabase'
import type { HierarchyPointNode } from 'd3-hierarchy'
import type { TreeNodeDatum } from 'react-d3-tree'

const Tree = dynamic(() => import('react-d3-tree').then(m => m.Tree), { ssr: false })

type TreeNode = {
  name: string
  attributes?: Record<string, string | number | boolean>
  children?: TreeNode[]
  personId?: string
}

function buildTree(people: Person[], relationships: Relationship[]): TreeNode[] {
  const parentChildRels = relationships.filter(r => r.relationship_type === 'parent-child')
  const childIds = new Set(parentChildRels.map(r => r.person2_id))
  const roots = people.filter(p => !childIds.has(p.id))
  const personById = new Map(people.map(p => [p.id, p]))

  // Global set — each person renders at most once across the entire tree
  const rendered = new Set<string>()

  function buildNode(person: Person): TreeNode | null {
    // Already placed elsewhere in the tree — skip to avoid duplicates
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
      attributes: {
        ...(person.birth_year ? { born: String(person.birth_year) } : {}),
        ...(person.birth_place ? { place: person.birth_place.split(',')[0] } : {}),
      },
      ...(children.length > 0 ? { children } : {}),
    }
  }

  const rootNodes = roots
    .map(r => buildNode(r))
    .filter((n): n is TreeNode => n !== null)

  if (rootNodes.length === 1) return rootNodes

  return [{ name: 'Family', children: rootNodes }]
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
        translate={{ x: 700, y: 60 }}
        nodeSize={{ x: 200, y: 110 }}
        separation={{ siblings: 1.1, nonSiblings: 1.4 }}
        onNodeClick={handleNodeClick}
        zoom={0.5}
        scaleExtent={{ min: 0.1, max: 2 }}
      />
    </div>
  )
}
