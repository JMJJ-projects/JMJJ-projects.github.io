// All portfolio content lives here. To add a project, copy one object and edit it.
// categories: security | ai | systems | research | web
window.PORTFOLIO = {
  status: "Open to 6-month internships from February 2027 · AI, security, software",

  categories: [
    { id: "all", label: "All" },
    { id: "security", label: "Security & Cloud" },
    { id: "ai", label: "AI & Data" },
    { id: "systems", label: "Systems & Algorithms" },
    { id: "research", label: "Research & Modelling" },
    { id: "web", label: "Web & Games" },
  ],

  projects: [
    {
      id: "sim-agent",
      featured: true,
      title: "Simulation Agent",
      subtitle: "Natural language → sandboxed simulation code",
      year: "2026",
      context: "Personal project · solo",
      categories: ["ai", "security"],
      image: "assets/images/projects/sim-agent.jpg",
      gallery: ["assets/images/projects/sim-agent-results.png"],
      summary:
        "Ask a question about a particle-transport simulation in plain language: the agent writes the Python code, runs it in a locked-down Docker sandbox, and repairs it from the error output when it fails. Runs on small local models (4 GB of VRAM) or hosted ones, and is exposed as an MCP server.",
      highlights: [
        "Benchmark on 36 tasks: the repair loop took a local 3B model from 7/36 to 20/36, a one-line prompt fix reached 23/36 single-shot, and gpt-oss-120b solved 36/36",
        "Two security layers: a static allow-list on the generated code, then a Docker sandbox with no network, a read-only filesystem and resource limits, proven by 16 isolation tests",
        "MCP server exposing the simulator, the sandbox and the agent as tools, tested with a real MCP client",
        "Monte Carlo simulator built on NIST attenuation data and validated against Beer–Lambert; 404 tests and CI on Linux",
      ],
      tech: ["Python", "LangGraph", "Ollama", "Docker", "MCP", "NumPy"],
      links: [
        { label: "Code", url: "https://github.com/JMJJ-projects/sim-agent" },
        { label: "Benchmark results", url: "https://github.com/JMJJ-projects/sim-agent/blob/main/docs/eval_results.md" },
      ],
    },
    {
      id: "cve-triage",
      featured: true,
      title: "CVE Triage Agent",
      subtitle: "What should I patch first?",
      year: "2026",
      context: "Personal project · solo",
      categories: ["security", "ai"],
      image: "assets/images/projects/cve-triage.jpg",
      gallery: ["assets/images/projects/cve-pr-comment.png"],
      summary:
        "Triages a CVE ID, a vulnerability report, a code snippet or a whole dependency file, and ranks every finding by priority: CISA KEV (known exploited), EPSS (likely to be exploited) and CVSS severity, combined by fixed rules, never by the LLM. Runs offline, as a CLI, an MCP server, and a GitHub Action that comments on pull requests.",
      highlights: [
        "Scans requirements.txt, npm lockfiles and SBOMs through OSV.dev; upgrade advice comes only from OSV's fixed versions, never from the model",
        "Evaluated on 300 recent CVEs against trivial baselines: gpt-oss-120b lands within one severity level 86% of the time, a local 3B model 69%, with the failures reported openly",
        "Finding: only 3 of those 300 recent CVEs reach an EPSS of 0.10, so for new vulnerabilities priority comes from KEV and severity",
        "Resistant to prompt injection, never executes analysed code; 665 tests, CI, and a real demo PR showing the Action's comment",
      ],
      tech: ["Python", "LangGraph", "LangChain", "SQLite", "GitHub Actions", "MCP"],
      links: [
        { label: "Code", url: "https://github.com/JMJJ-projects/cve-triage-agent" },
        { label: "Demo PR", url: "https://github.com/JMJJ-projects/cve-triage-agent/pull/2" },
        { label: "Evaluation", url: "https://github.com/JMJJ-projects/cve-triage-agent/blob/main/docs/eval_results.md" },
      ],
    },
    {
      id: "stockagecloud",
      featured: true,
      title: "StockageCloud",
      subtitle: "Encrypted personal cloud storage",
      year: "2025–26",
      context: "Team project (3) · hardened solo in 2026",
      categories: ["security", "web"],
      image: "assets/images/projects/stockagecloud.jpg",
      summary:
        "A self-hostable file storage web app, built in 2025 with Aliou Dia and Abdoulaye Haidara. In 2026 I reworked it on my own: every file is now encrypted at rest with AES-256-GCM, checked for tampering on every download, and shared only through expiring, revocable links.",
      highlights: [
        "Envelope encryption: a random key per file, wrapped by a server master key kept out of the database",
        "CSRF tokens, brute-force lockout, hardened sessions and a Content-Security-Policy",
        "Trash with 30-day retention, storage quotas, share links with download counts, activity history",
        "25 automated tests (auth, IDOR, tampering, expiry…), GitHub Actions CI and a Docker image",
      ],
      tech: ["Python", "Flask", "SQLite", "cryptography", "pytest", "Docker"],
      links: [
        { label: "Code", url: "https://github.com/JMJJ-projects/StockageCloud" },
        { label: "Live demo", url: "https://johnm123.pythonanywhere.com/" },
      ],
    },
    {
      id: "ctl",
      featured: true,
      title: "On-the-fly CTL model checking",
      subtitle: "Formal verification research project",
      year: "2026",
      context: "M1 research project (TER) · team of 3",
      categories: ["research", "systems"],
      image: "assets/images/projects/ctl-poster.jpg",
      tall: true,
      summary:
        "An algorithm that checks temporal-logic (CTL) properties on acyclic Kripke structures while generating states on demand, so it can stop as soon as the answer is known instead of building the whole state space.",
      highlights: [
        "Formalised the model class (acyclic structures, self-loops on sink states) and showed CTL semantics are preserved",
        "On-the-fly algorithms for EX, EG, E[φ U ψ] and nested formulas, with memoisation of sub-formula results",
        "Proved simplifications such as EF(EG φ) and EG(EF φ) in this class, with counter-examples where they fail",
        "C implementation with lazy state loading and caching that confirms the theoretical results",
      ],
      tech: ["C", "CTL", "Model checking", "Formal methods"],
      links: [
        { label: "Poster", url: "projects/ctl/poster.pdf" },
        { label: "Code", url: "https://github.com/MaTCoTT/TER" },
      ],
    },
    {
      id: "kaggle",
      featured: true,
      title: "Exam score prediction",
      subtitle: "Kaggle competition · top ~15%",
      year: "2026",
      context: "M1 Machine Learning · team of 4",
      categories: ["ai"],
      image: "assets/images/projects/kaggle-results.png",
      summary:
        "A two-level stacking ensemble on 630k rows. Public leaderboard RMSE of 8.624, ranked about 650th of roughly 4,300 teams.",
      highlights: [
        "Exploratory analysis: study hours (r = 0.76) and attendance dominate, while age and gender carry no signal",
        "Cyclic, ratio and interaction features, plus leakage-safe cross-fitted target encoding",
        "Five level-1 models (HGBR, XGBoost, Ridge, LinearSVR, RealMLP) on two feature views, blended by Ridge",
        "Ablation study: cross-validated RMSE down from 8.781 to 8.658",
      ],
      tech: ["Python", "scikit-learn", "XGBoost", "PyTorch", "pandas"],
      links: [
        { label: "Code", url: "https://github.com/JMJJ-projects/kaggle-exam-score" },
        { label: "Slides (FR)", url: "https://github.com/JMJJ-projects/kaggle-exam-score/blob/main/docs/slides.pdf" },
      ],
    },
    {
      id: "compiler",
      title: "Mini-JS compiler & VM",
      subtitle: "JavaCC compiler to a stack machine",
      year: "2025",
      context: "Licence · Compilation course · pair",
      categories: ["systems"],
      image: "assets/images/projects/mini-js-compiler.jpg",
      summary:
        "Compiles a subset of JavaScript into assembly for a stack-based virtual machine, with compile-time constant folding, plus an interpreter that runs the result.",
      highlights: [
        "One grammar rule per precedence level. AST nodes know their size, which gives the jump offsets for if/else, do-while and &&",
        "Constant folding and dead-branch elimination",
        "A virtual machine with a step-by-step trace mode",
        "A git history documented commit by commit (part of the grade), example programs tested in CI",
      ],
      tech: ["Java", "JavaCC", "Make", "Git"],
      links: [{ label: "Code", url: "https://github.com/JMJJ-projects/mini-js-compiler" }],
    },
    {
      id: "edumind",
      title: "EduMind",
      subtitle: "Grade & exam management platform",
      year: "2025",
      context: "Licence · Software engineering · team of 5",
      categories: ["web"],
      image: "assets/images/projects/edumind.jpg",
      summary:
        "Requirements, UML modelling and Scrum planning for a university grade-management system, with clickable prototypes for students, teachers and administrators.",
      highlights: [
        "Use-case, class, sequence, activity and state diagrams. 4 sprints with reviews and a Gantt chart",
        "Student space: online exam voided on tab switch, PDF grade report with chart, messaging",
        "Teacher dashboard and admin account management",
      ],
      tech: ["UML", "Scrum", "JavaScript", "Chart.js", "jsPDF", "Tailwind"],
      links: [
        { label: "Live demo", url: "edumind/" },
        { label: "Code", url: "https://github.com/JMJJ-projects/edumind" },
      ],
    },
    {
      id: "clustering",
      title: "Clustering IoT sensor data",
      subtitle: "Unsupervised learning on smoke-detector readings",
      year: "2025",
      context: "M1 Data analysis · team of 3",
      categories: ["ai"],
      image: "assets/images/projects/clustering.jpg",
      summary:
        "K-means, hierarchical and spectral clustering on 62,630 smoke-detector readings, compared with silhouette analysis and external metrics (ARI, homogeneity, V-measure).",
      highlights: [
        "Preprocessing, scaling, and silhouette analysis from 2 to 10 clusters for each method",
        "Spectral clustering separated alarm and no-alarm readings far better than hierarchical clustering",
        "Extra questions: which sensors drive the separation, and are clusters stable across random seeds?",
      ],
      tech: ["Python", "scikit-learn", "pandas", "matplotlib"],
      links: [{ label: "Notebook", url: "projects/clustering/" }],
    },
    {
      id: "petri",
      title: "Restaurant Petri net",
      subtitle: "Discrete-event system model",
      year: "2025",
      context: "M1 Discrete event systems · solo",
      categories: ["research"],
      image: "assets/images/projects/petri-restaurant.jpg",
      summary:
        "A Petri net of a fast-food restaurant: limited cashiers, cooks and tables, impatient customers, eat-in or takeout, and a stock and condiment supply chain.",
      highlights: [
        "15 places and 15 transitions organised into service, maintenance and supply sub-nets",
        "Weighted arcs encode queue impatience, batched deliveries and 1 stock unit → 5 condiments",
        "Analysis of boundedness, resource conservation and service/maintenance conflicts",
      ],
      tech: ["Petri nets", "Modelling", "Simulation"],
      links: [
        { label: "Report", url: "projects/petri-net/report.pdf" },
        { label: "Diagram", url: "projects/petri-net/model.png" },
      ],
    },
    {
      id: "cad",
      title: "Customer Analysis Dashboard",
      subtitle: "Data insights for small businesses",
      context: "Personal project",
      categories: ["ai"],
      image: "assets/images/CAD_image.png",
      summary:
        "A Python and SQL application where employees log in to filter customer data, answer complaints from a client-facing app and analyse customer behaviour.",
      tech: ["Python", "SQL"],
      links: [{ label: "Code", url: "https://github.com/JMJJ-projects/Customer-Analysis-Dashboard" }],
    },
    {
      id: "wikicomptine",
      title: "Wikicomptine",
      subtitle: "Client–server document store in C",
      context: "Licence project",
      categories: ["systems"],
      image: "assets/images/Server_image.png",
      summary:
        "A C server that stores documents centrally while many clients read and edit them in real time, scaled with semaphores.",
      tech: ["C", "Sockets", "Semaphores"],
      links: [{ label: "Code", url: "https://github.com/JMJJ-projects/Wikicomptine" }],
    },
  ],

  hardware: [
    {
      name: "HP EliteBook 8440p", image: "assets/images/HP_Elitebook.jpg",
      specs: ["Intel Core i7-620M", "6 GB RAM", "256 GB SSD", "Windows 11"],
    },
    {
      name: "Dell Latitude E5430", image: "assets/images/Dell_Latitude3.jpg",
      specs: ["Intel Core i5-3340M", "8 GB RAM", "512 GB SSD", "Windows 11"],
    },
    {
      name: "HP Envy x360 13", image: "assets/images/HP_ENVYx360.jpg",
      specs: ["AMD Ryzen 7 4700U", "16 GB RAM", "512 GB NVMe", "Windows 11 + Ubuntu"],
    },
    {
      name: "Acer Nitro 5", image: "assets/images/Acer_Nitro15.jpg",
      specs: ["Intel Core i5-11400H", "16 GB RAM", "RTX 3050", "Windows 11 + Ubuntu"],
    },
  ],
};
