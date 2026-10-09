# Her Separate Sculptify System

## Goal
Sculptify should be independently owned and operated from the owner's accounts.

## Separate ownership target

She should have her own:
- Google/email account
- Supabase organization and project
- GitHub access/repository ownership or collaborator access
- hosting account
- domain registrar account
- Stripe account
- Gemini API key
- public business phone
- public business email
- private backup location

## What is already separate
The Sculptify code is already in its own repository:
`jgoldie1/Sculptify-Wellness-Hub`

## What still has to move
The current production-ready build still points to the existing Supabase project until her new project is created and the migration is completed.

The app now uses a single file:
`config.js`

After her Supabase project exists, replace only:
- `supabaseUrl`
- `supabasePublishableKey`

The app then connects to her project.

## Recommended transfer order
1. Create her Supabase account/project.
2. Run the consolidated Sculptify SQL migration.
3. Configure the private owner email.
4. Deploy Sculptify Edge Functions to her project.
5. Add Gemini secret.
6. Change `config.js`.
7. Deploy the website to her hosting.
8. Configure Supabase Auth redirect.
9. Connect Stripe.
10. Test everything.
11. Only after tests pass, stop using the original shared backend for Sculptify.

Do not delete the old Sculptify data until the new system has been verified and a backup exists.
