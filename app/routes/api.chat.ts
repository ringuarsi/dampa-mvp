import type { ActionFunctionArgs } from 'react-router'
import OpenAI from 'openai'
import { data } from 'react-router'
import { getSystemPrompt } from '~/lib/knowledge-base'

// Initialize OpenAI client
// Note: In a real server environment, process.env.VITE_OPEN_AI_KEY will be available.
// We use VITE_ prefix because the user specified it, but in the backend function we access it via process.env
const openai = new OpenAI({
  // eslint-disable-next-line node/prefer-global/process
  apiKey: process.env.VITE_OPEN_AI_KEY,
})

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== 'POST') {
    return data({ error: 'Method not allowed' }, { status: 405 })
  }

  try {
    const body = await request.json()
    const userMessage = body.message

    if (!userMessage) {
      return data({ error: 'Message is required' }, { status: 400 })
    }

    // Fetch the latest system prompt (from Blobs or default)
    const systemPrompt = await getSystemPrompt()

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Cost-effective and sufficient for this task
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      max_tokens: 150,
      temperature: 0.7,
    })

    const aiResponse = completion.choices[0]?.message?.content || 'I apologize, but I couldn\'t process your request at this time.'

    return data({ response: aiResponse })
  }
  catch (error) {
    console.error('OpenAI API Error:', error)
    return data({ error: 'Failed to generate response' }, { status: 500 })
  }
}
