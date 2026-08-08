# Skala Mastery Model v0

## Purpose

Mastery represents accumulated evidence that a learner understands and can apply a skill. It must be useful enough for personalization and credible enough to eventually support a professional expertise profile.

## Evidence classes

### Exposure

The learner consumed the concept. This is not mastery evidence by itself.

### Recall

The learner retrieves or recognizes the concept after instruction.

### Application

The learner uses the concept in a small scenario or problem.

### Case

The learner applies the concept inside a multi-variable business decision.

### Delayed validation

The learner recalls/applies the skill after time has passed.

### Collaborative / external

Future evidence from team challenges, peer review, expert evaluation or real project artifacts. Out of scope for v0 scoring.

## Skill state

Store at minimum:

```ts
{
  skillId: string
  mastery: number        // 0–100
  confidence: number     // 0–1 based on evidence volume/diversity
  exposureCount: number
  evidenceCount: number
  caseEvidenceCount: number
  lastEvidenceAt: string | null
  lastValidatedAt: string | null
  status: 'unseen' | 'learning' | 'learned' | 'mastered' | 'demonstrated'
}
```

## Status semantics

- `unseen`: no meaningful interaction.
- `learning`: exposure or weak evidence exists.
- `learned`: short-term understanding shown.
- `mastered`: repeated evidence across more than one interaction type.
- `demonstrated`: strong application evidence, including case/simulation evidence and sufficient confidence.

## Scoring v0

The exact constants are implementation defaults, not scientifically validated truth. Keep them configurable.

Example evidence weights:

- recall: 0.7
- application: 1.0
- case: 1.4
- delayed validation: 1.3

Each evidence event stores:

- skill id;
- evidence type;
- normalized performance 0–1;
- weight;
- timestamp;
- source session/case id;
- rubric dimensions when relevant.

Use a weighted update that favors recent strong evidence without allowing a single event to dominate.

A simple v0 implementation may calculate a weighted evidence mean, apply an evidence-volume confidence multiplier, and cap step changes per event.

## Guardrails

- One case cannot move a skill from beginner to demonstrated expert.
- Exposure never generates a large mastery increase.
- Incorrect answers should not automatically erase prior mastery; they create contradictory evidence and can lower confidence/mastery gradually.
- Scores should be reproducible from stored evidence events.
- LLM output alone must never be persisted as an unexplained final score. Persist the rubric result and evidence behind it.

## Case evaluation dimensions

Default dimensions:

- Problem diagnosis
- Evidence use
- Strategic reasoning
- Decision coherence
- Adaptability under challenge
- Communication clarity

Cases may add domain-specific dimensions such as financial reasoning.

Each dimension should have an explicit rubric with behavioral anchors.

## Percentiles

Percentile and `Top X%` are comparison metrics, not mastery metrics.

Only show them when:

- users completed the same case/version;
- scoring methodology is consistent;
- there is a meaningful participant base;
- participant count is displayed.

Example:

`Top 7% · 2,418 participants · Case 017 v1`

Never infer `Top 7% in Finance` from one case.

For prototype/demo mode, never present fabricated participant counts as real. Use `Demo benchmark` or omit percentile.

## Rollups

Specialization/domain mastery should combine active skill scores and coverage.

Example display:

`AI Strategy — Mastery 78 · Coverage 42%`

This is preferable to a single number with no indication of how much of the graph has been assessed.

## Future forgetting model

Post-MVP, mastery can decay in confidence rather than simply deleting knowledge. Delayed retrieval can revalidate the skill. The future model can incorporate spaced repetition and forgetting curves, but v0 only needs timestamps and review eligibility.