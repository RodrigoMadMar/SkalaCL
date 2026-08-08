# Skala UX Specification

## Experience statement

Skala should feel like an AI research lab, a premium business school and a consumer learning product converging in one interface.

The user should never feel they are browsing a conventional LMS.

## Visual direction

Dark-first.

Suggested tokens:

- Background: `#0A0B0D`
- Surface: `#121419`
- Elevated surface: `#191C22`
- Primary text: `#F2F1EC`
- Muted text: `#8E929C`
- Skala signal / mastery: `#C7FF4A`
- AI/context accent: `#8B7CFF`

Color discipline:

- ~90% neutral.
- Lime is meaningful: progress, mastery, unlocks, successful evidence.
- Violet is contextual: AI intervention, explanation, intelligence layer.
- Avoid gradients unless subtle and functional.

Typography:

- UI: contemporary grotesk/sans.
- Cases/editorial moments: contemporary serif.
- Data/mastery labels: monospace used selectively.

Examples of data language:

`MASTERY 082`
`CASE 017`
`SKILL AI.STR.023`

## Motion

Subtle and purposeful:

- graph nodes brighten when mastery changes;
- edges animate gently when prerequisites unlock;
- no excessive spring motion;
- no celebration confetti by default;
- transitions should feel instrument-like rather than game-like.

## Primary navigation

Desktop MVP:

- Home
- Your Skala
- Explore
- Cases
- Profile

Learn sessions are entered contextually and need not be a permanent top-level destination.

## Home

Purpose: answer one question immediately — **what should I do now?**

Priority order:

1. Next best move.
2. Small recent-progress signal.
3. Weekly/recommended case.
4. Lightweight access to Your Skala.

Do not build a dashboard full of widgets.

Example hierarchy:

- Greeting
- `YOUR NEXT MOVE`
- Skill title
- one-sentence relevance
- difficulty / estimated time
- `CONTINUE`
- compact mastery summary
- recommended case

## Your Skala

This is a core product surface.

It is an interactive graph/constellation of the user's business knowledge.

Zoom levels:

1. Global: Business Core and Domains.
2. Domain: clusters/specializations.
3. Specialization: atomic skills and dependencies.

Node states:

- Unseen: faint.
- Available: outlined.
- Learning: partially illuminated.
- Mastered: bright/filled.
- Demonstrated: optional stronger indicator/ring once enough case evidence exists.

Graph interactions:

- hover/focus shows name and compact mastery;
- click opens detail drawer;
- detail shows prerequisites, evidence, related domains and recommended next action;
- zoom/pan desktop-friendly;
- mobile can fall back to hierarchical drill-down while preserving the mental model.

The visual must avoid looking like a school mind map.

## Explore

Explore is for agency, not the default learning path.

Top level:

- Business Core
- Domains

Domain detail:

- description;
- clusters/specializations;
- mastery state;
- recommended entry point;
- relationship to existing knowledge.

Avoid price/course cards in MVP.

## Learn session

The learning experience is a single flowing surface, ideally scroll-based or step-based without LMS chrome.

Possible block types:

- editorial concept;
- chart/diagram;
- short example;
- think-before-reveal prompt;
- single/multiple choice reasoning;
- open response;
- AI response/challenge;
- mini scenario;
- retrieval check;
- reflection;
- mastery update.

AI should appear as `Skala`, not “AI Tutor.”

Useful explicit controls can include:

- Explain differently
- Give me an example
- Challenge me
- Go deeper

These should be secondary to the embedded adaptive flow.

## Cases

Cases should feel editorial/cinematic but remain information-dense.

Opening example structure:

`CASE 017`

Large serif title.
Location/year/context.

`YOU ARE`
Role in the decision.

`ENTER THE ROOM`

Case workspace tabs may include:

- Brief
- Financials
- Market
- Inbox
- Decision

AI can embody stakeholders such as CFO, CMO, board member or competitor without becoming roleplay theater. Each character exists to introduce evidence or challenge assumptions.

Case ending:

- dimension scores;
- concise reasoning feedback;
- decision trajectory summary;
- mastery deltas;
- graph nodes visibly update.

## Profile

Profile is designed as professional capital.

Show:

- name;
- overall visual expertise map;
- domain mastery;
- demonstrated skills;
- cases completed;
- evidence count;
- latest validation;
- future share action.

Avoid vanity metrics that do not reflect real evidence.

## Community direction, post-MVP

Do not build a generic forum first.

Social interaction should emerge from learning objects:

- perspectives after a completed case;
- discussion attached to a skill;
- study circles;
- events;
- people discovered through demonstrated expertise.

Users should not see others' case reasoning until they have formed/submitted their own view.

## Accessibility and responsiveness

- Keyboard navigation for graph controls where practical.
- Strong contrast despite dark theme.
- Do not communicate node state by color alone.
- Responsive desktop-first MVP; mobile should preserve learning and case completion even if graph visualization is simplified.
- Respect reduced-motion preferences.