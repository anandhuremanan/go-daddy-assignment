import { getData, getLanguages } from "~/utils/helperFunctions";
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
  const languageList = await getLanguages(params.name);
  return { repoDetails, languageList };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { repoDetails, languageList } = loaderData;

  return <Repodetails repoData={repoDetails} languageList={languageList} />;
}
