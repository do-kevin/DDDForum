import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("pages/MainPage.tsx"),
  route("/register", "pages/RegistrationPage.tsx"),
] satisfies RouteConfig;
