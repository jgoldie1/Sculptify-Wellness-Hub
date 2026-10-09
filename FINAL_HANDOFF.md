# SculptifyLTD — Final Handoff Checklist

## Status
The standalone SculptifyLTD business platform is built and merged on `main`.

Core code/security validation:
- Sculptify Quality & Security: PASS
- CodeQL: PASS
- Supabase RLS: enabled for Sculptify tables
- Owner email: private Supabase configuration
- HoloGPT: live through Supabase Edge Functions
- Permanent QR redirect: live
- Template Studio/client editor: built
- Grant Center, Business Academy, Product Pipeline, Growth Roadmap: built

## Two launch blockers that still require account-level action

### Option A — GitHub Pages
The GitHub Pages workflow is already in the repository, but Pages is not enabled for the repository.

Owner steps:
1. Open GitHub → `jgoldie1/Sculptify-Wellness-Hub`
2. Tap/click **Settings**
3. Open **Pages**
4. Under **Build and deployment**, choose **GitHub Actions**
5. Return to **Actions**
6. Run **Deploy Sculptify to GitHub Pages**

After it succeeds, GitHub will show the public HTTPS URL.

### Option B — Vercel
The connected Vercel integration returned a 403 when trying to create a new project.

Owner steps:
1. Open Vercel
2. Create/import a new project from GitHub repo `jgoldie1/Sculptify-Wellness-Hub`
3. Deploy with the repository root as the static site
4. Copy the resulting HTTPS URL

Either option is enough. Do not configure both unless desired.

## Immediately after hosting works
1. Open Supabase Dashboard → Authentication → URL Configuration.
2. Add the final HTTPS site URL as an allowed redirect URL.
3. Open Sculptify Owner Studio and sign in with the approved private owner email.
4. Add:
   - final website URL
   - public business phone
   - public business email when ready
5. Add `GEMINI_API_KEY` under Supabase Edge Functions → Secrets.
6. Test the Gemini checker.
7. Create/connect Stripe and add checkout/payment links.
8. Approve the first products/services/prices.
9. Run the final phone test:
   - site loads
   - booking saves
   - HoloGPT responds
   - owner login works
   - Stripe checkout works
   - PWA/Add to Home Screen works
   - permanent QR reaches the current site
10. Only then start paid advertising.

## What can be shipped to the owner now
- source repository
- launch checklist
- business-card QR kit
- no-code Template Studio/client editor
- Owner Studio
- Business Academy
- Growth Roadmap
- Grant Center
- Quantum SEO workflow
- Product sourcing workflow
- cybersecurity/backup runbooks

## Expected remaining owner time
If accounts and identity documents are ready:
- hosting: 10–30 minutes once account permissions are available
- Supabase redirect + owner login: 10–15 minutes
- Gemini: 10–15 minutes
- Stripe basic connection/payment link: 15–45 minutes, excluding provider verification delays
- public phone/email: 10–30 minutes depending on provider
- first store/service setup and QA: 30–90 minutes

DNS changes can resolve quickly, but allow up to 48 hours for propagation.
