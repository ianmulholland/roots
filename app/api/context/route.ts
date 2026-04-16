import Anthropic from '@anthropic-ai/sdk'
import { NextRequest } from 'next/server'

const client = new Anthropic()

export async function POST(req: NextRequest) {
  const { person } = await req.json()

  const birthDecade = person.birth_year ? Math.floor(person.birth_year / 10) * 10 : null
  const lifeSpan = person.birth_year
    ? `${person.birth_year}–${person.death_year ?? 'present'}`
    : 'unknown dates'

  const prompt = `Give a brief historical snapshot (3–4 bullet points) of what was happening in the world during the life of this ancestor.

Ancestor: ${person.first_name} ${person.last_name}
Life: ${lifeSpan}
Place: ${person.birth_place ?? 'unknown'}

Focus on: major world events, local/regional conditions in their area, what daily life was like for ordinary people. Keep each bullet to 1–2 sentences. Format as a JSON array of strings.`

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 400,
    messages: [{ role: 'user', content: prompt }],
    system: 'You are a concise history expert. Respond ONLY with a JSON array of strings — no markdown, no explanation.',
  })

  const content = message.content[0]
  if (content.type !== 'text') {
    return Response.json({ error: 'Unexpected response' }, { status: 500 })
  }

  try {
    const items = JSON.parse(content.text)
    return Response.json({ items })
  } catch {
    return Response.json({ items: [content.text] })
  }
}
