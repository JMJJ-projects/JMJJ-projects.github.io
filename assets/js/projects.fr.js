// French versions of the texts in projects.js, keyed by project id.
// Any field missing here falls back to the English text.
window.PORTFOLIO_FR = {
  status: "Disponible pour un stage de 6 mois à partir de février 2027 · IA, sécurité, logiciel",

  categories: {
    all: "Tous",
    security: "Sécurité & cloud",
    ai: "IA & données",
    systems: "Systèmes & algorithmes",
    research: "Recherche & modélisation",
    web: "Web & jeux",
  },

  // Button labels on project links
  links: {
    "Code": "Code",
    "Live demo": "Démo en ligne",
    "Slides (FR)": "Diapositives",
    "Notebook": "Notebook",
    "Report": "Rapport",
    "Diagram": "Schéma",
    "Play": "Jouer",
    "Poster": "Poster",
    "Benchmark results": "Résultats du benchmark",
    "Demo PR": "PR de démo",
    "Evaluation": "Évaluation",
    "Results": "Résultats",
    "Design notes": "Notes de conception",
  },

  projects: {
    "sim-agent": {
      title: "Agent de simulation",
      subtitle: "Qu'est-ce qui aide vraiment un petit modèle local ?",
      context: "Projet personnel · seul",
      summary:
        "On pose une question sur une simulation de transport de particules en langage naturel : l'agent écrit le code Python, l'exécute dans une sandbox Docker verrouillée, le corrige quand il échoue, puis vérifie la réponse face à la demande et à une trace enregistrée par le simulateur lui-même. Fonctionne avec de petits modèles locaux (4 Go de VRAM) ou hébergés, et s'utilise comme serveur MCP.",
      highlights: [
        "Évalué sur 60 tâches, dont 24 mises de côté et figées avant l'écriture du vérificateur, sur plusieurs graines, avec intervalles de confiance à 95 % et tests appariés",
        "Le vérificateur est précis (35 mauvaises réponses détectées sur les tâches réservées, 1 fausse alerte), mais le modèle 3B arrive rarement à corriger ce qu'il signale : +3,3 points au final",
        "La boucle de correction apporte 11 à 17 points ; un modèle 7B tournant à moitié sur le CPU dépasse le 3B de 17 à 22 points ; Q8 contre Q4 : aucune différence mesurable ; une règle de prompt que j'avais ajoutée a causé de faux refus, elle a donc été retirée",
        "Sandbox Docker sans réseau, en lecture seule et avec limites de ressources, derrière une liste blanche statique, chacune prouvée par des tests ; 727 tests et intégration continue",
      ],
    },
    "cve-triage": {
      subtitle: "Que faut-il corriger en premier ?",
      context: "Projet personnel · seul",
      summary:
        "Analyse un identifiant CVE, un rapport de vulnérabilité, un extrait de code ou tout un fichier de dépendances, et classe chaque problème par priorité : CISA KEV (exploitée), EPSS (probabilité d'exploitation) et sévérité CVSS, combinés par des règles fixes, jamais par le LLM. Fonctionne hors ligne, en CLI, comme serveur MCP, et comme GitHub Action qui commente les pull requests.",
      highlights: [
        "Analyse requirements.txt, les lockfiles npm et les SBOM via OSV.dev ; les conseils de mise à jour viennent uniquement des versions corrigées d'OSV, jamais du modèle",
        "Évalué sur 300 CVE récentes face à des baselines triviales : gpt-oss-120b tombe à un niveau de sévérité près dans 86 % des cas, un modèle local 3B dans 69 %, erreurs présentées sans fard",
        "Constat : seules 3 de ces 300 CVE récentes atteignent un EPSS de 0,10 ; pour les vulnérabilités récentes, la priorité vient donc de KEV et de la sévérité",
        "Résiste à l'injection de prompt, n'exécute jamais le code analysé ; 665 tests, intégration continue, et une vraie PR de démonstration montrant le commentaire de l'Action",
      ],
    },
    stockagecloud: {
      subtitle: "Stockage cloud personnel chiffré",
      context: "Projet d'équipe (3) · renforcé seul en 2026",
      summary:
        "Une application web de stockage de fichiers auto-hébergeable, créée en 2025 avec Aliou Dia et Abdoulaye Haidara. En 2026, je l'ai retravaillée seul : chaque fichier est désormais chiffré au repos en AES-256-GCM, vérifié contre toute altération à chaque téléchargement, et partagé uniquement via des liens révocables qui expirent.",
      highlights: [
        "Chiffrement par enveloppe : une clé aléatoire par fichier, elle-même chiffrée par une clé maître gardée hors de la base de données",
        "Jetons CSRF, blocage après tentatives de connexion échouées, sessions renforcées et Content-Security-Policy",
        "Corbeille avec conservation de 30 jours, quotas de stockage, liens de partage avec compteur de téléchargements, historique d'activité",
        "25 tests automatisés (authentification, IDOR, altération, expiration…), intégration continue GitHub Actions et image Docker",
      ],
    },
    ctl: {
      title: "Model checking CTL à la volée",
      subtitle: "Projet de recherche en vérification formelle",
      context: "TER de M1 · équipe de 3",
      summary:
        "Un algorithme qui vérifie des propriétés de logique temporelle (CTL) sur des structures de Kripke acycliques en générant les états à la demande, ce qui lui permet de s'arrêter dès que la réponse est connue au lieu de construire tout l'espace d'états.",
      highlights: [
        "Formalisation de la classe de modèles (structures acycliques, auto-boucles sur les états puits) et preuve que la sémantique CTL est préservée",
        "Algorithmes à la volée pour EX, EG, E[φ U ψ] et les formules imbriquées, avec mémoïsation des résultats des sous-formules",
        "Preuve de simplifications comme EF(EG φ) et EG(EF φ) dans cette classe, avec contre-exemples quand elles ne tiennent pas",
        "Implémentation en C avec chargement paresseux des états et cache, qui confirme les résultats théoriques",
      ],
      tech: ["C", "CTL", "Model checking", "Méthodes formelles"],
    },
    kaggle: {
      title: "Prédiction de notes d'examen",
      subtitle: "Compétition Kaggle · top ~15 %",
      context: "M1 Apprentissage automatique · équipe de 4",
      summary:
        "Un ensemble par stacking à deux niveaux sur 630 000 lignes. RMSE de 8,624 sur le classement public, environ 650e sur près de 4 300 équipes.",
      highlights: [
        "Analyse exploratoire : les heures d'étude (r = 0,76) et l'assiduité dominent, l'âge et le genre n'apportent rien",
        "Variables cycliques, ratios et interactions, plus un target encoding croisé sans fuite de données",
        "Cinq modèles de niveau 1 (HGBR, XGBoost, Ridge, LinearSVR, RealMLP) sur deux vues des données, combinés par une Ridge",
        "Étude d'ablation : RMSE en validation croisée de 8,781 à 8,658",
      ],
    },
    compiler: {
      title: "Compilateur Mini-JS et machine virtuelle",
      subtitle: "Compilateur JavaCC vers une machine à pile",
      context: "Licence · cours de compilation · binôme",
      summary:
        "Compile un sous-ensemble de JavaScript en assembleur pour une machine virtuelle à pile, avec évaluation des constantes à la compilation, et un interpréteur qui exécute le résultat.",
      highlights: [
        "Une règle de grammaire par niveau de priorité. Chaque nœud de l'AST connaît sa taille, ce qui donne les sauts des if/else, do-while et &&",
        "Évaluation des constantes et suppression des branches mortes",
        "Une machine virtuelle avec un mode trace pas à pas",
        "Un historique git documenté commit par commit (noté), et des programmes d'exemple testés en intégration continue",
      ],
    },
    edumind: {
      subtitle: "Plateforme de gestion des notes et examens",
      context: "Licence · génie logiciel · équipe de 5",
      summary:
        "Analyse des besoins, modélisation UML et planification Scrum d'un système universitaire de gestion des notes, avec des maquettes cliquables pour étudiants, enseignants et administrateurs.",
      highlights: [
        "Diagrammes de cas d'utilisation, de classes, de séquence, d'activités et d'états. 4 sprints avec revues et un diagramme de Gantt",
        "Espace étudiant : examen en ligne annulé en cas de changement d'onglet, bulletin PDF avec graphique, messagerie",
        "Tableau de bord enseignant et gestion des comptes par l'administrateur",
      ],
    },
    clustering: {
      title: "Clustering de données de capteurs IoT",
      subtitle: "Apprentissage non supervisé sur des relevés de détecteurs de fumée",
      context: "M1 Analyse de données · équipe de 3",
      summary:
        "K-means, clustering hiérarchique et spectral sur 62 630 relevés de détecteurs de fumée, comparés par analyse de silhouette et par des métriques externes (ARI, homogénéité, V-mesure).",
      highlights: [
        "Prétraitement, normalisation, et analyse de silhouette de 2 à 10 clusters pour chaque méthode",
        "Le clustering spectral sépare bien mieux les relevés avec et sans alarme que le clustering hiérarchique",
        "Questions bonus : quels capteurs expliquent la séparation, et les clusters sont-ils stables d'une graine aléatoire à l'autre ?",
      ],
    },
    petri: {
      title: "Réseau de Petri d'un restaurant",
      subtitle: "Modèle de système à événements discrets",
      context: "M1 Systèmes à événements discrets · seul",
      summary:
        "Un réseau de Petri d'un fast-food : caissiers, cuisiniers et tables en nombre limité, clients impatients, sur place ou à emporter, et une chaîne d'approvisionnement en stock et condiments.",
      highlights: [
        "15 places et 15 transitions organisées en sous-réseaux service, maintenance et approvisionnement",
        "Des arcs pondérés modélisent l'impatience dans la file, les livraisons groupées et 1 unité de stock → 5 condiments",
        "Analyse du caractère borné, de la conservation des ressources et des conflits entre service et maintenance",
      ],
      tech: ["Réseaux de Petri", "Modélisation", "Simulation"],
    },
    cad: {
      title: "Tableau de bord d'analyse clients",
      subtitle: "Analyse de données pour petites entreprises",
      context: "Projet personnel",
      summary:
        "Une application Python et SQL où les employés se connectent pour filtrer les données clients, répondre aux réclamations d'une application côté client et analyser le comportement des clients.",
    },
    wikicomptine: {
      subtitle: "Stockage de documents client-serveur en C",
      context: "Projet de Licence",
      summary:
        "Un serveur en C qui centralise des documents pendant que de nombreux clients les lisent et les modifient en temps réel, avec des sémaphores pour passer à l'échelle.",
      tech: ["C", "Sockets", "Sémaphores"],
    },
  },

  // Hardware: word-level replacements for specs and conditions
  hardware: {
    "Good": "Bon",
    "Excellent": "Excellent",
    "Touchscreen": "Écran tactile",
    "Windows 11 + Office": "Windows 11 + Office",
    "Windows 11 + Ubuntu": "Windows 11 + Ubuntu",
    "6 GB RAM": "6 Go de RAM",
    "8 GB RAM": "8 Go de RAM",
    "4 GB RAM": "4 Go de RAM",
    "16 GB RAM": "16 Go de RAM",
    "256 GB SSD": "SSD 256 Go",
    "512 GB SSD": "SSD 512 Go",
    "512 GB NVMe": "NVMe 512 Go",
  },
};
