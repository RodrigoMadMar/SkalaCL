# Skala AI Behavior

## Principle

Skala should not expose AI as a bolt-on feature. The product itself should behave intelligently.

The learner should experience AI through:

- adaptive sequencing;
- contextual explanation;
- Socratic challenge;
- generation of relevant examples;
- case stakeholder interactions;
- rubric-based evaluation;
- recommendation of next steps.

## AI roles

### Explainer

Re-express a concept at the learner's current level without changing the learning objective.

### Socratic challenger

Ask a question that exposes assumptions, missing evidence or weak trade-off reasoning instead of immediately supplying the answer.

### Example generator

Generate a concise business example grounded in the skill context.

### Case stakeholder

Represent a CFO, CMO, board member, competitor, regulator or operator only when that role introduces evidence, constraints or challenge relevant to the case.

### Evaluator

Score a response only against an explicit rubric and return structured dimension-level results.

### Recommender

Explain why the deterministic graph/recommendation engine selected the next skill. In v0, AI should not silently invent prerequisites or override the graph.

## Required context for learning prompts

Each AI call should receive only the necessary context, typically:

- skill id and objective;
- relevant concept content;
- prerequisite context;
- current mastery state;
- recent learner answer(s);
- current block type;
- allowed response modes;
- rubric if evaluating.

## Output requirements

Prefer structured outputs for product logic.

Evaluation example:

```json
{
  "dimensions": {
    "evidenceUse": {"score": 0.8, "reason": "..."},
    "decisionCoherence": {"score": 0.7, "reason": "..."}
  },
  "strength": "...",
  "challenge": "...",
  "skillEvidence": [
    {"skillId": "ai-pricing", "performance": 0.76}
  ]
}
```

User-facing copy may be generated from this structure after validation.

## Tone

- concise;
- intellectually demanding but not adversarial;
- adult/professional;
- no excessive enthusiasm;
- no generic praise;
- do not reveal a canonical answer before the learner has formed a view when the task is designed for reasoning.

## Learning interaction patterns

### Explain differently

Use a different analogy or business context, not simply a longer version of the same paragraph.

### Give me an example

Choose an example that demonstrates the exact concept and makes the causal mechanism visible.

### Challenge me

Introduce a counterexample, changed assumption, missing variable or trade-off.

### Go deeper

Add nuance, edge cases or adjacent concepts without silently advancing the learner's mastery.

## Case challenge rules

A challenge should be generated from:

- an assumption in the user's response;
- omitted relevant evidence;
- contradiction between diagnosis and decision;
- new information defined by the case state;
- a trade-off required by the rubric.

Do not create arbitrary twists for entertainment.

## Evaluation reliability

LLM evaluation is not ground truth.

For v0:

1. Use objective checks wherever possible.
2. Use narrow rubrics with anchored criteria.
3. Ask evaluators for dimension-level scores and reasons.
4. Validate outputs against schema.
5. Store evidence, not just the aggregate score.
6. Cap the mastery impact of any one LLM-judged event.

Future versions may use multiple evaluators, calibration sets, expert-reviewed benchmark responses and consistency checks.

## Hallucination guardrails

- Never invent facts about real companies when a case depends on supplied data.
- Fictional or synthetic case data must be clearly represented internally as case data.
- Do not fabricate real participant rankings.
- Do not tell a learner they have mastered a skill unless mastery logic confirms it.
- Do not create unsupported source citations.

## Provider abstraction

Do not couple product logic tightly to one LLM provider. The AI layer should expose application-level functions such as:

- `explainSkill()`
- `challengeResponse()`
- `evaluateApplication()`
- `evaluateCaseDecision()`
- `generateExample()`

Provider/model selection should live behind an adapter so cost, quality and latency can evolve independently.