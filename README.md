# DailyDeck ⚡️
### The EngOps Platform for High-Velocity Developers

![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Node](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge&logo=docker)

> **"Context switching is the killer of productivity."**

DailyDeck is a developer-centric productivity suite designed to bridge the gap between **Project Management** (Jira/Linear) and **Execution** (GitHub/VS Code). It unifies Tasks, Notes, and Calendar planning into a single "Dark Mode First" command center.

---

## 🚀 Why I Built This
Most productivity apps are too generic. As a developer, I needed a tool that understands **software workflows**:
1.  **Context Switching:** Moving between GitHub Issues and Todo lists creates friction.
2.  **Deadline Visibility:** Kanban boards are great for status, but bad for deadlines.
3.  **Documentation:** Notes usually live separately from tasks.

DailyDeck solves this by integrating **Markdown Documentation**, **Calendar Visualization**, and **Task Tracking** in one cohesive architecture.

---

## 🐳 Running with Docker

The entire stack is containerized using Docker and Docker Compose. No manual setup required.

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running

### Quick Start
```bash
# Clone the repo
git clone https://github.com/pujeetas/DailyDeck.git
cd DailyDeck

# Add your environment variables
cp Notes-BE/.env.example Notes-BE/.env
# Edit Notes-BE/.env with your MongoDB URI, JWT secret, Google OAuth
# credentials, and AI keys (Anthropic, Cohere, Chroma)

# Start everything with one command
docker-compose up
```

| Service  | URL |
|----------|-----|
| Frontend | http://localhost:5173 |
| Backend  | http://localhost:3000 |
| Health Check | http://localhost:3000/api/health |

### Stop the app
```bash
docker-compose down
```

### Docker Architecture
```
DailyDeck/
  ├── Notes/
  │     ├── Dockerfile        # Multi-stage build (Node.js → nginx)
  │     └── .dockerignore
  ├── Notes-BE/
  │     ├── Dockerfile        # Node.js backend
  │     └── .dockerignore
  └── docker-compose.yml      # Orchestrates both services
```

**Multi-stage build:** Frontend uses a two-stage Docker build — Stage 1 compiles the React app using Node.js, Stage 2 serves the `/dist` output via nginx. This reduces the final image size to **101MB** compared to **~300MB+** with a Node.js server.

| Image | Size |
|-------|------|
| dailydeck-frontend | 101MB (nginx) |
| dailydeck-backend | 304MB (Node.js) |

---

## 🛠 Tech Stack & Architecture

### Frontend (Client)
* **Framework:** React 19 (Vite)
* **Styling:** Tailwind CSS + Ant Design (Custom Dark Theme Config)
* **State Management:** Zustand (Global Store)
* **Forms & Dates:** Ant Design Form + Dayjs + Date-fns
* **Editor:** BlockNote (block-based rich text, built on ProseMirror/Tiptap)

### Backend (API)
* **Runtime:** Node.js & Express
* **Database:** MongoDB (Atlas) with Mongoose ODMs
* **Architecture:** Service-Controller Layer pattern (Separation of Concerns)

### AI & Search
* **RAG Pipeline:** MongoDB Vector Search + Cohere Embeddings + Anthropic Claude API
* **Semantic Search:** Sub-200ms query latency across 1000+ embedded documents
* **Why MongoDB over Pinecone:** Evaluated Pinecone and Weaviate — chose MongoDB Vector Search for operational simplicity, unified data layer, and avoiding an additional managed service

### DevOps
* **Containerization:** Docker + Docker Compose
* **Frontend Serving:** nginx (production), Vite (development)
* **Deployment:** Vercel (frontend + backend serverless)
* **CI/CD:** Git-based deployments via Vercel

---

## ✨ Key Features

### 1. The Engineering Dashboard
* **Dual-View Workflow:** Toggle instantly between **Kanban Board** (Stage-based) and **Calendar View** (Time-based).
* **Smart Filters:** One-click filtering for "Today", "High Priority", and "Overdue" tasks.
* **Visual Priority:** Block-style rendering with color-coded borders to identify critical path items immediately.

### 2. Developer-First Notes with AI Search
* **Rich Text Editor:** Slash commands (`/`), code blocks, and markdown support.
* **RAG-Powered Search:** Ask questions about your notes in natural language — Claude AI answers using your actual documents via MongoDB Vector Search.
* **Semantic Understanding:** Finds relevant notes even when exact keywords don't match.

### 3. Production-Grade UI/UX
* **Enterprise Dark Mode:** Custom `ConfigProvider` overrides for Ant Design to ensure perfect contrast.
* **Optimistic UI:** Instant visual feedback on task updates.
* **Responsive:** Fully adaptive grid layouts for sidebar and dashboard widgets.

## 🔐 Authentication

DailyDeck supports multiple authentication methods for seamless access:

#### **Email/Password Authentication**
- Traditional signup flow with JWT-based session management
- Secure password hashing using bcrypt
- Password reset functionality via email tokens

#### **Google OAuth 2.0**
- One-click sign-in with Google accounts
- Automatic user provisioning on first login
- Passport.js integration for secure token exchange

> GitHub sign-in is on the roadmap (Passport's GitHub strategy is a listed dependency, not yet wired up server-side) — the profile page's GitHub integration is a read-only public-API lookup, not an auth provider.

### Security Features
- **HttpOnly Cookies:** JWT tokens stored in secure, HttpOnly cookies to prevent XSS attacks
- **Session Persistence:** MongoDB-backed session store for serverless deployments (Vercel)
- **Environment-based Security:** Dynamic cookie settings (secure/sameSite) based on production vs development
- **Cross-Origin Support:** Proper CORS configuration for frontend-backend communication

---

## 🧪 Testing

![Vitest](https://img.shields.io/badge/tested%20with-Vitest-729B1B?style=for-the-badge)

Component tests using **Vitest** and **React Testing Library**, covering the Login flow and the Task Drawer (create/edit task) flow.

### Run Tests
```bash
npm test              # Run all tests in watch mode
npm run test:ui       # Interactive test UI
npm run test:coverage # Generate coverage report
```

### What's Covered
- ✅ Form rendering and input validation (Login, Task Drawer)
- ✅ User interactions (typing, clicking, submitting)
- ✅ Authentication flow with API mocking
- ✅ External dependencies mocked (Axios, React Router, Zustand)

### Testing Philosophy
- **Unit Tests**: Verify individual component behavior in isolation
- **Integration Tests**: Test complete user workflows (type → click → submit)
- **Mocking Strategy**: Mock external APIs and state management for fast, reliable tests
- **Async Testing**: Proper handling of API calls and navigation
- **User-Centric**: Tests simulate real user interactions, not implementation details

### Example: Testing Authentication Flow
```javascript
it("submits form with valid credentials", async () => {
  const user = userEvent.setup();
  
  await user.type(
    screen.getByPlaceholderText("name@company.com"), 
    "test@example.com"
  );
  await user.type(
    screen.getByPlaceholderText("••••••••"), 
    "password123"
  );
  
  await user.click(screen.getByRole("button", { name: /log in/i }));
  
  await vi.waitFor(() => {
    expect(axios.post).toHaveBeenCalledWith(
      "/api/login",
      { email: "test@example.com", password: "password123" },
      { withCredentials: true }
    );
  });
  
  expect(useUserStore().login).toHaveBeenCalled();
  expect(mockNavigate).toHaveBeenCalledWith("/main");
});
```

---

## 📂 Project Structure (Feature-Based)

I utilized a **Feature-Based Architecture** to ensure scalability. Instead of grouping by file type (components/hooks), code is grouped by domain.

```bash
src/
├── features/
│   ├── auth/           # Login/Signup Logic
│   ├── notes/          # BlockNote Editor & Note Logic (Sidebar, NoteList)
│   ├── todo/            # The Core Task Engine
│   │   ├── components/
│   │   │   ├── CalendarBoard.jsx        # Time-based view
│   │   │   ├── KanbanColumn.jsx         # Drag-and-drop board
│   │   │   └── TaskDrawer/TaskDrawer.jsx # Task create/edit form
│   │   └── store/       # Zustand Slice for Tasks
│   └── mockLab/         # Schema-driven fake JSON/data generator
├── landingPage/          # Marketing/onboarding page
├── components/           # Shared UI (Layouts, Profile)
└── features/*/services/  # API Integration Layer (per-feature)
```

---

## 🚦 Roadmap & Future Scope

- [x] MVP: Notes, Tasks, Kanban, Dark Mode
- [x] Visual Planning: Calendar View Implementation
- [x] AI Search: RAG-based semantic search using MongoDB Vector Search + Claude AI
- [x] Containerization: Docker + Docker Compose with multi-stage builds
- [ ] Phase 2 (Automation): GitHub Webhook integration to auto-move cards based on PR status
- [ ] Phase 3 (Analytics): Velocity tracking and "Cycle Time" charts
- [ ] Phase 4 (AI Agent): Tool-calling agent to create tasks, search notes, and query GitHub via natural language
