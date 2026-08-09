# Skala Curriculum V1

Status: proposed source of truth for post-MVP curriculum expansion  
Date: 2026-08-09

## 1. Purpose

Skala's Business Core is the common foundation beneath every future Domain and Specialization. It should approximate the breadth and rigor of the core curriculum of a top general-management MBA while preserving Skala's product model:

`Business Core → Domains → Specializations → Skills → Evidence → Mastery`

The atomic unit remains the **skill**, not the course. Programs and units are curated traversals of the knowledge graph; they do not replace it.

A learner may complete a different path through the same Business Core depending on prior evidence, diagnostic performance, prerequisites and later retention.

## 2. Research basis

This curriculum is an original Skala synthesis informed by public 2025–2026 / current curriculum descriptions from leading business schools. It does not reproduce proprietary class notes, cases or teaching materials.

Reference programs reviewed:

- Stanford Graduate School of Business — MBA First-Year Curriculum: analytical foundations, leadership foundations and management foundations; differentiated levels in some required disciplines.
- Harvard Business School — Required Curriculum: Finance, Financial Reporting & Control, Leadership & Organizational Behavior, Marketing, Technology & Operations Management, Strategy, Data Science & AI for Leaders, Business/Government/International Economy, Entrepreneurial Management, Finance II, Leadership & Corporate Accountability, Purpose of the Firm and FIELD Global Capstone.
- Wharton — fixed and flexible MBA core spanning leadership, marketing, microeconomics, statistics, communication, accounting, finance, macroeconomics, operations/decisions, management and business ethics.
- MIT Sloan — core in leadership, economic analysis, data/models/decisions, communication, organizational processes and financial accounting, with finance/operations/strategy/marketing core electives.
- INSEAD — 14-course core spanning accounting, markets, valuation, organizational behavior, data/judgement, strategy, finance, customer value, operations, communication, macroeconomics and business & society, plus a capstone.
- Chicago Booth — foundations in accounting, microeconomics and statistics, then functions, leadership/management and business environment with substantial flexibility based on background.

Official references are listed in Section 15.

## 3. Curriculum design rules

1. **Business Core comes first.** AI is the first deep Domain, not the foundational program.
2. **Common curriculum, adaptive traversal.** Users can demonstrate, skip, remediate and revisit skills.
3. **Skills are decision capabilities.** A skill must answer what a learner can now diagnose, calculate, interpret, choose or defend.
4. **Integration matters.** Checkpoints combine several skills; the capstone combines several units.
5. **No passive-content streaks.** Every skill must contain at least one meaningful interaction that changes understanding, evidence or state.
6. **Think before reveal where useful.** Learners should commit to a view before seeing the model when the skill supports diagnostic reasoning.
7. **Content variety is mandatory.** Financial statements should not feel like negotiation; queues should not feel like branding.
8. **Mastery is evidence-based.** Completion is not mastery and mastery is not demonstrated expertise.
9. **Original cases.** Skala may use the case method as inspiration, but all cases, data and artifacts must be original or properly licensed.
10. **Global but LatAm-legible.** Examples should not assume only US institutions or business context.

## 4. Mapping legend

- **EXISTS** — the graph already contains a substantially matching skill.
- **EXPAND** — a current node covers part of the capability but should be split, broadened or deepened.
- **NEW** — the capability is not represented clearly enough in the current graph.

Existing implementation status (`mapped`, `outlined`, `playable`, `validated`) remains separate from this curriculum mapping. A skill can be EXISTS but still need production-quality authoring.

---

# BUSINESS CORE

## Unit 01 — Economics of Business

**Core question:** How do markets allocate value, and how should a manager reason when prices, incentives, costs and competitive behavior change?

| # | Skill | Curriculum status | Current graph anchor |
|---|---|---|---|
| 1 | Supply & Demand | EXISTS | `supply-demand` |
| 2 | Opportunity Cost | EXISTS | `opportunity-cost` |
| 3 | Marginal Thinking | NEW | — |
| 4 | Marginal Cost | EXISTS | `marginal-cost` |
| 5 | Elasticity | EXISTS | `elasticity` |
| 6 | Incentives | EXISTS | `incentives` |
| 7 | Market Structure | EXISTS | `market-structure` |
| 8 | Pricing & Price Discrimination | EXPAND | `pricing-strategy`, `elasticity` |
| 9 | Competitive Interaction & Game Theory | NEW | — |
| 10 | Checkpoint — Market Decision | NEW | — |

**Exit capability:** diagnose a market, identify the relevant margin, anticipate behavioral responses and choose a defensible price/competitive action.

---

## Unit 02 — Accounting & Business Performance

**Core question:** What is actually happening economically inside a company, and how do the statements connect?

| # | Skill | Curriculum status | Current graph anchor |
|---|---|---|---|
| 1 | The Accounting Equation | NEW | — |
| 2 | Income Statement | EXPAND | `financial-statements` |
| 3 | Balance Sheet | EXPAND | `financial-statements` |
| 4 | Cash Flow Statement | EXPAND | `financial-statements`, `cash-flow` |
| 5 | Connecting the Three Statements | EXISTS | `financial-statements` |
| 6 | Revenue, Cost & Profit Recognition | NEW | — |
| 7 | Working Capital | NEW | — |
| 8 | Contribution Margin | EXISTS | `contribution-margin` |
| 9 | Fixed vs Variable Costs | EXPAND | `contribution-margin` |
| 10 | Managerial Accounting & Control | NEW | — |
| 11 | Checkpoint — Reconstruct the Business | NEW | — |

**Exit capability:** reconstruct an operating story from financial information and distinguish accounting profit, cash generation and unit contribution.

---

## Unit 03 — Finance & Value Creation

**Core question:** Which investments create value, how should risk be priced and how should scarce capital be allocated?

| # | Skill | Curriculum status | Current graph anchor |
|---|---|---|---|
| 1 | Time Value of Money | EXISTS | `time-value-money` |
| 2 | Discounting & Compounding | EXPAND | `time-value-money` |
| 3 | Net Present Value | EXISTS | `npv` |
| 4 | Risk & Return | NEW | — |
| 5 | Cost of Capital | NEW | — |
| 6 | Investment Decisions | NEW | — |
| 7 | Capital Structure | NEW | — |
| 8 | Valuation Fundamentals | EXISTS | `valuation-basics` |
| 9 | Capital Allocation | EXISTS | `capital-allocation` |
| 10 | Unit Economics | EXISTS | `economics.unit-economics` |
| 11 | Checkpoint — Invest or Walk Away | NEW | — |

**Exit capability:** translate operating assumptions into cash flows, compare alternatives across time and risk, and defend a capital-allocation decision.

---

## Unit 04 — Data, Decisions & Uncertainty

**Core question:** How do you make a calibrated decision from incomplete, noisy and potentially misleading evidence?

| # | Skill | Curriculum status | Current graph anchor |
|---|---|---|---|
| 1 | Probability | EXISTS | `probability` |
| 2 | Expected Value | EXISTS | `expected-value` |
| 3 | Cognitive Biases & Calibration | NEW | — |
| 4 | Descriptive Statistics | NEW | — |
| 5 | Sampling & Uncertainty | NEW | — |
| 6 | Regression Intuition | NEW | — |
| 7 | Experimentation | EXISTS | `experimentation` |
| 8 | Causality | EXISTS | `causality` |
| 9 | Metrics & Measurement | EXISTS | `metrics` |
| 10 | Decision Trees | EXISTS | `decision-trees` |
| 11 | Optimization & Constraints | NEW | — |
| 12 | Checkpoint — Decide Under Uncertainty | NEW | — |

**Exit capability:** distinguish signal from noise, interpret uncertainty, challenge causal claims and structure a decision using appropriate analytical tools.

---

## Unit 05 — Customers, Marketing & Growth

**Core question:** Why do customers choose, pay, adopt and stay — and how should a business create and capture customer value?

| # | Skill | Curriculum status | Current graph anchor |
|---|---|---|---|
| 1 | Customer Needs & Jobs | NEW | — |
| 2 | Segmentation | EXISTS | `segmentation` |
| 3 | Targeting | EXPAND | `segmentation` |
| 4 | Market Positioning | EXISTS | `marketing-positioning` |
| 5 | Value Proposition | NEW | — |
| 6 | Customer Acquisition | EXISTS | `customer-acquisition` |
| 7 | Channels & Distribution | NEW | — |
| 8 | Retention | EXISTS | `retention` |
| 9 | Brand | EXISTS | `brand` |
| 10 | Pricing Strategy | EXISTS | `pricing-strategy` |
| 11 | Customer Lifetime Value | NEW | — |
| 12 | Checkpoint — Go to Market | NEW | — |

**Exit capability:** identify a valuable segment, define a proposition and route to market, reason about acquisition/retention economics and choose a coherent growth system.

---

## Unit 06 — Operations & Systems

**Core question:** How do you design a system that reliably converts resources into customer value?

| # | Skill | Curriculum status | Current graph anchor |
|---|---|---|---|
| 1 | Process Design | EXISTS | `process-design` |
| 2 | Process Mapping | EXPAND | `process-design` |
| 3 | Bottlenecks | EXISTS | `bottlenecks` |
| 4 | Throughput | NEW | — |
| 5 | Capacity | EXISTS | `capacity` |
| 6 | Variability & Queues | NEW | — |
| 7 | Quality Systems | EXISTS | `quality` |
| 8 | Service Operations | EXISTS | `service-operations` |
| 9 | Supply Chain Fundamentals | NEW | — |
| 10 | Operations Strategy | NEW | — |
| 11 | Technology & Operations | NEW | — |
| 12 | Checkpoint — Fix the System | NEW | — |

**Exit capability:** locate the constraint, model flow/capacity, identify failure mechanisms and redesign an operating system around customer and economic outcomes.

---

## Unit 07 — Organizations, Leadership & Communication

**Core question:** How do you create coordinated action when people have different incentives, information, authority and perspectives?

| # | Skill | Curriculum status | Current graph anchor |
|---|---|---|---|
| 1 | Individual Motivation | NEW | — |
| 2 | Organizational Incentives | EXISTS | `org-incentives` |
| 3 | Team Effectiveness | EXISTS | `team-effectiveness` |
| 4 | Conflict | NEW | — |
| 5 | Influence & Power | NEW | — |
| 6 | Decision Rights | EXISTS | `decision-rights` |
| 7 | Organizational Design | EXISTS | `organizational-design` |
| 8 | Culture | NEW | — |
| 9 | Negotiation | NEW | — |
| 10 | Leadership Under Uncertainty | EXISTS | `leadership-uncertainty` |
| 11 | Persuasive Communication | NEW | — |
| 12 | Feedback & Difficult Conversations | NEW | — |
| 13 | Checkpoint — Lead the Organization | NEW | — |

**Exit capability:** diagnose organizational behavior, allocate authority, influence without relying only on hierarchy and communicate decisions under conflict and uncertainty.

---

## Unit 08 — Strategy

**Core question:** Where should a company play, how should it win and why should its advantage persist?

| # | Skill | Curriculum status | Current graph anchor |
|---|---|---|---|
| 1 | Industry Structure | EXISTS | `industry-structure` |
| 2 | Competitive Advantage | EXISTS | `competitive-advantage` |
| 3 | Strategic Positioning | EXISTS | `positioning` |
| 4 | Activity Systems & Trade-offs | EXPAND | `positioning` |
| 5 | Switching Costs | EXISTS | `switching-costs` |
| 6 | Network Effects | EXISTS | `network-effects` |
| 7 | Economies of Scale & Scope | NEW | — |
| 8 | Business Models | EXISTS | `business-models` |
| 9 | Competitive Dynamics | NEW | — |
| 10 | Corporate Strategy | EXISTS | `corporate-strategy` |
| 11 | Strategy Execution | NEW | — |
| 12 | Checkpoint — Choose Where to Play | NEW | — |

**Exit capability:** formulate a strategy as a coherent set of choices grounded in industry economics, customer value, capabilities and defensibility.

---

## Unit 09 — Business in Society & Global Context

**Core question:** How should leaders act when macroeconomics, institutions, regulation, ethics and non-market actors reshape the feasible strategy?

| # | Skill | Curriculum status | Current graph anchor |
|---|---|---|---|
| 1 | Macroeconomic Fundamentals | NEW | — |
| 2 | Inflation & Interest Rates | NEW | — |
| 3 | Business Cycles | NEW | — |
| 4 | Exchange Rates | NEW | — |
| 5 | Regulation & Public Policy | NEW | — |
| 6 | Business & Government | NEW | — |
| 7 | Ethics in Management | NEW | — |
| 8 | Corporate Governance | NEW | — |
| 9 | Stakeholders & Purpose | NEW | — |
| 10 | Non-market Strategy | NEW | — |
| 11 | Sustainability & Externalities | NEW | — |
| 12 | Global Business Context | NEW | — |
| 13 | Checkpoint — Beyond the Market | NEW | — |

**Exit capability:** incorporate macro, regulatory, political, ethical and societal constraints into business judgment rather than treating them as side topics.

---

# Unit 10 — Business Core Capstone

## Working title: Meridian Market — Growth at the Breaking Point

This must be an **original synthetic Skala case**, not an adaptation of a proprietary business-school case.

### Premise

Meridian Market is a fictional LatAm omnichannel consumer-services company that expanded from a profitable core market into two new countries. Revenue is growing rapidly, but cash conversion is deteriorating, service reliability is falling, a low-price digital competitor has entered, managers disagree about the source of the problem and a regulatory change threatens one of Meridian's highest-margin practices.

The learner joins the executive team shortly before a board strategy session.

### Evidence pack

The case should expose information progressively rather than as one long reading:

1. Five-year income statement and simplified balance sheet.
2. Cash-flow bridge and working-capital data.
3. Unit economics by customer segment and country.
4. Customer research, NPS/retention cohorts and price sensitivity evidence.
5. Capacity, throughput and queue/service-level data.
6. Competitor economics and positioning.
7. Organization chart, incentive scheme and internal decision-rights conflict.
8. Macro dashboard: inflation, rates and FX movement.
9. Regulatory memo and stakeholder reactions.
10. Board note defining capital constraints and strategic options.

### Decision arc

`Brief → diagnose → request/inspect evidence → initial recommendation → challenge from CFO/COO/CMO → new macro/regulatory shock → revise assumptions → capital-allocation decision → board memo → oral/AI defense → evaluation → mastery update`

### Candidate strategic choices

The case must not have one obviously correct answer. Defensible paths may include:

- pause geographic expansion and repair core economics;
- raise prices selectively and redesign the proposition;
- close/reshape an unprofitable segment;
- invest in operational capacity before further growth;
- pursue a hybrid strategy combining narrower growth and operational redesign.

### Skills assessed

The capstone should generate evidence across at least:

- economics: elasticity, marginal thinking, incentives, market structure;
- accounting: statements, working capital, contribution margin;
- finance: NPV/investment logic, capital allocation, unit economics;
- data: uncertainty, metrics, causality and decision structure;
- marketing: segmentation, positioning, retention and pricing;
- operations: bottlenecks, capacity and service operations;
- organizations: incentives, decision rights, conflict and communication;
- strategy: competitive advantage, trade-offs and execution;
- society/global: FX, regulation, governance and stakeholder judgment.

### Evaluation dimensions

- problem diagnosis;
- evidence use;
- economic/financial reasoning;
- strategic coherence;
- cross-functional integration;
- adaptability after new information;
- risk and stakeholder judgment;
- communication.

A strong answer is internally coherent, evidence-grounded and explicit about trade-offs. The evaluator must not reward a preferred strategic option by default.

---

# 11. Adaptive traversal

The Business Core is a shared graph, not a mandatory 100-step linear sequence.

## Entry diagnostic

A new user may complete a short diagnostic with representative items from every unit. Diagnostic evidence can:

- confirm prerequisite competence;
- recommend a starting point;
- allow a user to bypass introductory learning;
- never create `demonstrated` status by itself.

## Skip rule

A learner can skip a skill session when prior evidence clears the configured entry threshold with sufficient confidence. Skipping means **no new completion event**; it means the recommender treats the prerequisite as provisionally satisfied.

## Remediation rule

Poor transfer, repeated mistakes or low-confidence evidence should insert prerequisite or alternate-explanation skills rather than simply showing the same lesson again.

## Spaced validation

Core skills should reappear later as recall, transfer or case evidence. The program should deliberately reuse earlier concepts inside later units.

Examples:

- elasticity reappears in Marketing and Strategy;
- contribution margin reappears in Finance and Operations;
- incentives reappear in Organizations;
- probability and causality reappear throughout AI and experimentation;
- decision rights reappear in AI Organizations.

---

# 12. Program object vs graph object

User-facing programs are allowed, but the product must preserve this distinction:

```text
Program: Business Core
  Unit: Economics of Business
    Skill: Elasticity  ──────┐
                             ├── same graph node / same mastery
Program: Growth & Marketing  │
    Skill: Elasticity  ──────┘
```

Do not duplicate mastery because the same skill appears in multiple programs.

---

# 13. Content production states

Curriculum mapping and implementation status should converge on a clearer editorial workflow:

1. **mapped** — title, capability and graph relationships exist.
2. **outlined** — objectives, misconceptions, concepts, examples and evidence target are authored.
3. **playable** — full interactive session works end to end.
4. **polished** — content, visuals, interaction variety, mobile behavior and editorial copy meet product quality.
5. **validated** — reviewed for subject accuracy and learning/evaluation validity.

Existing `validated` nodes should not automatically be treated as final polished curriculum content; current MVP validation may represent a narrower reference implementation.

---

# 14. Production order

Do not author all ~100 capabilities at once.

Recommended sequence:

1. Finalize this curriculum map.
2. Author Unit 01 — Economics of Business to production standard.
3. Build its unit checkpoint.
4. Validate the learning-block variety and authoring workflow.
5. Author Unit 02 — Accounting & Business Performance.
6. Continue through the Business Core.
7. Build Meridian Market capstone after enough underlying skills have stable evidence schemas.
8. Only then scale deep Domains aggressively.

The first deep Domain remains **AI for Business**, but it should consume Business Core prerequisites instead of reteaching them.

---

# 15. Official curriculum references

Public curriculum pages used as research inputs (accessed 2026-08-09):

- Stanford GSB — First-Year Curriculum: https://www.gsb.stanford.edu/programs/mba/academic-experience/curriculum/first-year
- Stanford GSB — MBA Curriculum: https://www.gsb.stanford.edu/programs/mba/academic-experience/curriculum
- Harvard Business School — MBA Curriculum: https://www.hbs.edu/mba/academic-experience/curriculum
- Harvard Business School — Strategy Curriculum: https://www.hbs.edu/faculty/units/strategy/Pages/curriculum.aspx
- Harvard Business School — Technology & Operations Management Curriculum: https://www.hbs.edu/faculty/units/tom/Pages/curriculum.aspx
- Harvard Business School — Organizational Behavior Curriculum: https://www.hbs.edu/faculty/units/ob/Pages/curriculum.aspx
- Wharton — MBA Curriculum: https://mba.wharton.upenn.edu/mba-curriculum/
- MIT Sloan — MBA Curriculum: https://mitsloan.mit.edu/mba/explore-program/mba-curriculum
- MIT Sloan — MBA Course Descriptions: https://mitsloan.mit.edu/mba/mba-course-descriptions
- INSEAD — MBA Curriculum: https://www.insead.edu/master-programmes/master-business-administration/curriculum
- INSEAD — MBA Core Courses: https://www.insead.edu/master-programmes/master-business-administration/core-courses
- Chicago Booth — MBA Curriculum: https://www.chicagobooth.edu/mba/academics/curriculum

These sources establish coverage and curricular emphasis. Skala's sequencing, skill definitions, exercises, cases, datasets, copy and evaluation system must be original.