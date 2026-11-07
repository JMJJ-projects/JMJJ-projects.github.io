// All portfolio content lives here. To add a project, copy one object and edit it.
// categories: security | ai | systems | research | web
window.PORTFOLIO = {
  status: "Open to 6-month internships from January 2027 · AI, security, software",

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
      id: "cve-triage",
      featured: true,
      isNew: true,
      title: "CVE triage agent",
      subtitle: "LLM agent for vulnerability triage",
      year: "Nov 2026",
      context: "Personal project · solo",
      categories: ["security", "ai"],
      image: "assets/images/projects/cve-triage.jpg",
      summary:
        "A LangGraph agent that takes a CVE ID, a vulnerability description or a code snippet and returns a structured triage decision (severity, route, advisory fix), stored in SQLite. NVD data beats LLM guesses, untrusted input is never executed, and it runs fully offline with no API key.",
      highlights: [
        "Graph pipeline: classify input → enrich from NVD (cache, live API, bundled records) → LLM extraction → route to alert & patch, human review or archive",
        "For a CVE ID, NVD decides and the model is skipped. A CVE mentioned in text can raise severity but never lower it, which blocks a prompt-injection trick",
        "Fail-safe by design: invalid model output, network errors and low confidence end in human review, never in a wrong archive",
        "Evaluated on 35 labelled items, including injection attempts: 80% routing accuracy (100% for CVE IDs), reported honestly per slice. CI on Python 3.11–3.13",
      ],
      tech: ["Python", "LangGraph", "LangChain", "SQLite", "NVD API", "pytest"],
      links: [{ label: "Code", url: "https://github.com/JMJJ-projects/cve-triage-agent" }],
    },
    {
      id: "stockagecloud",
      featured: true,
      title: "StockageCloud",
      subtitle: "Encrypted personal cloud storage",
      year: "2025–26",
      context: "Personal project · solo",
      categories: ["security", "web"],
      image: "assets/images/projects/stockagecloud.jpg",
      summary:
        "A self-hostable file storage web app where every file is encrypted at rest with AES-256-GCM, checked for tampering on every download and shared only through expiring, revocable links.",
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
      image: "assets/images/projects/ter-poster.jpg",
      portrait: true,
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
        { label: "Poster (FR)", url: "projects/ter/poster.pdf" },
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
      id: "siem",
      title: "AI-assisted SIEM dashboard",
      subtitle: "Work in progress",
      context: "Personal project",
      categories: ["security", "ai"],
      image: null,
      summary:
        "Integrating a fine-tuned model into a SIEM dashboard to help with log analysis and threat detection, by spotting patterns and anomalies that rule-based systems miss.",
      tech: ["Python", "LLMs", "SIEM"],
      links: [],
    },
    {
      id: "struggle",
      title: "STRUGGLE",
      subtitle: "Browser game + manga wiki",
      context: "Personal project",
      categories: ["web"],
      image: "assets/images/Struggle.png",
      summary:
        "A Chrome-dinosaur-style runner fused with a wiki about the manga Berserk. Your score unlocks more of the wiki. Works on desktop and mobile.",
      tech: ["JavaScript", "HTML/CSS", "PHP"],
      links: [{ label: "Play", url: "Struggle/struggle.html" }],
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
    {
      id: "knapsack",
      title: "Knapsack algorithms",
      subtitle: "Comparing exact and greedy solutions",
      context: "Licence project",
      categories: ["systems"],
      image: "assets/images/Knapsack_image.png",
      summary:
        "Implements and benchmarks four approaches to the 0/1 knapsack problem (classic DP, DP on minimum weight, DP on value, greedy) and plots their performance.",
      tech: ["C", "Dynamic programming"],
      links: [{ label: "Code", url: "https://github.com/JMJJ-projects/Optimising-Algorithms-For-The-Knapsack-Problem" }],
    },
    {
      id: "tower",
      title: "2x2x4 Tower Cube simulator",
      subtitle: "Puzzle simulator and solver",
      context: "Personal project",
      categories: ["systems"],
      image: "assets/images/Tower_image.png",
      summary:
        "A C simulator for the 2x2x4 Tower Cube puzzle with solving algorithms, using a compact representation of the cube's transformations.",
      tech: ["C", "Algorithms"],
      links: [{ label: "Code", url: "https://github.com/JMJJ-projects/2x2x4-Tower-Cube-Simulator" }],
    },
  ],

  hardware: [
    {
      name: "HP EliteBook 8440p", available: true, price: "€250", image: "assets/images/HP_Elitebook.jpg",
      specs: ["Intel Core i7-620M", "6 GB RAM", "256 GB SSD", '14" 1366×768', "Windows 11 + Office"], condition: "Good",
    },
    {
      name: "Dell Latitude E5430", available: true, price: "€350", image: "assets/images/Dell_Latitude3.jpg",
      specs: ["Intel Core i5-3340M", "8 GB RAM", "512 GB SSD", '14.1" 1600×900', "Windows 11 + Office"], condition: "Excellent",
    },
    {
      name: "Dell Latitude E5430", available: true, price: "€300", image: "assets/images/Dell_Latitude2.jpg",
      specs: ["Intel Core i5-3340M", "8 GB RAM", "256 GB SSD", '14.1" 1600×900', "Windows 11 + Office"], condition: "Excellent",
    },
    {
      name: "HP Envy x360 13", available: false, image: "assets/images/HP_ENVYx360.jpg",
      specs: ["AMD Ryzen 7 4700U", "16 GB RAM", "512 GB NVMe", "Touchscreen", "Windows 11 + Ubuntu"],
    },
    {
      name: "Acer Nitro 5", available: false, image: "assets/images/Acer_Nitro15.jpg",
      specs: ["Intel Core i5-11400H", "16 GB RAM", "RTX 3050", '15.6" FHD IPS', "Windows 11 + Ubuntu"],
    },
    {
      name: "Dell Latitude E5430", available: false, image: "assets/images/Dell_Latitude1.jpg",
      specs: ["Intel Core i5-3340M", "4 GB RAM", "256 GB SSD", "Windows 11 + Office"],
    },
  ],
};
