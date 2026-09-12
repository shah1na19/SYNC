# SYNC — Technical Decisions

This document records the major product, technical, architectural, and design decisions made during the development of SYNC.

The purpose is to make the reasoning behind the project understandable to future contributors, reviewers, and hackathon judges.

SYNC is a hackathon prototype, so decisions prioritize:

- Product clarity
- User experience
- Frontend quality
- Functional demonstration
- Maintainable architecture
- Development speed
- Appropriate technical complexity

The project intentionally avoids engineering complexity that does not improve the demonstrated product.

---

# 1. Product Scope

## Decision

SYNC focuses on three core experiences:

1. Find a Study Buddy
2. Study Together
3. Ask a Senior

The main product journey is:

```text
Find a Buddy
     ↓
Match
     ↓
Study Together
     ↓
Ask a Senior
