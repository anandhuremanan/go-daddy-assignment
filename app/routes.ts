import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("repo/:name", "routes/repo.tsx"),
] satisfies RouteConfig;
