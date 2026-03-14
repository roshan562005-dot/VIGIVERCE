# 🛡️ VigiVerse
> **The AI-Powered Pharmacovigilance Platform**

![VigiVerse Hero](public/resources-hero.png)

VigiVerse is a real-time, AI-powered pharmacovigilance platform designed to fix the broken adverse drug reaction (ADR) reporting system. By combining Gemini 2.0 AI with gamified community mechanics, VigiVerse transforms clinical safety reporting from a silent, paper-based burden into an instant, engaging, and globally connected ecosystem.

---

## 🚀 The Problem & Solution
Adverse Drug Reactions (ADRs) are the 4th leading cause of death in developed countries, yet **only 6% are ever officially reported** due to complex clinical forms and zero patient feedback. 

**The VigiVerse Solution:**
1. **Plain-English Input:** Patients describe their symptoms naturally.
2. **Instant AI Processing:** Gemini 2.0 extracts the biological mechanisms, cross-references global databases, and scores the severity in milliseconds.
3. **Gamified Incentives:** Users earn reputation points and tier badges (🥇 Gold, 💎 Platinum) for verified clinical reports.

---

## ⚡ Core Features

- **🤖 VigiBot (The Master Pharmacologist):** A highly specialized, authoritative AI chat interface that explains pharmacokinetics, analyzes polypharmacy interactions, and highlights severe side effects.
- **💊 Drug-Drug Interaction Checker:** A comprehensive polypharmacy tool that cross-references multiple medications simultaneously to flag Severe, Moderate, and Mild interaction risks.
- **🔍 Pill Identifier:** Identify unknown medications instantly by inputting shape, color, and imprint.
- **🏆 Dynamic Leaderboard:** A live, gamified ecosystem where patients and clinicians rank globally based on the quality and volume of their safety data.
- **🛡️ Admin Review Dashboard:** A command center for health authorities to monitor signals in real-time and verify high-risk ADRs.

---

## 🏗️ Technical Architecture

VigiVerse is built with a modern, edge-ready tech stack designed for speed and reliability.

- **Frontend:** Next.js 14 (App Router), React, Tailwind CSS, Framer Motion
- **Backend/Database:** Supabase (PostgreSQL), Next.js Server Actions
- **Authentication:** Supabase Auth (Email OTP + OAuth)
- **AI Engine:** Google Gemini 2.0 Flash (Advanced structured JSON output & clinical prompt engineering)
- **Component Library:** Shadcn/ui & Lucide Icons
- **Deployment:** Vercel (Global Edge Network)

---

## 💻 Running Locally

To run VigiVerse on your local machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/roshan562005-dot/VIGIVERCE.git
   cd VIGIVERCE
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file and add the following keys:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` to view the application.

---

## 🌱 Seeding Demo Data
To view the Leaderboard and Admin Dashboard with realistic data during a presentation:
1. Log into the local application.
2. Navigate to `/seed`.
3. Click "Seed Demo Data" to bypass RLS and instantly populate 10 mock user profiles and 10 clinically-accurate ADR reports. 

---

## 📄 License
© 2026 A Roshan. All rights reserved. 
Built for the future of global pharmacovigilance.
