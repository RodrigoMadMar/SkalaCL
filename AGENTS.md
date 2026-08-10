# AGENTS.md — Skala Implementation Guardrails

Read `/docs/PRD.md` and `/docs/PRODUCT_PRINCIPLES.md` before implementing product changes.

## Non-negotiables

- Skala is not an LMS.
- The atomic unit is a skill, not a course.
- Knowledge is represented as a graph.
- The user has a persistent mastery state over graph nodes.
- Evidence events explain mastery changes.
- AI is embedded into learning and cases; do not reduce it to a generic chatbot.
- Cases evaluate reasoning quality and adaptability, not only answer correctness.
- The first deep Domain is AI; Business Core remains the foundational map.
- Organize future learning by domains/specializations, not rigid career paths.
- Dark-first visual direction is intentional: AI/research-lab, premium, sparse and editorial.
- Foundation skills must teach before they demand independent application. Do not confuse assessment density with learning depth.

## Before coding a feature

Check the relevant spec:

- Product scope: `/docs/PRD.md`
- Principles: `/docs/PRODUCT_PRINCIPLES.md`
- Curriculum: `/docs/CURRICULUM_V1.md`
- Learning experience V2: `/docs/LEARNING_EXPERIENCE_V2.md`
- Unit 01 base curriculum blueprint: `/docs/UNIT_01_ECONOMICS_OF_BUSINESS.md`
- Unit 01 V2 teaching addendum: `/docs/UNIT_01_ECONOMICS_OF_BUSINESS_V2.md`
- Supply & Demand V2 reference skill: `/docs/REFERENCE_SKILL_SUPPLY_DEMAND_V2.md`
- UX/visual behavior: `/docs/UX_SPEC.md`
- Brand: `/docs/BRAND_SYSTEM.md`
- Graph: `/docs/KNOWLEDGE_GRAPH.md`
- Mastery: `/docs/MASTERY_MODEL.md`
- AI: `/docs/AI_BEHAVIOR.md`
- Content: `/docs/CONTENT_MODEL.md`
- Cases: `/docs/CASE_ENGINE.md`
- Architecture: `/docs/TECH_ARCHITECTURE.md`
- Delivery phases: `/docs/MVP_SCOPE.md`

If a requested implementation conflicts with these documents, preserve the product principle and surface the conflict rather than silently turning Skala into a conventional course platform.

For Business Core, program, unit, checkpoint or capstone work, treat `CURRICULUM_V1.md` as the curriculum source of truth. Program/unit structures are curated traversals of graph skills and must not create duplicate mastery for the same skill.

For foundational learning-session implementation, `LEARNING_EXPERIENCE_V2.md` is the pedagogical source of truth. During the Unit 01 migration, the V2 addendum supersedes the old interaction-heavy pattern where they conflict. `REFERENCE_SKILL_SUPPLY_DEMAND_V2.md` is the first implementation reference and must be validated before migrating the remaining Unit 01 skills.

## Coding principles

- TypeScript strict.
- Keep content outside UI components.
- Validate content and AI structured outputs with schemas.
- Keep graph definition, content definition, user mastery, session state and evidence history separate.
- Do not couple application logic to a single LLM provider.
- Keep recommendation logic deterministic/explainable in v0.
- Prefer a structured case state machine over free-form chat.
- Add tests for mastery math, prerequisites/recommendation, content validation and case transitions.
- Do not award mastery for passive reading; teaching blocks should produce no evidence or exposure-only evidence unless an actual learner action occurs.

## MVP build order

1. Foundation/design tokens/content schemas.
2. Your Skala graph.
3. Learning renderer and one complete skill loop.
4. AI Copilot Economics case.
5. Content expansion.
6. Expertise profile.

Do not add payments, certificates, forums, leaderboards, native apps, enterprise admin or a CMS before the core loop is working.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->