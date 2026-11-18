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
import FloatingCompanion from "./components/FloatingCompanion";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col text-slate-100 selection:bg-violet-500/30 selection:text-violet-200 relative bg-[#030712] overflow-x-hidden">
      {/* 1. Cinematic Three.js Interactive Particle Constellation */}
      <ThreeCanvas />

      {/* 2. Ambient Violet & Electric Blue Glow Highlights */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[160px] pointer-events-none -z-10 animate-violet-glow" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[160px] pointer-events-none -z-10 animate-blue-glow" />

      {/* 3. Global Navbar */}
      <Navbar />

      {/* 4. Main Interactive Story Chapters */}
      <main className="flex-1">
        {/* Chapter 01: Introduction & Meeting Jahnavi with 3D Companion */}
        <HeroStory />

        {/* Chapter 02: About Me — The Person Behind the Code */}
        <AboutStory />

        {/* Chapter 03: My Journey — Interactive Experience & Education Timeline */}
        <JourneyTimeline />

        {/* Chapter 04: What I Work With — Interactive Engineering Workbench */}
        <Workbench />

        {/* Chapter 05: Featured Projects — Individual Visual Experiences */}
        <ProjectsShowcase />

        {/* Chapter 06: Certifications — Technical Credentials */}
        <CertificationsShowcase />

        {/* Chapter 07: Let's Connect — The Conversational Farewell */}
        <ContactStory />
      </main>

      {/* 5. Footer */}
      <FooterStory />

      {/* 6. Docked 3D Robot Companion Guide */}
      <FloatingCompanion />
    </div>
  );
}
