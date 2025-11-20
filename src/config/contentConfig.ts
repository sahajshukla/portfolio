/**
 * Content Configuration for Sahaj Shukla Portfolio
 *
 * This file contains all editable content for the portfolio website.
 * Edit this file to update text, links, and other content throughout the site.
 *
 * To connect to a CMS in the future:
 * 1. Create an API endpoint that returns data matching this structure
 * 2. Update the useContent hook to fetch from the API instead of importing this file
 * 3. Add proper TypeScript types for validation
 * 4. Implement caching strategy (SWR, React Query, etc.)
 */

export interface ContentConfig {
  personal: {
    name: string;
    tagline: string;
    location: string;
    email: string;
    phone: string;
    visaStatus: string;
    profileImage?: string;
  };

  social: {
    linkedin: string;
    github: string;
    medium: string;
    kaggle: string;
  };

  hero: {
    headline: string;
    subheadline: string;
    rotatingWords: string[];
    ctas: Array<{
      text: string;
      href: string;
      variant: 'primary' | 'secondary';
    }>;
  };

  about: {
    title: string;
    paragraphs: string[];
    highlights: string[];
  };

  experience: Array<{
    id: string;
    title: string;
    company: string;
    location: string;
    period: string;
    description: string;
    achievements: string[];
    technologies: string[];
  }>;

  skills: {
    title: string;
    categories: Array<{
      name: string;
      icon?: string;
      skills: string[];
    }>;
  };

  projects: Array<{
    id: string;
    title: string;
    tagline: string;
    description: string;
    fullDescription: string[];
    technologies: string[];
    highlights: string[];
    githubUrl?: string;
    liveUrl?: string;
    featured: boolean;
    category: string;
  }>;

  articles: Array<{
    id: string;
    title: string;
    description: string;
    url: string;
    publishedDate: string;
    readTime?: string;
  }>;

  openToRoles: {
    title: string;
    description: string;
    roles: string[];
    valueProps: string[];
    ctaText: string;
  };

  contact: {
    title: string;
    description: string;
    formFields: {
      name: { label: string; placeholder: string };
      email: { label: string; placeholder: string };
      message: { label: string; placeholder: string };
    };
  };
}

export const contentConfig: ContentConfig = {
  personal: {
    name: "Sahaj Shukla",
    tagline: "Business Intelligence · Data Engineering · Audit Analytics · AI & ML",
    location: "New Jersey, USA",
    email: "sahajshukla@gmail.com",
    phone: "1-201-936-5159",
    visaStatus: "On H-1B • Open to US-based opportunities and sponsorship",
  },

  social: {
    linkedin: "https://www.linkedin.com/in/sahaj-shukla/",
    github: "https://github.com/sahajshukla",
    medium: "https://medium.com/@sahajshukla",
    kaggle: "https://www.kaggle.com/sahajshukla",
  },

  hero: {
    headline: "Building intelligent systems where business, data, and AI converge",
    subheadline: "I bridge audit and finance domain expertise with deep technical skills in AI, data engineering, and backend systems—delivering production-grade solutions that drive strategic impact.",
    rotatingWords: ["Business Intelligence", "Data Engineering", "Audit Analytics", "AI & ML", "Backend Systems", "Technical Leadership"],
    ctas: [
      { text: "View Resume", href: "/resume.pdf", variant: "primary" },
      { text: "Contact Me", href: "#contact", variant: "secondary" },
    ],
  },

  about: {
    title: "About Me",
    paragraphs: [
      "I'm a technical professional at the intersection of finance, audit, data engineering, and AI. My career began in technology audit at BlackRock, where I tested IT controls and automated testing workflows. This foundation in audit gave me a deep understanding of risk, compliance, and how enterprises manage critical systems.",

      "At Nomura, I expanded into finance audit and analytics, working with massive datasets ($466B+ in journal entries) to identify fraud patterns and operational risks. I built dashboards that gave leadership real-time visibility into audit operations and helped drive remediation strategies.",

      "Most recently at BDIPlus, I transitioned into pure backend and data engineering, building production-grade systems for LLM integration, multi-database orchestration, and scalable data pipelines. I architected contact extraction systems using Spark + Databricks, designed Redis caching layers, and deployed AI-powered solutions across Azure and cloud infrastructure.",

      "Throughout this journey, I've also built production systems independently—most notably Vantage AuditOS, a zero-trust AI audit platform that automates control testing, evidence management, and SQL-driven analysis. I'm now seeking senior technical roles in Business Intelligence, Audit Analytics, or Data Engineering leadership where I can leverage both my domain expertise and engineering depth to drive strategic impact."
    ],
    highlights: [
      "5+ years across major financial and technology firms (BlackRock, Nomura, BDIPlus)",
      "Deep expertise in audit/finance domain + strong technical foundation in AI, data engineering, and backend systems",
      "Built production-ready AI audit platform (Vantage) from architecture to deployment",
      "Proven ability to bridge business stakeholders and technical teams to deliver measurable results"
    ],
  },

  experience: [
    {
      id: "bdiplus",
      title: "Software Engineer II",
      company: "BDIPlus",
      location: "New York, NY",
      period: "Jan 2025 - Present",
      description: "Building production-grade backend systems for data engineering, LLM integration, and enterprise data orchestration",
      achievements: [
        "Architected automated contact extraction pipeline using Spark + Databricks with Azure OpenAI integration, achieving 63% extraction rate across warehouse APIs and Blob Storage",
        "Built proof-of-concept database backend for ChatCDP platform, deployed for Morgan Stanley client demos",
        "Engineered LLM prompt orchestration system using Azure OpenAI + Gemma-3 8B across multi-environment deployments",
        "Refactored monolithic Python/Spark workflows into scalable C# dependency injection-based architecture, improving maintainability and testability",
        "Designed and implemented Redis JSON caching layer for large data objects, reducing query latency by 40%",
        "Integrated multi-database systems (Snowflake, PostgreSQL, SQL Server) with unified data access layer"
      ],
      technologies: [
        "Python",
        "C#",
        "Spark/Databricks",
        "Azure OpenAI",
        "Redis",
        "Snowflake",
        "PostgreSQL",
        "SQL Server"
      ],
    },
    {
      id: "nomura",
      title: "Associate - Finance Audit & Data Analytics",
      company: "Nomura",
      location: "New York, NY",
      period: "Apr 2024 - Jan 2025",
      description: "Led analytics for finance audits, building fraud detection systems and operational risk dashboards",
      achievements: [
        "Conducted fraud detection analytics across 160,000+ journal entries representing $466B in financial activity, identifying high-risk patterns for audit follow-up",
        "Designed and deployed 5-year operational risk dashboard for Global Finance Audit team, providing leadership with real-time visibility into audit metrics",
        "Supported 3 major Finance Audits: Financial Reporting, Collateral Management, and Dodd-Frank Compliance",
        "Performed root cause analysis on audit findings, identifying top remediation priorities for executive leadership",
        "Built automated exception testing workflows using Python and SQL, reducing manual review time by 35%"
      ],
      technologies: [
        "Python",
        "SQL",
        "Power BI",
        "Excel (Advanced)",
        "Statistical Analysis"
      ],
    },
    {
      id: "blackrock",
      title: "Analyst - Technology Audit",
      company: "BlackRock",
      location: "New York, NY",
      period: "Aug 2021 - Jan 2024",
      description: "Evaluated IT controls and built automation tools for SOX/ITGC compliance testing",
      achievements: [
        "Designed and deployed Python-based automation for IT control testing, reducing testing time by ~6 hours per control and improving audit efficiency",
        "Built real-time monitoring dashboard tracking ~200 concurrent audits, providing visibility into audit progress and resource allocation",
        "Tested design and operating effectiveness of 65 IT controls across 9 audit engagements covering applications, infrastructure, and cybersecurity",
        "Co-authored 4 formal audit reports for senior management and external auditors, documenting control deficiencies and remediation plans",
        "Identified and remediated 7 critical control issues, working with IT teams to implement fixes and validate effectiveness",
        "Developed business overview analytics using AUM and risk data to contextualize audit findings for stakeholders"
      ],
      technologies: [
        "Python",
        "SQL",
        "Tableau",
        "Excel",
        "IT Audit Tools (ACL, IDEA)"
      ],
    },
    {
      id: "elitefit",
      title: "Backend Developer",
      company: "EliteFit",
      location: "Singapore (Remote)",
      period: "Aug 2020 - Mar 2021",
      description: "Built ML-powered fitness form correction system and backend API infrastructure",
      achievements: [
        "Developed REST API endpoints connecting React frontend to Python ML backend for real-time pose analysis",
        "Built pose-scoring ML system for fitness form correction achieving 93% accuracy vs. baseline models, helping users improve workout technique",
        "Collaborated with cross-country teams (Singapore, US) for testing, deployment, and feature iteration",
        "Deployed ML model assets and user data to AWS S3 and DynamoDB for scalable cloud infrastructure"
      ],
      technologies: [
        "Python",
        "Flask",
        "TensorFlow",
        "AWS (S3, DynamoDB)",
        "REST APIs"
      ],
    },
    {
      id: "tcr",
      title: "Business Intelligence Analyst Intern",
      company: "Technical Consulting & Research Inc.",
      location: "Newark, NJ",
      period: "Mar 2020 - Aug 2020",
      description: "Built real-time analytics pipeline and automated reporting infrastructure",
      achievements: [
        "Designed and deployed analytics pipeline using REST APIs + Kafka for real-time data ingestion and processing",
        "Built text classification model with 88% accuracy for sentiment analysis and trend detection from customer feedback",
        "Automated reporting workflows using AWS Lambda + Google Data Studio, reducing manual effort and improving net profit visibility by 57%",
        "Created executive dashboards providing business leaders with actionable insights into operational metrics"
      ],
      technologies: [
        "Python",
        "Kafka",
        "AWS Lambda",
        "Google Data Studio",
        "NLP"
      ],
    },
  ],

  skills: {
    title: "Skills & Expertise",
    categories: [
      {
        name: "Business Intelligence & Analytics",
        skills: [
          "Business Intelligence Strategy",
          "Financial Analytics & Modeling",
          "Risk Analytics & Fraud Detection",
          "Operational Analytics & KPI Design",
          "Statistical Analysis & Hypothesis Testing",
          "Data Storytelling & Executive Reporting",
          "Power BI / Tableau / Looker",
          "Advanced SQL (Window Functions, CTEs, Optimization)"
        ]
      },
      {
        name: "Audit, Risk & Compliance",
        skills: [
          "Technology Audit (SOX/ITGC)",
          "SOX Compliance & Control Testing",
          "Risk Assessment & Management",
          "GRC Frameworks (COSO, NIST, SOC 2)",
          "Fraud & Anomaly Detection",
          "Audit Data Engineering (ETL Pipelines)",
          "Evidence Management & Documentation",
          "Financial Controls & Journal Entry Testing"
        ]
      },
      {
        name: "Data Engineering & Architecture",
        skills: [
          "Python (Pandas, NumPy, PySpark)",
          "SQL (PostgreSQL, SQL Server, Snowflake)",
          "Spark / Databricks",
          "ETL Pipeline Design & Orchestration",
          "Data Warehousing & Modeling",
          "Redis Caching & Performance Optimization",
          "Kafka / Real-time Streaming",
          "Database Administration (PostgreSQL, MongoDB)"
        ]
      },
      {
        name: "AI & Machine Learning",
        skills: [
          "LLM Integration (OpenAI API, Azure OpenAI)",
          "Prompt Engineering & Fine-tuning",
          "PyTorch / TensorFlow / Keras",
          "NLP (NLTK, Transformers)",
          "Computer Vision (CNN, Image Processing)",
          "ML Model Development & Deployment",
          "Feature Engineering & Model Optimization",
          "Self-hosted LLMs (Ollama, LlamaIndex)"
        ]
      },
      {
        name: "Backend Engineering & DevOps",
        skills: [
          "FastAPI / Flask (Python)",
          "C# / .NET Core",
          "REST API Design & Development",
          "Docker & Kubernetes",
          "Terraform / Infrastructure as Code",
          "CI/CD (GitLab, Azure DevOps)",
          "Microservices Architecture",
          "AWS (S3, Lambda, EC2, EKS)",
          "Azure (Data Factory, Blob Storage, Functions)"
        ]
      },
      {
        name: "Security & Governance",
        skills: [
          "Encryption (AES-256, RSA)",
          "Zero-Trust Architecture",
          "JWT Authentication & Authorization",
          "Access Control & IAM",
          "Audit Logging & Monitoring",
          "Secure API Design",
          "Data Privacy & Compliance"
        ]
      }
    ]
  },

  projects: [
    // FEATURED PROJECT
    {
      id: "vantage",
      title: "Vantage AuditOS",
      tagline: "AI-Powered, Zero-Trust Audit Automation Platform",
      description: "A production-ready audit management platform combining AI-driven SQL generation, secure evidence management, and real-time control testing workflows.",
      fullDescription: [
        "Vantage AuditOS is a full-stack audit automation platform I architected and built to solve real-world challenges in technology and finance audit. The platform is production-ready and demonstrates enterprise-grade engineering practices.",
        "The system uses a FastAPI microservices backend, Next.js frontend, and a self-hosted LLM (OpenSQL-7B) to enable auditors to perform complex analyses through natural language queries. This eliminates the need for auditors to write SQL manually while maintaining full transparency and auditability.",
        "Security is built into the foundation: per-audit AES-256 encryption with isolated key management, Postgres-based relational data model for audits/controls/workpapers/findings, and complete workflow automation for evidence ingestion, control testing, workpaper generation, and multi-level approval routing.",
        "The platform is designed with zero-trust principles—every API call is authenticated, all data at rest is encrypted, and comprehensive audit trails are maintained for compliance. Vantage represents the convergence of my audit domain expertise and technical engineering skills."
      ],
      technologies: [
        "FastAPI",
        "Next.js",
        "PostgreSQL",
        "OpenSQL-7B (LLM)",
        "Docker",
        "AES-256 Encryption",
        "JWT Authentication",
        "Terraform"
      ],
      highlights: [
        "Natural language to SQL generation for audit queries using self-hosted LLM",
        "Per-audit encryption with isolated key management for multi-tenant security",
        "Evidence upload pipeline with automated validation and secure storage",
        "Automated control testing engine with exception detection and risk scoring",
        "Workpaper generation system with approval workflows and version control",
        "Real-time collaboration features with comprehensive audit trail logging"
      ],
      githubUrl: "https://vantageauditos.com",
      featured: true,
      category: "production"
    },

    // ML/AI EXPERIMENTS
    {
      id: "style-transfer",
      title: "Neural Style Transfer (PyTorch)",
      tagline: "Deep learning image transformation using Gram matrices",
      description: "Implementation of neural style transfer using PyTorch, applying artistic styles to photographs through learned feature representations.",
      fullDescription: [
        "Built a neural style transfer system using PyTorch that applies the artistic style of one image (e.g., Van Gogh painting) to the content of another (e.g., portrait photo).",
        "Implemented Gram matrix computations for style representation and optimization-based approach for iterative image refinement."
      ],
      technologies: ["Python", "PyTorch", "Computer Vision", "Deep Learning"],
      highlights: [
        "Learned and implemented core deep learning concepts (feature extraction, optimization)",
        "Successfully generated Van Gogh-styled portrait as personalized gift",
        "Demonstrates understanding of CNN architectures and transfer learning"
      ],
      githubUrl: "https://github.com/sahajshukla/style-transfer",
      featured: false,
      category: "ml-ai"
    },
    {
      id: "fifa-recommendation",
      title: "FIFA Player Recommendation System",
      tagline: "ML-powered team building with budget constraints",
      description: "Built recommendation system using PCA and kNN clustering to help fantasy football managers build optimal teams within budget constraints.",
      fullDescription: [
        "Applied dimensionality reduction (PCA, Kernel PCA) and clustering (kNN) to FIFA player dataset to identify optimal player combinations.",
        "Incorporated budget constraints and position requirements to provide actionable recommendations for team building."
      ],
      technologies: ["Python", "Scikit-learn", "PCA", "kNN", "Data Analysis"],
      highlights: [
        "Demonstrates applied ML for optimization problems",
        "Shows understanding of dimensionality reduction and clustering techniques",
        "Real-world application of constrained optimization"
      ],
      githubUrl: "https://github.com/sahajshukla/kaggle-FIFA-recommendation-system",
      featured: false,
      category: "ml-ai"
    },
    {
      id: "baby-cry",
      title: "Baby Cry Predictor",
      tagline: "Audio classification using sound wave analysis",
      description: "Multi-class classifier that analyzes baby cry audio to predict cause (hunger, discomfort, tiredness, etc.) using sound wave features.",
      fullDescription: [
        "Built 5-class audio classifier using feature engineering on sound waves to predict reasons for baby crying.",
        "Implemented audio preprocessing pipeline and trained classification models on audio features."
      ],
      technologies: ["Python", "Audio Processing", "Machine Learning", "Feature Engineering"],
      highlights: [
        "Shows expertise in audio signal processing and feature extraction",
        "Demonstrates ability to work with non-traditional data types"
      ],
      githubUrl: "https://github.com/sahajshukla/Baby_cry_predictor",
      featured: false,
      category: "ml-ai"
    },

    // FULL-STACK ENGINEERING
    {
      id: "weather-app",
      title: "Weather App - AWS EKS Kubernetes Deployment",
      tagline: "Cloud-native full-stack application on AWS",
      description: "Three-tier React/Node.js/MongoDB application deployed on AWS EKS with Kubernetes orchestration, demonstrating cloud-native architecture skills.",
      fullDescription: [
        "Built and deployed a complete full-stack weather application on AWS Elastic Kubernetes Service (EKS).",
        "Implemented containerization with Docker, orchestration with Kubernetes, and managed secrets/config for production deployment."
      ],
      technologies: ["React", "Node.js", "MongoDB", "AWS EKS", "Kubernetes", "Docker"],
      highlights: [
        "Demonstrates end-to-end cloud deployment skills",
        "Shows understanding of containerization and orchestration",
        "Production-grade infrastructure management"
      ],
      githubUrl: "https://github.com/sahajshukla/Weather-App",
      featured: false,
      category: "full-stack"
    },
    {
      id: "covid-dashboard",
      title: "COVID-19 Statistics Dashboard",
      tagline: "Real-time pandemic tracking dashboard",
      description: "Interactive jQuery-based dashboard providing worldometer-style COVID-19 statistics with real-time updates and visualizations.",
      fullDescription: [
        "Built real-time COVID-19 statistics dashboard during the pandemic to track global and regional case data.",
        "Implemented data fetching, visualization, and responsive design for quick public access to pandemic information."
      ],
      technologies: ["JavaScript", "jQuery", "HTML/CSS", "Data Visualization"],
      highlights: [
        "Shipped quickly during crisis to provide public value",
        "Demonstrates ability to build practical tools under time pressure"
      ],
      githubUrl: "https://github.com/sahajshukla/covidstatsforus",
      featured: false,
      category: "full-stack"
    },

    // DATA VIZ / ANALYTICS
    {
      id: "racing-lyrics",
      title: "Racing Lyrics - 4.7M Songs Visualization",
      tagline: "Animated language comparison across millions of songs",
      description: "Creative data visualization comparing languages across 4.7 million songs using animated racing-line charts.",
      fullDescription: [
        "Built animated racing-line chart visualization analyzing language trends across 4.7 million songs over time.",
        "Demonstrates creativity in large-scale data storytelling and interactive visualization."
      ],
      technologies: ["Python", "D3.js", "Data Visualization", "Large-scale Data"],
      highlights: [
        "Shows ability to work with large datasets creatively",
        "Demonstrates data storytelling and visualization skills"
      ],
      githubUrl: "https://github.com/sahajshukla/racing-lyrics",
      featured: false,
      category: "data-viz"
    },
    {
      id: "sudoku-solver",
      title: "Sudoku Solver (Backtracking Algorithm)",
      tagline: "Classic algorithms implementation",
      description: "Recursive backtracking algorithm implementation for solving Sudoku puzzles, demonstrating algorithmic thinking and optimization.",
      fullDescription: [
        "Implemented classical backtracking algorithm with pruning for efficient Sudoku puzzle solving.",
        "Demonstrates mastery of recursion, constraint satisfaction, and algorithmic optimization."
      ],
      technologies: ["Python", "Algorithms", "Recursion", "Optimization"],
      highlights: [
        "Shows strong foundation in classical computer science algorithms",
        "Demonstrates problem-solving and optimization skills"
      ],
      githubUrl: "https://github.com/sahajshukla/Sudoku-Solver",
      featured: false,
      category: "data-viz"
    },
  ],

  articles: [
    {
      id: "compression-machines",
      title: "From Measuring Uncertainty to Designing Compression Machines",
      description: "Exploring the deep connections between information theory, entropy, and data compression—how uncertainty measurement leads to optimal encoding schemes. A technical deep-dive into Shannon's information theory and its practical applications.",
      url: "https://medium.com/@sahajshukla/from-measuring-uncertainty-to-designing-compression-machines-f517b636f416",
      publishedDate: "2023",
      readTime: "8 min read",
    },
    {
      id: "central-limit",
      title: "The Limitless Central Limit Theorem",
      description: "A rigorous exploration of one of the most powerful theorems in statistics—why the Central Limit Theorem is the foundation of modern statistical inference and how it enables data analysis at scale.",
      url: "https://medium.com/@sahajshukla/the-limitless-central-limit-theorem-43b1be1c276a",
      publishedDate: "2023",
      readTime: "6 min read",
    },
    {
      id: "coronavirus-stats",
      title: "Understanding the Coronavirus Stats",
      description: "Breaking down COVID-19 statistics with clarity—interpreting case numbers, mortality rates, and the critical importance of understanding statistical context during a global health crisis.",
      url: "https://medium.com/@sahajshukla/understanding-the-coronavirus-stats-99508e398af4",
      publishedDate: "2020",
      readTime: "5 min read",
    },
  ],

  openToRoles: {
    title: "Open to New Opportunities",
    description: "I'm actively seeking senior technical roles where business intelligence, domain expertise, and technical depth converge. I bring 5+ years of experience across audit, data, and engineering—with a proven track record of building production systems and driving measurable business impact.",
    roles: [
      "Senior Data Analyst / Lead Data Analyst",
      "Business Intelligence Manager / Senior BI Analyst",
      "Audit Data Analyst / Audit Data Engineer (Senior level)",
      "Data Engineering Manager / Lead Data Engineer",
      "Technical Project Manager (IC-level, data/analytics focus)",
      "IT Auditor / Technology Auditor (Senior level with technical depth)"
    ],
    valueProps: [
      "5+ years across major financial services and technology firms (BlackRock, Nomura, BDIPlus) with deep audit/finance domain expertise",
      "Strong technical foundation in AI/ML, data engineering, and backend systems—proven ability to architect and deploy production-grade platforms from scratch",
      "Bridge business stakeholders and technical teams effectively—translate complex requirements into scalable solutions that drive strategic impact",
      "Track record of automation and efficiency gains: built systems that save hours per control test, reduce manual effort by 35-60%, and improve operational visibility"
    ],
    ctaText: "Let's Connect"
  },

  contact: {
    title: "Get In Touch",
    description: "I'm always open to discussing new opportunities, collaborations, or just chatting about data, audit, and AI. Feel free to reach out!",
    formFields: {
      name: {
        label: "Name",
        placeholder: "Your name",
      },
      email: {
        label: "Email",
        placeholder: "your.email@example.com",
      },
      message: {
        label: "Message",
        placeholder: "Tell me about the opportunity or what you'd like to discuss...",
      },
    },
  },
};

export default contentConfig;
