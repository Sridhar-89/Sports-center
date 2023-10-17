import { createBrowserRouter, Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
import  Home  from "../pages/Homepage";

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
]);
export default router;