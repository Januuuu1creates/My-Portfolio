"use client";

import React, { useState } from "react";
import { Award, CheckCircle2, ShieldCheck, ArrowUpRight, Sparkles, BookOpen } from "lucide-react";

interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  domain: string;
  description: string;
  skills: string[];
}

const certifications: CertificationItem[] = [
  {
    id: "cloud-aws",
    title: "Cloud Infrastructure & AWS Fundamentals",
    issuer: "Technical Foundations",
    domain: "Cloud Computing",
    description:
      "Core training in cloud architectural principles, virtual servers (EC2), scalable object storage (S3), network security, and Infrastructure as Code with Terraform.",
    skills: ["AWS EC2", "S3 Storage", "Terraform IaC", "Cloud Architecture", "Linux", "IAM Security"],
  },
  {
    id: "python-ai",
    title: "Python for Data Science & AI Systems",
    issuer: "Data & AI Foundations",
    domain: "Artificial Intelligence",
    description:
      "Specialized coursework focusing on Python programming, Natural Language Processing (NLP) models, algorithmic data parsing, and Scikit-learn predictive systems.",
    skills: ["Python", "Natural Language Processing (NLP)", "Scikit-learn", "Pandas", "REST APIs", "Data Normalization"],
  },
  {
    id: "fullstack-dotnet",
    title: "Full-Stack Web Engineering & C# / .NET",
    issuer: "Software Development",
    domain: "Full-Stack Web Engineering",
    description:
      "Comprehensive engineering training across modern frontend frameworks (React, Next.js, TypeScript) and backend systems with ASP.NET MVC, C#, and SQL Server.",
    skills: ["React.js", "Next.js", "TypeScript", "ASP.NET MVC", "C#", "SQL Server", "Entity Framework"],
  },
];

export default function CertificationsShowcase() {
  const [activeCert, setActiveCert] = useState<string>("cloud-aws");

  return (
    <section
      id="certifications"
      className="py-28 relative border-b border-white/10 scroll-mt-16 overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-violet-600/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-violet-glow" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-blue-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Chapter Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-16 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-violet-400 uppercase tracking-widest mb-2 font-bold">
              <span>[06]</span>
              <span>&mdash;</span>
              <span>CHAPTER 06 &bull; CERTIFICATIONS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
              Technical Credentials
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-slate-400 mt-4 md:mt-0 max-w-sm">
            Continuous technical growth validating core proficiencies in cloud automation, AI systems, and full-stack engineering.
          </p>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certifications.map((cert, index) => {
            const isSelected = activeCert === cert.id;
            return (
              <div
                key={cert.id}
                onClick={() => setActiveCert(cert.id)}
                className={`group relative flex flex-col justify-between p-7 sm:p-8 rounded-3xl border transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-slate-900/90 border-violet-500/60 shadow-[0_10px_35px_rgba(139,92,246,0.25)] -translate-y-1"
                    : "bg-slate-900/40 border-white/10 hover:border-violet-500/40 hover:bg-slate-900/70"
                }`}
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
                    <span className="text-xs font-mono text-violet-400 font-bold uppercase tracking-wider">
                      [0{index + 1}] &bull; {cert.domain}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>VERIFIED</span>
                    </div>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2.5 rounded-xl bg-violet-600/20 text-violet-300 border border-violet-500/30 shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-violet-300 transition-colors">
                        {cert.title}
                      </h3>
                      <p className="text-xs font-mono text-slate-400 mt-0.5">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans mb-6">
                    {cert.description}
                  </p>
                </div>

                {/* Skills Tags */}
                <div>
                  <div className="pt-4 border-t border-white/10 flex flex-wrap gap-1.5">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-sky-300 font-medium"
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
    </section>
  );
}
