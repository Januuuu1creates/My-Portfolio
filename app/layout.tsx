import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jahnavi Murthy — Software Engineer & Interactive Portfolio",
  description:
    "Explore the personal world, journey, and software engineering work of Jahnavi Murthy. Bachelors in Computer Science & Physics, former Gainwell Technologies Software Development Apprentice, and Full-Stack & Cloud engineer.",
  keywords: [
    "Jahnavi Murthy",
    "V Jahnavi Murthy",
    "Software Engineer",
    "Full-Stack Developer",
    "Portfolio",
    "Interactive Portfolio",
    "Gainwell Technologies",
    "Python",
    "AWS",
    "React",
    "Next.js",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#030712",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-[#030712] text-slate-100 antialiased selection:bg-violet-500/30 selection:text-violet-200">
        {children}
      </body>
    </html>
  );
}
