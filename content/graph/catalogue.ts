import type { GraphNode } from "@/lib/content/schemas";

type SkillSeed = {
  id: string;
  title: string;
  summary: string;
  difficulty?: 1 | 2 | 3 | 4 | 5;
  minutes?: number;
  prerequisites?: string[];
  related?: string[];
  status?: "mapped" | "outlined" | "playable" | "validated";
};

type ClusterSeed = {
  id: string;
  title: string;
  summary: string;
  domain: "business-core" | "ai";
  skills: SkillSeed[];
};

export const clusters: ClusterSeed[] = [
  {
    id: "strategy", title: "Strategy", domain: "business-core",
    summary: "Choose where to play, how to win, and which trade-offs create durable advantage.",
    skills: [
      { id: "competitive-advantage", title: "Competitive advantage", summary: "Identify the mechanism that lets a business sustain superior value or economics.", status: "validated" },
      { id: "industry-structure", title: "Industry structure", summary: "Read how suppliers, buyers, substitutes and rivalry shape profit pools.", status: "playable" },
      { id: "positioning", title: "Strategic positioning", summary: "Connect a distinctive value proposition to a coherent activity system.", prerequisites: ["competitive-advantage"], status: "playable" },
      { id: "switching-costs", title: "Switching costs", summary: "Diagnose what makes customers stay and how durable that friction really is.", status: "playable" },
      { id: "network-effects", title: "Network effects", summary: "Distinguish real network effects from scale, virality and aggregation.", prerequisites: ["competitive-advantage"], status: "outlined" },
      { id: "pricing-strategy", title: "Pricing strategy", summary: "Select a price architecture that captures value without damaging adoption.", related: ["elasticity", "economics.unit-economics"], status: "playable" },
      { id: "business-models", title: "Business models", summary: "Map value creation, delivery and capture as one connected system.", status: "outlined" },
      { id: "corporate-strategy", title: "Corporate strategy", summary: "Evaluate whether a portfolio creates more value together than apart.", prerequisites: ["competitive-advantage"], status: "mapped" },
    ],
  },
  {
    id: "finance", title: "Finance", domain: "business-core",
    summary: "Translate operating choices into cash, returns, risk and enterprise value.",
    skills: [
      { id: "financial-statements", title: "Financial statements", summary: "Connect the income statement, balance sheet and cash-flow statement.", status: "validated" },
      { id: "economics.unit-economics", title: "Unit economics", summary: "Model the revenue and variable cost created by one customer or transaction.", prerequisites: ["financial-statements"], status: "validated" },
      { id: "contribution-margin", title: "Contribution margin", summary: "Separate variable economics from fixed-cost leverage and accounting margin.", prerequisites: ["financial-statements"], status: "playable" },
      { id: "cash-flow", title: "Cash flow", summary: "Explain why profit and cash diverge as a business grows.", prerequisites: ["financial-statements"], status: "playable" },
      { id: "time-value-money", title: "Time value of money", summary: "Compare cash flows that arrive at different points in time.", status: "outlined" },
      { id: "npv", title: "Net present value", summary: "Evaluate investments using risk-adjusted future cash flows.", prerequisites: ["time-value-money"], status: "mapped" },
      { id: "capital-allocation", title: "Capital allocation", summary: "Choose between reinvestment, acquisitions, debt and returning capital.", prerequisites: ["cash-flow"], status: "mapped" },
      { id: "valuation-basics", title: "Valuation basics", summary: "Relate growth, margins, risk and duration to business value.", prerequisites: ["time-value-money"], status: "outlined" },
    ],
  },
  {
    id: "economics", title: "Economics", domain: "business-core",
    summary: "Reason from incentives, marginal choices and market mechanisms.",
    skills: [
      { id: "supply-demand", title: "Supply & demand", summary: "Reason about how markets clear and why prices move.", status: "playable" },
      { id: "elasticity", title: "Elasticity", summary: "Estimate how strongly demand responds to price and context changes.", prerequisites: ["supply-demand"], status: "validated" },
      { id: "marginal-cost", title: "Marginal cost", summary: "Identify the incremental cost of serving one more unit of demand.", status: "playable" },
      { id: "opportunity-cost", title: "Opportunity cost", summary: "Make the value of the best forgone alternative explicit.", status: "playable" },
      { id: "market-structure", title: "Market structure", summary: "Connect concentration, differentiation and entry barriers to conduct.", prerequisites: ["supply-demand"], status: "outlined" },
      { id: "incentives", title: "Incentives", summary: "Predict behavior by examining rewards, constraints and information.", status: "playable" },
    ],
  },
  {
    id: "marketing", title: "Marketing", domain: "business-core",
    summary: "Understand demand, shape preference and compound customer relationships.",
    skills: [
      { id: "segmentation", title: "Segmentation", summary: "Group demand around meaningful differences in needs and behavior.", status: "validated" },
      { id: "marketing-positioning", title: "Market positioning", summary: "Own a relevant idea in a defined audience's mind.", prerequisites: ["segmentation"], status: "playable" },
      { id: "brand", title: "Brand", summary: "Understand how memory structures and trust influence future choice.", status: "outlined" },
      { id: "customer-acquisition", title: "Customer acquisition", summary: "Model channels, conversion, cost and incrementality of new demand.", prerequisites: ["segmentation"], status: "playable" },
      { id: "retention", title: "Retention", summary: "Diagnose whether customers continue to receive and recognize value.", status: "playable" },
      { id: "pricing-psychology", title: "Pricing psychology", summary: "Use framing and reference points without obscuring fundamental value.", prerequisites: ["pricing-strategy"], status: "mapped" },
    ],
  },
  {
    id: "operations", title: "Operations", domain: "business-core",
    summary: "Design reliable systems that convert resources into customer value.",
    skills: [
      { id: "process-design", title: "Process design", summary: "Map work as a system of inputs, activities, handoffs and outcomes.", status: "validated" },
      { id: "bottlenecks", title: "Bottlenecks", summary: "Find the constraint that governs throughput for the entire system.", prerequisites: ["process-design"], status: "playable" },
      { id: "capacity", title: "Capacity", summary: "Balance demand variability, utilization and service reliability.", prerequisites: ["process-design"], status: "playable" },
      { id: "quality", title: "Quality systems", summary: "Design feedback and controls that prevent defects, not just detect them.", status: "outlined" },
      { id: "service-operations", title: "Service operations", summary: "Manage customer-visible variability and irreversible waiting time.", prerequisites: ["process-design"], status: "mapped" },
    ],
  },
  {
    id: "organizations", title: "Organizations", domain: "business-core",
    summary: "Align people, decision rights and systems under uncertainty.",
    skills: [
      { id: "org-incentives", title: "Organizational incentives", summary: "Design rewards that align local behavior with system outcomes.", prerequisites: ["incentives"], status: "playable" },
      { id: "decision-rights", title: "Decision rights", summary: "Place authority where context, accountability and speed can coexist.", status: "validated" },
      { id: "organizational-design", title: "Organizational design", summary: "Shape structure and interfaces around the work the strategy requires.", prerequisites: ["decision-rights"], status: "playable" },
      { id: "leadership-uncertainty", title: "Leadership under uncertainty", summary: "Create direction and learning when outcomes cannot be predicted cleanly.", status: "outlined" },
      { id: "team-effectiveness", title: "Team effectiveness", summary: "Build the conditions for coordinated judgment and reliable execution.", status: "mapped" },
    ],
  },
  {
    id: "data-decisions", title: "Data & Decisions", domain: "business-core",
    summary: "Make calibrated choices from incomplete, noisy and changing evidence.",
    skills: [
      { id: "probability", title: "Probability", summary: "Express uncertainty in a form that improves decisions.", status: "validated" },
      { id: "expected-value", title: "Expected value", summary: "Compare uncertain choices by weighting outcomes and likelihoods.", prerequisites: ["probability"], status: "playable" },
      { id: "experimentation", title: "Experimentation", summary: "Design tests that isolate whether an intervention caused a change.", prerequisites: ["probability"], status: "playable" },
      { id: "causality", title: "Causality basics", summary: "Separate correlation, selection and causal effects in business data.", prerequisites: ["probability"], status: "outlined" },
      { id: "metrics", title: "Metrics", summary: "Choose measures that reveal system health without distorting behavior.", status: "playable" },
      { id: "decision-trees", title: "Decision trees", summary: "Structure sequential choices, uncertainty and information value.", prerequisites: ["expected-value"], status: "mapped" },
    ],
  },
  {
    id: "ai-fundamentals", title: "AI Fundamentals", domain: "ai",
    summary: "Build the conceptual substrate for reasoning about AI systems and products.",
    skills: [
      { id: "ai.model-landscape", title: "Model landscape", summary: "Distinguish model capability from the product system and market around it.", status: "validated" },
      { id: "ai-training-inference", title: "Training vs inference", summary: "Separate how models are created from how they produce outputs in use.", prerequisites: ["ai.model-landscape"], status: "playable" },
      { id: "ai-tokens-context", title: "Tokens & context", summary: "Understand how context windows shape cost, memory and behavior.", prerequisites: ["ai.model-landscape"], status: "playable" },
      { id: "ai-capability-workflow", title: "Model vs workflow capability", summary: "Locate performance in the model, tools, data and surrounding workflow.", prerequisites: ["ai.model-landscape"], status: "outlined" },
      { id: "ai-evaluation-basics", title: "Evaluation basics", summary: "Define representative tests before trusting apparent model quality.", prerequisites: ["ai.model-landscape"], status: "playable" },
      { id: "ai-probabilistic-output", title: "Probabilistic outputs", summary: "Reason about variable model behavior without demanding false certainty.", prerequisites: ["probability"], status: "mapped" },
    ],
  },
  {
    id: "ai-economics", title: "AI Economics", domain: "ai",
    summary: "Understand how compute, usage and quality reshape software economics.",
    skills: [
      { id: "ai-inference-economics", title: "Inference economics", summary: "Explain how usage-driven model cost changes pricing and gross margin.", prerequisites: ["ai-training-inference", "economics.unit-economics"], related: ["marginal-cost"], status: "validated" },
      { id: "ai-cost-quality", title: "Cost–quality frontier", summary: "Choose the lowest-cost system that reliably clears a task's quality bar.", prerequisites: ["ai-inference-economics"], status: "playable" },
      { id: "ai-gross-margins", title: "AI gross margins", summary: "Model how inference, support and usage concentration affect margin.", prerequisites: ["ai-inference-economics", "contribution-margin"], status: "playable" },
      { id: "ai-variable-cost", title: "Usage-driven variable cost", summary: "Identify which AI costs scale with requests, tokens and workflow depth.", prerequisites: ["ai-inference-economics"], status: "outlined" },
      { id: "ai-pricing", title: "Pricing AI products", summary: "Align price metric, customer value and volatile cost-to-serve.", prerequisites: ["ai-inference-economics", "pricing-strategy"], related: ["economics.unit-economics"], status: "playable" },
      { id: "ai-model-routing", title: "Model routing economics", summary: "Allocate tasks across models to control cost while preserving outcomes.", prerequisites: ["ai-cost-quality"], status: "mapped" },
    ],
  },
  {
    id: "ai-strategy", title: "AI Strategy", domain: "ai",
    summary: "Find defensible advantage when model capabilities diffuse quickly.",
    skills: [
      { id: "ai-capability-feature-product", title: "Capability, feature or product", summary: "Determine whether an AI capability can sustain a complete value proposition.", prerequisites: ["ai.model-landscape"], status: "validated" },
      { id: "ai.build-vs-buy", title: "Build vs Buy", summary: "Choose which AI capability is worth owning under strategic, economic and operational trade-offs.", prerequisites: ["ai.model-landscape", "economics.unit-economics"], related: ["ai.model-landscape", "competitive-advantage", "ai-pricing", "capital-allocation"], status: "validated" },
      { id: "ai-model-commoditization", title: "Model commoditization", summary: "Assess what remains defensible as base model quality converges.", prerequisites: ["competitive-advantage", "ai.model-landscape"], status: "playable" },
      { id: "ai-distribution-advantage", title: "Distribution advantage", summary: "Evaluate access, workflow presence and trust as routes to adoption.", prerequisites: ["competitive-advantage"], status: "playable" },
      { id: "ai-data-advantage", title: "Data advantage", summary: "Test whether proprietary data actually improves outcomes and compounds.", prerequisites: ["competitive-advantage", "ai-evaluation-basics"], status: "outlined" },
      { id: "ai-workflow-lock-in", title: "Workflow lock-in", summary: "Understand how embedded process and accumulated context raise switching cost.", prerequisites: ["switching-costs"], status: "mapped" },
      { id: "ai-native-incumbent", title: "AI-native vs incumbent", summary: "Compare speed and architecture against distribution and installed advantage.", prerequisites: ["ai-model-commoditization", "ai-distribution-advantage"], status: "mapped" },
    ],
  },
  {
    id: "ai-products", title: "AI Products", domain: "ai",
    summary: "Design trustworthy AI interactions around outcomes, uncertainty and control.",
    skills: [
      { id: "ai-copilot-agent", title: "Copilot vs agent", summary: "Match autonomy to task risk, reversibility and verification cost.", prerequisites: ["ai.model-landscape"], status: "validated" },
      { id: "ai-human-loop", title: "Human in the loop", summary: "Place human judgment where it changes error cost or system learning.", prerequisites: ["ai-copilot-agent"], status: "playable" },
      { id: "ai-trust-control", title: "Trust & control", summary: "Calibrate user trust with visibility, boundaries and recoverable action.", prerequisites: ["ai-human-loop"], status: "playable" },
      { id: "ai-ux", title: "AI interaction design", summary: "Design interfaces for variable output, iteration and progressive control.", prerequisites: ["ai.model-landscape"], status: "playable" },
      { id: "ai-evaluation-design", title: "Evaluation design", summary: "Turn product outcomes and failure modes into a repeatable eval system.", prerequisites: ["ai-evaluation-basics"], status: "outlined" },
      { id: "ai-failure-modes", title: "Failure-mode design", summary: "Make likely failures visible, containable and recoverable before launch.", prerequisites: ["ai-evaluation-basics", "ai-trust-control"], status: "mapped" },
    ],
  },
  {
    id: "agents-automation", title: "Agents & Automation", domain: "ai",
    summary: "Decompose work into reliable systems of models, tools and human escalation.",
    skills: [
      { id: "agent-tool-use", title: "Tool use", summary: "Let a model act through constrained, observable interfaces.", prerequisites: ["ai-copilot-agent"], status: "playable" },
      { id: "agent-workflow-decomposition", title: "Workflow decomposition", summary: "Break work into steps with explicit inputs, outputs and checkpoints.", prerequisites: ["process-design"], status: "validated" },
      { id: "agent-autonomy", title: "Agent autonomy", summary: "Set autonomy according to risk, reversibility and feedback latency.", prerequisites: ["agent-tool-use"], status: "playable" },
      { id: "agent-human-escalation", title: "Human escalation", summary: "Define when uncertainty, impact or policy requires human authority.", prerequisites: ["ai-human-loop", "agent-autonomy"], status: "outlined" },
      { id: "agent-orchestration", title: "Multi-step orchestration", summary: "Coordinate state, tools and checks across a long-running workflow.", prerequisites: ["agent-workflow-decomposition", "agent-tool-use"], status: "mapped" },
      { id: "agent-reliability", title: "Reliability trade-offs", summary: "Balance capability, latency, cost and controllability in production.", prerequisites: ["agent-autonomy", "ai-cost-quality"], status: "mapped" },
    ],
  },
  {
    id: "ai-organizations", title: "AI Organizations", domain: "ai",
    summary: "Redesign work and authority as AI changes the cost of cognition.",
    skills: [
      { id: "ai-org-redesign", title: "Organizational redesign", summary: "Reshape roles and interfaces around a changed division of labor.", prerequisites: ["organizational-design", "ai.model-landscape"], status: "validated" },
      { id: "ai-decision-rights", title: "New decision rights", summary: "Reassign authority when machines can recommend or execute decisions.", prerequisites: ["decision-rights", "ai-human-loop"], status: "playable" },
      { id: "ai-task-allocation", title: "Human–AI task allocation", summary: "Allocate work by comparative strength, context and accountability.", prerequisites: ["ai.model-landscape"], status: "playable" },
      { id: "ai-governance", title: "AI governance basics", summary: "Create proportionate oversight for risk, data and model change.", prerequisites: ["ai-trust-control"], status: "outlined" },
      { id: "ai-adoption-change", title: "Adoption & change", summary: "Move from tool availability to sustained workflow behavior change.", prerequisites: ["ai-task-allocation"], status: "mapped" },
    ],
  },
];

const rootNodes: GraphNode[] = [
  { id: "business-core", type: "root", title: "Business Core", summary: "The connected foundation for rigorous business judgment.", parentId: null, primaryDomain: "business-core", specialization: null, difficulty: null, estimatedMinutes: null, prerequisites: [], relatedSkills: [], evidenceTargets: [], contentStatus: "validated" },
  { id: "ai", type: "domain", title: "AI Domain", summary: "The first deep domain: AI products, economics, strategy and organizations.", parentId: null, primaryDomain: "ai", specialization: null, difficulty: null, estimatedMinutes: null, prerequisites: [], relatedSkills: [], evidenceTargets: [], contentStatus: "validated" },
];

export const graphNodes: GraphNode[] = [
  ...rootNodes,
  ...clusters.flatMap((cluster) => {
    const clusterNode: GraphNode = {
      id: cluster.id,
      type: cluster.domain === "business-core" ? "core_area" : "specialization",
      title: cluster.title,
      summary: cluster.summary,
      parentId: cluster.domain,
      primaryDomain: cluster.domain,
      specialization: cluster.domain === "ai" ? cluster.id : null,
      difficulty: null,
      estimatedMinutes: null,
      prerequisites: [], relatedSkills: [], evidenceTargets: [], contentStatus: "validated",
    };
    const skills: GraphNode[] = cluster.skills.map((skill) => ({
      id: skill.id,
      type: "skill",
      title: skill.title,
      summary: skill.summary,
      parentId: cluster.id,
      primaryDomain: cluster.domain,
      specialization: cluster.id,
      difficulty: skill.difficulty ?? 2,
      estimatedMinutes: skill.minutes ?? 7,
      prerequisites: skill.prerequisites ?? [],
      relatedSkills: skill.related ?? [],
      evidenceTargets: ["conceptual", "application", "case"],
      contentStatus: skill.status ?? "mapped",
    }));
    return [clusterNode, ...skills];
  }),
];
