# Sculptify QR Business Passport — Production Integration Contract

## Current state
The static Passport landing page exists at `business-passport.html` and is linked from the Sculptify navigation. The actual QR graphic, live StreetVerse scene, referral identity, attribution service and production deploy have NOT been verified.

## Preserve existing QR
1. Locate the existing QR asset and inspect its encoded URL before changing it.
2. If the URL is owned and can be redirected safely, point it to the approved public Passport landing URL after production validation. Otherwise generate a replacement only with owner approval.
3. Print the final tested QR on approved flyers, business cards and StreetVerse business panels; include a readable URL fallback.
4. Keep one stable first-party URL for the QR, with separate choices for Sculptify shopping/booking and TRYAMM business recruitment.

## Secure attribution
- Assign a non-secret, revocable Scout identifier after owner approval. Do not put personal data or authentication credentials in QR URLs.
- When a visitor opts into TRYAMM business services, collect explicit consent and create a server-side referral record with timestamp, source and attribution window.
- Use a unique verified TRYAMM customer ID and payment-provider event ID for conversion; idempotently process webhooks and ignore duplicate, pending or unverified events.
- Credit 15% of eligible TRYAMM receipts to Sculptify only after signed program approval, confirmed settlement and exclusion/refund checks. No share of Sculptify revenue.
- Subscription referrals: first 12 paid months only, if approved in writing; stop at cancellation and reverse refunded amounts.
- Separate Scout ledger from Sculptify's own business ledger. Give Sculptify read-only access to her own referral statements; never other partners' data.
- Respect consent, privacy notices, retention limits, unsubscribe requests and applicable referral/advertising regulations.

## Test before go-live
- Valid/invalid QR and mobile scans; no redirect loops.
- Booking/store destinations; Scout interest page; game destination only when live.
- First referral, duplicate referral, self-referral, consent withdrawal, cancelled checkout, settled sale, partial refund, chargeback and recurring-month cap.
- Access isolation, forged webhooks, retries, replay attacks, payout reconciliation and rollback.
- Preview deployment and owner acceptance before merging to main or publishing.
