"use client";

import React from "react";
import { Briefcase, Calendar, MapPin, CheckCircle, ArrowUpRight } from "lucide-react";

interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  summary: string;
  responsibilities: string[];
  skills: string[];
}

const experiences: ExperienceItem[] = [
  {
    role: "Apprentice – Software Development",
    company: "Gainwell Technologies",
    location: "Bangalore, India",
    period: "July 2025 – January 2026",
    type: "Professional Apprenticeship",
    summary:
      "Contributed as a Software Development Apprentice, engaging with enterprise software development cycles, collaborative engineering workflows, and modern programming standards.",
    responsibilities: [
      "Engaged in full-stack software engineering tasks, writing maintainable code and participating in sprint cycles.",
      "Collaborated with cross-functional development teams on feature implementation, code reviews, and defect resolution.",
      "Applied modern software development methodologies, version control with Git, and enterprise best practices.",
    ],
    skills: ["Software Engineering", "Full-Stack Development", "Problem Solving", "Git", "Agile / Scrum"],
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-28 relative border-b border-white/10 scroll-mt-16 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-[130px] pointer-events-none -z-10 animate-bokeh" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none -z-10 animate-bokeh [animation-delay:2s]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Swiss Minimalist sebg.ch Style) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-16 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest mb-2 font-bold">
              <span>[02]</span>
              <span>&mdash;</span>
              <span>PROFESSIONAL TIMELINE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
              Experience
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-slate-400 mt-4 md:mt-0 max-w-sm">
            Professional industry experience contributing to software development and collaborative engineering.
          </p>
        </div>

        {/* Experience Timeline Cards */}
        <div className="space-y-8">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="p-8 sm:p-10 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-2xl relative overflow-hidden group hover:border-amber-400/40 transition-all duration-300"
            >
              {/* Top Row: Role, Company & Period */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-xs font-mono font-bold text-amber-300 bg-amber-400/20 px-3 py-1 rounded-full border border-amber-400/30 uppercase tracking-wider">
                      {exp.type}
                    </span>
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>{exp.location}</span>
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-amber-300 transition-colors">
                    {exp.role}
                  </h3>

                  <div className="flex items-center gap-2 mt-1">
                    <Briefcase className="w-4 h-4 text-amber-400" />
                    <span className="text-lg font-semibold text-slate-200">
                      {exp.company}
                    </span>
                  </div>
                </div>

                {/* Period Badge */}
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-amber-200 shrink-0">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>{exp.period}</span>
                </div>
              </div>

              {/* Summary */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal my-6">
                {exp.summary}
              </p>

              {/* Responsibilities */}
              <div className="space-y-3 mb-6">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  Key Focus Areas &amp; Contributions:
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {exp.responsibilities.map((resp, rIdx) => (
                    <div
                      key={rIdx}
                      className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-3"
                    >
                      <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <p className="text-xs font-mono text-slate-300 leading-relaxed">
                        {resp}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2 pt-6 border-t border-white/10">
                {exp.skills.map((s) => (
                  <span
                    key={s}
                    className="text-xs font-mono px-3 py-1 rounded-lg bg-black/40 text-amber-300 border border-amber-400/20 font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
