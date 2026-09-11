# SYNC

### Find your people. Focus together. Finish stronger.

SYNC is a desktop-first academic collaboration platform designed for
HITSZ Computer Science students.

It helps students find compatible study partners, study together in
focused sessions, and connect with experienced senior students when
they need academic guidance.

---

## 🎯 The Problem

University students often share the same courses, deadlines, and
academic challenges — but still study alone.

Finding the right person to study with can be difficult, especially
when students have different schedules, study styles, and academic
needs.

SYNC brings these students together through one focused platform.

---

## 💡 Our Solution

SYNC creates a simple academic collaboration flow:

**Find a Buddy → Match → Study Together → Ask a Senior**

Instead of providing many disconnected features, SYNC focuses on
three core experiences.

---

## ✨ Core Features

### 01 — Find a Study Buddy

Students can discover compatible study partners based on:

- Courses
- Availability
- Study style
- Academic year

SYNC provides a compatibility score to help students find the right
study partner quickly.

### 02 — Study Together

Students can join focused study rooms and sessions with:

- Study goals
- Session timer
- Participant status
- Room chat
- Session information

### 03 — Ask a Senior

Students can connect with experienced students for guidance on:

- Difficult courses
- Academic questions
- Study strategies
- Course-specific advice

---

## 🖥️ Platform

SYNC is designed as a **desktop-first** experience and optimized for:

- 1920 × 1080
- 1366 × 768

---

## 🛠️ Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide React
- Framer Motion

The hackathon prototype uses structured mock data and local
interactions to demonstrate the core SYNC experience.

---

## 🏗️ Architecture

SYNC separates the user interface from application logic and data.

```text
src/
├── app/          → Application routes and pages
├── ui/           → User interface components
├── core/         → Application and business logic
├── data/         → Mock data and seeds
└── main/         → Application configuration

tests/            → Core functionality tests
docs/             → Architecture and technical decisions
public/           → Static assets
