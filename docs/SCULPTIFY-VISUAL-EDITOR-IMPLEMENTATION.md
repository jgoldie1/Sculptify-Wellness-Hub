# Sculptify Standalone Visual Editor — implementation contract

This branch preserves the existing site and Owner Studio while implementing a La Teasia-style fully editable experience.

## Required functionality
- Founder-first homepage: use approved original owner photo (not an AI likeness); preserve the purple orchid and gold brand.
- Owner Studio visual editor: editable hero photo, logo, headlines, navigation, button labels and destinations, section visibility/order, service and course descriptions, product cards, FAQs, contact details, social links, SEO titles/descriptions.
- Buttons: Preview (without publishing), Save Draft, Publish (owner only), Restore Previous Version, Upload/Replace Photo, Book Now, Shop, Academy, Provider Apply, Employer Inquiry, Contact, Install App. Never show success without persisted state.
- Upload original images to scoped Supabase Storage, validate file type/size and permissions; store public image URL and alt text, not private customer media.
- Store settings in tenant-scoped tables with RLS and owner-only writes. Public site reads published configuration only. No secret tokens in frontend.
- Responsive mobile/desktop; accessible labels, focus states, keyboard controls and contrast.
- Booking, Academy, Store and provider forms must retain working existing paths. Payments require verified live Stripe + server-side webhook before indicating success.
- Do not promise certification, shipping coverage, five-star reviews, or medical outcomes unless verified.
- Migration: separate Vercel project and domain, exportable assets and tenant data, documented owner handoff.

## QA gates
1. Owner can change and preview founder photo and button labels without altering live site.
2. Publish updates live public homepage, refresh persists, rollback restores prior version.
3. Unauthorized users cannot edit, publish, or read private leads.
4. All navigation, form submit, mobile install and checkout flows are tested.
5. No broken image links; SEO metadata/canonical/sitemap use verified production domain.

## Media pending
Original owner photographs were supplied in chat; transfer them only after confirming approved image asset storage and publication permissions. No images committed to a public repository without consent.
