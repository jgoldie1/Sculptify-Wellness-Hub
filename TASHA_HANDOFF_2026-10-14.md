# SculptifyLTD — Tasha's Owner Handoff | 2026-10-14

## Start here
This is the standalone SculptifyLTD San Diego website/PWA repository, not the TRYAMM StreetVerse business configuration. The website code exists and the latest observed Quality & Security workflow passed. The latest observed GitHub Pages deployment failed. Do **not** describe the public website, payments, AI responses, booking delivery, or Supabase security as production-verified until tested.

**Repository:** https://github.com/jgoldie1/Sculptify-Wellness-Hub
**Owner introduction:** [OWNER_START_HERE.md](./OWNER_START_HERE.md)
**Launch guide:** [FINAL_HANDOFF.md](./FINAL_HANDOFF.md)
**Security:** [SECURITY.md](./SECURITY.md)
**Recovery:** [BACKUP_RECOVERY.md](./BACKUP_RECOVERY.md)

## First owner action: enable GitHub Pages
1. Open https://github.com/jgoldie1/Sculptify-Wellness-Hub/settings/pages while signed into an account with repository administration rights.
2. Under Build and deployment choose **GitHub Actions**.
3. Open https://github.com/jgoldie1/Sculptify-Wellness-Hub/actions and rerun **Deploy Sculptify to GitHub Pages**.
4. Wait for a green run and copy the published HTTPS URL. If permission is denied, ask the repository administrator to perform this step. Do not guess a live URL.
5. Open the published URL on an iPhone and desktop. Check Home, Services, Bookings, Academy, Store, Providers, Owner Studio, legal links and accessibility.

## Then activate in this order
- [ ] Confirm public business name, contact email, phone, operating/service area, service descriptions, branding, and owner permission to publish.
- [ ] Add verified published URL to Supabase Authentication redirect allowlist; test owner login without sharing the private login address.
- [ ] Verify database RLS and least-privilege access, Edge Function authorization and CORS; test that an ordinary user cannot view other customers' records.
- [ ] Verify the HoloGPT endpoint in the real deployed site. Configure an AI provider key **only in Supabase secrets** if missing; never paste keys in GitHub or chat. If AI is unavailable, show a clear offline fallback.
- [ ] Test booking request, owner notification/visibility, reschedule/cancel, timezone, consent, and data retention.
- [ ] Connect the owner's verified Stripe merchant account; use test mode for checkout, webhook, refunds, receipts, and payout reconciliation before live payments.
- [ ] Approve service prices, Academy prerequisites, instructor credentials, student kit, certification wording, policies, and course enrollment flow.
- [ ] Approve supplier samples, landed costs, shipping restrictions and returns before selling Store products. Do not list Printful hand towels for U.S. delivery without verified eligibility.
- [ ] Verify provider/employer forms, consent and qualification screening; distinguish referral service from employment claims.
- [ ] Verify PWA install, permanent QR redirect, contact links, form confirmation, and backup restore.
- [ ] Publish truthful SEO titles, descriptions, canonical URL, sitemap, robots and appropriate schema after domain is confirmed; submit to Search Console when owner authorizes.
- [ ] Obtain approval before advertising, legal attestations, grant submissions, business certifications, or real transactions.

## Acceptance test — do not mark complete until these pass
1. Public HTTPS site opens on mobile without a broken page.
2. All four conversion journeys (Bookings, Academy, Store, Provider/Employer) work as intended, or are clearly labeled coming soon.
3. Owner can log in and view only authorized business data.
4. Booking creates an accurate record and authorized owner can see it.
5. HoloGPT responds from a verified backend or transparently says unavailable.
6. Test checkout, refunds, and receipts succeed; no public secret keys.
7. Site metadata, links, sitemap, robots, and accessibility checks pass.
8. Backup and restore procedure is documented and tested.
9. Owner approves content, prices, refund policies, contact details, and go-live.

## Tasha's first-week operations
Daily: review booking inquiries, Academy and provider leads, customer messages, product questions, and top 3 Quantum SEO opportunities. Wednesday: scout up to five low-risk products and check fulfillment/margins. First business day monthly: verify funding opportunities and deadlines, with owner approval before submissions. Friday: review GitHub workflows, dependency alerts, Supabase access, Edge Functions and backups.

## Scope and money safeguards
Keep this standalone repo and its deployment separate from TRYAMM/StreetVerse. Do not enable paid Vercel services, advertising, third-party subscriptions, product orders or recurring costs without owner approval. Grant Tasha only the minimum role needed; never share passwords, secret keys or unrestricted production access in messages.

## Handoff decision
**Code handoff: ready. Public business launch: not verified.**
Tasha can begin using these instructions immediately and finish owner-controlled setup once given authorized access. The owner must approve business identity, content, pricing, merchant setup, and publication.
