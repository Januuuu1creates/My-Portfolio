"use client";

import React from "react";
import { Award, CheckCircle2, ShieldCheck, ArrowUpRight } from "lucide-react";

interface CertificationItem {
  title: string;
  issuer: string;
  domain: string;
  description: string;
  skills: string[];
}

const certifications: CertificationItem[] = [
  {
    title: "Cloud Infrastructure & AWS Fundamentals",
    issuer: "Technical Foundations",
    domain: "Cloud Computing",
    description:
      "Core training in cloud architectural principles, virtual servers (EC2), scalable object storage (S3), network security, and Infrastructure as Code with Terraform.",
    skills: ["AWS", "Terraform", "Cloud Architecture", "Linux", "IAM"],
  },
  {
    title: "Python for Data Science & AI Systems",
    issuer: "Data & AI Foundations",
    domain: "Artificial Intelligence",
    description:
      "Specialized coursework focusing on Python programming, Natural Language Processing (NLP) models, algorithmic data parsing, and Scikit-learn predictive systems.",
    skills: ["Python", "NLP", "Scikit-learn", "Pandas", "REST APIs"],
  },
  {
    title: "Full-Stack Web Engineering & C# / .NET",
    issuer: "Software Development",
    domain: "Full-Stack Web",
    description:
      "Comprehensive engineering training across modern frontend frameworks (React, Next.js, TypeScript) and backend systems with ASP.NET MVC, C#, and SQL Server.",
    skills: ["React.js", "Next.js", "TypeScript", "ASP.NET MVC", "C#", "SQL Server"],
  },
];

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="py-28 relative border-b border-white/10 scroll-mt-16 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-[130px] pointer-events-none -z-10 animate-bokeh" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Swiss Minimalist sebg.ch Style) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-16 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest mb-2 font-bold">
              <span>[04]</span>
              <span>&mdash;</span>
              <span>VERIFIED LEARNING &amp; CREDENTIALS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
              Certifications
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-slate-400 mt-4 md:mt-0 max-w-sm">
            Continuous technical education, cloud credentials, and specialized engineering training.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {certifications.map((cert, idx) => (
            <div
              key={idx}
              className="group p-8 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col justify-between hover:border-amber-400/50 hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300 font-bold px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/30">
                    {cert.domain}
                  </span>
                  <Award className="w-5 h-5 text-amber-400" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-amber-300 transition-colors mb-2 tracking-tight">
                  {cert.title}
                </h3>

                <p className="text-xs font-mono text-slate-400 mb-4 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{cert.issuer}</span>
                </p>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal mb-6">
                  {cert.description}
                </p>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
                {cert.skills.map((s) => (
                  <span
                    key={s}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-amber-200 border border-white/10"
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
