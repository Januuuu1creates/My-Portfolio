"use client";

import React, { useState } from "react";
import ProjectCard, { ProjectData } from "./ProjectCard";
import { LayoutGrid, List, ArrowUpRight } from "lucide-react";

const projectsData: ProjectData[] = [
  {
    id: "appointment-booking",
    indexNumber: "01",
    title: "Appointment Booking System",
    category: "Full-Stack Web App",
    year: "2026",
    description:
      "A comprehensive web application for managing appointments, scheduling bookings, and organizing user data seamlessly.",
    technologies: ["ASP.NET MVC", "C#", "Entity Framework", "SQL Server"],
    keyHighlights: [
      "Role-based booking calendar with interactive time-slot reservation",
      "Secure user profile management, session handling, and authentication",
      "Relational SQL Server schema powered by Entity Framework ORM migrations",
    ],
    iconType: "booking",
  },
  {
    id: "ai-resume-parser",
    indexNumber: "02",
    title: "AI Resume Parser",
    category: "NLP & AI System",
    year: "2026",
    description:
      "An NLP-based intelligent application that parses resume data and evaluates candidate resumes against job descriptions based on keywords.",
    technologies: ["Python", "NLP", "Scikit-learn", "Pandas"],
    keyHighlights: [
      "Automated extraction of contact details, education, technical skills & experience",
      "Vectorized TF-IDF keyword evaluation and candidate-job semantic alignment",
      "High-throughput data transformations utilizing Pandas dataframes",
    ],
    iconType: "nlp",
  },
  {
    id: "cloud-automation",
    indexNumber: "03",
    title: "Cloud Infrastructure Automation",
    category: "Cloud & DevOps",
    year: "2026",
    description:
      "Automated AWS infrastructure deployment using Terraform, featuring EC2 web servers, S3 storage buckets, and IAM security controls.",
    technologies: ["AWS", "Terraform", "Linux"],
    keyHighlights: [
      "Declarative Infrastructure as Code (IaC) for zero-drift cloud environments",
      "Automated EC2 instance orchestration and Apache web server initialization",
      "S3 object storage security paired with least-privilege IAM policies",
    ],
    iconType: "cloud",
  },
  {
    id: "ai-cooking-assistant",
    indexNumber: "04",
    title: "AI Cooking Assistant",
    category: "Smart AI Application",
    year: "2026",
    description:
      "A smart application that recommends curated culinary recipes dynamically based on ingredients provided by users in real time.",
    technologies: ["Python", "Flask", "REST APIs"],
    keyHighlights: [
      "Dynamic ingredient-to-recipe matching algorithm with pantry awareness",
      "Modular Flask backend providing clean REST endpoints and request validation",
      "Interactive step-by-step culinary preparation walkthroughs and dietary flags",
    ],
    iconType: "cooking",
  },
];

export default function Projects() {
  const [filter, setFilter] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filterTabs = [
    { label: "All [04]", value: "All" },
    { label: "Full-Stack", value: "Full-Stack Web App" },
    { label: "AI & NLP", value: "AI" },
    { label: "Cloud & DevOps", value: "Cloud & DevOps" },
  ];

  const filteredProjects =
    filter === "All"
      ? projectsData
      : filter === "AI"
      ? projectsData.filter((p) => p.category.includes("AI") || p.category.includes("NLP"))
      : projectsData.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
      className="py-28 relative bg-[#FAF8F5] border-b border-amber-200/70 scroll-mt-16 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-amber-200/25 rounded-full blur-[130px] pointer-events-none -z-10 animate-bokeh" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-yellow-100/40 rounded-full blur-[130px] pointer-events-none -z-10 animate-bokeh [animation-delay:2s]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Swiss Editorial sebg.ch Style) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-12 border-b border-amber-200/70">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-800 uppercase tracking-widest mb-2 font-bold">
              <span>[02]</span>
              <span>&mdash;</span>
              <span>SELECTED CASE STUDIES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight uppercase">
              Featured Projects
            </h2>
          </div>

          {/* Filters & View Mode Switcher */}
          <div className="flex flex-wrap items-center gap-3 mt-6 md:mt-0">
            {/* View Mode Toggle (Grid vs Editorial List) */}
            <div className="flex items-center p-1 bg-white/90 rounded-xl border border-amber-200/80 shadow-xs">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-amber-500 text-white shadow-xs"
                    : "text-slate-500 hover:text-amber-700"
                }`}
                title="Grid Card View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  viewMode === "list"
                    ? "bg-amber-500 text-white shadow-xs"
                    : "text-slate-500 hover:text-amber-700"
                }`}
                title="Editorial List View (sebg.ch style)"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-white/90 rounded-2xl border border-amber-200/80 shadow-xs">
              {filterTabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setFilter(tab.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer ${
                    filter === tab.value
                      ? "bg-amber-500 text-white shadow-md shadow-amber-500/25 font-bold"
                      : "text-slate-600 hover:text-amber-800 hover:bg-amber-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Display: Either List or Grid View */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} isListView={false} />
            ))}
          </div>
        ) : (
          <div className="space-y-3 bg-white/90 backdrop-blur-md p-4 sm:p-6 rounded-3xl border border-amber-200/80 shadow-sm">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} isListView={true} />
            ))}
          </div>
        )}

        {/* Bottom Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-amber-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-800 font-bold">NEXT CHAPTER</span>
            <h4 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
              Looking for a dedicated Software Engineer or Full-Stack Contributor?
            </h4>
            <p className="text-xs font-mono text-slate-600 mt-1">
              Let&apos;s build fast, responsive, and robust digital systems together.
            </p>
          </div>
          <a
            href="#contact"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-md shadow-amber-500/25 transition-all"
          >
            <span>Start Conversation [03]</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
