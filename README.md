# DailyDeck ⚡️
### The EngOps Platform for High-Velocity Developers

![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Node](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

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

## 🛠 Tech Stack & Architecture

### Frontend (Client)
* **Framework:** React 19 (Vite)
* **Styling:** Tailwind CSS + Ant Design (Custom Dark Theme Config)
* **State Management:** Zustand (Global Store)
* **Forms & Dates:** Ant Design Form + Dayjs + Date-fns
* **Editor:** Tiptap (Headless Rich Text)

### Backend (API)
* **Runtime:** Node.js & Express
* **Database:** MongoDB (Atlas) with Mongoose ODMs
* **Architecture:** Service-Controller Layer pattern (Separation of Concerns)

---

## ✨ Key Features

### 1. The Engineering Dashboard
* **Dual-View Workflow:** Toggle instantly between **Kanban Board** (Stage-based) and **Calendar View** (Time-based).
* **Smart Filters:** One-click filtering for "Today", "High Priority", and "Overdue" tasks.
* **Visual Priority:** Block-style rendering with color-coded borders to identify critical path items immediately.

### 2. Developer-First Notes
* **Rich Text Editor:** Slash commands (`/`), code blocks, and markdown support.
* **Integrated Workflow:** Keep documentation alongside your task board.

### 3. Production-Grade UI/UX
* **Enterprise Dark Mode:** Custom `ConfigProvider` overrides for Ant Design to ensure perfect contrast.
* **Optimistic UI:** Instant visual feedback on task updates.
* **Responsive:** Fully adaptive grid layouts for sidebar and dashboard widgets.

## 🔐 Authentication

### Multi-Provider OAuth Support
DailyDeck supports multiple authentication methods for seamless access:

#### **Email/Password Authentication**
- Traditional signup flow with JWT-based session management
- Secure password hashing using bcrypt
- Password reset functionality via email tokens

#### **Google OAuth 2.0**
- One-click sign-in with Google accounts
- Automatic user provisioning on first login
- Passport.js integration for secure token exchange

#### **GitHub OAuth**
- Developer-friendly authentication
- Access using existing GitHub credentials
- Perfect for engineering-focused workflows

### Security Features
- **HttpOnly Cookies:** JWT tokens stored in secure, HttpOnly cookies to prevent XSS attacks
- **Session Persistence:** MongoDB-backed session store for serverless deployments (Vercel)
- **Environment-based Security:** Dynamic cookie settings (secure/sameSite) based on production vs development
- **Cross-Origin Support:** Proper CORS configuration for frontend-backend communication

### OAuth Configuration
Both Google and GitHub OAuth are configured using Passport.js strategies:
- Session serialization/deserialization for user state management
- Automatic user creation on first OAuth login
- Seamless linking of OAuth accounts to existing email accounts
---

---

## 🧪 Testing

![Tests](https://img.shields.io/badge/tests-5%20passing-brightgreen?style=for-the-badge)
![Coverage](https://img.shields.io/badge/coverage-68.96%25-yellow?style=for-the-badge)
![Vitest](https://img.shields.io/badge/tested%20with-Vitest-729B1B?style=for-the-badge)

Comprehensive testing using **Vitest** and **React Testing Library** to ensure production-grade quality.

### Run Tests
```bash
npm test              # Run all tests in watch mode
npm run test:ui       # Interactive test UI
npm run test:coverage # Generate coverage report
```

### Test Coverage
**Login Component** - 68.96% coverage
- ✅ Form rendering and input validation
- ✅ User interactions (typing, clicking, submitting)
- ✅ Complete authentication flow with API mocking
- ✅ Navigation handling after successful login
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
  
  // Simulate user typing credentials
  await user.type(
    screen.getByPlaceholderText("name@company.com"), 
    "test@example.com"
  );
  await user.type(
    screen.getByPlaceholderText("••••••••"), 
    "password123"
  );
  
  // Simulate clicking login button
  await user.click(screen.getByRole("button", { name: /log in/i }));
  
  // Verify API was called with correct credentials
  await vi.waitFor(() => {
    expect(axios.post).toHaveBeenCalledWith(
      "/api/login",
      { email: "test@example.com", password: "password123" },
      { withCredentials: true }
    );
  });
  
  // Verify user store was updated
  expect(useUserStore().login).toHaveBeenCalled();
  
  // Verify navigation to dashboard
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
│   ├── notes/          # Rich Text Editor & Note Logic
│   └── todo/           # The Core Task Engine
│       ├── components/ 
│       │   ├── CalendarBoard.jsx   # Time-based Logic
│       │   ├── KanbanBoard.jsx     # Drag-and-drop Logic
│       │   └── TaskDrawer.jsx      # Form Logic
│       └── store/      # Zustand Slice for Tasks
├── components/         # Shared UI (Layouts, Buttons)
└── services/           # API Integration Layer

🚦 Roadmap & Future Scope
This project is evolving from a productivity tool into an EngOps (Engineering Operations) platform.

[x] MVP: Notes, Tasks, Kanban, Dark Mode.
[x] Visual Planning: Calendar View Implementation.
[ ] Phase 2 (Automation): GitHub Webhook integration to auto-move cards based on PR status.
[ ] Phase 3 (Analytics): Velocity tracking and "Cycle Time" charts.
[ ] Phase 4 (AI): RAG-based search to query notes and tasks using natural language.
