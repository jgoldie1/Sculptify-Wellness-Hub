# Sculptify — No-Payment Lead Launch Plan

## Purpose
Take legitimate appointment inquiries while live Stripe onboarding and banking verification are incomplete. No charge, deposit, payment confirmation, automatic booking confirmation or guaranteed availability is implied.

## Existing website workflow
- Keep the existing `#booking` request form and its Supabase insert into `sculptify_bookings`.
- Service choices come from the `sculptify_services` table.
- Form success means **request received**, not that an appointment is confirmed.
- The owner must review availability and contact the customer before confirming a date.
- Never collect card numbers, passwords or sensitive medical histories in booking notes.
- If the database fails, show an error; never claim that a request was saved.
- Do not display unapproved Stripe URLs or switch on live checkout before test purchases and ownership verification.

## Manual acceptance checklist (owner-approved, synthetic test data only)
- [ ] On a real phone, open the current Sculptify site and reach **Book Online** with one hand.
- [ ] Verify Services list populates; test an empty required field and invalid email.
- [ ] With permission, send one clearly marked TEST request with a non-customer address.
- [ ] Verify one (and only one) entry is written to `sculptify_bookings`; verify its `status=requested`, service, date and source. Delete test data safely afterward.
- [ ] Sign in as the real Sculptify owner and confirm the request is retrievable through approved owner tools or Supabase.
- [ ] Verify contact details, prices, qualifications and services with the owner before advertising.
- [ ] Verify checkout buttons say **Checkout Pending** where no approved payment link exists.
- [ ] Test error and recovery behavior by disabling network during a test submission.
- [ ] Confirm no real customer data is copied into GitHub, logs, or demos.

## Draft inquiry ad (pending business-owner approval)
**SculptifyLTD — San Diego**
Interested in body sculpting, massage, wellness or learning opportunities? Explore Sculptify and request an appointment online. Your request is reviewed before availability is confirmed. No payment required to inquire.

CTA: **Request an Appointment**

## Separation of businesses
Sculptify services are owned/fulfilled by Sculptify; TRYAMM may sell separate approved technology services. Do not route Sculptify customer payments to TRYAMM or claim a commission absent a written agreement. NuMerica assessments require their own service scope, fulfillment arrangements, geographic coverage, and merchant approvals.

## Stripe later
Use separate verified merchant accounts and server-confirmed payments, not an unverified browser redirect. Confirm refund/cancellation policies, business contact information, tax obligations, and successful Stripe test transactions before live launch.
