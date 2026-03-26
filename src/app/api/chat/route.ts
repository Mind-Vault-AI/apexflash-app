import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are the ApexFlash AI assistant on apexflash.pro. You help users understand the ApexFlash crypto whale tracking bot.

Key facts:
- ApexFlash is a FREE Telegram bot that detects whale token swaps on Solana & Ethereum
- AI (CryptoBERT) grades every signal A-D. Only A-C reach users. D is filtered.
- 1-tap buy via Jupiter V6 aggregator
- Win rate tracking, auto SL/TP
- Pricing: Free (ETH+SOL), Pro $9.99/mo (+BSC, copy trading), Elite $29.99/mo (all chains)
- Trading fee: 1% (Free), 0.75% (Pro), 0.5% (Elite)
- Exchange bonuses: Bitunix $8K, MEXC $1K, Gate.io $6.6K
- Bot link: https://t.me/ApexFlashBot
- Channel: https://t.me/ApexFlashAlerts

Rules:
- Keep answers SHORT (2-3 sentences max)
- Always mention the bot is FREE
- End with a call-to-action when relevant
- Never give financial advice
- Be enthusiastic but professional
- Answer in the language the user writes in`;

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    if (!message || typeof message !== 'string' || message.length > 500) {
      return NextResponse.json({ reply: 'Please ask a shorter question.' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        reply: 'AI is temporarily unavailable. Ask your question in our Telegram bot instead!',
        cta: { label: 'Open Bot', url: 'https://t.me/ApexFlashBot' },
      });
    }

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: [{ parts: [{ text: message }] }],
          generationConfig: { maxOutputTokens: 256, temperature: 0.7 },
        }),
      }
    );

    if (!res.ok) {
      return NextResponse.json({
        reply: 'AI is busy right now. Try our Telegram bot for instant answers!',
        cta: { label: 'Open Bot', url: 'https://t.me/ApexFlashBot' },
      });
    }

    const data = await res.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I couldn\'t process that. Try our Telegram bot!';

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({
      reply: 'Something went wrong. Ask in our Telegram bot instead!',
      cta: { label: 'Open Bot', url: 'https://t.me/ApexFlashBot' },
    });
  }
}
