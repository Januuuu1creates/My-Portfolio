"use client";

import React, { useState } from "react";
import {
  Code,
  Terminal,
  Cloud,
  Database,
  Cpu,
  GraduationCap,
} from "lucide-react";

interface SkillItem {
  name: string;
  category: "Frontend" | "Backend" | "Cloud" | "Tools";
}

const skills: SkillItem[] = [
  // Frontend
  { name: "HTML5", category: "Frontend" },
  { name: "CSS3", category: "Frontend" },
  { name: "JavaScript", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "React.js", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },

  // Backend & Languages
  { name: "Python", category: "Backend" },
  { name: "Java", category: "Backend" },
  { name: "C#", category: "Backend" },
  { name: "ASP.NET MVC", category: "Backend" },
  { name: "Flask", category: "Backend" },

  // Cloud & DevOps
  { name: "AWS", category: "Cloud" },
  { name: "Terraform", category: "Cloud" },

  // Databases & Tools
  { name: "SQL", category: "Tools" },
  { name: "Git", category: "Tools" },
  { name: "GitHub", category: "Tools" },
];

export default function About() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = [
    { label: "All Skills [17]", value: "All" },
    { label: "Frontend", value: "Frontend" },
    { label: "Backend", value: "Backend" },
    { label: "Cloud & DevOps", value: "Cloud" },
    { label: "Tools & DB", value: "Tools" },
  ];

  const filteredSkills =
    activeCategory === "All"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section
      id="about"
      className="py-28 relative border-b border-white/10 scroll-mt-16 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-amber-500/10 rounded-full blur-[130px] pointer-events-none -z-10 animate-bokeh" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none -z-10 animate-bokeh [animation-delay:2s]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Swiss Minimalist sebg.ch Style) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-16 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest mb-2 font-bold">
              <span>[01]</span>
              <span>&mdash;</span>
              <span>BIOGRAPHY &amp; CAPABILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
              About Me
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-slate-400 mt-4 md:mt-0 max-w-sm">
            Turning algorithmic logic, cloud automation, and modern web frameworks into impactful digital software.
          </p>
        </div>

        {/* Content Layout: Bio on left, Skills on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Editorial Bio */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-300 font-bold">
                  <GraduationCap className="w-4 h-4 text-amber-400" />
                  <span>BACHELORS IN COMPUTER SCIENCE &amp; PHYSICS</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400 font-semibold">2022–2026</span>
              </div>

              {/* Exact Bio text corrected to Bachelors in Computer Science & Physics, 2022–2026 */}
              <p className="text-slate-100 text-base sm:text-lg leading-relaxed font-medium mb-5">
                I&apos;m <span className="text-amber-300 font-bold">Jahnavi Murthy</span>, a Computer Science &amp; Physics student passionate about building innovative software applications and solving real-world problems through technology.
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                I enjoy working with web development, cloud computing, Python and AI. I&apos;m constantly learning, experimenting and building projects to grow as a software engineer.
              </p>

              {/* Pillars list */}
              <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs font-mono">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 shadow-xs">
                  <span className="text-slate-400">01 / DISCIPLINE</span>
                  <span className="text-amber-300 font-bold">Full-Stack Development</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 shadow-xs">
                  <span className="text-slate-400">02 / INFRASTRUCTURE</span>
                  <span className="text-amber-300 font-bold">AWS &amp; Terraform IaC</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 shadow-xs">
                  <span className="text-slate-400">03 / INTELLIGENCE</span>
                  <span className="text-amber-300 font-bold">Python, AI &amp; NLP</span>
                </div>
              </div>
            </div>

            {/* Status Pill */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900/90 to-slate-900/60 backdrop-blur-xl border border-amber-400/30 flex items-center justify-between shadow-xs">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-amber-300 font-bold">CAREER FOCUS</p>
                <p className="text-xs sm:text-sm font-mono text-slate-200 font-semibold">Ready for Software Engineering Roles &amp; Internships</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-xs font-mono font-black shadow-sm shadow-amber-400/30">
                ✓
              </div>
            </div>
          </div>

          {/* Right Column: Technical Skills Arsenal */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-amber-400" />
                    <span>Technical Stack &amp; Skills</span>
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mt-1">
                    Carefully curated technologies I use to build robust, scalable applications.
                  </p>
                </div>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex flex-wrap gap-2 mb-8 p-1.5 bg-black/40 rounded-2xl border border-white/10 shadow-xs">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setActiveCategory(cat.value)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer ${
                      activeCategory === cat.value
                        ? "bg-amber-400 text-slate-950 font-black shadow-md shadow-amber-400/30"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Skills Chips Grid */}
              <div className="flex flex-wrap gap-2.5">
                {filteredSkills.map((skill) => (
                  <div
                    key={skill.name}
                    className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400/50 hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <span className="w-2 h-2 rounded-full bg-amber-400 group-hover:scale-125 transition-transform" />
                    <span className="text-xs sm:text-sm font-mono text-slate-100 font-semibold group-hover:text-amber-300 transition-colors">
                      {skill.name}
                    </span>
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-black/30 text-amber-300 border border-amber-400/20">
                      {skill.category}
                    </span>
                  </div>
                ))}
              </div>

              {/* Stack Category Breakdown Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10 pt-8 border-t border-white/10">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 shadow-xs text-center">
                  <Code className="w-4 h-4 text-amber-400 mx-auto mb-1.5" />
                  <h4 className="text-xs font-mono font-bold text-white">FRONTEND</h4>
                  <p className="text-[10px] font-mono text-slate-400 mt-0.5">React &bull; Next &bull; TS</p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 shadow-xs text-center">
                  <Terminal className="w-4 h-4 text-amber-400 mx-auto mb-1.5" />
                  <h4 className="text-xs font-mono font-bold text-white">BACKEND</h4>
                  <p className="text-[10px] font-mono text-slate-400 mt-0.5">Python &bull; C# &bull; Java</p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 shadow-xs text-center">
                  <Cloud className="w-4 h-4 text-amber-400 mx-auto mb-1.5" />
                  <h4 className="text-xs font-mono font-bold text-white">CLOUD</h4>
                  <p className="text-[10px] font-mono text-slate-400 mt-0.5">AWS &bull; Terraform</p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 shadow-xs text-center">
                  <Database className="w-4 h-4 text-amber-400 mx-auto mb-1.5" />
                  <h4 className="text-xs font-mono font-bold text-white">DATA &amp; GIT</h4>
                  <p className="text-[10px] font-mono text-slate-400 mt-0.5">SQL &bull; Git &bull; GitHub</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
