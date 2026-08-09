# Skala MVP Scope

## Goal

Build one coherent vertical slice that proves Skala's differentiated learning model without attempting to ship a full MBA.

## Scope summary

### Product surfaces

1. Home
2. Your Skala
3. Explore
4. Learn session
5. Cases
6. Profile

### Curriculum

- Business Core represented broadly.
- AI as the first deep Domain.
- 150–250 mapped graph nodes.
- ~35 playable skills.
- 15–20 priority skills polished to a high standard.
- 3 interactive cases.

### User state

- progress persistence;
- evidence ledger;
- skill mastery;
- domain/specialization rollups;
- next-best-step recommendation;
- case session history.

## Phase 0 — Foundation

Deliver:

- app shell;
- design tokens;
- content schemas;
- graph schemas;
- sample content loader;
- mastery engine tests;
- recommendation engine tests;
- static sample profile.

Acceptance:

- project runs locally;
- dark visual foundation matches brand spec;
- invalid content fails validation;
- mastery updates are deterministic and testable.

## Phase 1 — Your Skala

Deliver:

- graph view;
- global/domain/specialization zoom levels or equivalent progressive disclosure;
- node states;
- skill detail drawer;
- mapped Business Core + AI graph;
- mastery/coverage visual states.

Acceptance:

A tester can understand that the graph represents both the curriculum and their evolving expertise.

## Phase 2 — Learning loop

Deliver:

- block-based learning renderer;
- 8–10 initial playable skills;
- think-before-reveal interaction;
- open response;
- AI challenge;
- recall/application evidence;
- skill completion;
- mastery update;
- next-best-step recommendation.

Reference implementation:

- `docs/PHASE_2_REFERENCE_SKILL.md` defines `Build vs Buy` as the canonical end-to-end Phase 2 experience. Implement and validate that reference skill before scaling the renderer to additional skills.

Acceptance:

A user completes one 5–8 minute skill and sees their state visibly change in Your Skala.

## Phase 3 — Case engine

Deliver:

- case workspace;
- structured stages;
- evidence tabs;
- decision capture;
- AI challenge;
- rubric-based structured evaluation;
- mastery evidence creation;
- result screen.

Start with `AI Copilot Economics` because it best demonstrates the overlap between business fundamentals and AI.

Acceptance:

Two users can make different defensible decisions and receive reasoning-specific feedback rather than simple right/wrong grading.

## Phase 4 — Content expansion

Deliver:

- ~35 playable skills;
- all 3 MVP cases;
- Business Core entry skills;
- AI Domain depth;
- content review metadata.

Acceptance:

The product can support multiple short sessions without immediately reaching the end of authored content.

## Phase 5 — Profile

Deliver:

- domain mastery;
- specialization detail;
- demonstrated skills;
- evidence/case counts;
- recent validation;
- mini expertise map;
- share affordance mocked or implemented behind private-by-default logic.

Acceptance:

Testers see the profile as a potentially useful professional artifact, not merely a completion page.

## Explicit non-goals

Do not add before the core loop works:

- payment/subscriptions;
- cohort management;
- real public leaderboards;
- general forum;
- native app;
- B2B admin;
- certificates;
- instructor dashboards;
- video hosting;
- complex agent orchestration;
- custom CMS;
- career-path system.

## Prototype demo path

The best demo should be approximately 15–20 minutes:

1. Open Home and receive a recommended skill.
2. Complete a short AI Economics learning session.
3. Answer a reasoning prompt and receive a Skala challenge.
4. Complete the mastery check.
5. Watch Your Skala update.
6. Enter the AI Copilot Economics case.
7. Make an initial decision.
8. Respond to a changed assumption.
9. Receive dimension-level evaluation.
10. Watch mastery update again.
11. Open Profile and see accumulated evidence.

If this path feels compelling, the MVP has demonstrated the core product thesis.