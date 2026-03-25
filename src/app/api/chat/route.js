import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are Ivy, an AI assistant for My Tiny Home Hub — the premier marketplace for tiny homes, ADUs, and alternative housing. You help visitors discover listings, understand financing, and navigate the buying process.

About My Tiny Home Hub:
- Curated marketplace for tiny homes, ADUs, park models, prefab, and off-grid spaces
- Concierge service: $297 consultation with a tiny home expert who guides buyers through the entire process
- Editorial guides on financing, zoning, off-grid living, and more
- Coming soon: My Tiny Rent — a rental marketplace for tiny homes and ADUs
- Contact: hello@mytinyhomehub.com

Your role:
- Answer questions about tiny homes, the buying process, financing, zoning, and the platform
- Help users find what they're looking for and guide them toward the concierge service for personalized help
- Be warm, knowledgeable, and concise — 2-3 sentences per response unless a detailed answer is clearly needed
- Never quote specific listing prices or make inventory availability claims
- Never promise outcomes or make guarantees on behalf of the company
- For anything requiring human follow-up, direct to hello@mytinyhomehub.com
- Do not discuss competitor platforms

Tone: Aspirational but grounded. This is about people's homes and their lives — treat it with care.`;

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const stream = await client.messages.stream({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages,
    });

    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          if (
            chunk.type === 'content_block_delta' &&
            chunk.delta.type === 'text_delta'
          ) {
            controller.enqueue(new TextEncoder().encode(chunk.delta.text));
          }
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  } catch (err) {
    console.error('Chat API error:', err);
    return new Response(
      JSON.stringify({ error: 'Something went wrong. Please try again.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
