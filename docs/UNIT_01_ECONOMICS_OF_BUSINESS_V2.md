# Unit 01 — Economics of Business V2 Teaching Addendum

Status: pedagogical source of truth for Unit 01 migration  
Parent curriculum: `docs/CURRICULUM_V1.md`  
Base unit blueprint: `docs/UNIT_01_ECONOMICS_OF_BUSINESS.md`  
Learning standard: `docs/LEARNING_EXPERIENCE_V2.md`

This document does **not** change Unit 01's curriculum sequence. It changes how each skill teaches.

The existing Unit 01 implementation is too assessment-heavy. V2 preserves the interactions and evidence architecture where useful, but each foundational skill must contain explicit authored instruction, worked reasoning and guided practice before independent application.

## Unit sequence

1. Supply & Demand
2. Opportunity Cost
3. Marginal Thinking
4. Marginal Cost
5. Elasticity
6. Incentives
7. Market Structure
8. Pricing & Price Discrimination
9. Competitive Interaction & Game Theory
10. Checkpoint — Survia: Price the Route

`REFERENCE_SKILL_SUPPLY_DEMAND_V2.md` is the implementation reference for Skill 01.

---

# Skill 02 — Opportunity Cost V2

## Teaching thesis

A resource is not economically free just because no new invoice is generated. The relevant cost of a choice is the value of the best feasible alternative sacrificed.

## Teach 1 — Economic cost vs cash cost

Explain:

- cash outflow is not the same as economic cost;
- owned assets, employee time, engineering capacity and executive attention all have opportunity costs;
- the best forgone **feasible** alternative matters, not every imaginable option.

### Key idea

> `Costo de oportunidad = valor de la mejor alternativa sacrificada.`

## Worked example

A company owns an unused office floor.

Options:

- internal team creates expected value of 24;
- rent externally creates value of 18;
- reserve for expansion creates expected value of 10.

If the company uses the floor internally, the opportunity cost is 18, not zero and not the historic purchase price.

Show reasoning step by step.

## Teach 2 — Sunk cost

Explain that money already irreversibly spent should not automatically determine the next decision.

Contrast:

- `$18m renovation already spent` → sunk;
- `$3m additional work required tomorrow` → incremental and relevant;
- `external rental income forgone` → opportunity cost and relevant.

## Guided practice

Three scenarios:

1. engineering capacity between Product A/B;
2. owned warehouse vs external lease;
3. founder time between sales and fundraising.

For each, learner selects the best forgone alternative and receives explanatory feedback.

## Independent application

Keep the existing office-floor application, but only after teaching.

---

# Skill 03 — Marginal Thinking V2

## Teaching thesis

Business decisions are often made at the edge: the next customer, next employee, next campaign dollar or next unit of capacity. Totals and averages can hide that the newest increment destroys value.

## Teach 1 — Average vs incremental

Use a simple acquisition example.

Show:

| Band | Contribution/customer | Acquisition cost/customer |
|---|---:|---:|
| A | 80 | 45 |
| B | 75 | 55 |
| C | 68 | 66 |
| D | 60 | 72 |

Explain why the overall campaign can still look profitable after Band D becomes unattractive.

## Worked example

Calculate cumulative average economics after each band and highlight the point where the average is still positive while marginal economics turn negative.

## Teach 2 — Decision rule

Teach intuition before notation:

> Continue the next increment while expected incremental benefit exceeds expected incremental cost, subject to risk, capacity and strategic constraints.

## Guided practice

Learner chooses whether to add:

- another sales rep;
- another delivery route;
- another paid-acquisition band.

Feedback must explicitly name the marginal benefit and marginal cost.

## Interaction

Retain the incremental table, but transform it into a teaching tool with a `show average vs marginal` toggle and annotated threshold.

---

# Skill 04 — Marginal Cost V2

## Teaching thesis

Marginal cost is not “the variable-cost line in accounting.” It asks what cost actually changes when activity increases over the relevant range.

## Teach 1 — Fixed, variable and marginal

Use a software business:

- platform team: fixed over current range;
- payment fees: per transaction;
- cloud/inference: usage-driven;
- support: step capacity.

Explain why average cost and marginal cost answer different questions.

## Worked example

At 11,900 users:

- current support capacity is nearly full;
- next 99 users cost mostly variable infrastructure;
- user 12,000 triggers another support pod.

Show why the marginal cost at the threshold jumps even though average cost can still fall.

## Teach 2 — Relevant range

Explain that a cost can behave fixed in one range and incremental in another.

## Guided practice

Classify marginal-cost drivers in:

- restaurant;
- consulting firm;
- digital marketplace;
- AI assistant.

## Interaction

Keep the cost simulator, but annotate cost categories and visibly mark the capacity threshold before the learner crosses it.

Prediction required before crossing.

---

# Skill 05 — Elasticity V2

## Teaching thesis

Elasticity measures responsiveness, not simply whether demand went up or down. It depends on segment, alternatives, time horizon and evidence quality.

## Teach 1 — Intuition before formula

Use two customer segments facing the same 10% price increase.

- Segment A volume falls 2%.
- Segment B volume falls 18%.

Ask which is more price sensitive, then name the concept.

## Teach 2 — Formula and interpretation

Introduce:

`elasticity ≈ % change in quantity / % change in price`

Teach magnitude for managerial use.

Explain:

- `|E| < 1` → relatively inelastic;
- `|E| > 1` → relatively elastic;
- the sign reflects inverse demand relationship, but magnitude is often the useful classification.

## Worked calculation

Price `+10%`; quantity `-4%`.

Compute local observed elasticity magnitude `0.4`.

Then explain why this is an estimate for that context, not a permanent property.

## Teach 3 — Revenue consequence

Show why price ↑ can raise revenue in one segment and reduce it in another.

## Guided practice

Learner calculates and interprets three short price/quantity scenarios.

Feedback separates arithmetic from business meaning.

## Interaction

Keep the segment simulator, but show price, volume, revenue and elasticity side-by-side with clear units.

---

# Skill 06 — Incentives V2

## Teaching thesis

People respond to the system they face, not the intention behind the metric. A metric becomes dangerous when optimizing the proxy is easier than improving the underlying outcome.

## Teach 1 — Objective vs proxy

Customer support objective: solve customer problems.

Proxy: tickets closed per hour.

Explain how the proxy can correlate with the outcome while still being gameable.

## Worked example

Walk through a support agent's local incentives:

- easy ticket → close quickly;
- difficult ticket → avoid/escalate;
- repeat contact tomorrow → outside today's metric.

Show how individually rational behavior can damage the system.

## Teach 2 — Incentive architecture

Explain the trade-off between:

- speed;
- first-contact resolution;
- customer outcome;
- quality audits.

No single metric is perfect; the goal is to reduce predictable distortion.

## Guided practice

Learner predicts behavior under three compensation systems before seeing simulated outcomes.

## Interaction

Retain sliders, but every output needs a causal explanation. Avoid presenting synthetic scores as if they were empirical forecasts.

Label them clearly as modelled behavior.

---

# Skill 07 — Market Structure V2

## Teaching thesis

The number of competitors alone does not tell you whether an industry is attractive. Pricing power emerges from rivalry, differentiation, substitutes, barriers and bargaining power.

## Teach 1 — Four structural forces

Introduce a simplified managerial model:

1. rivalry/concentration;
2. differentiation/substitutes;
3. entry barriers;
4. buyer/supplier bargaining power.

## Worked comparison

Compare two markets with three competitors each:

### Market A

- high switching costs;
- differentiated products;
- fragmented buyers;
- high entry barriers.

### Market B

- commodity product;
- one dominant buyer;
- easy entry;
- many substitutes.

Explain why identical competitor count can produce very different economics.

## Teach 2 — Market definition

Explain why a company can look dominant in a narrow category while facing strong substitutes in the real decision market.

## Guided practice

Learner classifies four markets and gets reasoning feedback per structural factor.

## Interaction

Retain the market-power comparison, but remove unexplained magic scores. Show the underlying structural attributes and let the learner rank first.

---

# Skill 08 — Pricing & Price Discrimination V2

## Teaching thesis

Pricing is an architecture for capturing value. Different prices can make economic sense when willingness to pay, value received, usage or cost-to-serve differ — but the separation mechanism must be coherent and defensible.

## Teach 1 — Price level vs pricing architecture

Distinguish:

- one price;
- tiers/versioning;
- usage pricing;
- quantity discounts;
- eligibility/fences.

## Worked example

B2B software has:

- small teams: low usage, many alternatives;
- mid-market: high collaboration value;
- enterprise: compliance/support requirements and high willingness to pay.

Show why simply charging everyone the enterprise price destroys adoption, while one flat low price leaves value uncaptured.

## Teach 2 — Separation mechanisms

Teach intuitively:

- customers self-select via versioning or quantity;
- observable segments can receive different offers when legitimate;
- resale/arbitrage can destroy segmentation;
- fairness, trust and regulation constrain feasible architecture.

## Guided practice

Learner chooses between flat/tiered/usage structures for three businesses and sees explanatory trade-offs.

## Interaction

Retain pricing lab, but outputs must be explained as modelled scenario results and display assumptions.

---

# Skill 09 — Competitive Interaction & Game Theory V2

## Teaching thesis

A strategic move cannot be evaluated by assuming competitors remain passive. The relevant outcome depends on incentives and likely responses.

## Teach 1 — Interdependence

Start with:

> A 15% price cut is profitable if the rival keeps its price. Is that enough to recommend it?

Teach that the decision depends on the rival's best response.

## Worked payoff example

Use a simple 2×2 matrix:

| | Rival holds | Rival cuts |
|---|---:|---:|
| You hold | 8 / 8 | 3 / 12 |
| You cut | 12 / 3 | 5 / 5 |

Walk through each cell.

Explain best-response intuition before naming Nash equilibrium.

## Teach 2 — Repeated and sequential interaction

Explain:

- one-shot incentives;
- repeated interaction changes future consequences;
- commitment matters only when credible;
- a threat that is irrational to execute is weak.

## Guided practice

Learner predicts rival response to:

- price cut;
- exclusive distribution;
- capacity commitment.

## Interaction

Keep the payoff simulation, but require the learner to select both their action and predicted rival response before reveal.

The simulation should explain why the response is rational, not only display payoffs.

---

# Checkpoint — Survia V2 guardrail

Survia remains an **integration checkpoint**, not another lesson.

Therefore:

- do not add large teaching sections inside Survia;
- allow concise corrective feedback after a stage;
- if a learner fails because of a specific concept, link/remediate to the relevant skill;
- evaluate integration across market mechanism, marginal reasoning, elasticity, pricing, incentives and competitor response;
- do not inflate mastery from one checkpoint completion.

## Recommended remediation behavior

If the learner shows a clear misconception:

- demand vs quantity demanded → suggest Supply & Demand review;
- average vs marginal reasoning → suggest Marginal Thinking;
- price response interpretation → suggest Elasticity;
- ignores competitor reaction → suggest Game Theory.

The checkpoint should reveal gaps rather than reteach all content inline.

---

# Unit 01 migration quality bar

Before Unit 01 is considered V2-complete:

- every skill has at least two teaching moments;
- every skill has a worked example;
- every guided interaction gives explanatory feedback;
- quantitative skills teach interpretation as well as calculation;
- interactions expose assumptions rather than unexplained scores;
- no foundational skill is just `question → paragraph → exercise → textarea`;
- Supply & Demand reference skill is validated first;
- Survia remains application-heavy and teaching-light.
