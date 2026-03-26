// TODO: Move to Firebase Functions
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { title, type, location, sqft, beds, yearBuilt, amenities } = await req.json();
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const prompt = `Write a compelling real estate listing description for a tiny home with these details:
- Title: ${title || 'Tiny Home'}
- Type: ${type}
- Location: ${location}
- Size: ${sqft} sq ft
- Sleeping areas: ${beds}
- Year built: ${yearBuilt}
- Features: ${amenities?.join(', ') || 'None listed'}

Write 2-3 sentences. Tone: aspirational, specific, warm. No hyperbole. No em-dashes. No emojis. Start with the home's standout quality.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    return Response.json({ description: text });
  } catch (err) {
    console.error('Description generation error:', err);
    return Response.json({ error: 'Could not generate description.' }, { status: 500 });
  }
}
