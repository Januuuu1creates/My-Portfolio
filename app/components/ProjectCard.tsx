"use client";

import React, { useState } from "react";
import {
  Code2,
  Calendar,
  FileText,
  Cloud,
  Utensils,
  ChevronDown,
  ArrowUpRight,
} from "lucide-react";
import { GithubIcon } from "./icons";

export interface ProjectData {
  id: string;
  indexNumber: string;
  title: string;
  category: string;
  year: string;
  description: string;
  technologies: string[];
  keyHighlights: string[];
  iconType: "booking" | "nlp" | "cloud" | "cooking";
}

interface ProjectCardProps {
  project: ProjectData;
  isListView?: boolean;
}

export default function ProjectCard({ project, isListView = false }: ProjectCardProps) {
  const [showNotice, setShowNotice] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const renderIcon = () => {
    switch (project.iconType) {
      case "booking":
        return <Calendar className="w-5 h-5 text-amber-600" />;
      case "nlp":
        return <FileText className="w-5 h-5 text-amber-600" />;
      case "cloud":
        return <Cloud className="w-5 h-5 text-amber-600" />;
      case "cooking":
        return <Utensils className="w-5 h-5 text-amber-600" />;
      default:
        return <Code2 className="w-5 h-5 text-amber-600" />;
    }
  };

  const handleGithubClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowNotice(true);
    setTimeout(() => setShowNotice(false), 3500);
  };

  if (isListView) {
    return (
      <div className="group border-b border-amber-200/80 py-6 transition-all hover:bg-white/80 px-4 sm:px-6 rounded-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Index & Title */}
          <div className="flex items-start md:items-center gap-4">
            <span className="font-mono text-xl font-black text-amber-600 tracking-tight">
              {project.indexNumber}
            </span>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                {project.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
                {project.description}
              </p>
            </div>
          </div>

          {/* Category & Tech & Actions */}
          <div className="flex flex-wrap items-center gap-3 md:justify-end">
            <span className="text-[11px] font-mono uppercase text-amber-800 bg-amber-100/80 px-3 py-1 rounded-full border border-amber-200 font-semibold">
              {project.category}
            </span>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs font-mono font-bold text-amber-800 hover:text-amber-900 px-3 py-1.5 rounded-lg bg-amber-50/70 border border-amber-200 hover:bg-amber-100 transition-colors cursor-pointer"
            >
              {isExpanded ? "Hide Details" : "View Case Study"}
            </button>

            <button
              onClick={handleGithubClick}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-mono hover:bg-amber-700 transition-colors cursor-pointer"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </button>
          </div>
        </div>

        {/* Notice alert */}
        {showNotice && (
          <div className="mt-3 p-2 bg-slate-900 text-white text-xs font-mono rounded-lg text-center animate-in fade-in">
            Repository URL placeholder will be updated with your active repository.
          </div>
        )}

        {/* Expandable Case Study Drawer */}
        {isExpanded && (
          <div className="mt-4 p-5 rounded-2xl bg-[#FAF8F5] border border-amber-200 text-xs font-mono text-slate-700 space-y-2 animate-in fade-in slide-in-from-top-1">
            <div className="font-bold text-slate-900 text-sm mb-2">Architectural Highlights:</div>
            {project.keyHighlights.map((highlight, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-amber-600 font-bold mt-0.5">&bull;</span>
                <span>{highlight}</span>
              </div>
            ))}
            <div className="flex flex-wrap gap-2 pt-3 border-t border-amber-100 mt-2">
              {project.technologies.map((t) => (
                <span key={t} className="px-2 py-0.5 rounded bg-white border border-amber-200 text-[10px] text-amber-900 font-bold">
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
    <div className="group relative flex flex-col justify-between rounded-3xl bg-white/95 backdrop-blur-md border-2 border-amber-200/90 p-8 shadow-sm hover:shadow-xl hover:shadow-amber-900/10 hover:border-amber-400 hover:-translate-y-1.5 transition-all duration-300">
      <div>
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-amber-100">
          <div className="flex items-center gap-3">
            <span className="font-mono text-2xl font-black text-amber-600 tracking-tight">
              {project.indexNumber}
            </span>
            <span className="text-[11px] font-mono uppercase tracking-wider text-amber-900 font-bold px-3 py-1 rounded-full bg-amber-50 border border-amber-200">
              {project.category}
            </span>
          </div>

          <span className="text-xs font-mono text-slate-500 font-semibold">{project.year}</span>
        </div>

        {/* Project Title */}
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-amber-700 transition-colors mb-4 tracking-tight">
          {project.title}
        </h3>

        {/* Project Description */}
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal mb-6">
          {project.description}
        </p>

        {/* Case Study Expander */}
        <div className="mb-6">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-800 hover:text-amber-950 transition-colors cursor-pointer py-1"
          >
            <span>{isExpanded ? "[-] HIDE CASE STUDY" : "[+] VIEW CASE STUDY"}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>

          {isExpanded && (
            <div className="mt-3 p-4 rounded-2xl bg-amber-50/40 border border-amber-200 text-xs font-mono text-slate-700 space-y-2 animate-in fade-in slide-in-from-top-1">
              {project.keyHighlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-2.5">
                  <span className="text-amber-600 mt-0.5 font-bold">&bull;</span>
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div>
        <div className="flex flex-wrap gap-2 pt-4 border-t border-amber-100 mb-6">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono px-2.5 py-1 rounded-lg bg-amber-50/40 text-slate-700 border border-amber-200/80 group-hover:border-amber-300 group-hover:text-amber-900 transition-colors font-medium"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 relative">
          <button
            onClick={handleGithubClick}
            type="button"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-slate-800 bg-amber-50/60 border border-amber-200 hover:border-amber-400 hover:bg-amber-100 hover:text-amber-950 transition-all cursor-pointer shadow-xs"
          >
            <GithubIcon className="w-4 h-4 text-amber-700" />
            <span>GitHub Repo</span>
            <span className="text-[10px] text-amber-700 font-normal">
              [PLACEHOLDER]
            </span>
          </button>

          {showNotice && (
            <div className="absolute left-0 right-0 bottom-full mb-3 p-2.5 bg-slate-900 text-white text-xs font-mono rounded-xl shadow-xl text-center z-20 animate-in fade-in">
              Repository URL placeholder will be updated with your active repository.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
