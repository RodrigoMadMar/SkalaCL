# Skala MVP — Product Requirements Document

Status: v0.1

## 1. Product thesis

Skala is an AI-native platform for building and demonstrating business expertise. It takes the theoretical knowledge normally associated with an MBA and rebuilds the learning experience around adaptive microlearning, interactive business cases, a persistent knowledge graph, and evidence-based mastery.

Skala is not trying to reproduce the credential, recruiting network, or campus experience of a traditional MBA in v0. The MVP tests whether the learning layer can be materially better than a conventional online course platform.

Core promise:

> Learn business through a system that knows what you know, challenges how you think, and updates your expertise as you demonstrate it.

## 2. Product model

The curriculum is organized as:

`Business Core → Domains → Specializations → Skills → Evidence → Mastery`

The atomic learning unit is a **skill**, not a course.

A user's state is represented as mastery over nodes in the knowledge graph. Learning sessions, recall checks, mini-applications, and cases generate evidence against those nodes.

## 3. Target user

Initial audience:

- Spanish-speaking professionals in Chile and LatAm.
- Ambitious knowledge workers who want MBA-level business theory without the time or cost of a traditional MBA.
- Product, strategy, innovation, marketing, finance, operations, technology, consulting, entrepreneurial and general-management-adjacent profiles.
- Users should not be forced into rigid career paths. Skala assumes role boundaries will become increasingly fluid and expertise will be composed across domains.

## 4. Why Skala is different

Skala must not degrade into:

- a course catalog;
- a library of AI-generated videos;
- an LMS with a chatbot;
- a sequence of video → quiz → certificate;
- a generic social feed;
- a role-based career-path marketplace.

The differentiated product loop is:

`Learn → Apply → Decide → Be challenged → Get feedback → Update mastery → Receive next best step`

## 5. MVP objective

A new user should understand within 20 minutes why Skala is different from Coursera, Udemy or a conventional online MBA.

The MVP should prove five things:

1. A knowledge graph can be a meaningful navigation and identity layer.
2. Short AI-adaptive sessions can feel better than static lessons.
3. Cases can measure decision quality rather than simple answer correctness.
4. Mastery can accumulate across multiple forms of evidence.
5. The resulting expertise profile can feel professionally meaningful.

## 6. MVP scope

### Included

- Dark-first responsive web app.
- Business Core overview.
- One deep Domain: AI.
- Approximately 35 playable skills.
- Approximately 150–250 graph nodes visible structurally, even if most are not fully authored yet.
- 3 interactive cases.
- Personalized next-step recommendation v0.
- Mastery model v0.
- User expertise profile.
- Local/demo persistence sufficient to retain progress.
- AI interactions embedded inside learning and cases.

### Excluded

- Payments.
- Certificates.
- Enterprise admin.
- General-purpose forum.
- Full social network.
- Native mobile apps.
- Instructor marketplace.
- Video production pipeline.
- Sophisticated cohort matching.
- Real percentile rankings until enough real participants exist.

## 7. Information architecture

Primary navigation for MVP:

- **Home** — next best action, recent progress, weekly case.
- **Your Skala** — interactive expertise/knowledge map.
- **Learn** — adaptive skill session.
- **Explore** — Business Core, Domains, Specializations.
- **Cases** — interactive decision simulations.
- **Profile** — mastery and demonstrated expertise.

Network/community is future-facing and should not be a main MVP dependency.

## 8. Curriculum architecture

### Business Core

The broad graph should include at least:

- Strategy
- Finance
- Economics
- Marketing
- Operations
- Organization & Leadership
- Data & Decision Making

For MVP, each Core area only needs 2–3 polished playable skills. The purpose is to make the graph feel like a coherent business foundation rather than to ship a complete MBA.

### Initial Domain: AI

Recommended clusters:

1. AI Fundamentals
2. AI Economics
3. AI Strategy
4. AI Products
5. Agents & Automation
6. AI Organizations

Example skills:

- Models vs products
- Inference economics
- Cost vs quality trade-offs
- Pricing AI products
- AI gross margins
- Build vs buy
- Capability vs feature vs product
- Data advantages
- Distribution advantages
- Model commoditization
- Copilot vs agent
- Human-in-the-loop
- Evaluation
- Trust and control
- AI UX
- Workflow automation
- Organizational redesign

## 9. Learning session

A skill should normally take 5–8 minutes.

Default pattern:

1. Hook / problem
2. Concept
3. Example
4. Think before continuing
5. User response
6. AI feedback or challenge
7. Applied mini-scenario
8. Mastery check
9. Evidence recorded
10. Next best step

The experience should feel like one continuous interaction, not discrete LMS pages.

## 10. Cases

MVP cases:

### Case 01 — Pricing pressure

Theme: Strategy + pricing + switching costs + elasticity.

### Case 02 — AI copilot economics

Theme: AI economics + pricing + unit economics + build vs buy.

### Case 03 — Incumbent vs AI-native challenger

Theme: competitive advantage + distribution + data + disruption + organizational capability.

Each case follows:

`Brief → Evidence → Initial decision → Challenge → New information → Revision/defense → Final recommendation → Evaluation → Mastery update`

The user's trajectory matters more than arriving at a canonical answer.

## 11. Mastery and professional signal

Skala distinguishes:

- Exposure: the user saw a concept.
- Learned: the user demonstrated short-term understanding.
- Retained: the user later recalled/applied it.
- Demonstrated: the user used it successfully in cases or simulations.

A single good case must never create expert status.

Case rankings, when real data exists, can show percentile only for the same case/version and should include participant count. Domain-level claims should use absolute mastery labels, not fake competitive percentiles.

## 12. Profile

The profile is a core outcome, not a settings page.

It should surface:

- Domain mastery.
- Specialization mastery.
- Demonstrated skills.
- Cases completed.
- Evidence volume.
- Recent validation date.
- Shareable profile conceptually ready for future public links.

The eventual product ambition is a professional signal based on demonstrated capability rather than self-claimed expertise.

## 13. AI principles

Skala should not have an “AI feature.” Skala should behave like AI.

The system should know:

- current skill;
- prerequisites;
- prior evidence;
- recent mistakes;
- current mastery;
- learning objective;
- allowed rubric.

AI may explain, challenge, ask a Socratic question, produce an example, evaluate a response against a rubric, or choose the next learning step.

AI should not invent user mastery, fabricate source facts, or give opaque scores without rubric-grounded reasoning.

## 14. Success metrics for prototype testing

Primary qualitative questions:

- Did the product feel materially different from an online course?
- Did the learner understand what “Your Skala” represented?
- Did the AI interactions improve learning rather than interrupt it?
- Did the case feel intellectually engaging?
- Did mastery feel earned?
- Would the user return tomorrow voluntarily?

Prototype behavioral metrics:

- First-session completion.
- Skill completion rate.
- Case completion rate.
- Return intent / next-session start.
- Time to first meaningful mastery update.
- Percentage of users opening Your Skala after a learning event.

## 15. North-star product principle

Skala succeeds when the user feels they are **building an evolving map of business expertise**, not completing content.