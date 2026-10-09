# SculptifyLTD — Launch-Ready Business Kit

**HoloGPT — Powered by Stubbs AI**

This repository is the standalone SculptifyLTD website/PWA. It is intentionally separated from the larger QSE ecosystem so the owner can deploy, move domains, and manage the business without touching unrelated projects.

## Already connected
- Supabase database + owner magic-link authentication
- Sculptify services, FAQs, Academy courses, Store catalog, bookings, provider applications
- Permanent QR redirect: https://fxluchtdfpediivhoksl.supabase.co/functions/v1/sculptify-go
- Host-independent HoloGPT endpoint: https://fxluchtdfpediivhoksl.supabase.co/functions/v1/sculptify-hologpt
- PWA/Add-to-Home-Screen support
- Owner Studio
- San Diego branding and HoloGPT/Stubbs AI identity

## Owner still needs to do
1. Connect Gemini to HoloGPT:
   - Create a Gemini API key in Google AI Studio: https://ai.google.dev/gemini-api/docs/api-key
   - In Supabase Dashboard → Edge Functions → Secrets, add `GEMINI_API_KEY`
   - Test: https://fxluchtdfpediivhoksl.supabase.co/functions/v1/sculptify-gemini-check
   - Never put the key in browser code, GitHub, email, or chat.
2. Choose/buy the final domain.
3. Deploy this repo to a static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages, etc.).
4. Add the final URL to Supabase Auth allowed redirect URLs.
5. Open Owner Studio and enter the final website URL.
6. Set the public business phone and public business email.
7. Create/connect a Stripe account and add approved checkout links.
8. Choose dropshipping/wholesale suppliers and approve products.
9. Test a booking, owner login, HoloGPT, checkout, and PWA install.
10. Print the business card only after reviewing the public contact information.

## Important
The owner's private login email is not meant to be displayed publicly. A business email can be added later without changing the owner login.

Never put Stripe secret keys or AI provider secret keys into browser code or GitHub.
