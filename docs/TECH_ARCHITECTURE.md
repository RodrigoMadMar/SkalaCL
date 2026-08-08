# Skala Technical Architecture v0

## Goals

- Fast iteration for a web MVP.
- Content separated from UI logic.
- Provider-agnostic AI layer.
- Persistent graph/mastery state.
- Easy local development and deployment.
- Architecture simple enough for one small team/agentic workflow.

## Suggested stack

### Web

- Next.js with TypeScript.
- App Router.
- Tailwind CSS or equivalent token-driven styling.
- Component system kept lightweight and custom enough to preserve Skala's visual identity.

### Data

For the earliest demo, local JSON + browser persistence is acceptable. For a multi-user MVP, prefer Postgres/Supabase.

Core entities:

- user
- graph_node
- graph_edge
- skill_content
- evidence_event
- skill_mastery
- case_definition
- case_session
- case_response
- case_evaluation

### Graph rendering

Use a mature graph/flow visualization library only as a rendering primitive. The graph data model belongs to Skala and must remain library-agnostic.

The visual must support:

- pan/zoom;
- node state styles;
- edge styles;
- selection drawer;
- smooth updates when mastery changes.

### AI layer

Create application functions behind a provider adapter:

```ts
interface LearningAI {
  explainSkill(input: ExplainSkillInput): Promise<ExplainSkillOutput>
  generateExample(input: ExampleInput): Promise<ExampleOutput>
  challengeResponse(input: ChallengeInput): Promise<ChallengeOutput>
  evaluateApplication(input: ApplicationInput): Promise<ApplicationEvaluation>
  evaluateCaseDecision(input: CaseEvaluationInput): Promise<CaseEvaluationOutput>
}
```

Validate structured outputs with schemas before application logic consumes them.

## Suggested app structure

```text
/app
  /(product)
    /home
    /skala
    /explore
    /learn/[skillId]
    /cases
    /cases/[caseId]
    /profile
/components
  /graph
  /learning
  /cases
  /mastery
  /layout
/content
  /graph
  /skills
  /cases
  /rubrics
/lib
  /ai
  /graph
  /mastery
  /recommendation
  /content
  /persistence
/docs
```

## Content loading

At build/startup:

1. Parse graph/content files.
2. Validate schemas.
3. Ensure referenced prerequisite IDs exist.
4. Ensure playable nodes point to actual content.
5. Fail loudly in development on invalid content.

## State model

Keep these concepts distinct:

- **graph definition**: what can be learned;
- **content definition**: how a skill is taught;
- **user mastery state**: what the learner has demonstrated;
- **session state**: where the learner currently is;
- **evidence ledger**: why mastery has its current value.

Never store mastery only as a mutable number without evidence history.

## Recommendation engine v0

Pure application logic first, not LLM-driven.

Pseudo:

```text
eligible = playable skills
  where prerequisites satisfied
  and mastery below target

score each by:
  domain preference
  mastery gap
  review need
  continuity
  case preparation

return max score + explanation factors
```

## Learning renderer

Use a block renderer:

```ts
const renderers = {
  editorial: EditorialBlock,
  definition: DefinitionBlock,
  example: ExampleBlock,
  think: ThinkBlock,
  choice: ChoiceBlock,
  open_response: OpenResponseBlock,
  ai_challenge: AIChallengeBlock,
  application: ApplicationBlock,
  recall_check: RecallCheckBlock,
  mastery_summary: MasterySummaryBlock,
}
```

This is important for scaling content independently from product code.

## Case engine

Case sessions should persist a state machine:

- current stage;
- evidence viewed;
- decisions;
- rationales;
- challenges shown;
- revisions;
- evaluation;
- generated evidence events.

Avoid free-form chat as the entire case engine. Structured state enables reliable progression and evaluation.

## Authentication

Not required for a local prototype. For a public MVP, use simple email/OAuth authentication and keep identity logic separate from profile/mastery logic.

## Analytics

MVP event names should include:

- `skill_started`
- `skill_completed`
- `learning_response_submitted`
- `ai_challenge_completed`
- `mastery_updated`
- `graph_opened`
- `graph_node_opened`
- `case_started`
- `case_decision_submitted`
- `case_completed`
- `profile_opened`

## Quality checks

Minimum automated checks:

- TypeScript strict mode.
- lint/format.
- schema validation for all content.
- unit tests for mastery calculations.
- unit tests for recommendation eligibility/prerequisites.
- case state transition tests.
- AI structured-output parsing tests using fixtures.

## Security / privacy

- Never expose provider API keys client-side.
- Treat learner responses and mastery data as private by default.
- Public/shared expertise profiles must become explicit opt-in later.
- Avoid sending unnecessary personal profile data to LLM providers.

## MVP performance

Prioritize perceived responsiveness:

- optimistic UI for non-critical transitions;
- stream AI responses where appropriate;
- prefetch next static learning block;
- graph should remain smooth with 250 nodes;
- AI latency should not block navigation unless the response is required for progression.

## Architecture principle

Build the smallest system that preserves Skala's core abstractions. Do not prematurely build microservices, agent orchestration infrastructure, a CMS, or a generalized LMS backend.