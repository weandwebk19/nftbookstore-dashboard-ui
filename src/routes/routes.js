import Confirmation from "../pages/Auth/confirmation";
import Login from "../pages/Auth/login";
import Dashboard from "../pages/Dashboard";

// import Register from "../pages/Auth/register";
// import ResetPassword from "../pages/Auth/reset-password";

// public Routes
const publicRoutes = [
  // { path: "/register/*", component: Register },
  { path: "/login/*", component: Login },
  // { path: "/reset-password/*", component: ResetPassword },
  { path: "/confirmation/*", component: Confirmation },
];
// private Routes
const privateRoutes = [
  { path: "/", component: Login },
  { path: "/dashboard/*", component: Dashboard },
];

export { publicRoutes, privateRoutes };
