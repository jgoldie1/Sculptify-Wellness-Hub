# SculptifyLTD Self-Improvement & No-Regression Policy

## Purpose
Improve the business continuously without allowing an AI agent or automation to silently damage production.

## Safe evolution loop
1. Observe: analytics, bookings, SEO, owner feedback, security alerts, grant results, product margins.
2. Diagnose: identify a specific problem or opportunity.
3. Propose: document expected benefit and risk.
4. Patch: work on a branch.
5. Test: run CI, security checks and critical-flow checks.
6. Review: owner or designated maintainer reviews material business changes.
7. Merge: only after checks pass.
8. Verify: confirm live booking, owner login, HoloGPT, Store and PWA.
9. Roll back if the change degrades a critical flow.

## Critical flows that must not regress
- site loads on mobile
- services/catalog load
- booking inserts successfully
- provider application inserts successfully
- owner magic-link sign-in works
- owner settings update works
- HoloGPT responds
- Grant Center remains owner-only
- private backup export remains owner-only
- Store does not expose payment secrets
- PWA/service worker still installs over HTTPS

## Autonomous actions allowed
- audits
- reports
- draft generation
- branch creation
- proposed code changes
- SEO suggestions
- grant preparation
- product research
- test execution

## Actions requiring human approval
- production merge when business logic materially changes
- final grant/legal certification
- payment-account changes
- bank/payout changes
- domain purchase/transfer
- supplier contracts
- changing business ownership data
- deleting production customer data
