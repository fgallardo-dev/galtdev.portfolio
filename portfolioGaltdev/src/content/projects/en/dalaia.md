---
title: DalaIA — a mini-ERP for small businesses
kind: practice
summary: Day-to-day management for small businesses (invoicing, expenses, scheduling and an AI copilot). I joined to audit its production readiness and harden the authorization and tax-calculation layers.
techs: [typescript, react, sql]
accent: '#4F46E5'
cover: ../../../assets/projects/dalaia/coverDalaia.png
coverAlt: DalaIA landing page, showing the tagline "the mini-ERP for small businesses" and its six main features
hover: ../../../assets/projects/dalaia/hoverDalaia.png
order: 1
draft: false
---

DalaIA is a mini-ERP for small businesses: only what a small company actually needs day to day —invoicing, expenses, scheduling, team management and an AI copilot— without the enterprise modules nobody ever opens. I joined the project with the codebase already built and the product in private beta, right before its commercial launch.

My job was not to add features. It was to answer one concrete question: is this ready to sell? To answer it I ran a production-readiness audit across nine domains and then took ownership of the blocking findings.

## Problems and fronts

- **Incomplete authorization layer.** Permission checks ran when rendering the interface, but not when mutating data. A user whose access had been revoked kept their session and could still write to the system.
- **Inconsistent tax rounding.** On multi-line invoices with a discount, the taxable base plus VAT did not add up to the total. On a document with legal standing, that is not a cosmetic detail.
- **No safety net and no branch coordination.** There was no CI and no pre-commit hooks, and the main branch deployed to production automatically. On top of that, a teammate was working in parallel on files my fixes also touched.

## How I solved it

Before touching any code, I studied the root cause of each finding. In the authorization bug, the visible symptom ("the check only runs at render time") hid two real gaps: the session did not carry the account status, and there was no single point every mutation had to pass through. The fix was a central guard that reads fresh account status —memoized per request, never cached in the session, because caching it reintroduces exactly the staleness that caused the bug— wired into the server funnels.

I put that design through an adversarial fresh-eyes review, and the review knocked it down: the premise "every mutation goes through a funnel" was false. Several write paths bypassed both funnels, one of them with cross-organization impact. I dropped the two-funnel design, swept every mutation point empirically and closed each one, with tests that cover behavior rather than implementation.

On the tax front, the problem was rounding early instead of late: the crumbs from each line accumulated until the total drifted. The fix was to reduce it to a single rounding rule applied in a single layer, with the domain as the only authority; the database and the PDF generator became consumers. Money travels as exact decimals end to end, never as floating point.

For coordination, I grouped the findings into four buckets ordered by dependency, so the bucket that shared files with my teammate's work landed last and the conflict was resolved once instead of being replayed on every rebase.

## What I learned

The most valuable takeaway was a lesson in technical humility: **never trust an "everything goes through here" without verifying it empirically**. My design was correct on a premise I had never checked, and it was the fresh-eyes review —not my own tests— that caught it before it reached production. Empirical verification now comes before elegant design.

On the technical side I took away real judgment about money: never floating point, and rounding as an explicit decision that happens in exactly one place, on purpose. I also learned to read a layered architecture before modifying it —pure calculation on one side, business logic on another, presentation on a third— because knowing which layer a rule lives in is what stops you from duplicating it.

And on the human side: when two people touch the same files, integration order is a design decision in its own right. Planning it up front cost an afternoon and saved a week of conflicts.
