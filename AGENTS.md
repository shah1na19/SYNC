# SYNC — AI Development Guidelines

## 1. Project Overview

SYNC is a desktop-first academic collaboration platform designed for HITSZ Computer Science students.

The product focuses on three core experiences:

1. Find a Study Buddy
2. Study Together
3. Ask a Senior

The main user journey is:

Find a Buddy → Match → Study Together → Ask a Senior

SYNC is a hackathon prototype. Prioritize a polished, coherent, functional experience over unnecessary technical complexity.

---

## 2. Product Priorities

### Priority 1 — Find a Study Buddy

Students should be able to:

- Discover potential study partners
- Filter students by relevant academic preferences
- View compatibility information
- Understand why someone is a good match
- Connect with a suitable study partner

### Priority 2 — Study Together

Students should be able to:

- Discover study rooms
- Join a study room
- See participants
- View a study goal
- Use a focused study timer
- Interact through simple room chat
- See session status

### Priority 3 — Ask a Senior

Students should be able to:

- Browse senior students
- View their courses and expertise
- See useful profile information
- Ask a question through a simple interaction

Do not expand the product into unrelated features unless explicitly requested.

---

## 3. Technology Stack

Use:

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide React
- Framer Motion

Use npm as the package manager.

Use mock data and local state for the hackathon prototype.

Do not introduce a backend, database, authentication system, API, WebSocket infrastructure, or external service unless explicitly requested.

---

## 4. Architecture

The project follows a clear separation of responsibilities.

```text
src/app/       → Application routes and page entry points
src/ui/        → User interface and presentation
src/core/      → Business and application logic
src/data/      → Mock data and seeds
src/types/     → Shared TypeScript types
src/main/      → Application-level configuration

tests/         → Tests
docs/          → Architecture and technical decisions
public/        → Static assets
