"use client";

import React, { useState } from "react";
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  CheckCircle,
  Sparkles,
  Heart,
  ChevronRight,
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
      className="py-16 sm:py-20 relative border-b border-pink-500/15 scroll-mt-16 overflow-hidden"
    >
      {/* Background Soft Glows */}
      <div className="absolute top-1/2 right-8 w-80 h-80 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-lilac-glow" />
      <div className="absolute bottom-10 left-8 w-80 h-80 bg-pink-500/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-rose-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Chapter Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-8 mb-14 border-b border-pink-500/15">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/10 border border-pink-400/25 text-xs font-mono text-pink-300 uppercase tracking-widest mb-3 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>CHAPTER 03 &bull; MY JOURNEY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Milestones &amp; Experience
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-sans text-slate-300 mt-4 lg:mt-0 max-w-sm leading-relaxed">
            An interactive timeline of my professional apprenticeship at Gainwell Technologies and academic foundations in CS &amp; Physics.
          </p>
        </div>

        {/* Interactive Timeline Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Timeline Navigation Cards with Pastel Conduit */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-pink-300/80 font-bold mb-2">
              <span>SELECT A MILESTONE</span>
              <span className="text-[10px] text-purple-300 flex items-center gap-1 font-semibold">
                <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
                INTERACTIVE
              </span>
            </div>

            <div className="relative pl-7 space-y-5 before:absolute before:left-2.5 before:top-4 before:bottom-4 before:w-[2px] before:bg-gradient-to-b before:from-pink-400 before:via-purple-400 before:to-pink-300 before:shadow-[0_0_10px_rgba(244,114,182,0.5)]">
              {milestones.map((item) => {
                const isSelected = selectedMilestone === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedMilestone(item.id)}
                    className={`relative p-6 rounded-3xl transition-all duration-300 cursor-pointer scifi-glass-panel ${
                      isSelected
                        ? "border-pink-400 bg-white/[0.06] shadow-[0_0_30px_rgba(244,114,182,0.25)] -translate-y-1"
                        : "border-pink-400/20 hover:border-pink-400/40 hover:bg-white/[0.04]"
                    }`}
                  >
                    {/* Glowing Pastel Node on the timeline */}
                    <div
                      className={`absolute -left-[27px] top-7 w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center ${
                        isSelected
                          ? "bg-pink-400 border-white ring-4 ring-pink-500/40 scale-125 shadow-[0_0_12px_#f472b6]"
                          : "bg-[#12091d] border-slate-600 hover:border-pink-400"
                      }`}
                    >
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>

                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-mono text-pink-300 font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-pink-500/10 border border-pink-400/30">
                        {item.badge}
                      </span>
                      <span className="text-xs font-mono text-purple-200/80">{item.period}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-pink-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs font-mono text-purple-300 font-medium">
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

          {/* Right Column: Detailed Inspector Card */}
          <div className="lg:col-span-7">
            {milestones.map((item) => {
              if (item.id !== selectedMilestone) return null;
              return (
                <div
                  key={item.id}
                  className="p-7 sm:p-9 rounded-3xl scifi-glass-panel border-pink-400/30 shadow-2xl space-y-6 relative overflow-hidden animate-in fade-in duration-300"
                >
                  {/* Inspector Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {item.type === "experience" ? (
                          <div className="p-2 rounded-2xl bg-pink-500/20 border border-pink-400/30 text-pink-300">
                            <Briefcase className="w-4 h-4 text-pink-300" />
                          </div>
                        ) : (
                          <div className="p-2 rounded-2xl bg-purple-500/20 border border-purple-400/30 text-purple-300">
                            <GraduationCap className="w-4 h-4 text-purple-300" />
                          </div>
                        )}
                        <span className="text-xs font-mono uppercase tracking-wider text-pink-300 font-bold">
                          {item.badge}
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                        {item.title}
                      </h3>
                      <p className="text-sm font-mono text-purple-300 font-semibold mt-1">
                        {item.organization}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-1.5 text-xs font-mono text-slate-300 justify-end">
                        <Calendar className="w-3.5 h-3.5 text-pink-400" />
                        <span>{item.period}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-mono text-purple-300 justify-end mt-1">
                        <MapPin className="w-3.5 h-3.5 text-purple-400" />
                        <span>{item.location}</span>
                      </div>
                    </div>

                  </div>

                  {/* Summary Narrative */}
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-pink-300/90 font-bold mb-2">
                      ROLE OVERVIEW
                    </h4>
                    <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
                      {item.summary}
                    </p>
                  </div>

                  {/* Key Responsibilities & Contributions */}
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-pink-300/90 font-bold mb-3 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-pink-300" />
                      <span>KEY CONTRIBUTIONS &amp; LEARNINGS</span>
                    </h4>
                    <div className="space-y-2.5">
                      {item.highlights.map((highlight, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-pink-400/30 transition-colors"
                        >
                          <CheckCircle className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills Acquired & Utilized */}
                  <div className="pt-4 border-t border-white/10">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-pink-300/90 font-bold mb-3">
                      APPLIED TECHNICAL SKILLS
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs font-mono px-3 py-1.5 rounded-xl bg-purple-950/40 border border-purple-400/30 text-purple-200 font-medium hover:border-pink-400 transition-colors"
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
