import Icon from "~/icon/icon";
import { eye, fork, info, linkTo } from "~/icon/paths";
import { getLanguageColor } from "../../utils/helperFunctions";
import { Link } from "react-router";

interface CardType {
  name: string;
  description: string;
  forks_count: number;
  open_issues: number;
  watchers: number;
  language: string;
}

const iconProps = {
  svgClass: "fill-none stroke-zinc-500",
  dimensions: { width: "18", height: "18" },
};

export function Card({
  name,
  description,
  forks_count,
  open_issues,
  watchers,
  language,
}: CardType) {
  const stats = [
    { elements: fork, count: forks_count },
    { elements: info, count: open_issues },
    { elements: eye, count: watchers },
  ];

  return (
    <Link
      className="py-4 px-6 border rounded-lg shadow-lg border-gray-300 mb-4 cursor-pointer h-48"
      to={`/repo/${name}`}
    >
      <div className="flex justify-between items-center">
        <div className="font-bold">{name}</div>
        <div>
          <Icon
            elements={linkTo}
            svgClass={"stroke-black fill-none dark:stroke-zinc-500"}
            dimensions={{ width: "16", height: "16" }}
          />
        </div>
      </div>
      <div className="text-zinc-500 text-sm mt-2">
        {description ? description : <span>No Description</span>}
      </div>
      <div className="flex gap-4 mt-2 text-sm">
        {language && (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getLanguageColor(
              language
            )}`}
          >
            {language}
          </span>
        )}
        {stats.map(({ elements, count }, index) => (
          <div key={index} className="flex items-center gap-1">
            <Icon elements={elements} {...iconProps} />
            <span className="text-zinc-600">{count}</span>
          </div>
        ))}
      </div>
    </Link>
  );
}
