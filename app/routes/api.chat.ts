import type { ActionFunctionArgs } from 'react-router'
import OpenAI from 'openai'
import { data } from 'react-router'
import { getSystemPrompt } from '~/lib/knowledge-base'

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== 'POST') {
    return data({ error: 'Method not allowed' }, { status: 405 })
  }

  // initialize inside action to avoid build-time issues
  // and ensure we access runtime env vars safely
  // eslint-disable-next-line node/prefer-global/process
  const apiKey = process.env.OPEN_AI_KEY

  if (!apiKey) {
    console.error('OpenAI API Key is missing. Please set OPEN_AI_KEY in Netlify environment variables.')
    return data({ error: 'Server configuration error' }, { status: 500 })
  }

  const openai = new OpenAI({ apiKey })

  try {
    const body = await request.json()
    const userMessage = body.message

    if (!userMessage) {
      return data({ error: 'Message is required' }, { status: 400 })
    }

    // Fetch the latest system prompt (from Blobs or default)
    let systemPrompt
    try {
      systemPrompt = await getSystemPrompt()
    }
    catch (kbError: any) {
      console.error('Knowledge Base Error:', kbError)
      return data({
        error: 'Knowledge Base Failure',
        details: kbError.message,
        source: 'Netlify Blobs',
      }, { status: 500 })
    }

    // Verify basic connectivity
    try {
      await openai.models.list()
    }
    catch (modelError: any) {
      console.error('Model List Error:', modelError)
      return data({
        error: 'OpenAI Auth Check Failed',
        details: 'Could not list models. Key might be invalid or quota exceeded.',
        originalError: modelError.message,
        errorMsg: modelError,
      }, { status: 401 })
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
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
  catch (error: any) {
    console.error('OpenAI API Error:', error)
    // eslint-disable-next-line node/prefer-global/process
    const keyHint = process.env.OPEN_AI_KEY ? `${process.env.OPEN_AI_KEY.substring(0, 3)}...` : 'MISSING'

    return data({
      error: 'OpenAI API Failure',
      details: error.message || String(error),
      name: error.name,
      keyPrefix: keyHint, // Helps verify if the key starts with 'sk-'
      source: 'OpenAI',
      modelError: error,
    }, { status: 500 })
  }
}
