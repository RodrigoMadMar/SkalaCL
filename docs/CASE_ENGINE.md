# Skala Case Engine

## Purpose

Cases are the main mechanism for turning learned concepts into demonstrated business judgment.

They should evaluate the learner's reasoning trajectory, not simply whether they matched a preferred answer.

## Core sequence

`Brief → Evidence → Initial decision → Challenge → New information → Revision or defense → Final recommendation → Evaluation → Mastery update`

## Case schema

Suggested structure:

```ts
type CaseDefinition = {
  id: string
  title: string
  subtitle?: string
  version: string
  context: {
    company: string
    location?: string
    year?: number
    role: string
    premise: string
  }
  skills: string[]
  sections: CaseSection[]
  decisionPoints: DecisionPoint[]
  challenges: ChallengeRule[]
  rubricId: string
  evidenceMap: Record<string, string[]>
}
```

## Decision point

Each decision point should include:

- question;
- available evidence;
- allowed response mode;
- optional structured choices;
- required rationale;
- assumptions to inspect;
- next-state rules.

## Challenge design

Challenges should come from the learner's own reasoning or from predefined case events.

Good challenge examples:

- `Your recommendation assumes CAC stays flat. What changes if CAC rises 35%?`
- `You chose to build internally. Which capability makes the additional time-to-market worth it?`
- `Your diagnosis emphasizes switching costs, but your final recommendation does not address them. Reconcile the two.`

Bad challenges:

- arbitrary plot twists;
- irrelevant stakeholder dialogue;
- trivia;
- hidden data that makes the earlier decision impossible to evaluate fairly.

## Evaluation

Default dimensions:

1. Problem diagnosis
2. Evidence use
3. Strategic reasoning
4. Decision coherence
5. Adaptability
6. Communication

Domain-specific dimensions may be added.

Example rubric anchors for `Evidence use`:

- 0.0–0.2: ignores supplied evidence or contradicts it materially.
- 0.3–0.5: cites some evidence but does not connect it to the recommendation.
- 0.6–0.8: uses relevant evidence to support trade-offs and assumptions.
- 0.9–1.0: integrates multiple evidence sources, distinguishes signal from uncertainty, and identifies missing evidence that could change the decision.

## Decision quality vs outcome quality

Simulated outcomes must not be treated as the same thing as decision quality.

The learner can make a high-quality probabilistic decision and receive a poor simulated outcome. The UI should preserve this distinction.

## MVP cases

### 01 — Pricing Pressure

A subscription/digital business faces margin pressure and must decide whether/how to adjust pricing.

Skills:

- pricing strategy;
- elasticity;
- switching costs;
- unit economics;
- competitive advantage.

### 02 — AI Copilot Economics

A SaaS business is considering launching an AI copilot whose usage creates meaningful variable cost.

Skills:

- inference economics;
- AI pricing;
- unit economics;
- build vs buy;
- cost-quality frontier.

### 03 — Incumbent vs AI-native Challenger

An incumbent faces a new AI-native competitor with speed and product advantages but weaker distribution.

Skills:

- competitive advantage;
- distribution advantage;
- data advantage;
- model commoditization;
- organizational capability;
- disruption.

## Case result

Result view should include:

- dimension-level evaluation;
- strongest aspect;
- most important improvement;
- trajectory summary: initial thesis → challenge → final thesis;
- skill evidence generated;
- mastery deltas;
- graph update animation.

## Social future

After submission, the learner may eventually see:

- distribution of decisions;
- strong alternative perspectives;
- reasoning from users with demonstrated expertise;
- study-circle discussion.

Never show community reasoning before the learner has made their own decision.

## Versioning

Case comparisons and percentiles must be version-specific. If material data, rubric or challenge logic changes, bump the case version.