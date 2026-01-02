import { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "../styles.css";
import LoadingCard from "./LoadingCard";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "./components/layout/profile/Profile";
import ResetPassword from "./features/auth/ResetPassword";
import FakeJsonGenerator from "./features/mockLab/layout/FakeJsonGenerator";

const LandingPage = lazy(() => import("./landingPage/LandingPage"));
const SignupPage = lazy(() => import("./features/auth/SignupPage"));
const Login = lazy(() => import("./features/auth/Login"));
const MainMenu = lazy(() => import("../src/MainMenu"));
const NotesPage = lazy(() => import("../src/features/notes/NotesPage"));
const DashboardRouter = lazy(() =>
  import("./features/todo/pages/DashboardRouter")
);
const Dashboard = lazy(() => import("./features/todo/pages/Dashboard"));
const FocusList = lazy(() => import("./features/todo/components/FocusList"));

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/signup", element: <SignupPage /> },
  { path: "/login", element: <Login /> },
  { path: "/reset-password/:userId/:token", element: <ResetPassword /> },
  { path: "/profile-setting", element: <Profile /> },

  {
    path: "/main",
    element: (
      <ProtectedRoute>
        <MainMenu />
      </ProtectedRoute>
    ),
  },
  {
    path: "/notes",
    element: (
      <ProtectedRoute>
        <NotesPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/to-do",
    element: (
      <ProtectedRoute>
        <DashboardRouter />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "focus", element: <FocusList /> },
    ],
  },
  {
    path: "/payload-lab",
    element: (
      <ProtectedRoute>
        <FakeJsonGenerator />
      </ProtectedRoute>
    ),
  },
]);

function Main() {
  return (
    <div className="antd-dark-theme">
      <Suspense fallback={<LoadingCard />}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);
