# SculptifyLTD Security Baseline

## Security goals
Protect owner access, customer booking data, provider applications, business data, payments, AI keys and the public website.

## Already designed into the platform
- Supabase Row Level Security on Sculptify business tables.
- Owner/admin actions require authenticated Sculptify admin access.
- Owner authorization is stored in Supabase private configuration rather than public site code.
- HoloGPT/Gemini secrets are server-side Edge Function secrets.
- Stripe secret keys are never required by the browser.
- Private business-data exports require an authenticated owner session.
- GitHub history provides a rollback trail.
- CI validates JavaScript/config and scans public code for common secret patterns.
- CodeQL scans JavaScript for security issues.
- Host security headers are defined for Vercel/Netlify.

## Owner security checklist
- Enable MFA/2-step verification on the owner Google account.
- Enable MFA on GitHub, Supabase, Stripe, domain registrar and hosting provider.
- Never reuse the business email password.
- Use a password manager for provider accounts.
- Never paste API keys into chat, email, screenshots or public GitHub issues.
- Review Supabase Auth users and Sculptify admins after any suspicious activity.
- Revoke/rotate keys immediately if a secret is exposed.
- Keep billing/payment accounts under the actual business owner.

## Incident response
If compromise is suspected:
1. Pause advertising and payment links if money could be at risk.
2. Change the owner email password and revoke unknown sessions.
3. Rotate affected Gemini/Stripe/provider keys.
4. Review Supabase Auth users and admin rows.
5. Review GitHub commits and Actions for unauthorized changes.
6. Roll back the website to the last known-good commit if necessary.
7. Export current data privately before destructive repair work.
8. Notify affected customers when legally required.

## Public-repo rule
This repository is public. Never commit:
- customer exports
- booking exports
- provider applications
- tax documents
- bank data
- API secret keys
- Stripe secret/webhook keys
- private identity documents

The Supabase publishable browser key is designed for public clients and is protected by RLS. Secret/service-role keys are not.
