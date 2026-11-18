"use client";

import React, { useState } from "react";
import {
  Code2,
  Terminal,
  Database,
  Cloud,
  Layers,
  Sparkles,
  Cpu,
  CheckCircle2,
  Wrench,
  Heart,
} from "lucide-react";

interface SkillDetail {
  id: string;
  name: string;
  category: "Languages" | "Backend" | "Frontend" | "Cloud" | "Data";
  level: string;
  context: string;
  appliedIn: string;
  tagline: string;
}

const skills: SkillDetail[] = [
  {
    id: "python",
    name: "Python",
    category: "Languages",
    level: "Core Strength",
    tagline: "Data Analysis, NLP & Backend Microservices",
    context:
      "My primary language for building algorithmic data parsers, Natural Language Processing systems, and lightweight RESTful backend services.",
    appliedIn: "AI Resume Parser, AI Cooking Assistant, predictive machine learning models.",
  },
  {
    id: "java",
    name: "Java",
    category: "Languages",
    level: "Core Foundation",
    tagline: "Object-Oriented Architecture & Algorithms",
    context:
      "Learned deeply through my Computer Science degree, establishing a strong foundation in OOP principles, design patterns, data structures, and multithreaded systems.",
    appliedIn: "Algorithmic problem solving, academic software systems, object-oriented design.",
  },
  {
    id: "csharp",
    name: "C#",
    category: "Languages",
    level: "Enterprise Stack",
    tagline: "Strongly Typed Enterprise Engineering",
    context:
      "Leveraged for robust backend architecture, enterprise application development, LINQ queries, and building scalable full-stack web solutions.",
    appliedIn: "Enterprise full-stack architectures, C# services, and object-relational mapping.",
  },
  {
    id: "javascript",
    name: "JavaScript / TypeScript",
    category: "Languages",
    level: "Frontend Core",
    tagline: "Modern ES6+ & Type-Safe Interactivity",
    context:
      "Writing clean, modern TypeScript to build reactive user interfaces, managing client state, and ensuring end-to-end type safety.",
    appliedIn: "Next.js applications, interactive portfolio UI, dynamic component architectures.",
  },
  {
    id: "sql",
    name: "SQL & Databases",
    category: "Data",
    level: "Relational Modeling",
    tagline: "Relational Schemas, Queries & Data Integrity",
    context:
      "Designing normalized relational database schemas, writing complex join queries, ensuring ACID compliance, and utilizing ORM migrations.",
    appliedIn: "Relational database schema modeling, data pipelines, and ACID transactions.",
  },
  {
    id: "rest-apis",
    name: "REST APIs & Architecture",
    category: "Backend",
    level: "System Design",
    tagline: "Clean Endpoint Design & JSON Contracts",
    context:
      "Structuring modular RESTful API endpoints, request validation, HTTP status protocols, JSON data pipelines, and error handling standards.",
    appliedIn: "AXIOM AI Agent endpoints, AI Cooking Assistant backend, client-server communications.",
  },
  {
    id: "aspnet",
    name: "ASP.NET MVC",
    category: "Backend",
    level: "Full-Stack Backend",
    tagline: "Model-View-Controller Enterprise Architecture",
    context:
      "Architecting enterprise web applications using MVC separation of concerns, dependency injection, routing, and Entity Framework ORM.",
    appliedIn: "Enterprise full-stack architectures, dependency injection, and secure controller routing.",
  },
  {
    id: "flask",
    name: "Flask",
    category: "Backend",
    level: "Microservices",
    tagline: "Lightweight Python Web Services",
    context:
      "Building fast, lightweight Python backends to serve machine learning models, process text data, and handle dynamic API requests.",
    appliedIn: "AI Cooking Assistant API, Python NLP processing pipelines.",
  },
  {
    id: "react-next",
    name: "React.js & Next.js",
    category: "Frontend",
    level: "Modern Web",
    tagline: "Server & Client Components, Responsive UI",
    context:
      "Building modern web applications with reusable component architecture, React hooks, Next.js server/client boundaries, and SEO optimization.",
    appliedIn: "Interactive portfolio experience, high-performance web applications.",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Frontend",
    level: "Design Systems",
    tagline: "Utility-First Styling & Micro-Interactions",
    context:
      "Creating modern, accessible, dark-themed user interfaces with responsive grids, subtle ambient lighting, and fluid micro-animations.",
    appliedIn: "Design system across portfolio and web applications.",
  },
  {
    id: "aws",
    name: "AWS (Amazon Web Services)",
    category: "Cloud",
    level: "Cloud Computing",
    tagline: "EC2, S3 Storage & IAM Security",
    context:
      "Deploying scalable cloud infrastructure, configuring virtual servers (EC2), secure object storage buckets (S3), and least-privilege IAM policies.",
    appliedIn: "Cloud Infrastructure Automation project with automated web hosting.",
  },
  {
    id: "terraform",
    name: "Terraform (IaC)",
    category: "Cloud",
    level: "Infrastructure as Code",
    tagline: "Declarative Cloud Provisioning & Zero Drift",
    context:
      "Automating reproducible cloud environments using declarative Terraform scripts, managing infrastructure state, and avoiding manual console errors.",
    appliedIn: "Automated AWS infrastructure orchestration and configuration.",
  },
  {
    id: "git",
    name: "Git & GitHub",
    category: "Data",
    level: "Collaboration",
    tagline: "Version Control & Agile PR Workflows",
    context:
      "Managing codebase history, feature branches, peer code reviews, collaborative pull requests, and maintaining production repositories.",
    appliedIn: "Gainwell Technologies apprenticeship workflows, personal open source code.",
  },
  {
    id: "swe-concepts",
    name: "Software Engineering Concepts",
    category: "Data",
    level: "Methodology",
    tagline: "Agile, OOP, Problem Decomposition & Clean Code",
    context:
      "Applying Agile/Scrum methodologies, SOLID design principles, clean code conventions, and systematic debugging to deliver reliable software.",
    appliedIn: "Professional apprenticeship at Gainwell Technologies and academic projects.",
  },
];

export default function Workbench() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedSkill, setSelectedSkill] = useState<SkillDetail>(skills[0]);

  const categories = [
    { label: "All (14)", value: "All" },
    { label: "Languages", value: "Languages" },
    { label: "Backend & APIs", value: "Backend" },
    { label: "Frontend", value: "Frontend" },
    { label: "Cloud & DevOps", value: "Cloud" },
    { label: "Data & Systems", value: "Data" },
  ];

  const filteredSkills =
    activeCategory === "All"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section
      id="workbench"
      className="py-16 sm:py-20 relative border-b border-pink-500/15 scroll-mt-16 overflow-hidden"
    >
      {/* Background Soft Ambient Glows */}
      <div className="absolute top-1/2 left-8 w-80 h-80 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-lilac-glow" />
      <div className="absolute bottom-10 right-8 w-80 h-80 bg-pink-500/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-rose-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Chapter Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-14 border-b border-pink-500/15">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/10 border border-pink-400/25 text-xs font-mono text-pink-300 uppercase tracking-widest mb-3 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>CHAPTER 04-B &bull; WHAT I WORK WITH</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              The Engineering Workbench
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-sans text-slate-300 mt-4 md:mt-0 max-w-sm leading-relaxed">
            An interactive inspection lab of the languages, frameworks, cloud tools, and software concepts I use to craft code.
          </p>
        </div>

        {/* Category Filter Pills (Minimal Rounded Style) */}
        <div className="flex flex-wrap gap-2 mb-10 p-1.5 scifi-glass-panel rounded-full border-pink-400/25 w-fit">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer ${
                activeCategory === cat.value
                  ? "bg-gradient-to-r from-pink-400 via-purple-400 to-sky-400 text-slate-950 font-bold shadow-md shadow-pink-500/20"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Workbench Layout: Grid on left, Live Inspector on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Skill Chips Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {filteredSkills.map((skill) => {
                const isSelected = selectedSkill.id === skill.id;
                return (
                  <div
                    key={skill.id}
                    onClick={() => setSelectedSkill(skill)}
                    className={`group p-5 rounded-3xl border transition-all duration-200 cursor-pointer scifi-glass-panel ${
                      isSelected
                        ? "bg-white/[0.08] border-pink-400 shadow-[0_0_25px_rgba(244,114,182,0.25)] -translate-y-0.5"
                        : "border-pink-400/20 hover:border-pink-400/40 hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-white group-hover:text-pink-300 transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-pink-500/10 text-pink-300 border border-pink-400/30">
                        {skill.level}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-snug line-clamp-2 font-sans">
                      {skill.tagline}
                    </p>

                    <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-purple-300/80">
                      <span className="font-semibold">{skill.category}</span>
                      <span className={`transition-colors ${isSelected ? "text-pink-300 font-bold" : "text-slate-400 group-hover:text-pink-300"}`}>
                        {isSelected ? "● ACTIVE" : "Inspect →"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Workbench Inspector Panel */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 p-7 sm:p-8 rounded-3xl scifi-glass-panel border-pink-400/30 shadow-2xl space-y-6 relative overflow-hidden">
              {/* Header */}
              <div className="flex items-start justify-between pb-5 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-pink-300 font-bold mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                    <span className="uppercase tracking-wider">{selectedSkill.category}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    {selectedSkill.name}
                  </h3>
                  <p className="text-xs font-mono text-purple-300 mt-1 font-semibold">
                    {selectedSkill.level}
                  </p>
                </div>

                <div className="w-10 h-10 rounded-2xl bg-pink-500/20 border border-pink-400/40 flex items-center justify-center text-pink-300 shrink-0 shadow-[0_0_12px_rgba(244,114,182,0.3)]">
                  <Terminal className="w-5 h-5" />
                </div>
              </div>

              {/* Tagline */}
              <div>
                <h4 className="text-[10px] font-mono uppercase tracking-wider text-pink-300 font-bold mb-1">
                  CORE PURPOSE
                </h4>
                <p className="text-sm font-mono text-pink-200 font-medium">
                  {selectedSkill.tagline}
                </p>
              </div>

              {/* Context */}
              <div>
                <h4 className="text-[10px] font-mono uppercase tracking-wider text-pink-300 font-bold mb-1.5">
                  HOW I APPLY IT IN PRACTICE
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                  {selectedSkill.context}
                </p>
              </div>

              {/* Projects Where Utilized */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                <h4 className="text-[10px] font-mono uppercase tracking-wider text-pink-300 font-bold mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-pink-400" />
                  <span>IMPLEMENTED IN REAL PROJECTS</span>
                </h4>
                <p className="text-xs font-mono text-purple-200/90 leading-relaxed mt-1">
                  {selectedSkill.appliedIn}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
