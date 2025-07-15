import { getData } from "~/utils/helperFunctions";
import type { Route } from "./+types/repo";
import { Repodetails } from "~/repo-details/repodetails";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const repoDetails = await getData(params.name);
  return repoDetails;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const repoData = loaderData;

  return <Repodetails repoData={repoData} />;
}
