# Mentorious 🚀

Welcome to **Mentorious**! This project is a modern, dynamic, and fully responsive AI-powered mock interview platform designed to help job seekers practice, refine, and perfect their interview skills. Built with Next.js 14, React, Tailwind CSS, NeonDB, and the Google Gemini API, it offers a seamless, immersive, and highly interactive user experience.

---

## ✨ Key Features

- 🎨 **Futuristic UI/UX:** Designed with a sleek, dark-themed premium aesthetic featuring smooth transitions, clean layouts, and polished visual styles.
- 🤖 **AI-Tailored Mock Interviews:** Provide your target job position, tech stack, and experience level, and the system automatically generates precise, role-specific interview questions.
- 📹 **Video & Voice Integration:** Answer questions naturally using either video (webcam enabled) or voice-only mode, with real-time speech-to-text processing.
- 📊 **Instant AI Feedback & Scoring:** After your session, receive a detailed evaluation for each answer, including an overall score out of 10, key feedback points, and the expected ideal answer.
- 📚 **Extensive Questions Library:** Access a repository of over 350+ curated, real-world interview questions categorized across Frontend, Backend, Full Stack, Behavioral, Algorithms, C++, and Python.
- 💡 **Interactive Answer Evaluation:** Practice directly from the library by typing your response and getting instant, intelligent evaluation and improvement tips.
- 🚦 **Usage Quotas & Upgrade Paths:** Built-in tracking allows for 3 free mock interviews per day, with clear paths to upgrade for unlimited sessions.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (React)
- **Styling:** Tailwind CSS & shadcn/ui
- **Multimedia:** React Webcam & Web Speech API

### Backend & Database
- **Database:** PostgreSQL 
- **ORM:** Drizzle ORM
- **Authentication:** Clerk Auth
- **AI Core:** Google Gemini API

---

## 📋 Prerequisites

- **Node.js:** LTS version (v18.x or v20.x recommended)
- **npm** (v9+) or **yarn** or **pnpm**

---

## 🚀 Getting Started

Follow these steps to set up the application locally.

### 1. Clone the Repository
```bash
git clone https://github.com/Sonu2126/Mentorious.git
cd Mentorious
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key

NEXT_PUBLIC_DRIZZLE_DB_URL=your_postgresql_database_url

NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT=5
NEXT_PUBLIC_INFORMATION="Enable Video Web Cam and Microphone to Start your AI Generated Mock Interview..."
NEXT_PUBLIC_QUESTION_NOTE="Click on Record Answer when you want to answer the question..."
```

### 4. Push Database Schema
Initialize and push the Drizzle schema to your database:
```bash
npm run db:push
```

### 5. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the live application.

---

## 🎈 Usage Guide

- **Dashboard:** Easily create a new mock interview by specifying your target role, stack, and experience.
- **Interviews:** Start the interview, enable your camera/microphone, record your answers, and receive detailed scoring.
- **Question Lab:** Browse and solve from the library of 350+ curated questions. Get instant feedback on written answers.
- **Feedback History:** Review your past interview performance, scores, and track your daily usage limit.

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
