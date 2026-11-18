export interface SectionExplanation {
  sectionId: string;
  sectionName: string;
  badge: string;
  greeting: string;
  speech: string;
  keyPoints: string[];
  suggestedAction: string;
}

export interface FAQItem {
  id: string;
  question: string;
  shortLabel: string;
  answer: string;
  targetSection: string;
}

export const ASTRO_SECTION_EXPLANATIONS: Record<string, SectionExplanation> = {
  introduction: {
    sectionId: "introduction",
    sectionName: "Meet Jahnavi",
    badge: "SECTOR 01 // IDENTITY",
    greeting: "Hey there! I'm Astro! 🚀 Welcome to Jahnavi's engineering universe!",
    speech:
      "Hi! I'm Astro, Jahnavi Murthy's personal 3D guide! Jahnavi is an aspiring software engineer with a unique dual foundation in Computer Science and Physics. She builds reliable, high-performance web systems and intelligent tools. Let me show you around!",
    keyPoints: [
      "Dual background: Computer Science & Physics (2022–2026)",
      "Industry Experience: Gainwell Technologies Software Development Apprentice",
      "Specialization: Full-Stack Engineering, Cloud IaC & AI Agentic Systems",
    ],
    suggestedAction: "Scroll down or ask me anything about her work!",
  },
  about: {
    sectionId: "about",
    sectionName: "About Me",
    badge: "SECTOR 02 // CREW MANIFEST",
    greeting: "Here is the person behind the code! 💡",
    speech:
      "Jahnavi combines the analytical rigor of Physics with modern software craftsmanship! Her physics coursework taught her first-principles mathematical reasoning, while computer science gave her the tools to build scalable, human-centered software architectures.",
    keyPoints: [
      "First-principles problem decomposition",
      "Clean, readable, type-safe full-stack code",
      "Automated reproducible cloud environments",
      "Lifelong curiosity across NLP and modern web frameworks",
    ],
    suggestedAction: "Check out her 4 core engineering pillars!",
  },
  journey: {
    sectionId: "journey",
    sectionName: "My Journey",
    badge: "SECTOR 03 // FLIGHT PATH",
    greeting: "Look at this trajectory! Gainwell Technologies & Academic Foundations! 💼",
    speech:
      "From July 2025 to January 2026, Jahnavi served as a Software Development Apprentice at Gainwell Technologies in Bangalore, contributing to agile sprint cycles, full-stack code, and peer reviews. Alongside this, she is earning her Bachelors in Computer Science & Physics (2022–2026)!",
    keyPoints: [
      "Apprentice – Software Development at Gainwell Technologies (July 2025 – January 2026)",
      "Bachelors in Computer Science & Physics (2022–2026)",
      "Enterprise agile workflows, Git collaboration, and clean code standards",
    ],
    suggestedAction: "Click either milestone on the timeline to inspect details!",
  },
  "skills-section": {
    sectionId: "skills-section",
    sectionName: "Programming Skills",
    badge: "SECTOR 04-A // CORE POWER",
    greeting: "12 Verified Programming Superpowers! ⚡",
    speech:
      "Check out her animated proficiency bars! Her strongest language is Java at 90%, followed by Python at 75%, C# at 75%, HTML & CSS at 80%, JavaScript at 70%, Flask at 70%, Git at 70%, SQL at 65%, C at 65%, React at 60%, Machine Learning at 60%, and Data Structures & Algorithms at 55%!",
    keyPoints: [
      "Java: 90% (OOP, multithreading, algorithmic design)",
      "Python: 75% (Data parsing, NLP, ML & microservices)",
      "C#: 75% (Enterprise architecture, ASP.NET MVC, LINQ)",
      "HTML & CSS: 80% | JavaScript: 70% | Flask: 70% | Git: 70%",
    ],
    suggestedAction: "Filter by category above to see her stack!",
  },
  workbench: {
    sectionId: "workbench",
    sectionName: "Engineering Workbench",
    badge: "SECTOR 04-B // TECH BAY",
    greeting: "Welcome to the Engineering Workbench! 🛠️",
    speech:
      "This is her interactive inspection lab. She works with 14 tools across languages (Java, Python, C#, TypeScript), backend frameworks (ASP.NET MVC, Flask, REST APIs), relational databases (SQL), cloud infrastructure (AWS EC2, S3, IAM), and Infrastructure as Code (Terraform)!",
    keyPoints: [
      "14 verified tools and engineering methodologies",
      "Zero-drift cloud provisioning with Terraform & AWS",
      "Full-stack RESTful endpoint design & JSON contracts",
    ],
    suggestedAction: "Click any tool chip to inspect how she applies it!",
  },
  projects: {
    sectionId: "projects",
    sectionName: "Featured Projects",
    badge: "SECTOR 05 // MISSION PAYLOADS",
    greeting: "Woohoo! Her 4 engineered software systems! 🎉",
    speech:
      "Her flagship project is the AXIOM AI Agent — an autonomous agent with multi-step chain-of-thought task planning, vector memory, and dynamic tool dispatch! She also engineered the NLP-based AI Resume Parser, Cloud Infrastructure Automation using Terraform and AWS, and an AI Cooking Assistant!",
    keyPoints: [
      "AXIOM AI Agent: Autonomous agentic reasoning & vector memory",
      "AI Resume Parser: NLP TF-IDF candidate ranking (Scikit-learn)",
      "Cloud Infrastructure Automation: Terraform & AWS EC2/S3/IAM",
      "AI Cooking Assistant: Python & Flask dynamic recipe matching",
      "All repositories verified under github.com/Januuuu1creates",
    ],
    suggestedAction: "Inspect the live interactive demo terminal for each project!",
  },
  certifications: {
    sectionId: "certifications",
    sectionName: "Technical Credentials",
    badge: "SECTOR 06 // FLIGHT CLEARANCE",
    greeting: "Verified Technical Credentials! 📜",
    speech:
      "Jahnavi's continuous learning is verified through three core credentials: Cloud Infrastructure & AWS Fundamentals, Python for Data Science & AI Systems, and Full-Stack Web Engineering with C# and .NET!",
    keyPoints: [
      "Cloud Infrastructure & AWS Fundamentals",
      "Python for Data Science & AI Systems",
      "Full-Stack Web Engineering & C# / .NET",
    ],
    suggestedAction: "Click any credential card to view verified skills!",
  },
  contact: {
    sectionId: "contact",
    sectionName: "Let's Connect",
    badge: "SECTOR 07 // SUBSPACE ARRAY",
    greeting: "Enjoyed exploring? Let's connect and build! 💌",
    speech:
      "Jahnavi is actively available for 2026 software engineering roles! You can email her directly at jahnavimurthy1111@gmail.com, connect on LinkedIn, or inspect her verified GitHub repositories under Januuuu1creates!",
    keyPoints: [
      "Email: jahnavimurthy1111@gmail.com",
      "LinkedIn: linkedin.com/in/jahnavi-murthy-013250240",
      "GitHub: github.com/Januuuu1creates",
      "Location: Bengaluru, India &bull; Open for 2026 Roles",
    ],
    suggestedAction: "Drop a note using the direct transmission form!",
  },
};

export const ASTRO_FAQS: FAQItem[] = [
  {
    id: "who-is-jahnavi",
    question: "Who is Jahnavi Murthy?",
    shortLabel: "Who is Jahnavi?",
    answer:
      "Jahnavi Murthy is an aspiring software engineer based in Bengaluru, India. She holds a dual academic background in Computer Science and Physics (2022–2026) and completed a Software Development Apprenticeship at Gainwell Technologies. She specializes in full-stack engineering, cloud infrastructure automation, and AI systems.",
    targetSection: "about",
  },
  {
    id: "experience-gainwell",
    question: "What was her experience at Gainwell Technologies?",
    shortLabel: "Gainwell Apprenticeship",
    answer:
      "Jahnavi contributed as a Software Development Apprentice at Gainwell Technologies, Bangalore from July 2025 to January 2026. She engaged in agile sprint cycles, full-stack software development, maintainable clean code writing, peer reviews, and enterprise problem-solving in production environments.",
    targetSection: "journey",
  },
  {
    id: "skills-overview",
    question: "What programming skills does she know?",
    shortLabel: "Programming Skills",
    answer:
      "Jahnavi has 12 verified proficiencies: Java (90%), Python (75%), C# (75%), HTML & CSS (80%), JavaScript (70%), Flask (70%), Git & GitHub (70%), SQL (65%), C (65%), React (60%), Machine Learning (60%), and Data Structures & Algorithms (55%).",
    targetSection: "skills-section",
  },
  {
    id: "axiom-projects",
    question: "Tell me about her projects, especially AXIOM AI Agent.",
    shortLabel: "AXIOM & Projects",
    answer:
      "Jahnavi's flagship project is the AXIOM AI Agent — an autonomous agentic framework featuring multi-step chain-of-thought task planning, vector memory retrieval, and dynamic tool orchestration. She also built the AI Resume Parser (NLP with Scikit-learn), Cloud Infrastructure Automation (Terraform & AWS), and the AI Cooking Assistant (Flask REST API). All projects have verified code on GitHub.",
    targetSection: "projects",
  },
  {
    id: "education-degree",
    question: "What is her educational background?",
    shortLabel: "CS & Physics Degree",
    answer:
      "Jahnavi is pursuing her Bachelors in Computer Science & Physics (2022–2026) in Bangalore. Her dual coursework pairs algorithmic computer science (data structures, OOP, database modeling) with mathematical and computational physics.",
    targetSection: "about",
  },
  {
    id: "how-to-contact",
    question: "How can I contact or hire Jahnavi?",
    shortLabel: "How to Contact",
    answer:
      "You can email Jahnavi directly at jahnavimurthy1111@gmail.com, connect with her on LinkedIn at linkedin.com/in/jahnavi-murthy-013250240, or inspect her code on GitHub under Januuuu1creates. She is actively available for 2026 software engineering roles.",
    targetSection: "contact",
  },
];
