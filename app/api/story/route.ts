import Anthropic from '@anthropic-ai/sdk'
import { NextRequest } from 'next/server'

const client = new Anthropic()

export async function POST(req: NextRequest) {
  const { person, relatedPeople } = await req.json()

  const familyContext = relatedPeople?.length
    ? `Related family: ${relatedPeople.map((p: { first_name: string; last_name: string; birth_year: number; relationship: string }) =>
        `${p.first_name} ${p.last_name} (${p.birth_year}, ${p.relationship})`
      ).join('; ')}`
    : ''

  const prompt = `You are a warm, thoughtful family historian. Write a short imaginative story (2–3 paragraphs) about this ancestor's life.

Ancestor: ${person.first_name} ${person.last_name}
Born: ${person.birth_year ?? 'unknown year'}${person.birth_place ? `, ${person.birth_place}` : ''}
${person.death_year ? `Died: ${person.death_year}${person.death_place ? `, ${person.death_place}` : ''}` : ''}
${person.notes ? `Notes: ${person.notes}` : ''}
${familyContext}

Ground the story in real historical events happening during their lifetime. Include specific details about what daily life, world events, or local culture they would have experienced. Be warm and human — this story will be read by their descendants. Do not invent specific facts not given; instead speculate thoughtfully with phrases like "perhaps" or "one can imagine." End with a sentence connecting them to the family that followed.`

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 600,
    messages: [{ role: 'user', content: prompt }],
    system: 'You write compelling, historically grounded family history narratives. Keep responses to 2–3 paragraphs.',
  })

  const content = message.content[0]
  if (content.type !== 'text') {
    return Response.json({ error: 'Unexpected response' }, { status: 500 })
  }

  return Response.json({ story: content.text })
}
