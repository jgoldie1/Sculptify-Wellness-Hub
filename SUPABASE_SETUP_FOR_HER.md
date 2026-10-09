# Supabase Setup for Her — Beginner Version

This creates a **separate Sculptify backend owned by her**.

## Before starting
Use her own email/account for Supabase. Turn on 2-step verification for that email first.

Do **not** send anyone:
- database password
- Supabase secret/service-role key
- Gemini API key
- Stripe secret key

The only Supabase key that belongs in the public website is the **Publishable key**.

---

## Step 1 — Create the Supabase account

1. Open **https://supabase.com/**
2. Choose **Start your project / Sign in**
3. Sign in with her own Google account
4. If asked to create an organization, name it:
   **SculptifyLTD**
5. Keep the organization under her account

---

## Step 2 — Create her project

1. Click **New project**
2. Project name:
   **sculptify-production**
3. Create a strong database password
4. Save the password in a password manager
5. Choose a U.S. region close to the business. For a San Diego business, choose a U.S. West region when available.
6. Start with the Free plan if it satisfies current usage
7. Click **Create new project**
8. Wait until the database says it is ready

---

## Step 3 — Get only the 2 browser values we need

When the project is ready:

1. Open the project
2. Click **Connect** or go to **Settings → API Keys**
3. Copy:
   - **Project URL**
   - **Publishable key** beginning with `sb_publishable_`

Do **not** copy the secret/service-role key into the website.

Put the two browser values into `config.js`:

```js
window.SCULPTIFY_CONFIG = Object.freeze({
  supabaseUrl: "PASTE_HER_PROJECT_URL_HERE",
  supabasePublishableKey: "PASTE_HER_PUBLISHABLE_KEY_HERE"
});
```

This one file switches the whole website from the old backend to her separate Supabase project.

---

## Step 4 — Load the Sculptify database

1. In Supabase, open **SQL Editor**
2. Click **New query**
3. Open the Sculptify migration SQL supplied with the handoff
4. Paste the SQL into the editor
5. Click **Run**
6. Confirm there are no red errors

This creates the Sculptify-only tables, Row Level Security, owner/admin controls, templates, grants, Academy, products, bookings, client sites, and growth tools.

---

## Step 5 — Set her private owner email

After the database migration runs:

1. Open **SQL Editor**
2. Run the private owner configuration step from the migration instructions
3. Use the email she wants as the private owner account
4. That email should not automatically be displayed publicly

She can later create a public business email such as:
- hello@herdomain.com
- bookings@herdomain.com

Her private login email can stay separate.

---

## Step 6 — Set up Auth redirects

After the website has an HTTPS address:

1. Open **Authentication**
2. Open **URL Configuration**
3. Add the live website URL as an allowed redirect URL
4. Save

This allows the email magic-link login to return to the Sculptify website.

---

## Step 7 — Add Gemini securely

1. Create a Gemini API key in Google AI Studio
2. In Supabase open **Edge Functions → Secrets**
3. Add:
   - Name: `GEMINI_API_KEY`
   - Value: her Gemini key
4. Never paste the key into website code or GitHub

Optional:
- `GEMINI_MODEL`

HoloGPT stays the customer-facing name.
Stubbs AI stays the platform brand.
Gemini is only the underlying model provider.

---

## Step 8 — Deploy Sculptify Edge Functions

The separate project needs the Sculptify functions deployed:
- sculptify-hologpt
- sculptify-gemini-check
- sculptify-go
- sculptify-grant-draft
- sculptify-owner-export
- sculptify-owner-coach
- sculptify-client-provision
- sculptify-client-claim

These contain the private/server logic. They should be deployed to **her** Supabase project.

---

## Step 9 — Test before going live

Test all of these from her computer and phone:

- website loads
- owner email receives magic link
- Owner Studio opens after sign-in
- booking saves
- HoloGPT responds
- provider form saves
- Template Studio creates a test client
- client editor can save → preview → publish
- private backup downloads only while owner is signed in
- permanent QR reaches the current website
- PWA/Add to Home Screen works

---

## What she should see when setup is complete

She will have her own:
- Supabase account
- Sculptify database
- owner login
- HoloGPT backend
- client-template system
- grants/product/growth data
- private backups
- AI secrets

At that point her business backend is separate from yours.
