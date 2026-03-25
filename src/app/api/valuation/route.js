import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req) {
  try {
    const { homeType, sqft, yearRange, condition, state, features } = await req.json();

    const prompt = `You are a tiny home and alternative housing valuation expert with deep knowledge of the US market.

Estimate the current market value for a tiny home with these specifications:
- Type: ${homeType}
- Size: ${sqft} sq ft
- Year range: ${yearRange}
- Condition: ${condition}
- State: ${state}
- Special features: ${features.length > 0 ? features.join(', ') : 'None listed'}

Use these realistic market benchmarks:
THOW (tiny home on wheels): $35k-$150k depending on size, age, build quality
ADU/backyard unit: $80k-$350k (size-driven, location matters heavily)
Park model/manufactured: $25k-$90k
Prefab/modular: $60k-$250k
Off-grid cabin: $25k-$130k
Converted (bus/container): $15k-$80k

Size modifiers: under 200sqft (lower end), 200-350sqft (mid), 350sqft+ (upper end of range)
Year modifiers: pre-2015 (-20%), 2015-2018 (base), 2019-2021 (+10%), 2022-2023 (+18%), 2024+ (+25%)
Condition: Like New (+15%), Excellent (base), Good (-10%), Fair (-25%)
Location: CA/NY/WA/CO (+20-30%), TX/FL/GA/TN (base), Midwest (-5%), rural markets (-10%)
Features: Solar (+$5k), off-grid system (+$8k), custom build (+12%), certified THOW (+$4k), loft (+$3k), full bath (+$5k), deck/outdoor (+$3k)

Respond ONLY with valid JSON, no markdown, no explanation:
{
  "low": number,
  "mid": number,
  "high": number,
  "confidence": "high" | "medium" | "low",
  "factors": ["concise factor 1", "concise factor 2", "concise factor 3"],
  "recommendation": "One sentence on market positioning for this specific home."
}`;

    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = message.content[0].text.trim();
    const data = JSON.parse(text);

    // Round to nearest $500 for cleaner display
    data.low = Math.round(data.low / 500) * 500;
    data.mid = Math.round(data.mid / 500) * 500;
    data.high = Math.round(data.high / 500) * 500;

    return Response.json(data);
  } catch (err) {
    console.error('Valuation error:', err);
    return Response.json({ error: 'Valuation unavailable. Please try again.' }, { status: 500 });
  }
}
