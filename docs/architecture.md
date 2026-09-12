# SYNC — System Architecture

## 1. Overview

SYNC is a desktop-first academic collaboration platform designed for HITSZ Computer Science students.

The system is built around a focused academic collaboration flow:

**Find a Study Buddy → Match → Study Together → Ask a Senior**

Rather than attempting to solve every student problem, SYNC concentrates on three core experiences:

1. **Find a Study Buddy** — discover compatible students based on academic and availability signals.
2. **Study Together** — join structured study rooms and focused sessions.
3. **Ask a Senior** — connect with experienced students for course-specific guidance.

SYNC is implemented as a frontend-focused hackathon prototype using structured mock data and local application state. The architecture is intentionally lightweight so that the core product experience remains understandable, testable, and easy to extend.

---

## 2. Architectural Principles

SYNC follows four primary principles:

### Separation of concerns

The application separates routes, presentation, business logic, data, and shared types.

### UI shows

The `ui/` layer is responsible for presenting information and handling user-facing interactions.

### Core thinks

The `core/` layer contains reusable application and business logic such as matching, rooms, and study sessions.

### Data provides

The `data/` layer provides structured mock data used by the prototype.

This results in the following conceptual model:

```text
┌─────────────────────────────────────────────┐
│                  UI / Pages                 │
│       What the user sees and interacts with │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│                 Core Logic                  │
│       Matching • Rooms • Study Sessions     │
└──────────────────────┬──────────────────────┘
                       │
             ┌─────────┴─────────┐
             ▼                   ▼
┌─────────────────────┐  ┌───────────────────┐
│       Data          │  │      Types        │
│  Mock application   │  │ Shared TypeScript │
│       data          │  │     contracts     │
└─────────────────────┘  └───────────────────┘
```

---

# 3. Technology Stack

| Technology    | Purpose                                 |
| ------------- | --------------------------------------- |
| Next.js       | Application framework and routing       |
| React         | Component-based UI                      |
| TypeScript    | Static typing and maintainability       |
| Tailwind CSS  | Utility-first styling and design system |
| shadcn/ui     | Reusable accessible UI primitives       |
| Lucide React  | Consistent interface icons              |
| Framer Motion | Controlled interface animation          |
| Vitest        | Core logic testing                      |
| npm           | Dependency management                   |

The prototype does not require a backend, external database, or authentication service.

---

# 4. Directory Structure

```text
sync/
│
├── README.md
├── AGENTS.md
│
├── docs/
│   ├── architecture.md
│   └── decisions.md
│
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   │
│   │   ├── discover/
│   │   │   └── page.tsx
│   │   │
│   │   ├── match/
│   │   │   └── page.tsx
│   │   │
│   │   ├── rooms/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── seniors/
│   │   │   └── page.tsx
│   │   │
│   │   ├── settings/
│   │   │   └── page.tsx
│   │   │
│   │   └── courses/
│   │       └── page.tsx
│   │
│   ├── ui/
│   │   ├── layout/
│   │   ├── dashboard/
│   │   ├── discover/
│   │   ├── match/
│   │   ├── rooms/
│   │   ├── cn.ts
│   │   └── seniors/
│   │
│   ├── core/
│   │   ├── matching.ts
│   │   ├── room.ts
│   │   └── session.ts
│   │
│   ├── data/
│   │   ├── students.ts
│   │   ├── courses.ts
│   │   ├── rooms.ts
│   │   └── seniors.ts
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   └── main/
│       └── constants.ts
│
├── tests/
│   ├── matching.test.ts
│   ├── room.test.ts
│   └── session.test.ts
│
└── public/
    └── assets/
```

---

# 5. Application Layer — `src/app`

The `app/` directory contains Next.js routes and page-level composition.

Pages are responsible for assembling the appropriate interface from reusable UI components rather than containing large amounts of presentation or business logic themselves.

### Current routes

| Route         | Purpose                          |
| ------------- | -------------------------------- |
| `/`           | Main SYNC dashboard              |
| `/discover`   | Discover potential study buddies |
| `/match`      | Display matching results         |
| `/rooms`      | Browse available study rooms     |
| `/rooms/[id]` | Enter a specific study room      |
| `/seniors`    | Find experienced senior students |
| `/courses`    | Course-oriented academic view    |

### `layout.tsx`

Provides the application-wide Next.js layout and shared structure.

### `globals.css`

Contains global styling, design tokens, typography foundations, background treatment, and Tailwind-related configuration.

### Page responsibility

Pages should primarily:

* compose UI components;
* connect pages to the relevant data and core functions;
* manage page-level interaction state when necessary;
* remain readable and relatively lightweight.

Business rules should not be duplicated inside individual pages.

---

# 6. Presentation Layer — `src/ui`

The `ui/` directory contains reusable user-interface components.

Components are organized according to the product area they serve.

```text
ui/
├── layout/
├── dashboard/
├── discover/
├── match/
├── rooms/
└── seniors/
```

## `ui/layout`

Contains global application components such as:

* sidebar;
* top navigation;
* page headers;
* shared layout elements.

These components establish the visual language of SYNC across the application.

---

## `ui/dashboard`

Contains components used to construct the main dashboard experience.

Examples include:

* welcome content;
* study activity;
* upcoming sessions;
* recommended study rooms;
* academic overview elements.

---

## `ui/discover`

Contains components for study-buddy discovery.

Responsibilities include:

* student cards;
* filters;
* compatibility indicators;
* academic information;
* availability information;
* match explanations.

---

## `ui/match`

Contains components for presenting a successful or suggested match.

The match experience should make the compatibility result understandable rather than presenting a score without context.

For example:

```text
92% Match

✓ Same course
✓ Compatible availability
✓ Similar study style
✓ Same academic year
```

---

## `ui/rooms`

Contains components for the Study Together experience.

Responsibilities include:

* room information;
* participant display;
* session controls;
* study timer;
* chat;
* room status.

---

## `ui/seniors`

Contains components for the Ask a Senior experience.

Responsibilities include:

* senior profiles;
* areas of expertise;
* course information;
* response information;
* question interactions.

---

# 7. Business Logic Layer — `src/core`

The `core/` directory contains reusable application logic independent of individual page layouts.

```text
core/
├── matching.ts
├── room.ts
└── session.ts
```

This layer is intentionally small because SYNC is a hackathon prototype rather than a production backend system.

---

## `matching.ts`

Responsible for study-buddy compatibility logic.

The matching system evaluates relevant student attributes such as:

* shared courses;
* availability;
* study style;
* academic year.

A compatibility score can be calculated from these signals.

Conceptually:

```text
Same course       → +40
Availability      → +30
Study style       → +20
Academic year     → +10
─────────────────────────
Maximum score     → 100
```

The scoring model is deliberately transparent so that the interface can explain why two students are considered compatible.

---

## `room.ts`

Contains logic related to study rooms, including room-level state and participant-related operations.

The room logic is kept separate from the room UI so that presentation components do not need to implement the underlying rules themselves.

---

## `session.ts`

Contains study-session logic such as:

* session state;
* duration;
* active/inactive status;
* session progression.

The session layer supports the focused-study experience used inside Study Together.

---

# 8. Data Layer — `src/data`

The `data/` directory contains structured mock data for the prototype.

```text
data/
├── students.ts
├── courses.ts
├── rooms.ts
└── seniors.ts
```

The data layer allows the application to demonstrate realistic user flows without requiring a remote database.

## Students

Provides sample student profiles used by the discovery and matching experiences.

Typical information includes:

* identity;
* academic major/year;
* courses;
* availability;
* study preferences;
* profile information.

## Courses

Provides the academic subjects represented throughout the application.

## Rooms

Provides sample study rooms and their initial states.

## Seniors

Provides sample senior-student profiles and areas of academic expertise.

---

# 9. Shared Types — `src/types`

`types/index.ts` contains shared TypeScript contracts used across the application.

The shared type layer prevents different parts of the application from defining incompatible representations of the same entity.

Conceptual domain entities include:

```text
Student
Course
StudyRoom
StudySession
Senior
Availability
StudyStyle
```

Types should be extended when new product requirements appear rather than creating inconsistent local versions of the same data structure.

---

# 10. Application Constants — `src/main`

The `main/` directory contains application-wide constants and configuration that should not be duplicated across components.

Examples include:

* navigation definitions;
* fixed application labels;
* shared configuration values;
* product-level constants.

Keeping these values centralized makes future changes safer and reduces duplication.

---

# 11. Testing — `tests`

Core behavior is tested separately from the visual interface.

```text
tests/
├── matching.test.ts
├── room.test.ts
└── session.test.ts
```

Testing focuses on deterministic application logic rather than visual snapshots.

### Matching tests

Verify that:

* compatible students receive appropriate scores;
* matching criteria contribute correctly;
* scores remain within expected bounds.

### Room tests

Verify room-related behavior such as:

* participant handling;
* room state;
* room constraints.

### Session tests

Verify:

* session state transitions;
* duration behavior;
* valid session states.

The goal is to ensure that the application's most important logic remains reliable even while the interface evolves.

---

# 12. Static Assets — `public`

The `public/` directory contains static assets that can be served directly by Next.js.

```text
public/
└── assets/
```

Assets should be kept organized and reused rather than duplicated throughout the application.

---

# 13. UI and Design Architecture

SYNC uses a dark, atmospheric visual system combining:

* deep navy and charcoal surfaces;
* subtle cosmic/space-inspired background treatment;
* restrained blue, violet, and cyan accents;
* clear academic typography;
* consistent spacing;
* subtle motion;
* high information density without visual clutter.

The visual direction is intended to feel:

**technical + academic + focused + premium**

rather than:

**gaming + cyberpunk + crypto + sci-fi spectacle**

The interface prioritizes hierarchy and usability over decorative effects.

---

# 14. Responsive Strategy

SYNC is a **desktop-first** application.

The primary target resolutions are:

```text
1920 × 1080
1366 × 768
```

The interface should remain usable at both resolutions without:

* horizontal overflow;
* clipped content;
* overlapping components;
* unnecessarily large empty areas;
* unreadable typography.

Desktop layout decisions should therefore be validated against both target resolutions before submission.

---

# 15. State Management

The hackathon prototype intentionally avoids introducing a heavyweight global state-management library.

Local React state is preferred for isolated interactions.

State should be lifted only when multiple components genuinely need to share it.

The architecture is designed so that a future backend or persistent state layer could be introduced without requiring the entire UI to be rewritten.

---

# 16. Backend Strategy

SYNC currently does **not** require:

* a backend server;
* database infrastructure;
* authentication;
* API routes;
* external services.

The hackathon prototype uses:

```text
Structured mock data
        +
Local application state
        +
Deterministic core logic
        =
Functional product demonstration
```

This keeps the implementation focused on the competition's primary evaluation areas: product experience, frontend quality, architecture, and functional interaction.

---

# 17. Data Flow

A typical study-buddy interaction follows this flow:

```text
Student Data
     │
     ▼
Matching Logic
     │
     ▼
Compatibility Result
     │
     ▼
Match UI
     │
     ▼
Study Room
     │
     ▼
Study Session
```

The UI does not need to know how compatibility is calculated.

The matching logic does not need to know how the result is visually displayed.

This separation allows both areas to evolve independently.

---

# 18. Main Product Flow

The complete intended user journey is:

```text
┌──────────────┐
│   Dashboard  │
└──────┬───────┘
       │
       ▼
┌──────────────────┐
│ Find Study Buddy │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│  Match Result    │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│  Study Together  │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ Focused Session  │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│   Ask a Senior   │
└──────────────────┘
```

The flow intentionally moves from **discovery → connection → focused action → academic support**.

---

# 19. Extension Strategy

The current architecture is intentionally suitable for future expansion.

A future production version could replace mock data with:

```text
UI
 ↓
Core / Application Logic
 ↓
API / Server Layer
 ↓
Database
```

Potential future capabilities could include:

* authentication;
* persistent student profiles;
* real-time study rooms;
* persistent chat;
* notifications;
* real matching preferences;
* senior-student reputation;
* course integrations;
* analytics.

These capabilities are outside the scope of the current hackathon prototype and should not be introduced unless they directly improve the required product experience.

---

# 20. Scope Control

SYNC intentionally avoids unnecessary architectural complexity.

The following should **not** be introduced merely for the sake of appearing more sophisticated:

* unnecessary service layers;
* unused API abstractions;
* redundant state-management libraries;
* database infrastructure without a demonstrated need;
* duplicate component systems;
* excessive dependencies;
* speculative backend architecture.

Every new abstraction should solve a real problem in the current application.

---

# 21. Development Principles

When extending SYNC:

1. Reuse existing components before creating new ones.
2. Keep business logic out of presentational components.
3. Keep pages focused on composition.
4. Keep shared types centralized.
5. Keep mock data structured and deterministic.
6. Prefer small, testable functions.
7. Avoid duplicating constants or domain models.
8. Preserve the existing design system.
9. Test core logic after meaningful changes.
10. Avoid adding dependencies unless they provide clear value.

---

# 22. Architecture Summary

SYNC follows a deliberately simple layered architecture:

```text
                 SYNC
                   │
          ┌────────┴────────┐
          │                 │
       Routes              UI
      src/app/           src/ui/
          │                 │
          └────────┬────────┘
                   │
                   ▼
                Core
              src/core/
                   │
          ┌────────┴────────┐
          ▼                 ▼
        Data              Types
      src/data/         src/types/
          │
          ▼
       Tests
      tests/
```

The architecture can be summarized as:

> **Pages compose. UI presents. Core decides. Data supplies. Types define. Tests prove.**

This structure keeps SYNC understandable during rapid hackathon development while providing enough separation for the application to remain maintainable, testable, and extensible.

