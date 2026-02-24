# 🧶 Loom | The Future of Startup Pitching

Loom is a premium, high-performance platform designed for the next generation of founders to showcase their ideas, connect with early adopters, and build momentum.

## 🏛️ System Architecture

As a Senior Architect, I've designed Loom with a focus on **Separation of Concerns** and **Edge-First Performance**:

-   **Frontend**: Built on **Next.js 15 (App Router)**, utilizing **Server Components** by default to minimize client-side JavaScript and improve LCP (Largest Contentful Paint).
-   **Data Layer**: Powered by **Sanity.io**, acting as a headless CMS with a **Live Content API**. This allows for a decoupled architecture where content is served via a globally distributed CDN.
-   **Authentication**: Implemented via **NextAuth.js v5 (Auth.js)** using the **JWT Strategy**, ensuring stateless, scalable sessions that work seamlessly across edge runtimes.
-   **Validation**: Strict schema enforcement using **Zod** for both client-side form state and server-side action payloads, preventing malformed data from reaching the backend.

## 🤖 AI-Powered Intelligence

Loom integrates cutting-edge AI to enhance the development and founder experience:

-   **Gemini 2.5 Flash Integration**: The platform utilizes the **Gemini 2.5 Flash** model for automated code reviews and intelligent content analysis.
-   **Automated Bot Reviewer**: Every Pull Request triggers a GitHub Workflow that utilizes Gemini 2.5 Flash to perform a "Senior Architect" code review, ensuring architectural consistency, performance, and security.
-   **Smart Content Refinement**: (Planned) Real-time suggestions for founders to improve their pitches using AI-driven sentiment and impact analysis.

## ✨ Key Features

-   **🚀 Real-time Engagement**: Powered by Sanity Live Content API, view counts update instantly across all users without page refreshes.
-   **🔍 Intelligent Search**: A high-performance, debounced search interface that provides instant feedback as you type.
-   **💎 Premium Design**: A "Senior Designer" overhaul featuring deep indigo aesthetics, glassmorphism, and smooth Framer Motion animations.
-   **🌟 Smart Promotions**: An automated and editorial-controlled "Trending Now" section to highlight the most impactful pitches.
-   **📝 Markdown Pitching**: A professional-grade markdown editor for founders to craft detailed, beautiful pitches.

## ⚡ Performance & Scalability

-   **PPR (Partial Prerendering)**: (Planned) To combine static shell speed with dynamic content flexibility.
-   **ISR (Incremental Static Regeneration)**: Ensures startup pages are lightning-fast while staying up-to-date.
-   **Image Optimization**: Utilizing `next/image` for automatic WebP conversion and responsive sizing.
-   **Edge Middleware**: For efficient session handling and redirects at the network edge.

## 🛠️ Tech Stack

-   **Framework**: [Next.js 15+](https://nextjs.org/)
-   **Database/CMS**: [Sanity.io](https://www.sanity.io/)
-   **Auth**: [NextAuth.js v5](https://authjs.dev/)
-   **AI Model**: Gemini 2.5 Flash (via GitHub Actions)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)

## 🚀 Getting Started

1. **Clone the repository**
2. **Install dependencies**: `npm install`
3. **Set up environment variables**: Create a `.env.local` file with your Sanity and GitHub OAuth credentials.
4. **Run the development server**: `npm run dev`

## 👷 CI/CD Pipeline

This project uses GitHub Actions to ensure code quality and build stability. The pipeline automatically:
- Installs dependencies
- Runs Linting (`eslint`)
- Performs Type Checking (`tsc`)
- Performs a Production Build check
- **AI Code Review**: Automated "Senior Architect" review triggered on Pull Requests via Gemini 2.5 Flash.

---
*Architected for scale. Designed for founders. Powered by Gemini.*
