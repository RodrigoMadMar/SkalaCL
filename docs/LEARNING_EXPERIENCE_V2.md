# Skala Learning Experience V2

Status: proposed source of truth for foundational skill authoring and rendering  
Date: 2026-08-10  
Applies first to: Business Core → Unit 01 — Economics of Business

## 1. Why V2 exists

The first Business Core implementation proved that Skala can sequence a program, render varied interactions, collect evidence and update mastery. It also exposed a pedagogical imbalance: the skill loop asks the learner to diagnose, answer, apply and transfer before Skala has taught enough new material.

The current pattern is too close to:

`question → short reveal → interaction → written answer → challenge → transfer`

That is useful for assessment, but insufficient as the default learning experience for foundational material.

V2 changes the contract:

> **A Skala skill must first create understanding, then make the learner use it.**

Skala should not become passive courseware. The correction is not “add more text.” The correction is to add compact, authored teaching that is inseparable from visual explanation, worked examples, guided practice and later application.

## 2. Learning-layer contract

Skala has three different pedagogical objects and they must not collapse into the same interaction pattern.

### Skill

Purpose: **teach + practice + produce early evidence**.

A skill should leave the learner knowing or seeing something they did not know or see before.

### Checkpoint

Purpose: **integrate multiple recently learned skills**.

A checkpoint should contain little or no new teaching. It can provide corrective feedback after a decision, but should primarily test integration.

### Case

Purpose: **demonstrate judgment under ambiguity**.

A case should not behave like a lesson. It supplies context and evidence, not a tutorial. The learner must decide, defend and adapt.

The gradient is:

`Skill = teach + practice`  
`Checkpoint = integrate`  
`Case = demonstrate`

## 3. Foundation-skill target ratio

For a typical 7–10 minute Business Core foundation skill:

- **3–4 minutes:** authored teaching, visual explanation and worked example;
- **3–5 minutes:** guided practice, application, challenge and transfer.

This is a guideline, not a timer requirement. Conceptual density matters more than word count.

Later advanced skills may shift toward more application and less direct teaching. A first encounter with accounting, economics or statistics should not assume the learner can infer the concept from questions alone.

## 4. Default V2 skill anatomy

The recommended sequence is:

`Hook / diagnostic → Teach 1 → Visual explainer → Worked example → Teach 2 → Guided practice → Application → AI challenge → Transfer → Mastery summary`

Not every skill needs every stage. However, a **foundation skill is not production-ready** unless it includes:

1. at least **two meaningful authored teaching moments**;
2. at least **one visual, model, structured comparison or manipulated representation** when the concept benefits from it;
3. at least **one worked example** where Skala demonstrates the reasoning process;
4. at least **one guided-practice step** with explanatory feedback;
5. at least **one independent application or transfer action**.

The user should never complete a foundational skill having only answered questions and read one short reveal paragraph.

## 5. Block model

The renderer should evolve from a fixed seven-stage state machine toward composable content blocks.

Recommended content types:

```ts
type LearningBlock =
  | HookBlock
  | ConceptBlock
  | KeyIdeaBlock
  | VisualExplainerBlock
  | WorkedExampleBlock
  | GuidedChoiceBlock
  | GuidedClassificationBlock
  | InteractiveModelBlock
  | QuantitativePracticeBlock
  | DataInterpretationBlock
  | ScenarioDecisionBlock
  | OpenResponseBlock
  | AIChallengeBlock
  | CounterfactualBlock
  | TransferCheckBlock
  | RecallBlock
  | MasterySummaryBlock;
```

Suggested shared metadata:

```ts
type LearningBlockBase = {
  id: string;
  type: string;
  localeContent: {
    "es-CL": unknown;
    en: unknown;
  };
  estimatedSeconds?: number;
  evidenceMode?: "none" | "exposure" | "guided" | "assessment";
};
```

The authored skill object should be able to express content like:

```ts
type SkillLesson = {
  skillId: string;
  version: string;
  objective: LocalizedText;
  misconceptions: LocalizedText[];
  keyIdeas: LocalizedText[];
  blocks: LearningBlock[];
  evidenceTargets: string[];
  reviewStatus: "draft" | "reviewed" | "validated";
};
```

Do not force every skill into identical blocks. The renderer should provide primitives; the authoring layer chooses the pedagogy.

## 6. What “lective” means in Skala

Lective content in Skala is **not** a long article, deck or video transcript.

A good teaching block does one of four things:

- introduces a mental model;
- explains a causal mechanism;
- demonstrates a reasoning process;
- gives the learner a representation they can manipulate or inspect.

### Concept block

Target: 60–140 words in Spanish for most concepts.

Structure:

- claim;
- mechanism;
- why it matters for a business decision.

Avoid dictionary definitions without consequence.

### Key idea block

A compressed principle worth remembering.

Example:

> **Price changes move you along demand. Changes outside the product's own price can shift demand itself.**

### Worked example

Skala should show its reasoning, not only the final answer.

Pattern:

`Situation → what changed → relevant mechanism → implication → decision meaning`

The learner should see how an expert decomposes the problem.

### Visual explainer

A visual must reveal structure, causality, scale or state change that prose alone would hide.

Do not add a chart merely because the topic is quantitative.

## 7. Guided practice is different from assessment

A major V2 rule:

> **During guided practice, feedback teaches. During assessment, feedback evaluates.**

If the learner chooses a wrong answer during guided practice, do not only show `Incorrect`.

Show:

1. what they chose;
2. why that reasoning fails;
3. the relevant mechanism;
4. what clue to use next time.

Example:

> **Not quite.** A higher input tax changes sellers' economics, so the first structural effect is on **supply**, not demand. At every previous price, producers are now willing to offer less.

Correct answers should also explain the mechanism rather than merely reward the learner.

## 8. Think-before-reveal remains, but it is not the whole lesson

The existing product principle is preserved.

Use a cold diagnostic when it creates productive tension or exposes a misconception.

Then teach.

Do not interpret `think before reveal` as `the learner should discover the full concept unaided`.

Foundation teaching often follows:

`commit → reveal misconception → teach mechanism → show model → practice`

## 9. Evidence and mastery rules

Teaching should not inflate mastery.

Recommended evidence behavior:

- concept / editorial / visual explainer → **no mastery evidence** or exposure only;
- worked example → exposure only;
- guided practice with hints/explanatory feedback → low-weight evidence at most;
- independent application → application evidence;
- transfer without scaffolding → recall/application evidence;
- checkpoint → multi-skill application/case-like evidence;
- later spaced validation → delayed-validation evidence.

Completion continues to be different from mastery.

A learner can finish the lesson and still have weak evidence.

## 10. Feedback quality standard

Feedback should answer **why**, not only **what**.

Every objective or semi-objective exercise should have authored rationale for:

- correct choice;
- each meaningful distractor family;
- business consequence of the distinction.

AI can personalize challenge and explanation, but the foundational correctness layer should not depend on an LLM when a deterministic explanation is possible.

## 11. AI's role in a V2 skill

AI should not replace the authored lesson.

Use AI after the learner has enough conceptual substrate to reason.

Good AI moments:

- challenge an assumption in an application;
- ask what evidence would falsify the learner's explanation;
- introduce a counterfactual;
- critique a recommendation against the concept;
- generate a contextually different transfer example.

Bad AI moments:

- “Ask me anything about supply and demand”;
- generate the core explanation at runtime;
- grade an objective question that can be evaluated deterministically;
- produce verbose tutoring before authored teaching exists.

## 12. Visual and interaction principles

An interaction should make the mental model more legible.

A learner should know:

- what changed;
- what they are controlling;
- what the model predicts;
- why that prediction follows.

Avoid interactions where the mechanical action is unrelated to the concept.

Examples of weak interaction:

- dragging a point to an arbitrary location between two lines;
- moving a slider with unexplained outputs;
- clicking through tabs where no state or reasoning changes.

Examples of strong interaction:

- predict which curve shifts, then watch D1 move to D2;
- change a price and see segment demand/revenue update;
- cross a capacity threshold and see marginal cost jump;
- change incentive weights and inspect predicted gaming behavior;
- choose a strategic move and expose the rival's best response.

## 13. Progressive disclosure

Do not put all theory on one screen.

A strong rhythm is:

1. one idea;
2. one representation;
3. one consequence;
4. one learner action.

Then continue.

The learner should be able to complete a skill on mobile without scrolling through textbook-length pages.

## 14. Copy and tone

Teaching copy should be:

- concise but not skeletal;
- precise;
- adult and professional;
- concrete;
- written as instruction, not marketing;
- neutral LatAm Spanish for `es-CL`;
- independently authored in English, not runtime-translated.

Prefer:

> “A demand curve describes how much buyers are willing to purchase at different prices, holding other relevant conditions constant.”

Avoid:

> “Demand is when people want something.”

Also avoid academic opacity when a managerial explanation is enough.

## 15. Content depth by skill type

### Conceptual foundation

Examples: Opportunity Cost, Incentives, Positioning.

Needs:

- 2–3 concept blocks;
- worked example;
- misconception contrast;
- guided scenario;
- application + transfer.

### Quantitative foundation

Examples: Elasticity, NPV, Probability.

Needs:

- intuitive concept before formula;
- formula/notation only when useful;
- worked calculation;
- interactive or structured quantitative practice;
- interpretation of result;
- business decision consequence.

### System/model foundation

Examples: Supply & Demand, Financial Statements, Process Flow.

Needs:

- visual representation;
- state transition or relationship;
- worked example;
- prediction before reveal;
- guided manipulation;
- independent transfer.

### Behavioral/interpersonal skill

Examples: Incentives, Negotiation, Feedback.

Needs:

- causal model;
- contrasting behaviors;
- dialogue/situation examples;
- decision or response construction;
- counterfactual;
- reflection/application.

## 16. Skill readiness states

Keep graph implementation status separate from pedagogical readiness.

Recommended authoring status:

### `mapped`

Skill exists in curriculum/graph.

### `outlined`

Capability, concepts and misconception defined.

### `authored`

Teaching blocks, worked examples, guided practice and assessments written in ES/EN.

### `playable`

Rendered end-to-end with evidence and persistence.

### `polished`

Interaction, feedback, mobile behavior and copy reviewed.

### `validated`

Pedagogical review complete and real learner feedback incorporated.

Do not call a skill validated because the code path works.

## 17. V2 acceptance criteria for a foundation skill

A skill passes the V2 quality bar only if:

1. a learner with no prior knowledge can explain the central mechanism after completion;
2. the lesson contains at least two substantive teaching moments;
3. at least one worked example demonstrates reasoning;
4. at least one guided-practice action gives explanatory feedback;
5. the main interaction directly represents the concept;
6. application occurs after sufficient teaching;
7. independent transfer uses a materially different context;
8. evidence reflects independent performance rather than reading;
9. ES and EN are authored and equivalent in meaning;
10. desktop and mobile both remain usable;
11. the learner can state “what I learned,” not only “what I answered.”

## 18. Phase 6A.1 implementation order

Do not migrate all Unit 01 skills immediately.

### Step 1 — Supply & Demand reference skill

Build the V2 renderer/content primitives and replace the existing Supply & Demand experience using `REFERENCE_SKILL_SUPPLY_DEMAND_V2.md` as the source of truth.

### Step 2 — Validate

Review:

- teaching depth;
- pace;
- interaction usability;
- feedback usefulness;
- visual clarity;
- total time;
- mobile behavior;
- evidence output.

### Step 3 — Migrate remaining Unit 01 skills

Only after the reference skill is accepted, migrate Opportunity Cost through Game Theory using the teaching expansions in `UNIT_01_ECONOMICS_OF_BUSINESS_V2.md`.

### Step 4 — Unit 02

Do not begin Unit 02 production authoring until Unit 01 demonstrates the V2 learning standard.

## 19. Product principle introduced by V2

> **Skala should be demanding after it has been illuminating.**

The learner should not be rewarded for passive consumption, but Skala has an obligation to teach before asking them to demonstrate expertise.
