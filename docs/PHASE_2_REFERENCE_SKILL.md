# Phase 2 Reference Skill — Build vs Buy

## Purpose

This document defines the reference implementation for Skala Phase 2.

`Build vs Buy` is the canonical learning experience that should prove the Skala learning loop before the team scales to 8–10 playable skills.

The implementation should optimize for one question:

> Does completing one short Skala skill feel meaningfully different from consuming a lesson in a conventional LMS?

If this reference skill feels generic, do not scale the renderer yet.

---

## Product thesis this skill must demonstrate

A Skala skill is not a video, article or quiz.

It is a short adaptive sequence in which the learner:

1. forms an initial view;
2. receives a compact mental model;
3. applies it to a business decision;
4. is challenged on an assumption;
5. revises or defends the decision;
6. creates evidence of understanding;
7. sees that evidence change their Skala;
8. receives a next-best-step recommendation.

The experience should feel like an intelligent business tutor embedded into the learning flow, not a chatbot attached to content.

---

## Skill identity

```ts
{
  id: 'ai.build-vs-buy',
  domain: 'ai',
  specialization: 'ai-strategy',
  title: {
    'es-CL': 'Build vs Buy',
    en: 'Build vs Buy'
  },
  difficulty: 2,
  estimatedMinutes: 7,
  prerequisites: [
    'ai.model-landscape',
    'economics.unit-economics'
  ],
  masteryTargets: [
    'ai.build-vs-buy',
    'strategy.strategic-differentiation',
    'economics.unit-economics'
  ],
  version: '0.1'
}
```

`Build vs Buy` remains untranslated because it is common business/technology language and works naturally in both supported locales. Supporting copy must be localized.

---

## Learning objective

After the skill, the learner should be able to:

> Make and defend a build, buy or hybrid decision for an AI capability by explicitly weighing strategic differentiation, speed, economics, control, internal capability and reversibility.

The learner does **not** need to memorize a framework by name.

---

## Misconceptions to correct

The skill should actively correct these shallow heuristics:

1. `Build is always more strategic.`
2. `Buy is always cheaper.`
3. `Core business capability means we must build every technical layer ourselves.`
4. `The decision is binary.`
5. `Current vendor price is enough to compare economics.`
6. `A decision that is correct today will remain correct as scale, regulation or vendor maturity changes.`

The desired shift is from a binary technology choice to a business decision under trade-offs.

---

## The mental model

Use six decision lenses. Keep the names simple and user-facing.

### 1. Differentiation

Would owning this capability create a durable advantage customers can perceive or the company can uniquely exploit?

### 2. Speed

How much value is lost by waiting to build instead of deploying an external capability now?

### 3. Economics

How do total costs behave at the expected scale, including usage, engineering, operations and switching costs?

### 4. Control

How important are data boundaries, reliability, customization, auditability and operational control?

### 5. Capability

Does the organization possess — or strategically need to develop — the talent and operating model required to own this capability?

### 6. Reversibility

How difficult would it be to change course later? Consider lock-in, data portability, architecture and accumulated internal capability.

### Important

Do not present these six lenses as a rigid scorecard that produces an automatic answer.

They structure judgment. They do not replace judgment.

---

## Visual model

Phase 2 should include one meaningful visual rather than decorative art.

Preferred visual:

### Build / Buy / Hybrid field

A two-dimensional field:

- horizontal axis: `Market maturity of external solutions`
- vertical axis: `Strategic uniqueness of the capability`

Broad interpretation:

- low uniqueness + mature external market → stronger buy tendency;
- high uniqueness + weak external market → stronger build tendency;
- mixed conditions → hybrid becomes plausible.

The learner can place a scenario on the field before the explanation and see how additional lenses complicate the initial view.

Do not imply this chart is a deterministic formula.

Localized axis labels:

**es-CL**
- `Madurez de soluciones externas`
- `Diferenciación estratégica`

**en**
- `External solution maturity`
- `Strategic differentiation`

---

# Reference learning flow

Target total duration: **5–8 minutes**.

The lesson renderer should support this exact sequence without hardcoding it to this skill.

---

## Block 0 — Entry / orientation

Type: `editorial`

Purpose:
- establish the decision;
- create tension quickly;
- avoid a long lesson introduction.

### es-CL

**Eyebrow**
`AI STRATEGY · 7 MIN`

**Title**
`Build vs Buy`

**Body**
`Un proveedor puede llevarte a producción en semanas. Construir internamente puede darte más control y diferenciación. La decisión difícil es saber qué vale la pena poseer.`

**CTA**
`Comenzar`

### en

**Eyebrow**
`AI STRATEGY · 7 MIN`

**Title**
`Build vs Buy`

**Body**
`A vendor can get you into production in weeks. Building internally can create more control and differentiation. The hard decision is knowing what is worth owning.`

**CTA**
`Start`

No mastery evidence is created by this block.

---

## Block 1 — Think before reveal

Type: `think`

Purpose:
- force an initial opinion before teaching the framework;
- capture a diagnostic answer without grading it as mastery.

Use a fictional company so the scenario remains stable.

### Scenario

A B2B software company wants an AI support copilot for 600 customer-service agents.

A vendor can launch in six weeks. An internal team estimates six months to reach comparable baseline quality. Leadership believes support data may eventually become strategically valuable.

### es-CL prompt

`Antes de ver ningún marco: ¿qué decidirías hoy?`

Options:
- `Construir`
- `Comprar`
- `Modelo híbrido`
- `Todavía no decidiría`

Follow-up short response:

`¿Cuál es la razón principal?`

### en prompt

`Before seeing any framework: what would you decide today?`

Options:
- `Build`
- `Buy`
- `Hybrid`
- `I would not decide yet`

Follow-up:

`What is the main reason?`

### Product behavior

Persist the response as `diagnostic_response`, not as a positive or negative mastery event.

The answer should be available later to the AI challenger so Skala can refer to the learner's own initial assumption.

Do not display `correct / incorrect`.

---

## Block 2 — Compact reveal

Type: `editorial` + `visual`

Purpose:
- provide the smallest useful conceptual model;
- make the learner reinterpret the initial decision.

### es-CL

**Title**
`No estás eligiendo tecnología. Estás eligiendo qué capacidad vale la pena poseer.`

**Body**
`Build vs Buy cambia cuando separas seis preguntas: diferenciación, velocidad, economía, control, capacidad interna y reversibilidad.`

Display the six lenses as a restrained system diagram, not six large SaaS cards.

Each lens may expand to one sentence on click/hover.

### en

**Title**
`You are not choosing technology. You are choosing which capability is worth owning.`

**Body**
`Build vs Buy becomes clearer when you separate six questions: differentiation, speed, economics, control, internal capability and reversibility.`

---

## Block 3 — Interactive field

Type: `visual`

Purpose:
- create active reasoning rather than passive reading.

Show the Build / Buy / Hybrid field described above.

Ask the learner to place the support-copilot scenario on the field.

Then reveal two additional facts:

1. `The vendor supports data export and model portability.`
2. `The internal engineering team has no production ML operating experience.`

Ask:

### es-CL
`¿Moverías tu decisión?`

### en
`Would you move your decision?`

This interaction is formative. It may be stored as behavioral telemetry but should not create a large mastery change.

---

## Block 4 — Example / contrast

Type: `example`

Purpose:
- show why binary reasoning fails.

Use two concise contrasting examples.

### Example A — Buy the commodity layer

A company needs document OCR inside an internal workflow. External tools already perform reliably, the capability is not customer-visible and owning OCR infrastructure would not create strategic advantage.

Likely tendency: **Buy**.

### Example B — Own the differentiating layer

A marketplace uses proprietary interaction data to rank and personalize offers. The decision logic directly shapes conversion, merchant value and customer experience.

Likely tendency: **Build or own the differentiating layer**, even if external infrastructure is used underneath.

### Key insight

### es-CL
`La arquitectura también puede ser una decisión híbrida: comprar infraestructura y construir la capa que realmente diferencia.`

### en
`Architecture can also be a hybrid decision: buy infrastructure and build the layer that actually differentiates.`

Do not present either example as a universal rule.

---

## Block 5 — Application decision

Type: `open_response`

Purpose:
- generate the first meaningful application evidence.

Return to the support-copilot scenario.

Add this information:

- expected usage will triple if the pilot succeeds;
- the vendor charges primarily by usage;
- legal approves the vendor's current data controls;
- switching later would require migrating prompts, evaluations and workflow integrations;
- the company has a strong backend team but limited ML operations experience.

### es-CL prompt

`Tienes que recomendar una decisión al comité mañana. ¿Construyes, compras o propones un modelo híbrido? Defiende tu decisión en 3–5 líneas.`

Helper:
`No intentes mencionar las seis variables. Prioriza las que realmente cambian la decisión.`

### en prompt

`You must recommend a decision to the committee tomorrow. Do you build, buy or propose a hybrid model? Defend your decision in 3–5 lines.`

Helper:
`Do not try to mention all six variables. Prioritize the ones that actually change the decision.`

### Evaluation dimensions

The AI evaluation should return structured values for:

```ts
{
  decision: 'build' | 'buy' | 'hybrid' | 'defer',
  dimensions: {
    tradeoffRecognition: number,
    evidenceUse: number,
    economicReasoning: number,
    strategicCoherence: number
  },
  assumptionsDetected: string[],
  omittedRelevantFactors: string[],
  strongestReason: string,
  challengeTarget: string
}
```

Scores normalized 0–1.

No single choice is canonical. Build, buy and hybrid can all be defensible if reasoning is coherent with supplied evidence.

### Evidence

Do not yet create the final application evidence event. Hold the first evaluation in session state until the learner responds to the challenge.

---

## Block 6 — Skala challenge

Type: `ai_challenge`

Purpose:
- demonstrate that Skala reacts to the learner's reasoning;
- test whether the recommendation survives a changed assumption.

The challenge must be selected from an assumption or omission in the learner's response.

Priority challenge patterns:

### If the learner focuses mainly on speed

`Your recommendation depends heavily on the six-week launch advantage. Assume the vendor's annual cost at scale becomes 2.5× the initial estimate. What changes?`

### If the learner focuses mainly on cost

`You are treating today's cost as the decision. Assume the capability becomes a major source of product differentiation in 18 months. Would your architecture still make sense?`

### If the learner focuses mainly on control / data

`Assume the vendor can now meet the required control and portability standards. Is building still the best use of internal capability?`

### If the learner chooses build without addressing capability

`The team can hire, but reaching reliable production ML operations may take 9–12 months. What value are you willing to delay to own this capability?`

### If the learner chooses buy without addressing lock-in

`Assume switching later requires rebuilding workflow integrations and evaluation infrastructure. What would you do now to preserve reversibility?`

### If the learner chooses hybrid

`Which layer would you actually own? “Hybrid” is not a strategy until the boundary is explicit.`

### Interaction

Learner answers in 2–4 lines.

Skala may return one concise follow-up if the answer is internally contradictory, but must avoid turning the lesson into an unlimited chat.

Maximum AI challenge turns in this skill: **2**.

### Tone

- concise;
- direct;
- intellectually demanding;
- no generic praise;
- no `Great answer!`;
- no adversarial gotchas.

---

## Block 7 — Application evidence

Type: `application`

Purpose:
- close the reasoning loop;
- ask for an explicit final decision after challenge.

### es-CL

`Tu decisión final`

`Puedes mantener tu recomendación o cambiarla. Lo importante es que ahora hagas explícito el trade-off que estás aceptando.`

Inputs:
- final decision selector;
- one short rationale.

### en

`Your final decision`

`You may keep your recommendation or change it. What matters is making the trade-off you are accepting explicit.`

### Evaluation

Evaluate the final answer against the same structured rubric plus:

```ts
adaptability: number
```

Adaptability does **not** mean changing one's mind.

A learner who keeps the same decision but properly incorporates the challenge can score highly.

### Evidence event

Create one `application` evidence event for `ai.build-vs-buy`.

Store:

- normalized overall performance;
- dimension scores;
- initial decision;
- final decision;
- challenge type;
- rationale summary;
- evaluator version;
- source session id.

Do not store only the aggregate score.

Use the mastery engine's configured `application` weight. Do not override mastery directly from the UI or LLM.

---

## Block 8 — Recall / transfer check

Type: `recall_check`

Purpose:
- confirm the learner can recognize the causal mechanism outside the original scenario.

Use one short transfer question, not a definition question.

### es-CL

`Una fintech compra una solución externa porque necesita velocidad. Seis meses después, la capacidad empieza a diferenciar directamente la experiencia del cliente y el volumen ya justifica inversión propia. ¿Qué variable cambió más la decisión?`

Options:
- `La diferenciación estratégica y la economía a escala`
- `El proveedor dejó de ser técnicamente capaz`
- `Build siempre es mejor después del piloto`
- `La velocidad dejó de importar por completo`

Expected answer:
`La diferenciación estratégica y la economía a escala`

### en

`A fintech buys an external solution because it needs speed. Six months later, the capability directly differentiates the customer experience and scale now justifies internal investment. Which variable most changed the decision?`

Options:
- `Strategic differentiation and economics at scale`
- `The vendor stopped being technically capable`
- `Build is always better after the pilot`
- `Speed stopped mattering entirely`

Expected answer:
`Strategic differentiation and economics at scale`

### Evidence event

Create one `recall` evidence event for `ai.build-vs-buy`.

Optionally create a small supporting evidence contribution to `economics.unit-economics` if the mastery engine supports multi-target evidence, but cap it below the primary skill contribution.

---

## Block 9 — Mastery summary

Type: `mastery_summary`

Purpose:
- make learning consequences visible;
- distinguish completion from mastery.

This should be one of the most satisfying moments in the loop, but remain restrained.

### Example layout

```text
SKILL COMPLETE

Build vs Buy

APPLICATION        82
ADAPTABILITY       76
RECALL             100

YOUR SKALA UPDATED

Build vs Buy       34 → 48
AI Strategy        41 → 43

2 evidence events added
1 connection strengthened
```

The exact score changes must come from the deterministic mastery engine and current seed state. Never hardcode the example numbers.

### Important UX rule

Do not say `Mastered` merely because the skill was completed once.

Likely first-session status should be `learned` or `learning`, depending on evidence strength and prior state.

### es-CL system copy

- `Skill completada`
- `Tu Skala se actualizó`
- `2 evidencias agregadas`
- `1 conexión fortalecida`

### en system copy

- `Skill complete`
- `Your Skala updated`
- `2 evidence events added`
- `1 connection strengthened`

---

## Block 10 — Return to Your Skala

Purpose:
- close the loop visually;
- make the graph feel alive.

Primary CTA:

### es-CL
`Ver cambio en Tu Skala`

### en
`See change in Your Skala`

On navigation back to the graph:

1. focus/zoom to the relevant AI Strategy cluster;
2. briefly illuminate `Build vs Buy`;
3. animate only the connections whose state actually changed;
4. show a concise system annotation such as `Nueva evidencia` / `New evidence`;
5. reveal the next-best-step recommendation after the update.

Do not use confetti, particles or celebratory game effects.

Suggested next move for seed data:

`AI Pricing` or `AI Unit Economics`, depending on the learner's prerequisites and evidence state.

The recommendation must come from the recommendation engine, not be hardcoded to the lesson completion route.

---

# AI behavior contract

## Functions

Phase 2 should expose application-level functions rather than provider-specific calls.

```ts
challengeLearningResponse(input): Promise<ChallengeResult>
evaluateSkillApplication(input): Promise<ApplicationEvaluation>
generateContextualExample(input): Promise<ExampleResult>
```

For this reference skill, only the first two are required to be production-ready.

## Required challenge input

```ts
{
  locale: 'es-CL' | 'en',
  skillId: 'ai.build-vs-buy',
  objective: string,
  scenarioFacts: string[],
  initialDiagnostic: {
    decision: string,
    rationale: string
  },
  applicationResponse: string,
  detectedAssumptions: string[],
  omittedRelevantFactors: string[],
  allowedChallengePatterns: string[],
  maxTurnsRemaining: number
}
```

## Required challenge output

```ts
{
  challengeType: string,
  challenge: string,
  targetedAssumption: string,
  introducedFact?: string,
  requiresFollowUp: boolean
}
```

Validate against schema before rendering.

## Failure mode

If the LLM is unavailable or output validation fails, use a deterministic challenge selected from the predefined challenge patterns based on simple response classification.

The skill must remain completable without a live model.

---

# Application evaluation rubric

Use narrow behavioral anchors.

## Trade-off recognition

### 0.0–0.3
Treats the decision as obvious or one-dimensional.

### 0.4–0.6
Recognizes at least two relevant competing factors but does not clearly prioritize them.

### 0.7–0.85
Identifies the decision-driving trade-offs and explicitly accepts a downside.

### 0.86–1.0
Shows nuanced prioritization, recognizes boundary conditions and distinguishes layer ownership from full-stack ownership where relevant.

## Evidence use

### 0.0–0.3
Mostly generic statements disconnected from supplied facts.

### 0.4–0.6
Uses one or two supplied facts appropriately.

### 0.7–0.85
Uses the most decision-relevant facts and connects them causally to the recommendation.

### 0.86–1.0
Uses evidence selectively, distinguishes known facts from assumptions and avoids overclaiming.

## Economic reasoning

### 0.0–0.3
Assumes `buy = cheaper` or `build = cheaper` without scale/time logic.

### 0.4–0.6
Recognizes usage, engineering or switching cost but incompletely.

### 0.7–0.85
Reasons across current cost, scale behavior and switching/ownership economics.

### 0.86–1.0
Explicitly considers uncertainty, thresholds or how economics may change with adoption and architecture.

## Strategic coherence

### 0.0–0.3
Recommendation conflicts with the learner's own stated priorities.

### 0.4–0.6
Recommendation is plausible but the strategic rationale is generic.

### 0.7–0.85
Recommendation follows clearly from prioritized strategic factors.

### 0.86–1.0
Recommendation is coherent, bounded and explicit about which layer/capability should be owned.

## Adaptability

### 0.0–0.3
Ignores the challenge or repeats the original answer without incorporating it.

### 0.4–0.6
Acknowledges the changed assumption but only partially updates reasoning.

### 0.7–0.85
Integrates the challenge and either revises the decision or defends it with updated logic.

### 0.86–1.0
Shows clear conditional reasoning and identifies what future evidence would trigger another decision change.

---

# Evidence and mastery rules

Follow `docs/MASTERY_MODEL.md`.

This skill generates at most these positive mastery-bearing evidence events in one completion:

1. one `application` event;
2. one `recall` event.

The diagnostic response, content exposure, visual placement and intermediate thoughts do not independently create large mastery gains.

The mastery engine remains the only authority for updating mastery.

Completion should be stored separately from mastery.

A strong first completion is evidence of learning, not proof of demonstrated expertise.

No percentile is shown.

---

# Recommendation behavior after completion

The next-best-step engine should consider:

- completed skill;
- updated mastery;
- prerequisites now satisfied;
- active domain preference;
- weak supporting skills surfaced by the application rubric;
- already completed skills.

Examples:

- weak economic reasoning → prioritize `AI Unit Economics`;
- strong economics but weak strategic differentiation → prioritize a strategy skill;
- strong result across both → unlock a harder AI Strategy node.

The LLM may explain the recommendation, but it does not choose or override graph prerequisites in v0.

---

# Localization requirements

The reference skill is bilingual from day one.

Supported locales:

- default: `es-CL`;
- alternate: `en`.

All user-facing authored content must exist explicitly in both locales.

Do not translate assessments dynamically at runtime with an LLM.

Skill IDs, evidence, mastery, graph state and session state are locale-independent.

Switching language during a session should preserve progress and render the same block in the selected locale when equivalent content exists.

The evaluation rubric is conceptually identical across locales.

---

# UI / visual direction

Preserve the approved Phase 0–1 visual system.

The learning experience should feel like:

`AI research lab × premium business school × modern consumer product`

### Use

- near-black background;
- warm white typography;
- lime for activation, progress and changed mastery;
- violet only where useful for AI/system distinction;
- editorial serif selectively for major conceptual statements;
- sans for reading/UI;
- mono for metadata and evidence/state.

### Avoid

- LMS lesson chrome;
- sidebar table of contents with 20 lesson items;
- progress gamification overload;
- chatbot bubble;
- generic AI gradients;
- giant cards for every concept;
- confetti;
- `Correct! Great job!` patterns.

### Progress

A restrained progress indicator is acceptable, but it should communicate sequence rather than game completion.

Example:

`03 / 10`

or a thin progress line.

---

# Responsive behavior

Desktop remains the primary reference implementation.

On mobile:

- learning blocks become a single reading column;
- the interactive field must remain usable by touch;
- open responses use a comfortable full-width editor;
- AI challenge remains inline in sequence;
- no horizontal overflow for diagrams;
- mastery summary remains readable without reducing type below accessibility thresholds.

---

# Analytics events for MVP

Keep analytics provider-agnostic.

Useful events:

```text
skill_started
think_submitted
visual_interacted
application_submitted
ai_challenge_shown
ai_challenge_answered
final_decision_submitted
recall_submitted
skill_completed
mastery_updated
graph_update_viewed
next_move_opened
```

Include `skillId`, `sessionId`, `locale`, block id and timestamps where relevant.

Do not log full open-response text into general analytics. Keep learner content in the appropriate session/evidence store.

---

# Acceptance criteria

Phase 2 reference implementation is acceptable when a tester can:

1. enter `Build vs Buy` from `Tu próximo paso / Your Next Move`;
2. form an opinion before receiving the model;
3. understand the six decision lenses without reading a long article;
4. interact with one meaningful decision visual;
5. make a defensible open-ended recommendation;
6. receive a challenge specific to their reasoning;
7. revise or defend the decision;
8. complete a transfer/recall check;
9. create structured application + recall evidence;
10. see mastery update through the deterministic engine;
11. return to `Tu Skala / Your Skala` and visibly see the affected node/connection change;
12. receive a next-best-step recommendation;
13. switch ES/EN without losing session state.

The full happy path should take approximately 5–8 minutes for a normal learner.

---

# Quality bar before scaling content

Do not immediately produce the other 7–9 Phase 2 skills after the renderer technically works.

First test this reference skill against these questions:

- Did the learner have to think before Skala explained?
- Did the AI challenge respond to their actual reasoning?
- Could more than one final decision be defensible?
- Did the lesson teach a reusable decision model rather than vocabulary?
- Did evidence feel connected to mastery?
- Did the graph update make the learning consequence tangible?
- Would the experience still be valuable with the AI temporarily unavailable?
- Did the experience feel like Skala rather than a course player?

Only after the answer is yes should the same renderer/content pattern be reused for additional skills.
