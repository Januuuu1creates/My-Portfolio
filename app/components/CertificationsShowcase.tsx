"use client";

import React, { useState } from "react";
import { Award, CheckCircle2, ShieldCheck, Sparkles, Shield, Heart } from "lucide-react";

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
      className="py-16 sm:py-20 relative border-b border-pink-500/15 scroll-mt-16 overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-lilac-glow" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-pink-500/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-rose-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Chapter Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-14 border-b border-pink-500/15">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/10 border border-pink-400/25 text-xs font-mono text-pink-300 uppercase tracking-widest mb-3 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>CHAPTER 06 &bull; CERTIFICATIONS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Technical Credentials
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-sans text-slate-300 mt-4 md:mt-0 max-w-sm leading-relaxed">
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
                className={`group relative flex flex-col justify-between p-7 sm:p-8 rounded-3xl transition-all duration-300 cursor-pointer scifi-glass-panel ${
                  isSelected
                    ? "bg-white/[0.08] border-pink-400 shadow-[0_0_30px_rgba(244,114,182,0.25)] -translate-y-1"
                    : "border-pink-400/20 hover:border-pink-400/40 hover:bg-white/[0.04]"
                }`}
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
                    <span className="text-xs font-mono text-pink-300 font-bold uppercase tracking-wider">
                      [0{index + 1}] &bull; {cert.domain}
                    </span>
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-pink-300 font-semibold px-2.5 py-0.5 rounded-full bg-pink-500/10 border border-pink-400/30">
                      <ShieldCheck className="w-3.5 h-3.5 text-pink-400" />
                      <span>VERIFIED</span>
                    </div>
                  </div>

                  {/* Title & Issuer */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-pink-300 transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-xs font-mono text-purple-300 font-medium mb-4">
                    {cert.issuer}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans mb-6">
                    {cert.description}
                  </p>
                </div>

                {/* Skills Chips */}
                <div className="pt-4 border-t border-white/10">
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-xl bg-purple-950/40 border border-purple-400/30 text-purple-200"
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
