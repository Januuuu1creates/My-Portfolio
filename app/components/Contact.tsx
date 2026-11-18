"use client";

import React, { useState } from "react";
import {
  Mail,
  Send,
  CheckCircle2,
  Copy,
  Check,
  ArrowUpRight,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [showGithubNotice, setShowGithubNotice] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    const subject = encodeURIComponent(`Portfolio enquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Hi Jahnavi,\n\n${formData.message}\n\nFrom: ${formData.name}\nEmail: ${formData.email}`
    );

    window.location.href = `mailto:jahnavimurthy878@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setIsSubmitting(false);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 6000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("jahnavimurthy878@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleGithubClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowGithubNotice(true);
    setTimeout(() => setShowGithubNotice(false), 3500);
  };

  return (
    <section
      id="contact"
      className="py-28 relative bg-[#FAF8F5] scroll-mt-16 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-amber-100/40 rounded-full blur-[140px] pointer-events-none -z-10 animate-bokeh" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Swiss Editorial sebg.ch Style) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-16 border-b border-amber-200/70">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-800 uppercase tracking-widest mb-2 font-bold">
              <span>[03]</span>
              <span>&mdash;</span>
              <span>GET IN TOUCH</span>
            </div>
            <h2 className="text-3xl sm:text-6xl font-black text-slate-900 tracking-tight uppercase">
              Let&apos;s Build Together
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-slate-500 mt-4 md:mt-0 max-w-sm">
            Whether you have an internship opportunity, project inquiry, or just want to connect.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact & Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 sm:p-10 rounded-3xl bg-white/90 backdrop-blur-md border border-amber-200/80 shadow-md shadow-amber-900/5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-800 font-bold">DIRECT CHANNELS</span>
              <h3 className="text-2xl font-bold text-slate-900 mt-1 mb-3">
                Drop Me A Line
              </h3>
              <p className="text-xs sm:text-sm font-mono text-slate-600 leading-relaxed mb-8">
                Currently open to software engineering roles, full-stack development internships, and collaborative software projects.
              </p>

              <div className="space-y-4">
                {/* Email Box */}
                <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200/80 shadow-xs flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 rounded-xl bg-amber-100/80 text-amber-800 flex items-center justify-center shrink-0 border border-amber-200">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-[10px] font-mono uppercase text-amber-800 font-bold">Email</span>
                      <a
                        href="mailto:jahnavimurthy878@gmail.com"
                        className="block text-xs sm:text-sm font-mono text-slate-900 font-semibold hover:text-amber-800 truncate"
                      >
                        jahnavimurthy878@gmail.com
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={copyEmail}
                    type="button"
                    className="p-2.5 rounded-xl bg-white border border-amber-200 text-amber-800 hover:text-amber-950 hover:bg-amber-100 transition-colors cursor-pointer shrink-0"
                    title="Copy email address"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* LinkedIn Link */}
                <a
                  href="https://linkedin.com/in/jahnavi-murthy-013250240/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl bg-white border border-amber-200/80 shadow-xs hover:border-amber-300 hover:bg-amber-50/50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0A66C2]/10 border border-[#0A66C2]/20 text-[#0A66C2] flex items-center justify-center shrink-0 group-hover:bg-[#0A66C2] group-hover:text-white transition-colors">
                      <LinkedinIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#0A66C2] font-bold">LinkedIn</span>
                      <p className="text-xs sm:text-sm font-mono text-slate-800 font-medium group-hover:text-amber-800 transition-colors">
                        linkedin.com/in/jahnavi-murthy-013250240
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-amber-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                </a>

                {/* GitHub Placeholder */}
                <div className="relative">
                  <button
                    onClick={handleGithubClick}
                    type="button"
                    className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border border-amber-200/80 shadow-xs hover:border-amber-300 hover:bg-amber-50/50 transition-all text-left cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 flex items-center justify-center shrink-0 group-hover:border-amber-300 transition-colors">
                        <GithubIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono uppercase text-slate-600 font-bold">GitHub</span>
                          <span className="text-[9px] font-mono bg-amber-100 text-amber-800 border border-amber-200 px-1.5 py-0.2 rounded font-bold">
                            SOON
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm font-mono text-slate-800 font-medium group-hover:text-amber-800 transition-colors">
                          Repository profile URL placeholder
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-amber-800 font-bold">CHECK</span>
                  </button>

                  {showGithubNotice && (
                    <div className="absolute left-0 right-0 top-full mt-2 p-2.5 bg-slate-900 text-white text-xs font-mono rounded-xl shadow-xl text-center z-20 animate-in fade-in">
                      GitHub URL will be updated once provided.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white/90 backdrop-blur-md border border-amber-200/80 shadow-md shadow-amber-900/5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-800 font-bold">TRANSMIT MESSAGE</span>
              <h3 className="text-2xl font-bold text-slate-900 mt-1 mb-8">
                Send A Direct Note
              </h3>

              {/* Success Feedback */}
              {submitted && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 flex items-start gap-3 animate-in fade-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider">Message Received</h4>
                    <p className="text-xs font-mono text-emerald-700 mt-0.5">
                        Your email draft was opened. Send it from your email app to complete delivery.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-mono uppercase tracking-wider text-slate-700 mb-2 font-bold"
                  >
                    Your Name <span className="text-amber-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Alex Rivera"
                    className="w-full px-4 py-3.5 rounded-2xl bg-amber-50/30 border border-amber-200 text-slate-900 placeholder-slate-400 text-sm font-mono focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all shadow-xs"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-mono uppercase tracking-wider text-slate-700 mb-2 font-bold"
                  >
                    Your Email <span className="text-amber-600">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. alex@company.com"
                    className="w-full px-4 py-3.5 rounded-2xl bg-amber-50/30 border border-amber-200 text-slate-900 placeholder-slate-400 text-sm font-mono focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all shadow-xs"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-mono uppercase tracking-wider text-slate-700 mb-2 font-bold"
                  >
                    Message Details <span className="text-amber-600">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project, team, or opportunity..."
                    className="w-full px-4 py-3.5 rounded-2xl bg-amber-50/30 border border-amber-200 text-slate-900 placeholder-slate-400 text-sm font-mono focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all shadow-xs resize-y"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-lg shadow-amber-500/25 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>TRANSMITTING...</span>
                    </>
                  ) : (
                    <>
                      <span>SEND MESSAGE [03]</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
