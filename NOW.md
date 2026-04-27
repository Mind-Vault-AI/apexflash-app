<!-- markdownlint-disable MD013 MD022 MD025 MD032 MD034 MD058 MD060 -->

# ApexFlash App Ã¢â‚¬â€ CURRENT STATUS
# Last updated: 2026-04-28 (Sessie 26)

## LIVE STATE
- URL: https://apexflash.pro
- Render service: srv-d6k5voh5pdvs73dsru5g
- Version: v3.23.57
- Global release: R2026.04.11.01

## WAT WERKT (v3.23.57)
- Ã¢Å“â€¦ Landing page live Ã¢â‚¬â€ oranje branding (#f97316)
- Ã¢Å“â€¦ Affiliates: Bitunix, Blofin, MEXC, Gate.com, Bitvavo, Binance
- Ã¢Å“â€¦ Telegram links: @ApexFlashBot + @ApexFlashAlerts
- Ã¢Å“â€¦ Prijzen: Pro $9.99, Elite $29.99
- Ã¢Å“â€¦ Hero: live stats van /api/stats (Redis)
- Ã¢Å“â€¦ Email: support@apexflash.pro (Footer + About) Ã¢â‚¬â€ was info@mindvault-ai.com
- Ã¢Å“â€¦ Favicon: /public/favicon.svg Ã¢â‚¬â€ oranje bliksem
- Ã¢Å“â€¦ About pagina: /about Ã¢â‚¬â€ Mission, Strategy, Safety, Technology
- Ã¢Å“â€¦ About link in Navbar
- Ã¢Å“â€¦ 12 env vars op Render app service

## SSOT SECRETS APP
Box Drive: C:\Users\erik_\Box\08_OPERATIONS\8.1_ApexFlash_Bot\.env.apexflash-app
Sync:      python sync_render_app_env.py (in apexflash-app repo)

## OPENSTAANDE ACTIES
- Ã¢Å¡Â Ã¯Â¸Â CEO API route (/api/ceo) Ã¢â‚¬â€ aanwezig maar verifieer live
- Ã¢Å¡Â Ã¯Â¸Â Verifieer live: apexflash.pro/about + favicon in browser tab

## v3.22.5 â€” NextAuth 500 fix (2026-04-17)
- FIX: /api/auth/session 500 â†’ GoogleProvider nu conditioneel geregistreerd
- Oorzaak: GOOGLE_CLIENT_ID/SECRET ontbreken op Render â†’ next-auth crash bij init
- Gevolg: landing page werkte, maar console toonde 500 errors bij elke page load
- Zodra Erik Google OAuth creds levert + op Render zet â†’ login automatisch actief

## v3.22.6 â€” Whale Scanner "Offline" fix (2026-04-17)
- FIX: LiveFeed toonde "Whale Scanner: Offline" terwijl bot live was
- Oorzaak: bot schrijft JSON `{"ts":...,"gmgn_ok":...}` naar Redis key
  `apexflash:whale:heartbeat`, maar /api/activity deed `parseInt()` op JSON
  â†’ NaN â†’ scanMinutesAgo=null â†’ frontend "Offline"
- Fix: /api/activity parseert nu JSON (fallback naar plain int)
- Bonus: gmgnOk veld doorgegeven naar frontend â€” toekomstige status badge

## v3.22.7 â€” Remove fake placeholder Reviews (2026-04-18)
- REMOVED: src/components/Reviews.tsx (116 lines, mixed-language fake testimonials NL/EN/DE/ES)
- REMOVED: dynamic import + <Reviews /> usage from src/app/page.tsx
- WHY: Erik (CEO) decision â€” placeholder reviews = brand risk + zero conversion value
- IMPACT: Page flow now: Referral â†’ Pricing â†’ FAQ â†’ EmailCapture â†’ Footer (cleaner)
- NEXT: Real testimonials added back when real customers post them

## v3.22.8 â€” Email subscribe â†’ Upstash Redis (2026-04-19)
- ISO LOG #2 EMAIL SUBSCRIBE REDIS MIGRATION
    -> START: 19-04-2026 11:08 | door: Claude (autonoom)
    -> HALF:  19-04-2026 11:14 | status: subscribe/route.ts + ceo/route.ts overgezet naar Upstash REST
    -> KLAAR: 19-04-2026 11:18 | getest: nee â€” live verify nodig (POST /api/subscribe met test email) | door: Claude
- WAAROM: data/subscribers.json op ephemeral disk = elk Render/Vercel deploy = subscribers weg
- WAT VERANDERD: src/app/api/subscribe/route.ts
  - Storage: Redis SET `apexflash:subscribers` via Upstash REST (zelfde patroon als /api/stats + /api/ceo)
  - SADD voor atomic dedup (returns 0 als bestaat, 1 als nieuw)
  - SCARD voor O(1) count
  - Productie zonder REDIS_URL â†’ 503 + log error (geen stille data-loss)
  - Lokale dev â†’ in-memory Set (process-local, lost on restart, prima voor form testing)
  - Filesystem write VERWIJDERD (Vercel/Render serverless = ephemeral disk)
- WAT VERANDERD: src/app/api/ceo/route.ts
  - getSubscriberCount() probeert nu eerst Redis SCARD, valt terug op file (transitie / lokaal)
- IMPACT: subscribers blijven nu staan tussen deploys; CEO dashboard count is consistent met form
- VERSION 3.22.7 â†’ 3.22.8

