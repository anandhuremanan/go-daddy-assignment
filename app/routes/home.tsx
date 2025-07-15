import type { Route } from "./+types/home";
import { Landing } from "../landing/landing";
import { getRepos } from "~/utils/helperFunctions";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader() {
  const repositories = await getRepos();
  return repositories;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const repositories = loaderData;
  return <Landing repositories={repositories} />;
}
