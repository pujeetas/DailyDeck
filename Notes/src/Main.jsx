import { useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainMenu from "../src/MainMenu";
import NotesPage from "../src/features/notes/NotesPage";

import Dashboard from "./features/todo/pages/Dashboard";
import DashboardRouter from "./features/todo/pages/DashboardRouter";

import FocusList from "./features/todo/components/FocusList";

import SignupPage from "../src/SignupPage";
import LandingPage from "./landingPage/LandingPage";
import "../styles.css";
import Login from "./Login";

function Main() {
  const [detailsList, setDetailsList] = useState(() => {
    const data = localStorage.getItem("list");
    return data ? JSON.parse(data) : [];
  });

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
        {
          index: true,
          element: (
            <Dashboard
              detailsList={detailsList}
              setDetailsList={setDetailsList}
            />
          ),
        },
        {
          path: "focus",
          element: (
            <FocusList
              detailsList={detailsList}
              setDetailsList={setDetailsList}
            />
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);
