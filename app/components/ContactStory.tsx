"use client";

import React, { useState } from "react";
import {
  Mail,
  Send,
  CheckCircle2,
  Copy,
  Check,
  ArrowUpRight,
  Sparkles,
  MapPin,
  MessageSquare,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { soundFX } from "./soundFx";

export default function ContactStory() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    soundFX.playChime();
    setIsSubmitting(true);
    const subject = encodeURIComponent(`Portfolio enquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Hi Jahnavi,\n\n${formData.message}\n\nFrom: ${formData.name}\nEmail: ${formData.email}`
    );

    window.location.href = `mailto:jahnavimurthy1111@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setIsSubmitting(false);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 6000);
  };

  const copyEmail = () => {
    soundFX.playSparkle();
    navigator.clipboard.writeText("jahnavimurthy1111@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section
      id="contact"
      className="py-28 relative scroll-mt-16 overflow-hidden"
    >
      {/* Background Ambient Violet & Blue Glows */}
      <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[150px] pointer-events-none -z-10 animate-violet-glow" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-sky-500/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-blue-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Chapter Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-16 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-violet-400 uppercase tracking-widest mb-2 font-bold">
              <span>[07]</span>
              <span>&mdash;</span>
              <span>CHAPTER 07 &bull; THE FAREWELL</span>
            </div>
            <h2 className="text-3xl sm:text-6xl font-black text-white tracking-tight uppercase">
              Let&apos;s Connect
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-slate-400 mt-4 md:mt-0 max-w-sm">
            Whether you have a software engineering opportunity, full-stack role, or collaborative project in mind.
          </p>
        </div>

        {/* Conversational Callout Requested by User */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-violet-950/40 via-indigo-950/30 to-slate-900/60 border border-violet-500/40 backdrop-blur-xl shadow-2xl text-center max-w-3xl mx-auto">
          <p className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
            &ldquo;Enjoyed exploring my world? Let&apos;s connect and build something meaningful.&rdquo;
          </p>
          <p className="text-xs sm:text-sm font-mono text-sky-300 mt-2">
            Open to software engineering roles &bull; Bengaluru, India &bull; Available 2026
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-2xl">
              <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-bold">
                DIRECT CHANNELS
              </span>
              <h3 className="text-2xl font-bold text-white mt-1 mb-3">
                Drop Me A Line
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-8">
                I am actively seeking software engineering roles, full-stack development opportunities, and challenging software engineering projects.
              </p>

              <div className="space-y-4">
                {/* Email Box */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 shadow-xs flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 rounded-xl bg-violet-600/20 text-violet-300 flex items-center justify-center shrink-0 border border-violet-500/30">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-[10px] font-mono uppercase text-violet-400 font-bold block">
                        Email Address
                      </span>
                      <a
                        href="mailto:jahnavimurthy1111@gmail.com"
                        className="block text-xs sm:text-sm font-mono text-white font-semibold hover:text-violet-300 truncate transition-colors"
                      >
                        jahnavimurthy1111@gmail.com
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={copyEmail}
                    type="button"
                    className="p-2.5 rounded-xl bg-white/10 border border-white/10 text-sky-300 hover:text-white hover:bg-white/20 transition-colors cursor-pointer shrink-0"
                    title="Copy email address"
                  >
                    {copiedEmail ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* LinkedIn Link */}
                <a
                  href="https://www.linkedin.com/in/jahnavi-murthy-013250240/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 shadow-xs hover:border-violet-500/50 hover:bg-white/10 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0A66C2]/20 border border-[#0A66C2]/40 text-[#0A66C2] flex items-center justify-center shrink-0 group-hover:bg-[#0A66C2] group-hover:text-white transition-colors">
                      <LinkedinIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#0A66C2] font-bold block">
                        LinkedIn Profile
                      </span>
                      <p className="text-xs sm:text-sm font-mono text-slate-200 font-medium group-hover:text-violet-300 transition-colors">
                        linkedin.com/in/jahnavi-murthy-013250240
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-violet-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                </a>

                {/* GitHub Verified Link */}
                <a
                  href="https://github.com/Januuuu1creates"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 shadow-xs hover:border-violet-500/50 hover:bg-white/10 transition-all text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 text-white flex items-center justify-center shrink-0 group-hover:border-violet-400/50 group-hover:text-violet-300 transition-colors">
                      <GithubIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                        GitHub Profile
                      </span>
                      <p className="text-xs sm:text-sm font-mono text-slate-200 font-medium group-hover:text-violet-300 transition-colors">
                        github.com/Januuuu1creates
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-violet-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Note Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-2xl">
              <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-bold">
                TRANSMIT MESSAGE
              </span>
              <h3 className="text-2xl font-bold text-white mt-1 mb-8">
                Send A Direct Note
              </h3>

              {/* Success Feedback */}
              {submitted && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-950/60 border border-emerald-400/40 text-emerald-200 flex items-start gap-3 animate-in fade-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider">
                      Message Draft Opened
                    </h4>
                    <p className="text-xs font-mono text-emerald-300 mt-0.5">
                      Your email application has opened with your drafted message to jahnavimurthy1111@gmail.com!
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2 font-bold"
                  >
                    Your Name <span className="text-violet-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Alex Rivera"
                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-white placeholder-slate-500 text-sm font-sans transition-all outline-hidden"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2 font-bold"
                  >
                    Your Email Address <span className="text-violet-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. alex@company.com"
                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-white placeholder-slate-500 text-sm font-sans transition-all outline-hidden"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2 font-bold"
                  >
                    Message <span className="text-violet-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your team, role, or project opportunity..."
                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-white placeholder-slate-500 text-sm font-sans transition-all outline-hidden resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl font-mono text-xs font-extrabold uppercase tracking-wider text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-sky-600 hover:brightness-110 shadow-lg shadow-violet-600/30 transition-all cursor-pointer hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Note to Jahnavi ↗</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
