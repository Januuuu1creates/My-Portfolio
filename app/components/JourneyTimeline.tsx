"use client";

import React, { useState } from "react";
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  CheckCircle,
  Sparkles,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

interface Milestone {
  id: string;
  period: string;
  title: string;
  organization: string;
  location: string;
  type: "experience" | "education";
  badge: string;
  summary: string;
  highlights: string[];
  skills: string[];
}

const milestones: Milestone[] = [
  {
    id: "gainwell",
    period: "July 2025 – January 2026",
    title: "Apprentice – Software Development",
    organization: "Gainwell Technologies",
    location: "Bangalore, India",
    type: "experience",
    badge: "Professional Experience",
    summary:
      "Contributed as a Software Development Apprentice, engaging with enterprise software development cycles, collaborative engineering workflows, and modern programming standards.",
    highlights: [
      "Engaged in full-stack software engineering tasks, writing maintainable code and participating in agile sprint cycles.",
      "Collaborated with cross-functional development teams on feature implementation, peer code reviews, and defect resolution.",
      "Applied modern software development methodologies, version control with Git, and enterprise best practices.",
      "Contributed to software quality improvements and proactive technical problem-solving in production environments.",
    ],
    skills: ["Software Engineering", "Full-Stack Development", "Problem Solving", "Git Collaboration", "Agile / Scrum"],
  },
  {
    id: "bachelors",
    period: "2022 – 2026",
    title: "Bachelors in Computer Science & Physics",
    organization: "Undergraduate Degree",
    location: "Bangalore, India",
    type: "education",
    badge: "Academic Foundation",
    summary:
      "Dual-disciplinary academic program combining computational algorithm design, object-oriented programming, and mathematical physics modeling.",
    highlights: [
      "Mastered fundamental computer science principles: data structures, algorithmic design, OOP in Java and C#, and relational databases.",
      "Gained deep mathematical and analytical foundations through theoretical and computational physics coursework.",
      "Developed independent engineering projects spanning full-stack web platforms, machine learning resume parsing, and cloud automation.",
    ],
    skills: ["Data Structures & Algorithms", "Java", "C#", "Python", "SQL", "Computational Physics", "Object-Oriented Design"],
  },
];

export default function JourneyTimeline() {
  const [selectedMilestone, setSelectedMilestone] = useState<string>("gainwell");

  return (
    <section
      id="journey"
      className="py-28 relative border-b border-white/10 scroll-mt-16 overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-violet-600/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-violet-glow" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-sky-500/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-blue-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Chapter Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-16 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-violet-400 uppercase tracking-widest mb-2 font-bold">
              <span>[03]</span>
              <span>&mdash;</span>
              <span>CHAPTER 03 &bull; MY JOURNEY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
              Milestones &amp; Experience
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-slate-400 mt-4 md:mt-0 max-w-sm">
            An interactive timeline of my professional apprenticeship at Gainwell Technologies and academic foundations in CS &amp; Physics.
          </p>
        </div>

        {/* Interactive Timeline Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Timeline Navigation Cards */}
          <div className="lg:col-span-5 space-y-4">
            <p className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold mb-2">
              SELECT A MILESTONE TO INSPECT
            </p>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-violet-500 before:via-sky-400 before:to-indigo-500">
              {milestones.map((item, index) => {
                const isSelected = selectedMilestone === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedMilestone(item.id)}
                    className={`relative p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? "bg-slate-900/90 border-violet-500/60 shadow-[0_10px_35px_rgba(139,92,246,0.25)] -translate-y-1"
                        : "bg-slate-900/40 border-white/10 hover:border-white/20 hover:bg-slate-900/60"
                    }`}
                  >
                    {/* Node Indicator on the timeline line */}
                    <div
                      className={`absolute -left-7 top-7 w-3.5 h-3.5 rounded-full border-2 transition-all ${
                        isSelected
                          ? "bg-violet-400 border-white ring-4 ring-violet-500/30 scale-125"
                          : "bg-slate-900 border-slate-500"
                      }`}
                    />

                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-mono text-sky-400 font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-sky-500/10 border border-sky-400/20">
                        {item.badge}
                      </span>
                      <span className="text-xs font-mono text-slate-400">{item.period}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs font-mono text-violet-300 font-medium">
                      {item.organization} &bull; {item.location}
                    </p>

                    <p className="text-xs text-slate-300 leading-relaxed mt-3 line-clamp-2">
                      {item.summary}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Detailed Interactive Milestone Inspector */}
          <div className="lg:col-span-7">
            {milestones.map((item) => {
              if (item.id !== selectedMilestone) return null;
              return (
                <div
                  key={item.id}
                  className="p-8 sm:p-10 rounded-3xl bg-slate-900/70 backdrop-blur-xl border border-violet-500/30 shadow-2xl space-y-6 animate-in fade-in duration-300"
                >
                  {/* Inspector Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {item.type === "experience" ? (
                          <Briefcase className="w-5 h-5 text-violet-400" />
                        ) : (
                          <GraduationCap className="w-5 h-5 text-sky-400" />
                        )}
                        <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold">
                          {item.badge}
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                        {item.title}
                      </h3>
                      <p className="text-sm font-mono text-violet-300 font-semibold mt-1">
                        {item.organization}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-1.5 text-xs font-mono text-slate-300 justify-end">
                        <Calendar className="w-3.5 h-3.5 text-violet-400" />
                        <span>{item.period}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 justify-end mt-1">
                        <MapPin className="w-3.5 h-3.5 text-sky-400" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Summary Narrative */}
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
                      ROLE OVERVIEW
                    </h4>
                    <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
                      {item.summary}
                    </p>
                  </div>

                  {/* Key Responsibilities & Contributions */}
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                      <span>KEY CONTRIBUTIONS &amp; LEARNINGS</span>
                    </h4>
                    <div className="space-y-2.5">
                      {item.highlights.map((highlight, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/5"
                        >
                          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills Acquired & Utilized */}
                  <div className="pt-4 border-t border-white/10">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3">
                      APPLIED TECHNICAL SKILLS
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs font-mono px-3 py-1.5 rounded-xl bg-violet-600/20 border border-violet-500/40 text-violet-200 font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
