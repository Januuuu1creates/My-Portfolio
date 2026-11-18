"use client";

import React, { useState } from "react";
import {
  Code2,
  Calendar,
  FileText,
  Cloud,
  Utensils,
  ChevronDown,
  Target,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { GithubIcon } from "./icons";

export interface ProjectData {
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
  iconType: "booking" | "nlp" | "cloud" | "cooking";
}

interface ProjectCardProps {
  project: ProjectData;
  isListView?: boolean;
}

export default function ProjectCard({ project, isListView = false }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const renderIcon = () => {
    switch (project.iconType) {
      case "booking":
        return <Calendar className="w-5 h-5 text-amber-400" />;
      case "nlp":
        return <FileText className="w-5 h-5 text-amber-400" />;
      case "cloud":
        return <Cloud className="w-5 h-5 text-amber-400" />;
      case "cooking":
        return <Utensils className="w-5 h-5 text-amber-400" />;
      default:
        return <Code2 className="w-5 h-5 text-amber-400" />;
    }
  };

  if (isListView) {
    return (
      <div className="group border-b border-white/10 py-6 transition-all hover:bg-white/5 px-4 sm:px-6 rounded-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Index & Title */}
          <div className="flex items-start md:items-center gap-4">
            <span className="font-mono text-xl font-black text-amber-400 tracking-tight">
              {project.indexNumber}
            </span>
            <div>
              <div className="flex items-center gap-2">
                {renderIcon()}
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                  {project.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                {project.description}
              </p>
            </div>
          </div>

          {/* Category & Tech & Actions */}
          <div className="flex flex-wrap items-center gap-3 md:justify-end">
            <span className="text-[11px] font-mono uppercase text-amber-300 bg-amber-400/20 px-3 py-1 rounded-full border border-amber-400/30 font-semibold">
              {project.category}
            </span>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs font-mono font-bold text-amber-300 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-amber-400/50 transition-colors cursor-pointer"
            >
              {isExpanded ? "Hide Details" : "View Case Study"}
            </button>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 text-slate-950 font-bold text-xs font-mono hover:bg-amber-300 transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub Profile ↗</span>
            </a>
          </div>
        </div>

        {/* Expandable Case Study Drawer */}
        {isExpanded && (
          <div className="mt-4 p-5 rounded-2xl bg-black/40 border border-white/10 text-xs font-mono text-slate-300 space-y-3 animate-in fade-in slide-in-from-top-1">
            {/* Objective */}
            <div className="flex items-start gap-2 bg-white/5 p-3 rounded-xl border border-white/5">
              <Target className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-300 uppercase tracking-wider block mb-0.5">Project Objective:</span>
                <span className="text-slate-200">{project.objective}</span>
              </div>
            </div>

            {/* Key Features */}
            <div>
              <div className="font-bold text-white text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Key Architectural Features:</span>
              </div>
              <div className="space-y-1.5 pl-1">
                {project.keyHighlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold mt-0.5">&bull;</span>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 pt-3 border-t border-white/10 mt-2">
              {project.technologies.map((t) => (
                <span key={t} className="px-2 py-0.5 rounded bg-white/10 border border-white/10 text-[10px] text-amber-300 font-bold">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Grid Card View
  return (
    <div className="group relative flex flex-col justify-between rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/10 p-8 shadow-2xl hover:border-amber-400/50 hover:shadow-amber-500/10 hover:-translate-y-1.5 transition-all duration-300">
      <div>
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="font-mono text-2xl font-black text-amber-400 tracking-tight">
              {project.indexNumber}
            </span>
            <span className="text-[11px] font-mono uppercase tracking-wider text-amber-300 font-bold px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/30">
              {project.category}
            </span>
          </div>

          <span className="text-xs font-mono text-slate-400 font-semibold">{project.year}</span>
        </div>

        {/* Project Title */}
        <div className="flex items-center gap-2 mb-3">
          {renderIcon()}
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-amber-300 transition-colors tracking-tight">
            {project.title}
          </h3>
        </div>

        {/* Project Description */}
        <p className="text-sm text-slate-300 leading-relaxed font-normal mb-5">
          {project.description}
        </p>

        {/* Project Objective Box */}
        <div className="mb-5 p-3.5 rounded-2xl bg-white/5 border border-white/5 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-amber-300 font-bold uppercase tracking-wider mb-1 text-[11px]">
            <Target className="w-3.5 h-3.5 text-amber-400" />
            <span>Objective:</span>
          </div>
          <p className="text-slate-300 leading-relaxed font-normal text-[11.5px]">
            {project.objective}
          </p>
        </div>

        {/* Case Study Expander for Key Features */}
        <div className="mb-6">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 hover:text-white transition-colors cursor-pointer py-1"
          >
            <span>{isExpanded ? "[-] HIDE KEY FEATURES" : "[+] VIEW KEY ARCHITECTURAL FEATURES"}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>

          {isExpanded && (
            <div className="mt-3 p-4 rounded-2xl bg-black/40 border border-white/10 text-xs font-mono text-slate-300 space-y-2 animate-in fade-in slide-in-from-top-1">
              {project.keyHighlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-2.5">
                  <span className="text-amber-400 mt-0.5 font-bold">&bull;</span>
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section: Technologies & Clean GitHub Link */}
      <div>
        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10 mb-6">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono px-2.5 py-1 rounded-lg bg-white/5 text-slate-300 border border-white/10 group-hover:border-amber-400/40 group-hover:text-amber-300 transition-colors font-medium"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Clean, clearly labelled GitHub profile link */}
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-mono font-extrabold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-110 transition-all shadow-lg shadow-amber-500/20"
        >
          <GithubIcon className="w-4 h-4 text-slate-950" />
          <span>View on GitHub &bull; Januuuu1creates ↗</span>
        </a>
      </div>
    </div>
  );
}
