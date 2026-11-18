"use client";

import React, { useState } from "react";
import {
  FileText,
  Cloud,
  Utensils,
  Target,
  Sparkles,
  ArrowUpRight,
  ChevronRight,
  Code2,
  Terminal,
  CheckCircle2,
  Layers,
  Bot,
  BrainCircuit,
  Play,
  RotateCcw,
  Heart,
} from "lucide-react";
import { GithubIcon } from "./icons";

interface ProjectExperience {
  id: string;
  indexNumber: string;
  title: string;
  category: string;
  year: string;
  objective: string;
  description: string;
  technologies: string[];
  keyHighlights: string[];
  githubUrl: string;
  iconType: "ai-agent" | "nlp" | "cloud" | "cooking";
}

const projects: ProjectExperience[] = [
  {
    id: "axiom-ai-agent",
    indexNumber: "01",
    title: "AXIOM AI Agent",
    category: "Autonomous AI & Agentic Systems",
    year: "2026",
    objective:
      "Engineer an autonomous intelligent agent capable of multi-step task reasoning, dynamic tool execution, contextual vector memory retrieval, and adaptive problem-solving.",
    description:
      "An autonomous intelligent agent framework featuring chain-of-thought task execution, vector memory retrieval, and dynamic tool orchestration.",
    technologies: ["Python", "LLM APIs", "LangChain", "Vector Embeddings", "FastAPI / Flask", "REST APIs"],
    keyHighlights: [
      "Multi-step chain-of-thought task planning and dynamic tool invocation with self-correcting reasoning loops",
      "Persistent semantic memory recall utilizing high-dimensional vector embeddings and context caching",
      "Resilient error-recovery routines with fallback reasoning loops and automated verification",
      "Modular RESTful API endpoints and asynchronous workflow execution for real-time task completion",
    ],
    githubUrl: "https://github.com/Januuuu1creates",
    iconType: "ai-agent",
  },
  {
    id: "ai-resume-parser",
    indexNumber: "02",
    title: "AI Resume Parser",
    category: "NLP & AI System",
    year: "2026",
    objective:
      "Automate recruitment screening by programmatically extracting structured resume metadata and ranking candidate qualifications against targeted job descriptions.",
    description:
      "An NLP-based intelligent application that parses resume data and evaluates candidate resumes against job descriptions based on keywords.",
    technologies: ["Python", "NLP", "Scikit-learn", "Pandas"],
    keyHighlights: [
      "Automated extraction of contact details, education, technical skills & experience across documents",
      "Vectorized TF-IDF keyword evaluation and candidate-job semantic alignment scoring",
      "High-throughput data cleaning, normalization, and export utilizing Pandas dataframes",
      "Modular pipeline architecture designed for fast batch document evaluation",
    ],
    githubUrl: "https://github.com/Januuuu1creates",
    iconType: "nlp",
  },
  {
    id: "cloud-automation",
    indexNumber: "03",
    title: "Cloud Infrastructure Automation",
    category: "Cloud & DevOps (IaC)",
    year: "2026",
    objective:
      "Establish reproducible, zero-drift AWS cloud infrastructure using declarative Infrastructure as Code (IaC) to automate server hosting and storage deployment.",
    description:
      "Automated AWS infrastructure deployment using Terraform, featuring EC2 web servers, S3 storage buckets, and IAM security controls.",
    technologies: ["AWS", "Terraform", "Linux", "EC2", "S3", "IAM"],
    keyHighlights: [
      "Declarative Infrastructure as Code (IaC) modular configurations for consistent cloud provisioning",
      "Automated EC2 instance orchestration paired with Apache web server startup automation",
      "S3 object storage security paired with least-privilege IAM policies and audit controls",
      "Repeatable, zero-drift execution guaranteeing reliable cloud environments",
    ],
    githubUrl: "https://github.com/Januuuu1creates",
    iconType: "cloud",
  },
  {
    id: "ai-cooking-assistant",
    indexNumber: "04",
    title: "AI Cooking Assistant",
    category: "Smart AI & REST API Application",
    year: "2026",
    objective:
      "Reduce household food waste and assist home chefs by generating customized culinary recipes dynamically based on available pantry ingredients and dietary needs.",
    description:
      "A smart application that recommends curated culinary recipes dynamically based on ingredients provided by users in real time.",
    technologies: ["Python", "Flask", "REST APIs", "JSON"],
    keyHighlights: [
      "Dynamic ingredient-to-recipe matching algorithm with pantry awareness and substitution rules",
      "Modular Flask backend providing clean REST endpoints, input sanitization, and request validation",
      "Interactive step-by-step culinary preparation walkthroughs and dietary filter options",
      "Lightweight and decoupled API design ready for cross-platform integration",
    ],
    githubUrl: "https://github.com/Januuuu1creates",
    iconType: "cooking",
  },
];

export default function ProjectsShowcase() {
  const [selectedProjectId, setSelectedProjectId] = useState<string>("axiom-ai-agent");
  const [agentStep, setAgentStep] = useState<number>(3);
  const [pantryIngredients] = useState<string[]>(["Tomatoes", "Garlic", "Basil"]);

  const activeProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  const triggerAgentStep = () => {
    setAgentStep((prev) => (prev >= 3 ? 1 : prev + 1));
  };

  return (
    <section
      id="projects"
      className="py-16 sm:py-20 relative border-b border-pink-500/15 scroll-mt-16 overflow-hidden"
    >
      {/* Background Soft Glows */}
      <div className="absolute top-1/3 -right-16 w-80 h-80 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-lilac-glow" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-pink-500/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-rose-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Chapter Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-14 border-b border-pink-500/15">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/10 border border-pink-400/25 text-xs font-mono text-pink-300 uppercase tracking-widest mb-3 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>CHAPTER 05 &bull; FEATURED PROJECTS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Individual Case Studies
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-sans text-slate-300 mt-4 md:mt-0 max-w-sm leading-relaxed">
            Interactive visual explorations of real software systems built with verified architectures and repositories.
          </p>
        </div>

        {/* Project Selector Bar (Minimal Rounded Pills) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {projects.map((proj) => {
            const isSelected = selectedProjectId === proj.id;
            return (
              <button
                key={proj.id}
                onClick={() => setSelectedProjectId(proj.id)}
                className={`group px-5 py-3 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 shrink-0 flex items-center gap-2.5 cursor-pointer scifi-glass-panel ${
                  isSelected
                    ? "bg-gradient-to-r from-pink-400 via-purple-400 to-sky-400 text-slate-950 font-black shadow-md shadow-pink-500/20 border-pink-300"
                    : "border-pink-400/20 text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className={isSelected ? "text-slate-950 font-black" : "text-pink-400"}>
                  [{proj.indexNumber}]
                </span>
                <span>{proj.title}</span>
              </button>
            );
          })}
        </div>

        {/* The Individual Project Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Visual Mockup / Interactive Terminal Experience */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl scifi-glass-panel border-pink-400/25 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              {/* Window Bar */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-pink-400/80 shadow-[0_0_8px_rgba(244,114,182,0.6)]" />
                  <span className="w-3 h-3 rounded-full bg-purple-400/80 shadow-[0_0_8px_rgba(192,132,252,0.6)]" />
                  <span className="w-3 h-3 rounded-full bg-sky-400/80 shadow-[0_0_8px_rgba(192,132,252,0.6)]" />
                </div>
                <span className="text-slate-400">{activeProject.id}.preview.tsx</span>
                <span className="text-pink-300 font-semibold">{activeProject.category}</span>
              </div>

              {/* Bespoke Interactive Visual Stage for each project */}
              {activeProject.id === "axiom-ai-agent" && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/10 font-mono text-xs text-slate-200 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <div className="flex items-center gap-2 text-pink-300 font-bold">
                        <Bot className="w-4 h-4 text-pink-400" />
                        <span>AXIOM AGENT REASONING ENGINE</span>
                      </div>
                      <button
                        onClick={triggerAgentStep}
                        className="px-2.5 py-1 rounded-full bg-pink-500/20 hover:bg-pink-500/30 text-[10px] text-pink-200 border border-pink-400/40 cursor-pointer flex items-center gap-1 shadow-xs transition-colors"
                      >
                        <RotateCcw className="w-2.5 h-2.5" />
                        <span>Step</span>
                      </button>
                    </div>

                    <div className="space-y-2 text-[11.5px]">
                      <div className="text-slate-400">
                        &gt; Target: &ldquo;Analyze execution workflow &amp; orchestrate tools&rdquo;
                      </div>

                      <div className={`p-2.5 rounded-xl border transition-all ${
                        agentStep >= 1 ? "bg-purple-950/50 border-purple-400/40 text-purple-200" : "opacity-40 border-white/5"
                      }`}>
                        [Phase 1] Task Planning: Decomposed into DAG execution graph.
                      </div>

                      <div className={`p-2.5 rounded-xl border transition-all ${
                        agentStep >= 2 ? "bg-pink-950/50 border-pink-400/40 text-pink-200" : "opacity-40 border-white/5"
                      }`}>
                        [Phase 2] Memory &amp; Vector DB: Queried semantic embeddings (similarity: 0.94).
                      </div>

                      <div className={`p-2.5 rounded-xl border transition-all ${
                        agentStep >= 3 ? "bg-emerald-950/50 border-emerald-400/40 text-emerald-200" : "opacity-40 border-white/5"
                      }`}>
                        [Phase 3] Tool Dispatch: Execution verified. Latency: 240ms. Zero Hallucinations.
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 text-[11px] font-mono text-slate-300 space-y-1">
                    <div className="text-pink-300 font-bold">Agentic Architecture:</div>
                    <code className="text-purple-200 block">
                      AxiomAgent(memory=VectorStore, tools=[CodeExec, Analyzer])
                    </code>
                  </div>
                </div>
              )}

              {activeProject.id === "ai-resume-parser" && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-xs font-mono">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-pink-300">📄 PARSING RESUME METRICS</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/60 text-emerald-300 font-bold border border-emerald-400/40">
                        94% MATCH SCORE
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-slate-300">
                        <span>NLP Keyword Extraction:</span>
                        <span className="text-emerald-300 font-bold">Extracted 18 Entities</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/5 border border-white/10 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-pink-400 to-purple-400 w-[94%]" />
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {["Python", "Scikit-learn", "NLP", "TF-IDF", "Pandas", "Clean Code"].map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-full bg-pink-950/40 border border-pink-400/30 text-[10px] text-pink-200 font-mono"
                        >
                          ✓ {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 text-[11px] font-mono text-slate-300 space-y-1">
                    <div className="text-pink-300 font-bold">Vectorization Engine:</div>
                    <code className="text-purple-200 block">
                      cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:])
                    </code>
                  </div>
                </div>
              )}

              {activeProject.id === "cloud-automation" && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/10 font-mono text-xs text-slate-200 space-y-2">
                    <div className="text-pink-300">$ terraform init &amp;&amp; terraform apply</div>
                    <div className="text-slate-400 text-[11px]">
                      [INFO] Initializing AWS provider plugins...
                    </div>
                    <div className="text-purple-300 text-[11px]">
                      + aws_instance.web_server (EC2 t2.micro) [CREATE]
                    </div>
                    <div className="text-pink-200 text-[11px]">
                      + aws_s3_bucket.secure_storage [AES-256 ENCRYPTED]
                    </div>
                    <div className="text-emerald-300 text-[11px] font-bold">
                      Apply complete! Resources: 3 added, 0 changed, 0 destroyed.
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 text-[11px] font-mono text-slate-300 space-y-1">
                    <div className="text-pink-300 font-bold">IaC Security Architecture:</div>
                    <code className="text-purple-200 block">
                      least_privilege_iam_policy = &quot;aws_iam_policy.read_only&quot;
                    </code>
                  </div>
                </div>
              )}

              {activeProject.id === "ai-cooking-assistant" && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-xs font-mono">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-pink-300">🍳 SMART PANTRY INGREDIENTS:</span>
                      <span className="text-purple-300 font-semibold">FLASK REST API</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {pantryIngredients.map((ing) => (
                        <span
                          key={ing}
                          className="px-3 py-1 rounded-full bg-pink-950/40 border border-pink-400/30 text-pink-200 text-xs font-mono"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>

                    <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 text-[11px] text-slate-200 space-y-1">
                      <span className="font-bold text-pink-300">Generated Recommendation:</span>
                      <p className="text-slate-300">
                        Classic Fresh Basil Pasta with Blistered Tomatoes &amp; Garlic Confit. 15 min cook time. Zero waste.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 text-[11px] font-mono text-slate-300 space-y-1">
                    <div className="text-pink-300 font-bold">API Route Definition:</div>
                    <code className="text-purple-200 block">
                      POST /api/v1/recipes/match &#123; ingredients: [...] &#125;
                    </code>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Case Study Specifications & GitHub Action */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-8 sm:p-9 rounded-3xl scifi-glass-panel border-pink-400/25 shadow-2xl space-y-6 relative overflow-hidden">
              {/* Header */}
              <div className="pb-5 border-b border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-2xl font-black text-pink-400">
                    {activeProject.indexNumber}
                  </span>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-pink-300 font-bold px-3 py-1 rounded-full bg-pink-500/10 border border-pink-400/30">
                    {activeProject.category}
                  </span>
                  <span className="text-xs font-mono text-purple-200/80 ml-auto">
                    {activeProject.year}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {activeProject.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  {activeProject.description}
                </p>
              </div>

              {/* Project Objective */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                <div className="flex items-center gap-2 text-pink-300 font-bold text-xs uppercase tracking-wider mb-1 font-mono">
                  <Target className="w-4 h-4 text-pink-400" />
                  <span>PROJECT OBJECTIVE</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                  {activeProject.objective}
                </p>
              </div>

              {/* Key Architectural Highlights */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-pink-300 font-bold mb-3 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-pink-300" />
                  <span>KEY ARCHITECTURAL FEATURES</span>
                </h4>
                <div className="space-y-2.5">
                  {activeProject.keyHighlights.map((hl, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <span className="text-pink-400 font-bold mt-0.5">&bull;</span>
                      <span className="leading-relaxed">{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Chips */}
              <div className="pt-4 border-t border-white/10">
                <h4 className="text-xs font-mono uppercase tracking-wider text-pink-300 font-bold mb-3">
                  TECHNOLOGY STACK
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-3 py-1 rounded-xl bg-purple-950/40 border border-purple-400/30 text-purple-200 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verified GitHub Action */}
              <div className="pt-2">
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-xs font-mono font-extrabold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-pink-400 via-purple-400 to-sky-400 hover:brightness-110 shadow-lg shadow-pink-500/20 transition-all hover:scale-[1.01]"
                >
                  <GithubIcon className="w-4 h-4 text-slate-950" />
                  <span>Inspect on GitHub &bull; Januuuu1creates ↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
