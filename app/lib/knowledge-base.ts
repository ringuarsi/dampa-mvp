/* eslint-disable node/prefer-global/process */
import { getStore } from '@netlify/blobs'
import { bookingData } from '~/lib/data'

// Helper to safely access process.env (Node.js) or fallback to import.meta.env (Vite)
// This prevents crashes in the browser where 'process' is undefined
function getEnv(key: string): string | undefined {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key]
  }

  return import.meta.env[key]
}

export const FIXED_SYSTEM_INSTRUCTIONS = `
You are the official AI assistant for Dampa Tiger Reserve in Mizoram, India.
Your goal is to help potential visitors with information about the reserve, booking, history, and wildlife.

STRICT RULES:
1. Only answer questions related to Dampa Tiger Reserve, wildlife, nature, Mizoram tourism, and logistics for visiting.
2. If asked about unrelated topics (e.g., coding, math, world politics, general knowledge not related to the reserve), politely refuse and guide them back to Dampa Tiger Reserve topics.
3. Be helpful, polite, and welcoming.
4. Keep answers concise (under 3-4 sentences) unless the user asks for detailed history or lists.
`

export const DEFAULT_KNOWLEDGE_BASE = `
**General Info:**
- Location: Mamit District, Mizoram (Western part, bordering Bangladesh).
- Size: ~500 sq km (Largest in Mizoram).
- Status: Wildlife Sanctuary (1985), Tiger Reserve (1994).
- Name Origin: "Dampa" means "lonely men" in Mizo (legend of a tragedy leaving only bachelors).
- Nearest City: Aizawl (~130 km away).

**Wildlife (Flora & Fauna):**
- Key Animals: Clouded Leopard, Asian Elephant, Gaur (Indian Bison), Hoolock Gibbon, Slow Loris, Barking Deer, Sloth Bear.
- Birds: Great Hornbill, Oriental Pied Hornbill, Grey Peacock Pheasant, Red Junglefowl, Emerald Dove, Blue Pitta.
- Tigers: Elusive and rarely sighted, but historically present.
- Vegetation: Tropical evergreen and semi-evergreen forests, extensive bamboo forests.

**Visiting Info:**
- Open Season: ${bookingData.location.openSeason.text}.
- Accommodation: Forest Rest House (VIP, Ordinary, Dormitory).
- Booking: Can be done via the "Book Now" button on the website.

**Pricing (INR):**
- Entry: Adult ₹${bookingData.entryRates.find(r => r.category === 'Adult')?.price}, Student ₹${bookingData.entryRates.find(r => r.category === 'Student')?.price}. Children < 12 are FREE.
- Cameras: Still ₹100, Video ₹200.
- Rooms (Private/Others): VIP ₹700, Ordinary ₹300, Dormitory ₹150.

**Contact:**
- Phone: ${bookingData.contactInformation.contacts[0].phoneNumbers.join(', ')}.
`

const STORE_NAME = 'dampa-knowledge-base'
const KEY = 'knowledge-base-content'

export async function getKnowledgeBase(): Promise<string> {
  const isNetlify = getEnv('NETLIFY') || getEnv('NETLIFY_BLOBS_CONTEXT')

  // In development/local without Netlify context, return default
  if (!isNetlify) {
    console.warn('Netlify Blobs not detected. Using default KB (In-Memory/Local).')
    return DEFAULT_KNOWLEDGE_BASE
  }

  try {
    const siteID = getEnv('NETLIFY_SITE_ID')
    const token = getEnv('NETLIFY_ACCESS_TOKEN')

    const store = getStore({ name: STORE_NAME, siteID, token })
    const result = await store.get(KEY)

    // Ensure we return a string, as Blobs can theoretically return other types
    if (typeof result === 'string') {
      return result
    }

    return DEFAULT_KNOWLEDGE_BASE
  }
  catch (error) {
    console.error('Failed to fetch from Netlify Blobs:', error)
    return DEFAULT_KNOWLEDGE_BASE
  }
}

export async function getSystemPrompt(): Promise<string> {
  const kb = await getKnowledgeBase()
  return `${FIXED_SYSTEM_INSTRUCTIONS.trim()}\n\nKNOWLEDGE BASE:\n${kb}`
}

export async function updateKnowledgeBase(newKb: string): Promise<void> {
  const isNetlify = getEnv('NETLIFY') || getEnv('NETLIFY_BLOBS_CONTEXT')

  if (!isNetlify) {
    console.warn('Netlify Blobs not detected. Update skipped (Local).')
    return
  }

  const siteID = getEnv('NETLIFY_SITE_ID')
  const token = getEnv('NETLIFY_ACCESS_TOKEN')

  const store = getStore({ name: STORE_NAME, siteID, token })
  await store.set(KEY, newKb)
}
