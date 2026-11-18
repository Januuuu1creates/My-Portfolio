import Navbar from "./components/Navbar";
import ThreeCanvas from "./components/ThreeCanvas";
import HeroStory from "./components/HeroStory";
import AboutStory from "./components/AboutStory";
import JourneyTimeline from "./components/JourneyTimeline";
import ProgrammingSkills from "./components/ProgrammingSkills";
import Workbench from "./components/Workbench";
import ProjectsShowcase from "./components/ProjectsShowcase";
import CertificationsShowcase from "./components/CertificationsShowcase";
import ContactStory from "./components/ContactStory";
import FooterStory from "./components/FooterStory";
import ToyGuide from "./components/ToyGuide";

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col text-slate-100 selection:bg-pink-500/30 selection:text-pink-200 relative bg-[#0d071a] overflow-x-hidden"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(13, 7, 26, 0.42), rgba(13, 7, 26, 0.66)), url('/site-background.webp')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      {/* 1. Dreamy Three.js 3D Cosmic Space with Twinkling Stars, Hanging Fairy Lights & Bokeh */}
      <ThreeCanvas />

      {/* 2. Soft Ambient Lighting Matching Artwork Rim Lights */}
      {/* Violet rim glow */}
      <div className="fixed top-0 -left-20 w-[600px] h-[600px] bg-purple-500/12 rounded-full blur-[160px] pointer-events-none -z-10" />
      {/* Magenta/Pink Glow (matches right hair highlight & neon heart) */}
      <div className="fixed top-10 right-0 w-[600px] h-[600px] bg-pink-500/15 rounded-full blur-[170px] pointer-events-none -z-10 animate-rose-glow" />

      {/* 3. Global Minimal Navbar */}
      <Navbar />

      {/* 4. Main Portfolio Story Chapters */}
      <main className="flex-1">
        {/* Chapter 01: Introduction & Identity */}
        <HeroStory />

        {/* Chapter 02: About Me — The Person Behind the Code */}
        <AboutStory />

        {/* Chapter 03: My Journey — Experience & Education Timeline */}
        <JourneyTimeline />

        {/* Chapter 04-A: Programming Skills with Animated Percentage Bars */}
        <ProgrammingSkills />

        {/* Chapter 04-B: What I Work With — Engineering Workbench */}
        <Workbench />

        {/* Chapter 05: Featured Projects — Individual Case Studies */}
        <ProjectsShowcase />

        {/* Chapter 06: Certifications — Technical Credentials */}
        <CertificationsShowcase />

        {/* Chapter 07: Let's Connect — Farewell & Contact */}
        <ContactStory />
      </main>

      {/* 5. Minimal Footer */}
      <FooterStory />

      {/* 6. Interactive portfolio guide */}
      <ToyGuide />
    </div>
  );
}
