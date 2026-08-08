# Skala Knowledge Graph

## Purpose

The knowledge graph is the core curriculum model and the basis of the user's visible expertise map, **Your Skala**.

It must support:

- prerequisites;
- cross-domain relationships;
- adaptive next-step selection;
- mastery aggregation;
- evidence attribution;
- future expansion without duplicating content trees.

## Hierarchy

Primary hierarchy:

`Business Core → Domain → Specialization / Cluster → Skill`

This is a navigation hierarchy, not a restriction on graph edges. Skills may relate to multiple domains and specializations.

Example:

`Pricing` may belong primarily to Strategy but connect to Marketing and Finance.

## Node types

### core_area

A foundational area of business knowledge.

Examples: Strategy, Finance, Marketing, Economics, Operations, Organization & Leadership, Data & Decision Making.

### domain

A broad expandable field layered on top of the Business Core.

MVP domain: AI.

Future examples: Innovation, Applied Finance, Marketing, Growth, Entrepreneurship.

### specialization

A coherent cluster within a domain.

Example: AI Economics.

### skill

Atomic unit that can be learned and evidenced.

A skill should be narrow enough to meaningfully assess and broad enough to apply across contexts.

Example: `ai-inference-economics`.

## Edge types

- `requires`: prerequisite relationship.
- `supports`: useful but non-blocking dependency.
- `related_to`: conceptual relationship.
- `applies_to`: skill is applied in another domain/specialization.
- `part_of`: hierarchy relationship.

## Suggested node schema

```json
{
  "id": "ai-inference-economics",
  "type": "skill",
  "title": "Inference economics",
  "summary": "Understand how usage-driven model costs alter software economics.",
  "primaryDomain": "ai",
  "specialization": "ai-economics",
  "difficulty": 2,
  "estimatedMinutes": 7,
  "prerequisites": ["ai-models-vs-products"],
  "relatedSkills": ["unit-economics", "ai-pricing", "gross-margin"],
  "evidenceTargets": ["conceptual", "application", "case"],
  "status": "playable"
}
```

## Content status

Every node should declare one of:

- `mapped`: exists in graph only.
- `outlined`: learning objectives defined.
- `playable`: full learner experience exists.
- `validated`: content reviewed and tested.

This allows the graph to be broader than the authored MVP.

## MVP graph size

Target:

- 150–250 mapped nodes.
- ~35 playable skills.
- ~15–20 highly polished / validated skills.

## Business Core seed

### Strategy

- Competitive advantage
- Industry structure
- Positioning
- Switching costs
- Network effects
- Pricing strategy
- Business models
- Corporate strategy

### Finance

- Financial statements
- Unit economics
- Contribution margin
- Cash flow
- Time value of money
- NPV
- Capital allocation
- Valuation basics

### Economics

- Supply and demand
- Elasticity
- Marginal cost
- Opportunity cost
- Market structure
- Incentives

### Marketing

- Segmentation
- Positioning
- Brand
- Customer acquisition
- Retention
- Pricing psychology

### Operations

- Process design
- Bottlenecks
- Capacity
- Quality
- Service operations

### Organization & Leadership

- Incentives
- Decision rights
- Organizational design
- Leadership under uncertainty
- Team effectiveness

### Data & Decision Making

- Probability
- Expected value
- Experimentation
- Causality basics
- Metrics
- Decision trees

## AI Domain seed

### AI Fundamentals

- Models vs products
- Training vs inference
- Tokens/context
- Model capability vs workflow capability
- Evaluation basics

### AI Economics

- Inference economics
- Cost-quality frontier
- AI gross margins
- Usage-driven variable cost
- Pricing AI products
- Model routing economics

### AI Strategy

- Capability vs feature vs product
- Build vs buy
- Model commoditization
- Distribution advantage
- Data advantage
- Workflow lock-in
- AI-native vs incumbent advantage

### AI Products

- Copilot vs agent
- Human-in-the-loop
- Trust and control
- AI UX
- Evaluation design
- Failure-mode design

### Agents & Automation

- Tool use
- Workflow decomposition
- Agent autonomy
- Human escalation
- Multi-step orchestration
- Reliability trade-offs

### AI Organizations

- Organizational redesign
- New decision rights
- Human/AI task allocation
- AI governance basics
- Adoption and change

## Next-step recommendation v0

Candidate skills must:

1. be playable;
2. have all hard prerequisites satisfied;
3. not already be mastered above threshold;
4. match the learner's active domain preference when possible.

Score candidates using simple weighted factors:

- prerequisite readiness;
- mastery gap;
- recency / review need;
- active domain priority;
- diversity from last skill;
- case preparation relevance.

The algorithm should remain deterministic/explainable in v0. AI can assist with explanation, not silently override graph rules.

## Aggregation

Skill mastery rolls up to specialization and domain views using weighted aggregation. Do not average blindly if a domain has many mapped but unplayable nodes. Aggregate only against active/assessable nodes and record coverage separately.

Recommended display:

- mastery score;
- coverage percentage;
- evidence count;
- latest validation date.

This prevents `AI 90` from implying the learner mastered every mapped AI skill.