import { lazy } from "react";
import { SYSTEM_CONSTANTS } from "../../common/constants/constants";
const NotFoundPage = lazy(() => import("../../components/router/NotFound"));
const LoginPage = lazy(() => import("../../pages/LoginPage"));
const RegisterPage = lazy(() => import("../../pages/RegisterPage"));
const Users = lazy(() => import("../../pages/Users"));
const Index = lazy(() => import("../../pages/Index"));
const Dashboard = lazy(() => import("../../pages/Dashboard"));
const User = lazy(() => import("../../pages/User"));

export const PUBLIC_ROUTES = [
  {
    path: "/",
    exact: true,
    component: Index,
    title: "Home Page | " + SYSTEM_CONSTANTS.APP_NAME,
  },
  {
    path: "/register",
    exact: true,
    component: RegisterPage,
    title: "Sign Up | " + SYSTEM_CONSTANTS.APP_NAME,
  },
  {
    path: "/login",
    exact: true,
    component: LoginPage,
    title: "Login | " + SYSTEM_CONSTANTS.APP_NAME,
  },
  {
    path: "*",
    exact: true,
    component: NotFoundPage,
    title: "Page Not Found | " + SYSTEM_CONSTANTS.APP_NAME,
  },
];

export const PRIVATE_ROUTES = [
  {
    path: "/dashboard",
    exact: true,
    component: Dashboard,
    title: "Dashboard | " + SYSTEM_CONSTANTS.APP_NAME,
  },
  {
    path: "/users",
    exact: true,
    component: Users,
    title: "Users | " + SYSTEM_CONSTANTS.APP_NAME,
  },
  {
    path: "/user/:id",
    exact: true,
    component: User,
    title: "User Details | " + SYSTEM_CONSTANTS.APP_NAME,
  },
];
