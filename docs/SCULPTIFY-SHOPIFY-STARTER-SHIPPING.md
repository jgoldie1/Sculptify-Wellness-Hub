# Sculptify Shopify + Branded Starter Pack + Shipping

## Integration design
- Sculptify remains the branded public website on Vercel, independent from other tenants.
- Shopify is the source of truth for physical product catalog, variants, inventory, discounts, checkout, order status, taxes, shipping and returns. Avoid parallel order/payment ledgers that can disagree.
- Store owner must authorize Shopify installation and choose a store/account; no credentials or private tokens committed to GitHub.
- Use Shopify's supported storefront APIs / secure checkout links; do not create orders as paid from browser redirects. Verify fulfillment and payment via authenticated webhooks.
- Stubbs AI/HoloGPT only answers from owner-approved product, shipping and returns information; never invent inventory, tracking or delivery dates.
- Never enable live checkout until actual Shopify account, shipping zones, rates, tax configuration, payment provider and test order are verified.

## Branded starter pack
- Brand palette: midnight #120A1B, royal purple #542080, orchid #A63DD2, metallic gold #D6A84F, pearl #F7EFFA.
- Founder-approved real portrait on home/about and optional thank-you insert; preserve original photo and consent.
- Design assets: orchid logo variants, storefront hero, product-card templates, social story/reel templates, business card, thank-you card, packing slip, care insert, return instructions, QR code linking to canonical store URL.
- Packaging mockups: black/purple/gold shipping box or mailer, orchid tissue/sticker, branded insert. No production order without owner approval.
- Starter product candidates: cosmetic bags, headbands, satin bonnets, spa accessories, branded merch. Validate claims, safety, supplier sample, pricing and returns before listing.

## Shipping SOP
- Define shipping origin, fulfillment method (self/3PL/dropship), service areas, carrier accounts, dimensional weight, packaging sizes, label workflow, tracking email, lost parcel policy, return address and refunds.
- Calculate unit economics including product cost, inbound freight, packaging, payment fees, postage, returns reserve and Shopify fees.
- Display realistic processing and transit estimates only after carrier/supplier verification.
- Store customer shipping data in authorized systems only.

## Acceptance tests
- Approved owner can edit catalog and publish product with real image and inventory.
- Test purchase in supported test mode, webhook verified, shipping label/tracking produced in appropriate service.
- Refund/return and out-of-stock scenarios verified.
- Mobile storefront buttons navigate correctly and are keyboard accessible.
- Migration checklist includes Shopify ownership and domain/DNS changes.

## Blockers
- Shopify is not yet connected or authenticated in ChatGPT; owner must authorize connection and billing.
- Owner photo files and approved brand packaging print specifications not yet confirmed in repository.
- No shipping origin, carriers, supplier contracts or return address verified.
