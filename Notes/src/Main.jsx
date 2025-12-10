import { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "../styles.css";
import "./styles/ant-dark-theme.css";

const LandingPage = lazy(() => import("./landingPage/LandingPage"));
const SignupPage = lazy(() => import("./features/auth/pages/SignupPage"));
const Login = lazy(() => import("./features/auth/pages/Login"));
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
  { path: "/main", element: <MainMenu /> },
  { path: "/notes", element: <NotesPage /> },

  {
    path: "/to-do",
    element: <DashboardRouter />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "focus", element: <FocusList /> },
    ],
  },
]);

function Main() {
  return (
    <div className="antd-dark-theme">
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);
