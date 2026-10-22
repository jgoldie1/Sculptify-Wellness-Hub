# Sculptify No-Regression and Cybersecurity Release Policy

Status: Automated checks added to development branch. Production protection and security certification are NOT yet established.

## No-regression gates
- Require a pull request, passing regression workflow, and human review before merging to main. Configure GitHub branch protection separately; a workflow alone does not block merging.
- Verify navigation, owner login and logout, booking inquiry, mobile layout, store, Academy, backup export, and PWA installation on preview before publishing.
- Keep a known-good deployment and rollback instructions. Do not replace production until approval and tests.
- Do not activate paid hosting, AI, Shopify, payment processors, or shipping subscriptions without the owner's approval.

## Cybersecurity requirements
- Enforce least-privilege owner access and multifactor authentication on GitHub, Vercel, Supabase, domain registrar, business email, Shopify and payments.
- Check Supabase row-level security and storage permissions with tests for unauthorized access across owners; never expose secret or service-role keys in browser code.
- Use hosted checkout and server-side payment verification; do not store payment cards. Protect health and financial data with privacy and regulatory review.
- Validate and sanitize input, use secure HTTP response headers, rate limits and content security policy compatible with necessary scripts.
- Enable dependency and secret scanning, encrypted private backups, restoration drills, audit logs and incident-response contacts.

## Still unverified
- Vercel preview deployment was denied permission (403).
- Owner photo assets, secure booking, live checkout, shipping, owner authorization, production headers, actual RLS, and backup restoration have not been verified.
- The added automated checks cover static structure and basic credential patterns; they are not a penetration test.
