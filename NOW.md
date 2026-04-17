<!-- markdownlint-disable MD013 MD022 MD025 MD032 MD034 MD058 MD060 -->

# ApexFlash App â€” CURRENT STATUS
# Last updated: 2026-04-12 (Sessie 26)

## LIVE STATE
- URL: https://apexflash.pro
- Render service: srv-d6k5voh5pdvs73dsru5g
- Version: v3.22.6
- Global release: R2026.04.11.01

## WAT WERKT (v3.22.4)
- âœ… Landing page live â€” oranje branding (#f97316)
- âœ… Affiliates: Bitunix, Blofin, MEXC, Gate.com, Bitvavo, Binance
- âœ… Telegram links: @ApexFlashBot + @ApexFlashAlerts
- âœ… Prijzen: Pro $9.99, Elite $29.99
- âœ… Hero: live stats van /api/stats (Redis)
- âœ… Email: support@apexflash.pro (Footer + About) â€” was info@mindvault-ai.com
- âœ… Favicon: /public/favicon.svg â€” oranje bliksem
- âœ… About pagina: /about â€” Mission, Strategy, Safety, Technology
- âœ… About link in Navbar
- âœ… 12 env vars op Render app service

## SSOT SECRETS APP
Box Drive: C:\Users\erik_\Box\08_OPERATIONS\8.1_ApexFlash_Bot\.env.apexflash-app
Sync:      python sync_render_app_env.py (in apexflash-app repo)

## OPENSTAANDE ACTIES
- âš ï¸ CEO API route (/api/ceo) â€” aanwezig maar verifieer live
- âš ï¸ Verifieer live: apexflash.pro/about + favicon in browser tab

## v3.22.5 — NextAuth 500 fix (2026-04-17)
- FIX: /api/auth/session 500 → GoogleProvider nu conditioneel geregistreerd
- Oorzaak: GOOGLE_CLIENT_ID/SECRET ontbreken op Render → next-auth crash bij init
- Gevolg: landing page werkte, maar console toonde 500 errors bij elke page load
- Zodra Erik Google OAuth creds levert + op Render zet → login automatisch actief

## v3.22.6 — Whale Scanner "Offline" fix (2026-04-17)
- FIX: LiveFeed toonde "Whale Scanner: Offline" terwijl bot live was
- Oorzaak: bot schrijft JSON `{"ts":...,"gmgn_ok":...}` naar Redis key
  `apexflash:whale:heartbeat`, maar /api/activity deed `parseInt()` op JSON
  → NaN → scanMinutesAgo=null → frontend "Offline"
- Fix: /api/activity parseert nu JSON (fallback naar plain int)
- Bonus: gmgnOk veld doorgegeven naar frontend — toekomstige status badge
