import Login from "pages/Auth/login";
import AuthorRequest from "pages/AuthorRequest";
import Read from "pages/Book/Read";
import Dashboard from "pages/Dashboard/Dashboard";

import Confirmation from "../pages/Auth/confirmation";

// import Register from "../pages/Auth/register";
// import ResetPassword from "../pages/Auth/reset-password";

// public Routes
const publicRoutes = [
  // { path: "/register/*", component: Register },
  { path: "/", component: Login },
  // { path: "/reset-password/*", component: ResetPassword },
  { path: "/confirmation/*", component: Confirmation },
];
// private Routes
const privateRoutes = [
  { path: "/dashboard/*", component: Dashboard },
  { path: "/author-request/*", component: AuthorRequest },
  { path: "/read/*", component: Read },
];

export { publicRoutes, privateRoutes };
