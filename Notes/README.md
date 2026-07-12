# DailyDeck — Frontend

React client for **DailyDeck**, an EngOps productivity platform that unifies notes, task management, and an AI assistant in one workspace. See the [root README](../README.md) for the full architecture, AI/RAG pipeline, and Docker setup.

This package is the Vite + React 19 client. It talks to the [`Notes-BE`](../Notes-BE) Express API for auth, persistence, and the AI assistant.

## Features

- **Rich-text notes** — block-based editor (BlockNote/Tiptap) with markdown support, organized in a sidebar with live search
- **Task board** — Kanban board with drag-and-drop (`@dnd-kit`), calendar view, focus list, subtasks, and filtering
- **Auth** — email/password signup & login, password reset, and OAuth (Google/GitHub) via the backend, with protected routes
- **Activity stats** — tracked totals for notes, completed tasks, AI searches, and streaks
- **Mock Lab** — a schema-driven fake JSON/data generator with a visual schema builder and export options
- **Landing page** — marketing/onboarding page describing the product

## Tech Stack

- **Framework:** React 19 + Vite 7
- **Routing:** React Router (lazy-loaded routes, protected routes)
- **State:** Zustand
- **UI:** Tailwind CSS 4 + Ant Design, Framer Motion, Lucide icons
- **Editor:** BlockNote / Tiptap
- **Testing:** Vitest + React Testing Library

## Getting Started

```bash
npm install
npm run dev
```

Requires the backend (`Notes-BE`) running and a `VITE_BACKEND_URL` env var pointing at it. See the [root README](../README.md) for the one-command Docker setup that runs both services together.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build locally |
| `npm test` | Run tests with Vitest |
| `npm run test:coverage` | Run tests with coverage report |
