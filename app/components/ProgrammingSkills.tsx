"use client";

import React, { useState, useEffect } from "react";
import {
  Code2,
  Terminal,
  Database,
  Layers,
  Sparkles,
  Cpu,
  GitBranch,
  BrainCircuit,
  Binary,
  Heart,
} from "lucide-react";

interface SkillItem {
  name: string;
  percentage: number;
  category: "Languages" | "Frontend" | "Backend" | "CoreCS";
  level: string;
  description: string;
}

const skillsData: SkillItem[] = [
  {
    name: "Java",
    percentage: 90,
    category: "Languages",
    level: "Advanced Mastery",
    description: "Deep object-oriented programming, data structures, multithreading, and algorithmic design patterns.",
  },
  {
    name: "Python",
    percentage: 75,
    category: "Languages",
    level: "Proficient",
    description: "Data analysis, Natural Language Processing, machine learning models, and microservice backend systems.",
  },
  {
    name: "C",
    percentage: 65,
    category: "Languages",
    level: "Foundational",
    description: "Low-level memory management, pointers, system architecture, and computational execution mechanics.",
  },
  {
    name: "C#",
    percentage: 75,
    category: "Languages",
    level: "Proficient",
    description: "Enterprise backend development, ASP.NET MVC architecture, LINQ queries, and strongly typed systems.",
  },
  {
    name: "JavaScript",
    percentage: 70,
    category: "Languages",
    level: "Proficient",
    description: "Modern ES6+, asynchronous event loops, reactive frontend interfaces, and full-stack integration.",
  },
  {
    name: "HTML & CSS",
    percentage: 80,
    category: "Frontend",
    level: "Advanced",
    description: "Semantic web standards, accessible layouts, responsive Tailwind CSS styling, and fluid micro-interactions.",
  },
  {
    name: "SQL",
    percentage: 65,
    category: "Backend",
    level: "Proficient",
    description: "Relational schema design, normalization, complex joins, indexing, and ORM migrations.",
  },
  {
    name: "React",
    percentage: 60,
    category: "Frontend",
    level: "Intermediate",
    description: "Component-driven user interfaces, state management, custom hooks, and Next.js modern web applications.",
  },
  {
    name: "Flask",
    percentage: 70,
    category: "Backend",
    level: "Proficient",
    description: "Lightweight Python REST API architecture, routing, request validation, and AI service deployment.",
  },
  {
    name: "Git & GitHub",
    percentage: 70,
    category: "CoreCS",
    level: "Proficient",
    description: "Version control, feature branch strategies, pull request workflows, and collaborative code reviews.",
  },
  {
    name: "Data Structures & Algorithms",
    percentage: 55,
    category: "CoreCS",
    level: "Core Competency",
    description: "Trees, graphs, dynamic programming, sorting algorithms, and Big-O computational time complexity.",
  },
  {
    name: "Machine Learning",
    percentage: 60,
    category: "CoreCS",
    level: "Applied Competency",
    description: "Scikit-learn, TF-IDF vectorization, supervised models, text classification, and predictive analytics.",
  },
];

export default function ProgrammingSkills() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const categories = [
    { label: "All Skills (12)", value: "All" },
    { label: "Core Languages", value: "Languages" },
    { label: "Frontend & Web", value: "Frontend" },
    { label: "Backend & Systems", value: "Backend" },
    { label: "Algorithms & AI", value: "CoreCS" },
  ];

  const filtered =
    activeCategory === "All"
      ? skillsData
      : skillsData.filter((s) => s.category === activeCategory);

  return (
    <section
      id="skills-section"
      className="py-16 sm:py-20 relative border-b border-pink-500/15 scroll-mt-16 overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-8 w-80 h-80 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-lilac-glow" />
      <div className="absolute bottom-10 right-8 w-80 h-80 bg-pink-500/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-rose-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-12 border-b border-pink-500/15">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/10 border border-pink-400/25 text-xs font-mono text-pink-300 uppercase tracking-widest mb-3 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>CHAPTER 04-A &bull; TECHNICAL PROFICIENCIES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Programming Skills
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-sans text-slate-300 mt-4 md:mt-0 max-w-sm leading-relaxed">
            Verified technical proficiencies with animated proficiency bars across core languages, frameworks, and system design.
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

        {/* Animated Skills Grid with Adorable Pastel Bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((skill) => (
            <div
              key={skill.name}
              className="p-6 rounded-3xl scifi-glass-panel border-pink-400/20 hover:border-pink-400/50 hover:bg-white/[0.04] transition-all duration-300 shadow-xl group relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-pink-400 group-hover:scale-125 transition-transform shadow-[0_0_8px_#f472b6]" />
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-pink-300 transition-colors">
                    {skill.name}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-pink-500/10 text-pink-300 border border-pink-400/30">
                    {skill.level}
                  </span>
                  <span className="text-sm font-mono font-black text-pink-300">
                    {skill.percentage}%
                  </span>
                </div>
              </div>

              {/* Animated Pastel Gradient Bar */}
              <div className="w-full h-3 rounded-full bg-white/5 border border-white/10 overflow-hidden relative p-[2px] mt-2 mb-3 shadow-inner">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-pink-400 via-rose-300 to-purple-400 transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(244,114,182,0.6)] relative"
                  style={{
                    width: animated ? `${skill.percentage}%` : "0%",
                  }}
                >
                  {/* Glowing Leading Cap */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_6px_#fff]" />
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {skill.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
