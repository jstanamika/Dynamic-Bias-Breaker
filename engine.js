const ABSOLUTE = [
  "completely",
  "always",
  "never",
  "only",
  "obviously",
  "unquestionably",
  "destroy",
  "destroys",
  "wipe out",
  "no debate",
  "no question",
  "everyone knows",
  "the only",
  "must",
  "cannot",
  "impossible",
  "all",
  "none",
  "zero",
  "entirely",
  "undeniable",
  "full stop",
  "trivially",
  "already obsolete",
  "no historical",
  "this time is different",
  "bad faith",
  "secretly",
];

const HEDGES = [
  "however",
  "although",
  "though",
  "nuance",
  "mixed",
  "depends",
  "trade-off",
  "tradeoff",
  "some studies",
  "on the other hand",
  "nevertheless",
  "caveat",
  "uncertain",
  "likely",
  "appears",
  "may",
  "might",
  "contingent",
  "boundary",
  "evidence is mixed",
  "not always",
  "in some cases",
  "compared with",
];

const EMOTION = [
  "disaster",
  "collapse",
  "obsolete",
  "dinosaur",
  "crater",
  "cope",
  "lazy",
  "destroying",
  "unambiguous",
  "captured",
  "relic",
  "won",
  "die",
  "kills",
  "wipe",
  "harm",
  "addict",
  "radicalize",
  "humane",
  "excellence",
  "fail",
];

const ANALYSIS_STEPS = [
  "Ingesting corpus & tokenizing claims…",
  "Embedding stance vectors across semantic poles…",
  "Clustering confirmation-bias neighborhoods…",
  "Scoring absolutism, hedging & emotional valence…",
  "Identifying missing perspectives & blind spots…",
  "Synthesizing devil’s-advocate counter-evidence…",
];

const PRESETS = [
  {
    id: "remote",
    label: "Remote Work Kills Productivity",
    text: "Why remote work completely destroys engineering productivity. Teams that went remote after 2020 have seen collaboration collapse, junior engineers fail to grow, and shipping velocity crater. Office presence is the only way to build real culture and high-output engineering orgs. Zoom cannot replace whiteboards. People slack off at home. Every FAANG company secretly knows RTO is the only path back to excellence.",
  },
  {
    id: "arch",
    label: "Tech Architecture: Monolith vs Microservices",
    text: "Microservices are the only serious architecture for any real product. Monoliths are legacy dinosaurs that cannot scale, cannot be deployed independently, and trap entire orgs in a single failure domain. If you are still running a monolith you are already behind. Every competent engineering leader knows you must decompose into services or you will die under your own coupling. There is no debate here.",
  },
  {
    id: "ubi",
    label: "Economic Policy: Universal Basic Income",
    text: "Universal Basic Income is obviously the only humane and economically rational policy for the 21st century. It will eliminate poverty, unleash entrepreneurship, and is trivially funded by taxing the ultra-wealthy and cutting waste. Critics are either uninformed or acting in bad faith to protect existing power structures. Every pilot has been a success. We should implement it nationally immediately.",
  },
  {
    id: "aijobs",
    label: "AI Automation & Jobs",
    text: "AI will completely wipe out knowledge work within five years. Lawyers, software engineers, analysts, and designers are already obsolete — they just do not know it yet. There is no historical parallel. This time is different. Universal unemployment is inevitable and anyone talking about augmentation or new job categories is selling cope. The only question is how society collapses when wages hit zero.",
  },
  {
    id: "nuclear",
    label: "Energy: Nuclear vs Renewables",
    text: "Nuclear power is a dangerous, expensive relic. Renewables have already won. Solar and wind are cheaper, safer, and scale infinitely. Anyone still advocating nuclear is captured by the industry. Waste lasts forever, plants take 20 years to build, and accidents prove it can never be safe enough. The transition should be 100% wind, solar, and batteries. Nuclear is a distraction that delays real climate action.",
  },
  {
    id: "social",
    label: "Social Media Regulation",
    text: "Social media platforms are unambiguously destroying democracy, mental health, and childhood. The only solution is aggressive government breakup and heavy content regulation. Section 230 is a gift to monopolies. Algorithms are designed to addict and radicalize. There is no free-speech argument that holds when the product is engineered harm. Ban algorithmic feeds for under-18s and treat platforms as publishers, full stop.",
  },
  {
    id: "balanced",
    label: "Nuanced: Hybrid Work Evidence",
    text: "Remote work appears to reduce some forms of spontaneous collaboration and can slow onboarding of junior engineers, particularly in tacit-knowledge-heavy domains. However, multiple studies (Bloom et al.; Barrero, Bloom & Davis) find mixed or positive productivity effects for experienced ICs, large reductions in commute externalities, and improved retention. The optimal policy is likely team- and task-dependent rather than a universal RTO or fully-remote mandate. Measurement error in “productivity” is itself a first-order issue.",
  },
];

const TOPICS = [
  {
    id: "remote",
    keywords: [
      "remote",
      "rto",
      "work from home",
      "wfh",
      "office",
      "hybrid",
      "zoom",
      "whiteboard",
      "collaboration",
    ],
    proSignals: [
      "destroys",
      "slack off",
      "rto",
      "office presence",
      "only way",
      "fail to grow",
      "culture",
      "back to office",
      "in-person",
    ],
    antiSignals: [
      "flexibility",
      "talent pool",
      "retention",
      "commute",
      "async",
      "deep work",
      "bloom",
      "hybrid",
      "output",
    ],
    pro: {
      topicLabel: "Remote Work × Productivity",
      detectedSide: "Pro-office / anti-remote",
      stance: "Extremely One-Sided: Pro-RTO frame detected",
      stanceDetail:
        "Input treats in-office presence as a necessary condition for engineering output, culture, and mentorship, with remote work cast as a collapse event rather than a design variable.",
      originalPerspective:
        "High-output engineering requires colocated presence. Remote work severs tacit knowledge transfer, destroys whiteboard-speed collaboration, conceals low performers, and is why post-2020 shipping velocity and junior growth deteriorated. Return-to-office is the corrective.",
      opposingPerspective:
        "Engineering output is a function of task type, seniority mix, measurement, and coordination cost — not a binary of ‘office vs sofa.’ For focused IC work, removing commutes and office noise often raises deep-work hours. Collaboration failures are frequently process and incentive failures that colocating merely masks. The opposing technical argument is that hybrid, team-level policies beat universal RTO mandates, and that ‘culture’ is downstream of staffing, management quality, and documentation — not badge swipes.",
      blindSpot:
        "The draft never separates task classes (deep work vs pairing vs incident response), seniority, or measurement. It treats ‘productivity’ as self-evident and ignores selection effects: who chose remote, who was already high-performing, and what else changed in 2020 (headcount, interest rates, product cycles).",
      missingPerspectives: [
        "Task-level evidence (IC deep work vs collaborative design)",
        "Junior vs senior heterogeneous treatment effects",
        "Talent-pool and retention externalities of remote-first",
        "Measurement error: commits, tickets, and ‘velocity’ as proxies",
      ],
      counterArgument:
        "The Ctrip experiment (Bloom et al., 2015) found ~13% productivity gains for remote call-center workers, with later work showing mixed results once promotion and innovation channels are included. Barrero, Bloom & Davis document large welfare gains from avoided commutes. Junior-growth costs are real in tacit-heavy crafts, but they are a training-design problem (pairing rituals, onsite onboarding windows), not proof that remote ‘completely destroys’ output. FAANG RTO narratives also confound real-estate utilization, control, and labor-market slack with productivity science.",
      counterData: [
        {
          claim: "Ctrip / Bloom 2015",
          detail:
            "~13% performance increase among remote volunteers; attrition fell. Later follow-ups show promotion-rate trade-offs — a nuance, not a refutation.",
        },
        {
          claim: "Commuting is a tax",
          detail:
            "US workers recaptured ~70 minutes/day on average when remote. That time is not automatically slack; much of it reallocated to work or care.",
        },
        {
          claim: "Proxy problem",
          detail:
            "Office occupancy correlates with ‘energy’ and is easy to see. Outcome quality, defect rates, and customer value are harder to see — classic availability bias.",
        },
        {
          claim: "Hybrid as instrument",
          detail:
            "Team-chosen onsite days for design reviews + remote deep work often dominate both extremes in orgs that actually measure.",
        },
      ],
      clusters: [
        { label: "In-group RTO framing", weight: 91 },
        { label: "Counter-evidence density", weight: 8 },
        { label: "Causal complexity", weight: 18 },
        { label: "Epistemic humility", weight: 6 },
      ],
      summary:
        "A high-certainty anti-remote brief that collapses heterogeneous mechanisms into a single morality play.",
      keywords: ["remote", "productivity", "RTO", "culture", "juniors", "velocity"],
    },
    anti: {
      topicLabel: "Remote Work × Productivity",
      detectedSide: "Pro-remote / anti-office",
      stance: "Extremely One-Sided: Pro-remote frame detected",
      stanceDetail:
        "Input treats remote work as strictly dominant and office presence as obsolete overhead, underweighting mentorship, serendipity, and coordination-heavy work.",
      originalPerspective:
        "Remote work is a strict upgrade: more focus, larger talent pools, happier employees, lower real estate. Offices are a 20th-century habit defended by managers who confuse visibility with value.",
      opposingPerspective:
        "Some work really is bandwidth-limited by colocation — early-stage product discovery, incident war-rooms, apprenticeship in tacit crafts, and trust formation in new teams. Fully remote orgs that win tend to over-invest in written culture, travel budgets, and intentional onsite bursts. Treating ‘office = theater’ as an identity can hide under-management and decaying junior pipelines.",
      blindSpot:
        "The case for remote often samples on experienced ICs in well-documented codebases and ignores onboarding, political capital, and cross-team ambiguity — the environments where physical presence is a coordination technology.",
      missingPerspectives: [
        "Apprenticeship and tacit knowledge transfer",
        "New-team trust formation costs",
        "Time-zone and async load-bearing limits",
        "Managers using visibility as a (flawed) monitoring proxy — and what replaces it",
      ],
      counterArgument:
        "Even strongly remote-positive studies flag promotion, innovation, and junior-development penalties when interaction becomes purely scheduled. Microsoft’s 2022 Nature paper on firm-wide remote work showed siloed collaboration networks. Those are not arguments for five-day RTO; they are arguments against a one-sided ‘remote always wins’ prior.",
      counterData: [
        {
          claim: "Network siloing",
          detail:
            "Yang et al. (Nature 2022): remote work made collaboration graphs more static and local — a real coordination cost.",
        },
        {
          claim: "Promotion channels",
          detail:
            "Proximity still predicts sponsorship in many firms. Ignoring that is not fairness; it is pretending the political layer does not exist.",
        },
        {
          claim: "Onboarding half-life",
          detail:
            "Tacit-knowledge roles show slower ramp when the only channel is tickets and Zoom. That can be designed around — it is not free.",
        },
      ],
      clusters: [
        { label: "In-group remote framing", weight: 86 },
        { label: "Counter-evidence density", weight: 12 },
        { label: "Causal complexity", weight: 22 },
        { label: "Epistemic humility", weight: 9 },
      ],
      summary: "A high-certainty pro-remote brief that treats coordination costs as managerial superstition.",
      keywords: ["remote", "flexibility", "office", "async", "talent"],
    },
    balanced: {
      topicLabel: "Remote Work × Productivity",
      detectedSide: "Mixed / contingent",
      stance: "Relatively Neutral: Contingent, evidence-aware framing",
      stanceDetail:
        "Input distinguishes task types, cites mixed evidence, and treats policy as a design choice rather than a moral binary.",
      originalPerspective:
        "Remote vs office is the wrong question. Effects depend on work type, seniority, measurement, and the rituals that replace hallway bandwidth. Universal mandates in either direction overfit to one cohort.",
      opposingPerspective:
        "Even a careful hybrid view can underweight hard-to-measure cultural public goods and over-index on studies from specific industries. A remaining counter is that some firms use ‘nuance’ to avoid making a decision, producing the worst of both worlds: no office density, no remote discipline.",
      blindSpot:
        "Contingent arguments can still hide a preferred policy. Watch for whether ‘it depends’ is cashed out in actual operating rules (which teams onsite, how often, how onboarding works).",
      missingPerspectives: [
        "Industry external validity (call centers ≠ platform engineering)",
        "Implementation quality vs the headline policy",
        "Worker preference vs firm-level output",
      ],
      counterArgument:
        "The remaining steelman against a fully contingent view: organizations need a default. Pure optionality can dissolve shared context. The interrupter here is not ‘you are wrong’ — it is ‘name the default, the exceptions, and the metrics that would change your mind.’",
      counterData: [
        {
          claim: "Falsifiers",
          detail:
            "A calibrated stance should pre-register what evidence (ramp time, defect rate, regretted attrition) would shift the policy.",
        },
        {
          claim: "Default vs exception",
          detail:
            "Hybrid fails when it is a slogan rather than a calendar: no core hours, no onsite purpose, no written culture.",
        },
      ],
      clusters: [
        { label: "In-group framing", weight: 28 },
        { label: "Counter-evidence density", weight: 74 },
        { label: "Causal complexity", weight: 81 },
        { label: "Epistemic humility", weight: 78 },
      ],
      summary: "A calibrated take that still benefits from specifying falsifiers and operating defaults.",
      keywords: ["hybrid", "mixed evidence", "task-dependent", "measurement"],
    },
  },
  {
    id: "arch",
    keywords: [
      "microservice",
      "microservices",
      "monolith",
      "architecture",
      "distributed",
      "service mesh",
      "coupling",
      "decompose",
    ],
    proSignals: [
      "only serious",
      "dinosaurs",
      "cannot scale",
      "already behind",
      "decompose",
      "no debate",
      "legacy",
    ],
    antiSignals: [
      "modular monolith",
      "distributed monolith",
      "complexity tax",
      "premature",
      "ops overhead",
      "transaction",
      "simpler",
    ],
    pro: {
      topicLabel: "Architecture: Monolith vs Microservices",
      detectedSide: "Pro-microservices",
      stance: "Extremely One-Sided: Pro-microservices dogma detected",
      stanceDetail:
        "Input treats service decomposition as an engineering virtue signal and monoliths as moral failure, skipping team size, domain boundaries, and operational tax.",
      originalPerspective:
        "Serious products are fleets of independently deployable services. A monolith cannot scale, cannot isolate failure, and cannot match team autonomy. Decomposition is overdue by definition.",
      opposingPerspective:
        "Most scaling problems are modularity problems, not process-boundary problems. A well-factored modular monolith gives you in-process calls, single-transaction integrity, one deploy pipeline, and a single mental model — until a specific axis (team count, independent scaling, separate failure domains) actually bites. Amazon and many ‘microservices success stories’ grew from monoliths. Premature distribution creates a distributed monolith: the coupling remains, with latency and partial-failure added.",
      blindSpot:
        "Missing: team cardinality, change-failure rate, p99 latency budgets, data ownership, and the cost of a distributed transaction. ‘Independently deployable’ is asserted, not evidenced. Conway’s law is cited as destiny rather than a design input.",
      missingPerspectives: [
        "Modular monolith as a default for < ~N teams",
        "Distributed transaction and consistency tax",
        "Platform/SRE staffing as a prerequisite",
        "Failure-mode expansion (partial outages, retries, poison queues)",
      ],
      counterArgument:
        "You scale an organization with clear module boundaries and ownership, not with YAML. Microservices pay off when independent deploy cadence, heterogeneous scaling, or isolation is a measured need — and when you can afford observability, tracing, contract testing, and on-call. Otherwise you have purchased complexity with no option value. The interrupter: name the axis of scale you are actually hitting.",
      counterData: [
        {
          claim: "First do monoliths",
          detail:
            "Shopify, Stack Overflow, and early Amazon are existence proofs that monoliths scale far past ‘serious product’ status when modularized.",
        },
        {
          claim: "Microservices tax",
          detail:
            "Network + serialization + retries + eventual consistency + local dev friction. That tax is real even when the blog posts omit it.",
        },
        {
          claim: "Distributed monolith",
          detail:
            "If services cannot be deployed independently because of lockstep contracts, you paid distribution cost for a monolith’s coupling.",
        },
        {
          claim: "Team threshold",
          detail:
            "A common heuristic: extract a service when a module has independent cadence, data, and on-call — not when a conference talk made you anxious.",
        },
      ],
      clusters: [
        { label: "Fashionable-architecture framing", weight: 93 },
        { label: "Counter-evidence density", weight: 7 },
        { label: "Operational complexity", weight: 14 },
        { label: "Epistemic humility", weight: 5 },
      ],
      summary: "Identity-level microservices advocacy with almost no operational counterweight.",
      keywords: ["microservices", "monolith", "scale", "coupling", "deploy"],
    },
    anti: {
      topicLabel: "Architecture: Monolith vs Microservices",
      detectedSide: "Pro-monolith",
      stance: "One-Sided: Anti-microservices frame detected",
      stanceDetail:
        "Input treats microservices as fashionable incompetence and monoliths as always sufficient, underweighting genuine isolation and scale axes.",
      originalPerspective:
        "Microservices are an industry cargo cult. Stay in a monolith forever; distribution is how average teams create outages.",
      opposingPerspective:
        "There are real extraction triggers: a noisy-neighbor workload, a compliance boundary, a team that ships daily against a system that ships monthly, or a failure domain you cannot afford to couple. Dismissing all of that as fashion can freeze an architecture past its fitness function. The steelman of microservices is not Twitter-scale vanity — it is independent release and blast-radius control when those are binding constraints.",
      blindSpot:
        "A pure anti-microservices stance often ignores org growth. Yesterday’s modular monolith can become tomorrow’s merge-conflict and deploy-queue bottleneck without anyone ‘falling for hype.’",
      missingPerspectives: [
        "Legitimate blast-radius and compliance boundaries",
        "Heterogeneous scaling of a hot path",
        "Team deploy-cadence mismatch",
      ],
      counterArgument:
        "The interrupter is not ‘go microservices.’ It is: write down fitness functions (lead time, change-fail, p99, cost). When a module violates them and the coupling is organizational, extraction is an engineering control — not an aesthetic.",
      counterData: [
        {
          claim: "Fitness functions",
          detail:
            "Architecture should move when measurements demand it. Ideology in either direction is the same bug.",
        },
        {
          claim: "Strangler paths",
          detail:
            "Incremental extraction around a still-healthy monolith is the grown-up version of both slogans.",
        },
      ],
      clusters: [
        { label: "Anti-hype framing", weight: 84 },
        { label: "Counter-evidence density", weight: 16 },
        { label: "Operational complexity", weight: 40 },
        { label: "Epistemic humility", weight: 14 },
      ],
      summary: "A reactive anti-hype stance that can freeze architecture past its fitness.",
      keywords: ["monolith", "complexity", "hype", "simplicity"],
    },
    balanced: {
      topicLabel: "Architecture: Monolith vs Microservices",
      detectedSide: "Mixed / contingent",
      stance: "Relatively Neutral: Fitness-function framing",
      stanceDetail:
        "Input treats architecture as a set of trade-offs indexed to team size, cadence, and failure domains.",
      originalPerspective:
        "Start modular; extract when a measured axis demands independence. Avoid both ‘microservices or death’ and ‘monolith forever.’",
      opposingPerspective:
        "Even balanced architecture essays can stay too abstract. The remaining gap is usually operational: who owns the platform, what the local-dev story is, and which consistency model you will actually implement.",
      blindSpot:
        "Trade-off language without numbers. If you cannot name current deploy frequency and change-fail rate, ‘it depends’ is unfinished.",
      missingPerspectives: [
        "Platform team capacity",
        "Data-ownership maps",
        "Concrete extraction criteria",
      ],
      counterArgument:
        "Steelman the next decision, not the ideology. Pick one module that hurts and ask whether process, modularity, or distribution is the cheapest fix.",
      counterData: [
        {
          claim: "Cheapest fix first",
          detail:
            "Many ‘we need services’ tickets are actually ‘we need module boundaries and tests.’",
        },
      ],
      clusters: [
        { label: "In-group framing", weight: 24 },
        { label: "Counter-evidence density", weight: 70 },
        { label: "Causal complexity", weight: 77 },
        { label: "Epistemic humility", weight: 80 },
      ],
      summary: "A trade-off-aware architecture take that still needs operating numbers.",
      keywords: ["modular", "trade-off", "fitness function"],
    },
  },
  {
    id: "ubi",
    keywords: [
      "ubi",
      "universal basic income",
      "basic income",
      "cash transfer",
      "welfare",
      "poverty",
    ],
    proSignals: [
      "only humane",
      "eliminate poverty",
      "trivially funded",
      "bad faith",
      "every pilot",
      "immediately",
      "unleash",
    ],
    antiSignals: [
      "lazy",
      "inflation",
      "unaffordable",
      "work disincentive",
      "dependency",
      "fantasy",
      "handout",
    ],
    pro: {
      topicLabel: "Economic Policy: Universal Basic Income",
      detectedSide: "Pro-UBI",
      stance: "Extremely One-Sided: Pro-UBI advocacy detected",
      stanceDetail:
        "Input treats UBI as simultaneously morally obligatory, fiscally trivial, and empirically settled — collapsing pilots, national programs, and political economy into one slogan.",
      originalPerspective:
        "UBI ends poverty, funds itself via the rich and ‘waste,’ has been validated by every pilot, and is opposed only by the uninformed or the captured.",
      opposingPerspective:
        "National UBI is not a scaled pilot. Finland’s experiment was a modest unemployment top-up; Stockton was targeted and short; GiveDirectly in Kenya is a different labor-market and price structure. Labor-supply effects, housing-supply inelasticity (cash hitting rents), and the political difficulty of replacing in-kind programs (Medicaid, housing, disability) are first-order. ‘Tax the ultra-wealthy’ is a residual, not a scored revenue line. A serious pro-UBI case still has to choose a level, a clawback, a replacement set, and a phase-in — and admit trade-offs with targeted transfers that deliver more poverty reduction per dollar.",
      blindSpot:
        "Pilot ≠ policy. External validity, duration, sample, and whether existing benefits were replaced are missing. Inflation in inelastic sectors, fiscal arithmetic at national scale, and work/care supply responses are unmodeled. Critics are pathologized rather than answered.",
      missingPerspectives: [
        "Fiscal scoring at national scale (level × population − clawbacks)",
        "Housing and other inelastic-good price responses",
        "Targeted transfers vs universal as poverty-reduction efficiency",
        "Political economy of replacing existing welfare constituencies",
      ],
      counterArgument:
        "Even sympathetic RCTs typically show modest labor effects and gains in well-being — not a proof that a $1k/month universal adult program is ‘trivially funded’ or that poverty is ‘eliminated.’ The US poverty gap is smaller than popularly imagined; the expensive part of the welfare state is health and old-age, which UBI does not substitute. The interrupter is to force a budget identity and a replacement matrix before moral language.",
      counterData: [
        {
          claim: "Pilot external validity",
          detail:
            "Finland 2017–18: 2,000 unemployed, €560/mo, no nationwide rollout. Outcomes: well-being up, employment mixed — not ‘every pilot a success.’",
        },
        {
          claim: "Budget identity",
          detail:
            "A $12k/year adult UBI in the US is O($3T) before taxes/clawbacks — same order as the entire federal budget, not a rounding error on ‘waste.’",
        },
        {
          claim: "Incidence",
          detail:
            "In supply-constrained housing markets, a large fraction of unrestricted cash can capitalize into rent. Transfers without supply response have leakages.",
        },
        {
          claim: "Targeting math",
          detail:
            "A dollar of UBI is mostly not a dollar to the poorest. That’s a feature for politics and a bug for poverty reduction per fiscal unit.",
        },
      ],
      clusters: [
        { label: "Moral-certainty framing", weight: 94 },
        { label: "Counter-evidence density", weight: 6 },
        { label: "Fiscal specificity", weight: 9 },
        { label: "Epistemic humility", weight: 4 },
      ],
      summary: "Moralized UBI advocacy that treats pilots as proof and critics as illegitimate.",
      keywords: ["UBI", "poverty", "pilots", "funding", "welfare"],
    },
    anti: {
      topicLabel: "Economic Policy: Universal Basic Income",
      detectedSide: "Anti-UBI",
      stance: "Extremely One-Sided: Anti-UBI frame detected",
      stanceDetail:
        "Input treats UBI as obvious folly (laziness, inflation, unaffordability) without engaging cash-transfer evidence or the cost of status-quo bureaucracy.",
      originalPerspective:
        "UBI would collapse labor supply, inflate prices, and bankrupt the state. Cash without work requirements is a moral and economic error.",
      opposingPerspective:
        "Unconditional cash at modest levels has a relatively well-identified empirical record: large welfare gains, small average labor-supply drops, and administrative simplicity versus fragmented means-testing. The status quo already has implicit taxes on work via benefit phase-outs that can exceed 50–100% at kinks. A steelman of UBI (or a negative income tax) is as much about cleaning the implicit tax schedule and bargaining power of the worst-off as it is about ‘free money.’ Inflation concerns are real in inelastic sectors but are not a unique property of UBI versus any other demand-side transfer.",
      blindSpot:
        "Labor-supply elasticities are not infinite. Many anti-UBI arguments skip the empirical magnitudes and ignore that disability, care work, and job-search quality are part of welfare. ‘People would stop working’ needs a number.",
      missingPerspectives: [
        "Measured labor-supply elasticities from cash RCTs",
        "Effective marginal tax rates in current welfare",
        "Bargaining-power and reservation-wage effects as features",
      ],
      counterArgument:
        "If the objection is fiscal, say so and debate the level. If it is moral (reciprocity), say so and don’t launder it through fake elasticities. Cash-transfer evidence is stronger than the ‘laziness’ slogan, even if national UBI remains a hard sell on cost and politics.",
      counterData: [
        {
          claim: "Elasticities",
          detail:
            "Most cash RCTs find modest, not catastrophic, intensive-margin labor effects — especially for primary earners.",
        },
        {
          claim: "Admin cost",
          detail:
            "Targeting is leaky too: exclusion error, stigma, and casework overhead are the hidden tax of the current system.",
        },
      ],
      clusters: [
        { label: "Moral-hazard framing", weight: 90 },
        { label: "Counter-evidence density", weight: 10 },
        { label: "Fiscal specificity", weight: 22 },
        { label: "Epistemic humility", weight: 8 },
      ],
      summary: "A moral-hazard brief that overstates labor collapse and under-reads cash-transfer RCTs.",
      keywords: ["UBI", "labor", "inflation", "incentives"],
    },
    balanced: {
      topicLabel: "Economic Policy: Universal Basic Income",
      detectedSide: "Mixed / contingent",
      stance: "Relatively Neutral: Design-dependent framing",
      stanceDetail:
        "Input treats UBI as a family of policies whose effects hinge on level, clawback, and what they replace.",
      originalPerspective:
        "Whether UBI is wise depends on the transfer level, tax clawback, interaction with health/housing policy, and the political feasibility of replacing vs stacking benefits.",
      opposingPerspective:
        "Design-dependence can become a way to never take a position. At some point a calibrated analyst should name a preferred instrument: NIT, targeted child allowance, wage subsidy, or a small UBI.",
      blindSpot:
        "Abstract openness without a scored option. Policy debate happens at concrete parameters.",
      missingPerspectives: [
        "A specific dollar level and pay-for",
        "Replacement vs stack",
        "Phase-in politics",
      ],
      counterArgument:
        "Pick a number. Compare poverty reduction per billion to expanded EITC, child allowance, or housing supply. That is the adult conversation.",
      counterData: [
        {
          claim: "Instrument choice",
          detail:
            "Many UBI goals are better hit by child allowances or wage subsidies if the true target is poverty, not universality as a political aesthetic.",
        },
      ],
      clusters: [
        { label: "In-group framing", weight: 22 },
        { label: "Counter-evidence density", weight: 72 },
        { label: "Fiscal specificity", weight: 68 },
        { label: "Epistemic humility", weight: 76 },
      ],
      summary: "A design-aware UBI take that still needs a scored proposal.",
      keywords: ["UBI", "clawback", "targeting", "evidence"],
    },
  },
  {
    id: "aijobs",
    keywords: [
      "ai",
      "automation",
      "jobs",
      "unemployment",
      "llm",
      "knowledge work",
      "obsolete",
      "augmentation",
      "agi",
    ],
    proSignals: [
      "wipe out",
      "obsolete",
      "this time is different",
      "wages hit zero",
      "inevitable",
      "cope",
      "five years",
      "no historical",
    ],
    antiSignals: [
      "augmentation",
      "new tasks",
      "jevons",
      "complement",
      "historically",
      "productivity",
      "tools",
      "reskill",
    ],
    pro: {
      topicLabel: "AI Automation & Labor Markets",
      detectedSide: "AI labor-doom",
      stance: "Extremely One-Sided: Automation-doom frame detected",
      stanceDetail:
        "Input asserts near-term annihilation of knowledge work, denies historical analogy, and treats ‘augmentation’ as motivated reasoning rather than a competing model.",
      originalPerspective:
        "LLMs make lawyers, engineers, analysts, and designers obsolete on a ~5-year clock. There is no new-task offset. Wages go to zero. Social collapse is the residual.",
      opposingPerspective:
        "Autor, Acemoglu, and Restrepo’s task framework still applies: technology automates some tasks, complements others, and creates new ones. Adoption is slow where regulation, liability, physical plant, data access, and trust bind. ‘This time is different’ is a claim about the elasticity of new-task creation and the speed of diffusion — it must be argued, not declared. Complementary-AI worlds produce wage polarization and intense pressure on routine cognitive tasks without implying zero wages. Bottlenecks migrate to taste, accountability, integration, and domain context. Five-year AGI-unemployment is a tail scenario being asked to do the work of a base case.",
      blindSpot:
        "No distinction between tasks and occupations; no diffusion curve; no sectoral bottlenecks (law, medicine, safety-critical software); no price effects (cheaper software can raise quantity demanded). Historical ‘this time is different’ has a poor track record as a base-rate, even when the technology is genuinely new.",
      missingPerspectives: [
        "Task-based labor economics vs occupation-level slogans",
        "Adoption lags, regulation, and liability",
        "Quantity effects when the price of cognitive work falls",
        "New task creation and complementary skill premia",
      ],
      counterArgument:
        "Even aggressive automation scenarios usually produce displacement and inequality long before mass zero-wage unemployment. ATMs increased bank-teller headcount for years via more branches. Spreadsheets did not end accounting. The honest doom case is about the rate of new-task creation vs displacement and the political capacity to redistribute — not a cinematic collapse. If you want to argue the tail, assign it a probability and a lead time; don’t smuggle it in as certainty.",
      counterData: [
        {
          claim: "Tasks ≠ jobs",
          detail:
            "Occupations are bundles. Automating 30–50% of tasks often reorganizes the job rather than deleting it (Acemoglu & Restrepo).",
        },
        {
          claim: "Diffusion is slow",
          detail:
            "McKinsey/historical S-curves: complementary process redesign, not model demos, gates productivity. Firm-level AI uptake remains uneven.",
        },
        {
          claim: "Jevons-ish demand",
          detail:
            "If code, legal drafts, and analysis get cheaper, demand for integrated systems and oversight can rise. Not guaranteed — but not crazy.",
        },
        {
          claim: "Bottlenecks",
          detail:
            "Physical world, credentialing, malpractice, and ‘who is accountable when it fails’ all cap substitution even when models look fluent.",
        },
      ],
      clusters: [
        { label: "Apocalyptic framing", weight: 96 },
        { label: "Counter-evidence density", weight: 5 },
        { label: "Task-level granularity", weight: 10 },
        { label: "Epistemic humility", weight: 3 },
      ],
      summary: "A certainty-coded AI-doom brief that skips tasks, diffusion, and demand elasticities.",
      keywords: ["AI", "jobs", "obsolete", "unemployment", "AGI"],
    },
    anti: {
      topicLabel: "AI Automation & Labor Markets",
      detectedSide: "AI labor-optimist / augmentation",
      stance: "One-Sided: Augmentation-only frame detected",
      stanceDetail:
        "Input treats AI as a pure complement and ‘new jobs will appear’ as a law of history, underweighting displacement speed and concentrated losses.",
      originalPerspective:
        "Every past technology created more jobs than it destroyed. AI is a tool. Workers will augment, not vanish. Anxiety is Luddism.",
      opposingPerspective:
        "Historical net-job creation is real and does not imply painless or fast adjustment. If cognitive task automation is broader and cheaper than prior waves, transition costs can be large even if long-run employment recovers. Young workers in routine white-collar tracks, offshore BPO, and junior knowledge roles are exposed now. ‘New jobs’ is not a transfer to the displaced. Complementarity for experts can be substitution for apprentices (the career-ladder problem).",
      blindSpot:
        "Averaging winners and losers into a net. Distribution, speed, and the junior-to-senior pipeline can all break even if GDP rises.",
      missingPerspectives: [
        "Incidence on juniors and offshore routine cognitive work",
        "Speed of adjustment vs working-life length",
        "Wage polarization rather than levels only",
      ],
      counterArgument:
        "The interrupter to augmentation-only: even if AI is GDP-positive, it can still wreck specific ladders (junior law, entry-level coding, CS ops). Policy and firm training have to be argued, not assumed via 19th-century textiles analogies.",
      counterData: [
        {
          claim: "Polarization",
          detail:
            "Autor’s polarization pattern: middles hollow, abstracts and manuals hold — AI may hit a different middle: routine cognition.",
        },
        {
          claim: "Apprenticeship risk",
          detail:
            "If seniors+AI absorb junior tasks, the training pipeline that produces future seniors collapses. That’s a dynamic, not a vibe.",
        },
      ],
      clusters: [
        { label: "Comfort-history framing", weight: 82 },
        { label: "Counter-evidence density", weight: 18 },
        { label: "Distributional grain", weight: 20 },
        { label: "Epistemic humility", weight: 16 },
      ],
      summary: "A Panglossian labor take that uses long-run net jobs to erase transition and ladder risk.",
      keywords: ["augmentation", "new jobs", "tools", "history"],
    },
    balanced: {
      topicLabel: "AI Automation & Labor Markets",
      detectedSide: "Mixed / contingent",
      stance: "Relatively Neutral: Task-and-diffusion framing",
      stanceDetail:
        "Input separates tasks from jobs and treats timelines as uncertain rather than cinematic.",
      originalPerspective:
        "AI will rearrange task bundles, lift complementary skills, and pressure routine cognition. Magnitude and speed are the open variables — not a morality play.",
      opposingPerspective:
        "Averages can still hide a too-calm prior on tail AGI or on political capacity. Remaining work: put numbers on exposure by occupation and say what would update you.",
      blindSpot:
        "Missing quantitative exposure tables and a stated tail probability.",
      missingPerspectives: [
        "Occupation exposure estimates",
        "Tail vs base-case separation",
        "Training-pipeline dynamics",
      ],
      counterArgument:
        "Keep the task model, add numbers. Name which occupations you think shrink in 5 vs 15 years and what evidence would flip you toward doom or complacency.",
      counterData: [
        {
          claim: "Update rule",
          detail:
            "Watch: junior hiring, billing mix in law/consulting, time-to-autonomy for new grads, and capital-deepening in cognitive tools.",
        },
      ],
      clusters: [
        { label: "In-group framing", weight: 26 },
        { label: "Counter-evidence density", weight: 71 },
        { label: "Task-level granularity", weight: 80 },
        { label: "Epistemic humility", weight: 74 },
      ],
      summary: "A task-aware AI-labor take that still needs quantitative exposure and an update rule.",
      keywords: ["tasks", "diffusion", "complement", "uncertainty"],
    },
  },
  {
    id: "nuclear",
    keywords: [
      "nuclear",
      "renewable",
      "solar",
      "wind",
      "reactor",
      "climate",
      "grid",
      "uranium",
      "radiation",
    ],
    proSignals: [
      "relic",
      "dangerous",
      "waste lasts",
      "never be safe",
      "already won",
      "captured",
      "100%",
      "distraction",
    ],
    antiSignals: [
      "capacity factor",
      "baseload",
      "deaths per twh",
      "land use",
      "intermittency",
      "smr",
      "life extension",
    ],
    pro: {
      topicLabel: "Energy: Nuclear vs Renewables",
      detectedSide: "Anti-nuclear / renewables-only",
      stance: "Extremely One-Sided: Anti-nuclear frame detected",
      stanceDetail:
        "Input treats nuclear as uniquely dangerous and slow, and wind/solar/batteries as an already-won, unbounded substitute — skipping capacity factors, land, and firming costs.",
      originalPerspective:
        "Nuclear is expensive, slow, and existentially unsafe. Renewables won on cost. Waste is forever. Advocates are industry-captured. Climate action means 100% wind, solar, batteries.",
      opposingPerspective:
        "On deaths per TWh, nuclear clusters with solar/wind, far below coal and comparable to or better than rooftop solar installation risk. Waste is small in volume, solid, and already paid for in operating plants; coal ash and air pollution are the actual mass-casualty waste streams. ‘20 years to build’ is largely a regulatory and first-of-a-kind cost problem, not a physics problem — France, Sweden, and Ontario decarbonized grids with nuclear on faster historical clocks. Intermittent renewables require overbuild, transmission, seasonal storage, or firm backups. Batteries handle hours, not winter weeks. A serious climate stance can be pro-renewables and still want existing-plant life extension plus new nuclear on tight sites.",
      blindSpot:
        "No deaths-per-TWh, no capacity factor, no seasonal storage math, no land-use, no firm/dispatchable residual. ‘Cheaper’ often compares unsubsidized-or-not LCOE without system-level integration costs. Accident availability bias (Chernobyl/Fukushima) substitutes for base rates.",
      missingPerspectives: [
        "System LCOE vs plant LCOE (firming, transmission)",
        "Life extension of existing fleets as cheapest CO₂ abatement",
        "Land use and material intensity",
        "Historical decarbonization pathways (France, Sweden)",
      ],
      counterArgument:
        "If your constraint is climate this decade, shutting nuclear is an own-goal (see Germany’s post-shutdown gas/coal residual). If your constraint is cost, the object to attack is delivery (FOAK costs, regulation, litigation), not the thermodynamic profile of a firm, dense, low-carbon source. 100% wind/solar/batteries is a research scenario in many latitudes, not a present engineering plan.",
      counterData: [
        {
          claim: "Deaths per TWh",
          detail:
            "Markandya/Wilkinson & Our World in Data: nuclear ~0.03 deaths/TWh vs coal ~24 and comparable to wind. The ‘uniquely dangerous’ claim fails the base rate.",
        },
        {
          claim: "Capacity factor",
          detail:
            "US nuclear ~92% vs utility solar ~25% and wind ~35%. Energy is not nameplate.",
        },
        {
          claim: "Germany",
          detail:
            "Energiewende + nuclear phaseout produced a harder residual fossil problem than a keep-the-fleet path would have.",
        },
        {
          claim: "Waste mass",
          detail:
            "A lifetime of spent fuel for a person’s electricity fits under a desk; coal ash and mining tails do not. Hazard ≠ volume, but volume is not ‘forever mountains.’",
        },
      ],
      clusters: [
        { label: "Availability-bias accidents", weight: 92 },
        { label: "Counter-evidence density", weight: 7 },
        { label: "System-grid literacy", weight: 11 },
        { label: "Epistemic humility", weight: 5 },
      ],
      summary: "An anti-nuclear brief that uses accident vividness and plant LCOE to skip system physics.",
      keywords: ["nuclear", "solar", "wind", "waste", "safety"],
    },
    anti: {
      topicLabel: "Energy: Nuclear vs Renewables",
      detectedSide: "Pro-nuclear / anti-renewables",
      stance: "One-Sided: Nuclear-maximalist frame detected",
      stanceDetail:
        "Input treats renewables as unserious and nuclear as the only grown-up option, underweighting cost/delivery risk and the actual cheapness of some solar/wind additions.",
      originalPerspective:
        "Only nuclear can power a modern grid. Wind and solar are intermittent toys. Anyone serious about climate builds reactors and stops pretending batteries are seasons.",
      opposingPerspective:
        "New nuclear in the West has a grim recent cost and schedule record (Vogtle, Flamanville, Hinkley). That is not physics, but it is the industrial reality a maximimalist must price. Utility solar and wind are genuinely cheap energy additions on many grids and pair with existing hydro/gas/nuclear. The adult mix is additive: keep nuclear, extend licenses, add cheap renewables, build transmission, and use gas or storage as a shrinking residual — not a purity contest.",
      blindSpot:
        "Delivery risk and capital cost of new nuclear. Mocking renewables does not pour concrete faster. Overbuild + interconnection is a real, solvable engineering program in some regions.",
      missingPerspectives: [
        "FOAK cost overruns as a first-order constraint",
        "Where solar/wind + hydro already work",
        "Political durability of 15-year reactor projects",
      ],
      counterArgument:
        "If nuclear is so obviously dominant, why do auctions keep clearing solar/wind so cheaply? Answer: they are cheap energy, not cheap firm energy. Hold both facts. Policy should buy firm low-carbon (including nuclear and geothermal) without pretending every GW of solar is a vanity project.",
      counterData: [
        {
          claim: "Cost record",
          detail:
            "Recent Western FOAK reactors slipped by years and tens of billions. Learning exists — it is not automatic.",
        },
        {
          claim: "Cheap energy vs cheap firm energy",
          detail:
            "Both statements can be true. The interrupter is to stop collapsing them.",
        },
      ],
      clusters: [
        { label: "Purity-nuclear framing", weight: 85 },
        { label: "Counter-evidence density", weight: 18 },
        { label: "Delivery-risk literacy", weight: 20 },
        { label: "Epistemic humility", weight: 12 },
      ],
      summary: "A nuclear-maximalist take that skips delivery risk and the real cheapness of variable energy.",
      keywords: ["nuclear", "baseload", "intermittency", "cost"],
    },
    balanced: {
      topicLabel: "Energy: Nuclear vs Renewables",
      detectedSide: "Mixed / portfolio",
      stance: "Relatively Neutral: Portfolio / system framing",
      stanceDetail:
        "Input treats firm vs variable as complementary tools on a carbon budget rather than a tribal identity.",
      originalPerspective:
        "Decarbonization is a portfolio: license extension, new firm low-carbon, cheap variable renewables, transmission, and demand response. Purity is not a grid.",
      opposingPerspective:
        "Portfolio language can evade scarcity: money, transmission corridors, and skilled trades are limited. You still have to rank.",
      blindSpot:
        "Missing a ranked build order and a regional grid context (hydro-rich vs not).",
      missingPerspectives: [
        "Regional resource endowment",
        "Build-order under capital constraints",
        "Workforce and interconnection queues",
      ],
      counterArgument:
        "Name the next GW you would buy for a specific ISO and why. Abstraction is how energy Twitter stays tribal.",
      counterData: [
        {
          claim: "Placefulness",
          detail:
            "Quebec is not ERCOT is not Germany. Portfolio talk without a map is incomplete.",
        },
      ],
      clusters: [
        { label: "In-group framing", weight: 20 },
        { label: "Counter-evidence density", weight: 73 },
        { label: "System-grid literacy", weight: 82 },
        { label: "Epistemic humility", weight: 77 },
      ],
      summary: "A portfolio energy take that still needs a regional, ranked build order.",
      keywords: ["portfolio", "firm", "variable", "grid"],
    },
  },
  {
    id: "social",
    keywords: [
      "social media",
      "algorithm",
      "section 230",
      "platform",
      "feed",
      "teen",
      "mental health",
      "moderation",
      "publisher",
    ],
    proSignals: [
      "destroying democracy",
      "only solution",
      "breakup",
      "publishers",
      "engineered harm",
      "full stop",
      "addict",
      "radicalize",
    ],
    antiSignals: [
      "free speech",
      "user agency",
      "section 230",
      "pre-existing",
      "twin study",
      "moderation capture",
      "public square",
    ],
    pro: {
      topicLabel: "Social Media Regulation",
      detectedSide: "Pro-heavy regulation / anti-platform",
      stance: "Extremely One-Sided: Platform-as-toxin frame detected",
      stanceDetail:
        "Input treats platforms as a monocausal engine of democratic and psychiatric collapse and jumps to breakup plus publisher liability as the unique remedy.",
      originalPerspective:
        "Feeds are engineered addiction and radicalization. Section 230 is a monopoly subsidy. Treat platforms as publishers, ban algorithmic feeds for minors, break them up. Free-speech objections are naïve.",
      opposingPerspective:
        "Causal identification on teen mental health is contested (Haidt vs Odgers/Twenge debates; twin and pre-trend studies). Platforms concentrate attention but also host the public square, small publishers, and dissidents under authoritarian regimes. Section 230 is what lets a small forum exist without pre-clearing every comment; repealing it for ‘monopolies’ can freeze the ecosystem into a few over-moderated incumbents who can afford compliance. Publisher liability + vague ‘harm’ standards are a censorship inverse that future administrations will use too. Demand-side (users want outrage) and substitution (if not TikTok, then something) are underplayed. Competition policy, data portability, and age-appropriate design can be argued without the maximalist package.",
      blindSpot:
        "No causal identification strategy; no distinction between specific design harms and ‘the internet’; no authoritarian-risk model of speech infrastructure; no substitution analysis. ‘Algorithms’ are treated as a demon rather than a ranking function with inspectable objectives.",
      missingPerspectives: [
        "Causal vs correlational mental-health evidence",
        "Section 230 as speech infrastructure for small platforms",
        "Demand-side appetite for outrage",
        "Abuse of harm-based speech rules by future factions",
      ],
      counterArgument:
        "If the harm is real and large, the first tools are measurement, design (chronological options, friction, age gates), and competition — not a one-way ratchet that turns every feed into a state-supervised publisher. The 230-as-publisher move is how you get four cautious incumbents and no experimental competitors. Steelman a narrower bill before the civilizational one.",
      counterData: [
        {
          claim: "Causation debate",
          detail:
            "The teen-mental-health / social-media causal literature is not a settled crime scene. Effect sizes and pre-trends remain actively disputed.",
        },
        {
          claim: "Section 230 incidence",
          detail:
            "Liability without 230 hits small platforms hardest. Incumbents can staff trust-and-safety; your forum cannot.",
        },
        {
          claim: "Authoritarian residual",
          detail:
            "States that already want handle on speech will use ‘harm’ and ‘publisher’ hooks. Design for the out-group in power.",
        },
        {
          claim: "Demand",
          detail:
            "Rage is pulled as well as pushed. Ranking changes without demand-side and media-literacy stories overfit to a villain.",
        },
      ],
      clusters: [
        { label: "Moral-panic framing", weight: 93 },
        { label: "Counter-evidence density", weight: 8 },
        { label: "Causal identification", weight: 12 },
        { label: "Epistemic humility", weight: 6 },
      ],
      summary: "A civilizational-harm brief that jumps to maximal remedies past contested causation.",
      keywords: ["social media", "algorithms", "230", "mental health", "regulation"],
    },
    anti: {
      topicLabel: "Social Media Regulation",
      detectedSide: "Anti-regulation / platform-defensive",
      stance: "One-Sided: Laissez-faire platform frame detected",
      stanceDetail:
        "Input treats any regulation as censorship and any harm literature as moral panic, underweighting design externalities on minors and attention markets.",
      originalPerspective:
        "It’s just speech. Users can log off. Section 230 is sacred. Mental health claims are a panic. Breakups and age rules are nanny-state overreach.",
      opposingPerspective:
        "Attention markets with engagement objectives have real externalities, especially for developing brains and for political advertising opacity. You can oppose publisher liability and still support age-appropriate design, research access, advertiser transparency, and making ranking objectives inspectable. ‘Just log off’ fails as a policy for a coordination good (everyone else’s feed is your information environment). Dismissing all of Haidt-style evidence as panic is the mirror image of treating it as settled.",
      blindSpot:
        "Externalities and minors. Adult speech norms don’t automatically extend to product design aimed at 13-year-olds with variable self-control.",
      missingPerspectives: [
        "Minors as a distinct regulatory class",
        "Engagement objective functions as a design choice, not nature",
        "Research-access mandates as a light-touch option",
      ],
      counterArgument:
        "The interrupter is not ‘nationalize ranking.’ It is: if your product is optimized for time-on-site among adolescents, you don’t get to hide behind 1990s forum metaphors. Narrow, testable design rules are compatible with a broad speech regime.",
      counterData: [
        {
          claim: "Design vs speech",
          detail:
            "Friction, default chronological feeds, and age gates regulate product mechanics, not viewpoints — a distinction worth using.",
        },
        {
          claim: "Externalities",
          detail:
            "Information environments are social. Individual ‘log off’ advice does not internalize political or developmental externalities.",
        },
      ],
      clusters: [
        { label: "Speech-absolutist framing", weight: 86 },
        { label: "Counter-evidence density", weight: 15 },
        { label: "Design-externality literacy", weight: 18 },
        { label: "Epistemic humility", weight: 11 },
      ],
      summary: "A speech-first brief that over-extends forum metaphors to engagement-optimized adolescent products.",
      keywords: ["free speech", "230", "log off", "panic"],
    },
    balanced: {
      topicLabel: "Social Media Regulation",
      detectedSide: "Mixed / instrument-specific",
      stance: "Relatively Neutral: Instrument-specific framing",
      stanceDetail:
        "Input separates speech rules from product-design rules and treats evidence as contested.",
      originalPerspective:
        "Target design (minors, transparency, portability) without converting platforms into state-supervised publishers. Keep the causal claims calibrated.",
      opposingPerspective:
        "Instrument-specificity can stall. At some point you have to endorse or reject a concrete bill section.",
      blindSpot:
        "No concrete instrument ranking.",
      missingPerspectives: [
        "A preferred legal instrument",
        "Enforcement capacity",
        "International regime shopping",
      ],
      counterArgument:
        "Write the one-pager: what you would pass this session, what you would not, and the abuse case you are designing against.",
      counterData: [
        {
          claim: "Abuse case",
          detail:
            "Every platform rule will be used by your opponents. Draft accordingly.",
        },
      ],
      clusters: [
        { label: "In-group framing", weight: 25 },
        { label: "Counter-evidence density", weight: 70 },
        { label: "Causal identification", weight: 72 },
        { label: "Epistemic humility", weight: 75 },
      ],
      summary: "A calibrated platform-policy take that still needs a concrete instrument list.",
      keywords: ["design", "minors", "transparency", "causation"],
    },
  },
];

function countHits(hay, needles) {
  return needles.reduce((n, k) => n + (hay.includes(k) ? 1 : 0), 0);
}

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

function hashText(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function dietFromBias(bias) {
  if (bias < 35) return "Balanced";
  if (bias < 55) return "Leaning";
  if (bias < 75) return "One-Sided";
  return "Echo Chamber";
}

function riskFromBias(bias) {
  if (bias < 35) return "low";
  if (bias < 55) return "moderate";
  if (bias < 75) return "high";
  return "critical";
}

function linguisticSignals(text) {
  const hay = text.toLowerCase();
  const abs = countHits(hay, ABSOLUTE);
  const hedges = countHits(hay, HEDGES);
  const emotion = countHits(hay, EMOTION);
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  let bias = 28;
  bias += abs * 7;
  bias += emotion * 4.5;
  bias -= hedges * 9;
  if (words < 40) bias += 8;
  if (words > 120 && hedges === 0) bias += 6;
  if (/\b(idiot|stupid|brainwashed|sheep|cult)\b/i.test(text)) bias += 10;
  return {
    abs,
    hedges,
    emotion,
    words,
    bias: clamp(Math.round(bias), 6, 97),
  };
}

function estimateBias(text) {
  if (!text.trim()) return 0;
  return linguisticSignals(text).bias;
}

function matchTopic(hay) {
  let best = null;
  for (const pack of TOPICS) {
    const score = countHits(hay, pack.keywords);
    if (score >= 2 && (!best || score > best.score)) best = { pack, score };
  }
  return best;
}

const GENERIC_BLINDSPOTS = [
  "The draft never states boundary conditions — where the claim would be false — so it cannot be falsified by the reader.",
  "Alternative causal models and confounders are absent; a single story is doing all the explanatory work.",
  "Comparison groups, base rates, and denominators are missing, which inflates certainty.",
  "The argument pathologizes disagreement instead of steelmanning the strongest opposing mechanism.",
];

const GENERIC_COUNTERS = [
  "Strong claims require comparative evidence, not vivid examples. Availability of supporting anecdotes is not a likelihood ratio. Ask what a careful skeptic would treat as a minimum viable study, then notice it is not in the draft.",
  "Most real systems are trade-off surfaces. Optimizing the stated goal almost certainly degrades an unmentioned goal (resilience, fairness, cost, option value). Name that goal; the echo chamber usually hides there.",
  "Base rates first. Even if the mechanism is real, the magnitude and the exception class determine whether the policy slogan follows. Slogans skip magnitudes.",
  "Identity-protective cognition explains the tone better than the data does. Swap the tribal labels and see which sentences still survive.",
];

function genericAnalyze(text, ling) {
  const h = hashText(text);
  const bias = ling.bias;
  const first = text.trim().split(/(?<=[.!?])\s+/)[0] ?? text.trim();
  const snippet = first.slice(0, 140);
  const high = bias >= 55;
  return {
    biasIndex: bias,
    stance: high
      ? "Extremely One-Sided: Unipolar framing detected"
      : bias >= 40
        ? "Leaning: Directional argument with thin counterweight"
        : "Relatively Neutral: Qualifiers present",
    stanceDetail: high
      ? `The text advances a high-certainty claim ("${snippet}${first.length > 140 ? "..." : ""}") without engaging disconfirming evidence, magnitudes, or trade-offs.`
      : "The text has a point of view but retains some uncertainty, comparison, or mixed signaling.",
    detectedSide: high ? "Unclassified unipolar stance" : "Mild / mixed stance",
    riskLevel: riskFromBias(bias),
    confidence: clamp(58 + ling.abs * 6 - ling.hedges * 4, 42, 96),
    clusters: [
      { label: "In-group framing", weight: clamp(bias - 4, 8, 98) },
      { label: "Counter-evidence density", weight: clamp(100 - bias - 10, 4, 90) },
      { label: "Causal complexity", weight: clamp(ling.hedges * 18 + (100 - bias) * 0.4, 8, 88) },
      { label: "Epistemic humility", weight: clamp(ling.hedges * 20 + (ling.abs === 0 ? 20 : 0), 4, 90) },
    ],
    signals: signalsFromLing(ling, bias),
    keywords: extractKeywords(text),
    blindSpot: GENERIC_BLINDSPOTS[h % GENERIC_BLINDSPOTS.length],
    missingPerspectives: [
      "Magnitudes, base rates, and denominators",
      "The strongest version of the opposing mechanism",
      "Implementation costs and second-order effects",
      "What evidence would change the author’s mind",
    ],
    counterArgument: GENERIC_COUNTERS[h % GENERIC_COUNTERS.length],
    counterData: [
      {
        claim: "Falsifiability check",
        detail:
          "A calibrated claim names the observation that would reduce confidence. This draft does not.",
      },
      {
        claim: "Trade-off surface",
        detail:
          "Every forceful policy or architecture slogan suppresses at least one competing objective. Surface it explicitly.",
      },
      {
        claim: "Selection & availability",
        detail:
          "The examples that come to mind first are not a sampling frame. Seek the boring counter-example on purpose.",
      },
    ],
    originalPerspective: text.trim().slice(0, 420),
    opposingPerspective:
      "The opposing technical stance starts by granting the author’s goal, then asking which unstated constraints (cost, error rates, minority cases, second-order incentives) were dropped to keep the narrative one-sided. Restore those constraints and the slogan usually becomes a design problem rather than a moral binary.",
    topicLabel: "Unindexed argument",
    summary: high
      ? "High-certainty prose with low disconfirming-evidence density — classic echo-chamber texture."
      : "Moderate stance with some qualifying language; still worth a structured counter-pass.",
  };
}

function signalsFromLing(ling, bias) {
  return [
    {
      label: "Absolutism",
      value: clamp(ling.abs * 14 + (bias > 70 ? 20 : 0), 4, 98),
      hint: "Always / never / only / completely",
    },
    {
      label: "Emotional valence",
      value: clamp(ling.emotion * 12 + 8, 4, 96),
      hint: "Loaded adjectives & catastrophe language",
    },
    {
      label: "Hedging index",
      value: clamp(ling.hedges * 18 + (bias < 40 ? 20 : 0), 3, 95),
      hint: "However / mixed / trade-off / depends",
    },
    {
      label: "Echo density",
      value: clamp(bias - 6, 5, 97),
      hint: "Semantic clustering toward a single pole",
    },
  ];
}

function extractKeywords(text) {
  const stop = new Set([
    "the",
    "and",
    "that",
    "this",
    "with",
    "from",
    "have",
    "has",
    "are",
    "was",
    "were",
    "will",
    "not",
    "for",
    "you",
    "your",
    "they",
    "their",
    "but",
    "all",
    "any",
    "can",
    "our",
    "out",
    "who",
    "what",
    "when",
    "why",
    "how",
    "into",
    "than",
    "then",
    "them",
    "been",
    "being",
    "about",
    "only",
    "just",
    "over",
    "also",
    "more",
    "some",
    "such",
    "very",
    "there",
    "here",
    "each",
    "other",
  ]);
  const counts = new Map();
  for (const raw of text.toLowerCase().match(/[a-z][a-z\-]{3,}/g) ?? []) {
    if (stop.has(raw)) continue;
    counts.set(raw, (counts.get(raw) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([w]) => w);
}

function pickSide(pack, hay, ling) {
  const pro = countHits(hay, pack.proSignals);
  const anti = countHits(hay, pack.antiSignals);
  const polarity = (pro - anti) / (pro + anti + 1);
  if (ling.hedges >= 3 && Math.abs(polarity) < 0.35) return pack.balanced;
  if (ling.hedges >= 2 && ling.abs <= 1 && Math.abs(polarity) < 0.25) return pack.balanced;
  if (polarity < -0.12) return pack.anti;
  return pack.pro;
}

function analyzeText(text) {
  const ling = linguisticSignals(text);
  const hay = text.toLowerCase();
  const matched = matchTopic(hay);

  if (!matched) {
    return genericAnalyze(text, ling);
  }

  const side = pickSide(matched.pack, hay, ling);
  const isBalanced = side === matched.pack.balanced;

  let bias = isBalanced
    ? clamp(Math.round(14 + ling.abs * 5 + ling.emotion * 2 - ling.hedges * 2), 8, 38)
    : clamp(Math.round(ling.bias * 0.55 + 38 + ling.abs * 3), 48, 97);

  if (!isBalanced && ling.hedges >= 2) bias = clamp(bias - 12, 36, 90);

  return {
    biasIndex: bias,
    stance: side.stance,
    stanceDetail: side.stanceDetail,
    detectedSide: side.detectedSide,
    riskLevel: riskFromBias(bias),
    confidence: clamp(62 + matched.score * 6 + ling.abs * 3 - ling.hedges * 3, 48, 97),
    clusters: side.clusters.map((c, i) =>
      i === 0
        ? { ...c, weight: clamp(Math.round(c.weight * 0.7 + bias * 0.3), 4, 98) }
        : c,
    ),
    signals: signalsFromLing(ling, bias),
    keywords: side.keywords,
    blindSpot: side.blindSpot,
    missingPerspectives: side.missingPerspectives,
    counterArgument: side.counterArgument,
    counterData: side.counterData,
    originalPerspective: side.originalPerspective,
    opposingPerspective: side.opposingPerspective,
    topicLabel: side.topicLabel,
    summary: side.summary,
  };
}
