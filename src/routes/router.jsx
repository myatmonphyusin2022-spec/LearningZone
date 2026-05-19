import { createBrowserRouter } from "react-router-dom";

import Home from "@/pages/Home";
import Courses from "@/pages/Courses";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/courses",
    element: <Courses />,
  },

  {
    path: "/dashboard",
    element: <Dashboard />,
  },

  {
    path: "/login",
    element: <Login />,
  },
]);
