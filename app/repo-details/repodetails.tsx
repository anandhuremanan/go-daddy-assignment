import { Link } from "react-router";
import Icon from "~/icon/icon";
import { eye, fork, info } from "~/icon/paths";

const iconProps = {
  svgClass: "fill-none stroke-zinc-500",
  dimensions: { width: "18", height: "18" },
};

export function Repodetails({ repoData }: any) {
  const stats = [
    {
      elements: fork,
      count: repoData.forks_count,
      title: "Forks",
      color: "text-blue-500",
    },
    {
      elements: info,
      count: repoData.open_issues,
      title: "Open Issues",
      color: "text-red-500",
    },
    {
      elements: eye,
      count: repoData.watchers,
      title: "Watchers",
      color: "text-green-500",
    },
  ];
  return (
    <section className="px-4 md:px-20 lg:px-40">
      <Link to={"/"}>Go Back</Link>
      <div className="font-bold text-2xl mt-4">{repoData.name}</div>
      <p className="text-sm mt-4">{repoData.description}</p>

      {stats.map(({ color, title, elements, count }, index) => (
        <div key={index} className="flex flex-col gap-2 mt-4">
          <div className="flex items-center gap-2">
            <Icon elements={elements} {...iconProps} />
            <span className="font-bold">{title}</span>
          </div>
          <span className={`text-2xl font-bold ${color}`}>{count}</span>
        </div>
      ))}
    </section>
  );
}
