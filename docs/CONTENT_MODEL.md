# Skala Content Model

## Goal

Content must be data-driven and separable from application code so the curriculum can scale through editorial work and future agentic authoring without requiring component changes for every lesson.

## Repository structure

Suggested:

```text
/content
  /graph
    business-core.json
    ai.json
  /skills
    /strategy
    /finance
    /marketing
    /economics
    /operations
    /organization
    /data
    /ai
  /cases
    /pricing-pressure
    /ai-copilot-economics
    /ai-native-challenger
  /rubrics
  /paths
```

## Skill content schema

A playable skill should declare:

```ts
type SkillContent = {
  id: string
  title: string
  objective: string
  summary: string
  difficulty: 1 | 2 | 3 | 4 | 5
  estimatedMinutes: number
  prerequisites: string[]
  blocks: LearningBlock[]
  masteryTargets: string[]
  references?: Reference[]
  version: string
  reviewStatus: 'draft' | 'reviewed' | 'validated'
}
```

## Learning block types

MVP-supported block types:

- `editorial`
- `definition`
- `example`
- `visual`
- `think`
- `choice`
- `open_response`
- `ai_challenge`
- `application`
- `recall_check`
- `mastery_summary`

The renderer should be extensible via a block registry.

## Example skill

```json
{
  "id": "ai-inference-economics",
  "title": "Inference economics",
  "objective": "Explain why AI products can retain meaningful marginal cost and how this affects pricing and gross margin.",
  "difficulty": 2,
  "estimatedMinutes": 7,
  "prerequisites": ["ai-training-vs-inference", "unit-economics"],
  "masteryTargets": ["ai-inference-economics", "unit-economics"],
  "blocks": [
    {
      "type": "editorial",
      "title": "Software economics changed",
      "body": "Traditional software often has near-zero marginal cost for another user. AI inference can behave differently because usage continues to consume compute."
    },
    {
      "type": "think",
      "prompt": "Revenue is growing 40%, but an AI SaaS product's gross margin is falling. What would you investigate first?"
    },
    {
      "type": "ai_challenge",
      "mode": "socratic"
    },
    {
      "type": "application",
      "scenarioId": "usage-heavy-customer"
    }
  ],
  "version": "0.1",
  "reviewStatus": "draft"
}
```

## Content quality standard

Every playable skill must answer:

1. What can the learner do after this that they could not reliably do before?
2. What misconception or shallow intuition is the skill correcting?
3. Where would this concept matter in a real business decision?
4. How will the learner demonstrate understanding?

Avoid lessons that are merely definitions followed by recall questions.

## Sources and freshness

Foundational concepts can use stable references. AI-domain content may become stale quickly and should carry:

- reference metadata;
- last-reviewed date;
- version;
- optional freshness flag.

Do not bake volatile vendor/product facts into foundational skills unless the example is explicitly time-bounded.

## Agentic authoring direction

Future content pipeline roles:

### Curriculum Architect

Proposes graph nodes, objectives, prerequisites and relationships.

### Lesson Builder

Creates block-level learning experiences from approved objectives.

### Case Writer

Builds cases that require multiple skills and explicit trade-offs.

### Assessment Designer

Creates recall/application prompts and rubrics.

### Reviewer

Checks factual accuracy, objective alignment, ambiguity, duplication and unsupported claims.

Agent output should create proposed content files for human review, not publish directly to validated content.

## MVP content volume

- 150–250 mapped nodes.
- ~35 playable skills.
- 15–20 polished priority skills.
- 3 cases.

The graph may contain unplayable nodes, but the UI must communicate availability honestly.