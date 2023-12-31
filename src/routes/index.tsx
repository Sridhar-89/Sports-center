import { createBrowserRouter, Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
import Home from "../pages/Homepage";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/dashboard";
import UPassword from "../pages/password";
import NotFound from "../pages/Notfound";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/home" replace /> },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },

  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/password",
    element: (
      <ProtectedRoute>
        <UPassword />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
export default router;
