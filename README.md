# Skala

Skala is an AI-native platform for building and demonstrating business expertise.

The product is organized around a knowledge graph rather than a course catalog. Users learn through short adaptive sessions, apply concepts in interactive business cases, accumulate evidence of mastery, and build a shareable expertise profile over time.

## Product architecture

`Business Core → Domains → Specializations → Skills → Evidence → Mastery`

## MVP direction

The first vertical slice focuses on Business Core + AI, with a dark, premium, AI/futuristic product experience and a small but deep set of skills, cases, mastery signals, and an expertise profile.

Detailed product, UX, content, AI, assessment, and technical specifications live in `/docs`.

## Phase 0 + Phase 1 prototype

The current implementation includes the dark-first product shell, validated graph/content models, deterministic mastery and recommendation logic, a static expertise profile, and the interactive **Your Skala** knowledge graph.

```bash
pnpm install
pnpm dev
```

Quality checks:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

The seed graph contains Business Core and the first deep AI Domain. Curriculum data is kept outside UI components in `content/`, while mastery, graph loading, and recommendation logic live in `lib/`.
