# V Jahnavi Murthy - Personal Portfolio Website

A modern, elegant, professional, and fully responsive personal portfolio website built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.

---

## 🌟 Overview & Features

- **Personal Information**:
  - **Name**: V Jahnavi Murthy
  - **Headline**: Aspiring Software Engineer | Full-Stack Developer | Cloud & AI Enthusiast
  - **Bio**: Highlighting passions in web development, cloud computing, Python, and AI.
- **Design System**:
  - **Aesthetics**: Clean, minimal, elegant, and modern layout.
  - **Color Palette**: Primary Purple (`#8B5CF6`) with deep violet accents and soft lavender backgrounds (`#FAF9FE`).
  - **Typography**: Modern, readable sans-serif typography with clean hierarchy.
  - **Interactivity**: Smooth scrolling, subtle glowing gradients, hover lift effects, expandable project highlights, and mobile-responsive navigation.
- **Sections (In Order)**:
  1. **Navbar**: Brand logo & name on the left, smooth-scrolling desktop links (About, Projects, Contact), and a responsive mobile hamburger drawer.
  2. **Hero**: Prominent introduction, headline, primary "View My Work" & secondary "Contact Me" buttons, plus quick social links (LinkedIn, GitHub placeholder, copy email).
  3. **About**: Professional bio, engineering pillars, and interactive technical skills displayed as attractive chips with category filtering (Frontend, Backend & Languages, Cloud & DevOps, Databases & Tools).
  4. **Projects**: Reusable project cards for all 4 featured projects, including descriptions, technology tags, expandable architecture highlights, and GitHub repository placeholders.
  5. **Contact**: Interactive contact form (Name, Email, Message) with client-side feedback, direct email with copy-to-clipboard, LinkedIn profile link, and GitHub placeholder.
  6. **Footer**: Clean copyright notice (`© 2026 V Jahnavi Murthy. All rights reserved.`), navigation links, and back-to-top button.

---

## 📂 Project Structure

```
portfolio/
├── app/
│   ├── components/
│   │   ├── About.tsx            # About bio & technical skill chips
│   │   ├── Contact.tsx          # Contact form & social links
│   │   ├── Footer.tsx           # Footer & back-to-top button
│   │   ├── Hero.tsx             # Hero introduction, headline & CTAs
│   │   ├── Navbar.tsx           # Sticky glass navbar & mobile drawer
│   │   ├── ProjectCard.tsx      # Reusable project card component
│   │   ├── Projects.tsx         # Projects showcase grid & filters
│   │   └── icons.tsx            # Clean SVGs for GitHub & LinkedIn
│   ├── globals.css              # Tailwind CSS styles & animations
│   ├── layout.tsx               # Root layout & SEO metadata
│   └── page.tsx                 # Main portfolio page assembly
├── next-env.d.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### 1. Set Active Workspace (Recommended)
Open this folder in VS Code:
```
File > Open Folder... -> C:\Users\HP\.gemini\antigravity\scratch\portfolio
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the portfolio.

### 3. Build for Production
```bash
npm run build
npm run start
```
The production build compiles statically for optimal speed and SEO performance.
