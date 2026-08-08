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

## Before coding a feature

Check the relevant spec:

- Product scope: `/docs/PRD.md`
- Principles: `/docs/PRODUCT_PRINCIPLES.md`
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

## Coding principles

- TypeScript strict.
- Keep content outside UI components.
- Validate content and AI structured outputs with schemas.
- Keep graph definition, content definition, user mastery, session state and evidence history separate.
- Do not couple application logic to a single LLM provider.
- Keep recommendation logic deterministic/explainable in v0.
- Prefer a structured case state machine over free-form chat.
- Add tests for mastery math, prerequisites/recommendation, content validation and case transitions.

## MVP build order

1. Foundation/design tokens/content schemas.
2. Your Skala graph.
3. Learning renderer and one complete skill loop.
4. AI Copilot Economics case.
5. Content expansion.
6. Expertise profile.

Do not add payments, certificates, forums, leaderboards, native apps, enterprise admin or a CMS before the core loop is working.