# ApexFlash App — CHANGELOG
<!-- ISO 9001 SSOT: every version change is logged here -->
<!-- Format: ## [version] YYYY-MM-DD — one-line summary -->
<!-- Rule: bump package.json version on every release, keep in sync with bot MAJOR.MINOR -->

## [3.22.4] 2026-04-12
- docs: CHANGELOG.md created — full version history + VERSION rules (ISO 9001)
- chore: version bumped via bump_version.ps1 (patch)

## [3.22.3] 2026-04-11
- fix: ISO9001 pre-commit guard, secrets hardening, release tag R2026.04.11.01
- restore: hero copy, CryptoTicker, LiveChart, Reviews, FAQ, Referral sections

## [3.22.2] 2026-04-11 — Email + Favicon + About
- fix: supportEmail info@mindvault-ai.com → support@apexflash.pro (Footer)
- feat: /public/favicon.svg — orange lightning bolt in browser tab
- feat: /about page — Mission, Strategy, Safety, Technology + contact
- feat: About link added to Navbar

## [3.22.1] 2026-04-10 — Landing page rebuild
- feat: color scheme GREEN → ORANGE (#f97316) across all components
- feat: affiliates — Bitunix, Blofin, MEXC, Gate.com, Bitvavo (with correct refs)
- fix: Telegram links @ApexFlashBot + @ApexFlashAlerts (were wrong)
- fix: Gumroad URLs Pro ($9.99) + Elite ($29.99)
- feat: Hero — live stats from /api/stats (Upstash Redis)
- feat: 12 env vars synced to Render app service

## [3.22.0] 2026-04-09 — Initial launch
- feat: Next.js App Router landing page
- feat: Hero, Features, Exchanges, Pricing, EmailCapture, Footer, Navbar
- feat: /api/stats, /api/ceo, /api/affiliate, /api/subscribe, /api/events routes
- feat: Upstash Redis integration for live stats
- feat: Tailwind dark theme + apex color palette

## VERSION RULES (ISO 9001)
- package.json version MUST match bot MAJOR.MINOR (e.g. both 3.23.x)
- PATCH: bugfix, copy change, component tweak
- MINOR: new page, section, or integration
- On every release: update CHANGELOG.md + commit before pushing
- Render auto-deploys on git push to main
- Env vars: Box Drive .env.apexflash-app → python sync_render_app_env.py → Render
