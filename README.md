# 🇮🇳 GovtPrep & TechPrep India

> **Comprehensive Full-Stack Portal for Indian Government Jobs & IT Software Engineering Careers**

GovtPrep & TechPrep India is a modern, full-stack career and preparation platform built with **Next.js 14 App Router, TypeScript, Tailwind CSS, and Prisma ORM**.

---

## 🌟 Key Features

### 🏛️ Government Recruitment & Aspirant Portal
- **Central & State Recruitments**: SSC (CGL, CHSL, MTS, GD), UPSC (CSE, NDA, CDS), Railways (RRB NTPC, ALP, Group D), Banking (IBPS PO/Clerk, SBI), Defence & State Police.
- **Sarkari Exam Lifecycle**: Daily Job Notifications, Instant Admit Cards, Official Answer Keys, and Cutoff Results.
- **All-India CBT Mock Test Engine**: Real-time timed test simulator with negative marking, bilingual interface, instant scorecards, and verified PDF download with QR verification.

### 💻 Tech & Engineering Careers
- **Software Job Board**: SDE-1/2, Full-Stack, AI/ML, Cloud DevOps, and Data Analyst roles.
- **Paid Internships**: College & freshers internships with stipend filters and 1-click apply links.
- **Tech Courses**: Curated learning tracks for Data Structures, System Design, React, Node.js, and Cloud Certification.

### 🛠️ Interactive Educational & Aspirant Suite
- **⌨️ Live Typing Test Simulator (`/typing-test`)**: Exact SSC CGL DEST & RRB NTPC speed simulator with real-time Gross & Net WPM, accuracy, and error analysis.
- **🎴 Daily 3D Flashcards Deck (`/flashcards`)**: Spaced repetition 3D flip cards for Indian Polity Articles, Static GK, Speed Quant tricks, and CS fundamentals with audio playback.
- **📅 Interactive Study Planner (`/study-planner`)**: Syllabus tracker, chapter weightage, exam countdown timers, and daily study goal calculations.
- **📝 AI Resume & Govt Biodata Maker (`/resume-builder`)**: Standard Govt Biodata & Modern Tech ATS resume generator with live PDF print.
- **⚔️ Career Comparator (`/compare`)**: Side-by-side comparison of salaries, promotions, syllabus overlap, and perks.
- **🏆 All-India Leaderboard (`/leaderboard`)**: Real-time rank, percentile, and streak tracking.
- **🔔 WhatsApp & Telegram Alert Bot (`JobAlertModal`)**: Instant notifications for admit cards and vacancies.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Lucide React
- **Database & ORM**: Prisma ORM with SQLite
- **Architecture**: Enterprise 3-Tier Layered Architecture (`controllers/`, `services/`, `repositories/`, `validators/`)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.x or higher)
- npm / yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/pravinmhase2006/exam-preparaction-app.git
cd exam-preparaction-app

# Install dependencies
npm install

# Initialize Prisma Database
npx prisma db push
npx prisma db seed

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

## 📄 License
This project is licensed under the MIT License.
