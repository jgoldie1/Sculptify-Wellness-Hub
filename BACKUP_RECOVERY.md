# SculptifyLTD Backup & Recovery

## Three backup layers

### 1. Source code
GitHub stores the code history. Every merged change has a commit that can be reverted.

Recovery:
- identify last known-good commit
- create a recovery branch from that commit
- run CI/security checks
- redeploy

### 2. Operational business data
Supabase is the source of truth for services, FAQs, courses, products, bookings, providers, launch tasks, product sourcing and grants.

Owner Studio includes a private backup export powered by:
`sculptify-owner-export`

The export requires authenticated Sculptify owner access and returns a dated JSON file.

**Never upload that private JSON backup to this public GitHub repository.**

Recommended owner routine:
- download a private export before major business changes
- download at least monthly once customers are using the system
- keep copies in a private encrypted cloud folder controlled by the owner
- keep at least one older copy rather than overwriting every backup

### 3. Provider-level recovery
Use Supabase's available project/database backup and recovery features appropriate to the plan. Review the active Supabase plan before relying on any specific retention window.

## Restore method
The owner export is primarily a continuity/export artifact. Restoring should be performed deliberately by an administrator so newer production records are not accidentally overwritten.

Before restore:
1. Export the current state.
2. Identify the exact tables/rows needing recovery.
3. Compare current vs backup.
4. Restore only the required records.
5. Re-run RLS/security checks.
6. Test owner login, booking and HoloGPT.

## Domain/host failure
A host failure should not delete Supabase business data.
Move the static app to another host, point DNS, update Supabase Auth redirect URLs, and save the new site URL in Owner Studio. The permanent QR can continue redirecting to the new site.
