import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "V Jahnavi Murthy — Software Engineer & Full-Stack Developer",
  description: "Personal portfolio of V Jahnavi Murthy. Aspiring Software Engineer, Full-Stack Developer, and Cloud & AI Enthusiast. Inspired by Swiss Minimalist Editorial Design.",
  keywords: ["V Jahnavi Murthy", "Software Engineer", "Full-Stack Developer", "Next.js", "Portfolio", "Cloud", "AI Enthusiast", "Terraform", "Python", "ASP.NET"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-[#FAF9FE] text-slate-800 antialiased selection:bg-purple-200 selection:text-purple-900">
        {children}
      </body>
    </html>
  );
}
