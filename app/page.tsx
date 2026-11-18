import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FloatingDoll from "./components/FloatingDoll";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-slate-800 selection:bg-amber-200 selection:text-amber-950 relative">
      {/* 1. Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 2. Hero Section with the Cute 3D Walking Robot */}
        <Hero />

        {/* 3. About Section */}
        <About />

        {/* 4. Projects Section with Swiss Case Studies */}
        <Projects />

        {/* 5. Contact Section */}
        <Contact />
      </main>

      {/* 6. Footer Section */}
      <Footer />

      {/* Floating Scroll-Following 3D Companion Robot */}
      <FloatingDoll />
    </div>
  );
}
