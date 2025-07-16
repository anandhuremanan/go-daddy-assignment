import { Link } from "react-router";
import Icon from "~/icon/icon";
import { eye, fork, info, linkTo } from "~/icon/paths";
import type { RepoDetailsProps, StatItem } from "./types";

const iconProps = {
  svgClass: "fill-none stroke-zinc-500",
  dimensions: { width: "18", height: "18" },
} as const;

export function Repodetails({ repoData, languageList }: RepoDetailsProps) {
  const languageCount = Object.keys(languageList).length;

  const stats: StatItem[] = [
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
    {
      elements: eye,
      count: languageCount,
      title: "Languages",
      color: "text-purple-500",
    },
  ];

  const StatCard = ({ stat, index }: { stat: StatItem; index: number }) => (
    <div
      key={index}
      className="flex flex-col gap-2 mt-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
    >
      <div className="flex items-center gap-2">
        <Icon elements={stat.elements} {...iconProps} />
        <span className="font-semibold text-sm text-gray-700">
          {stat.title}
        </span>
      </div>
      <span className={`text-2xl font-bold ${stat.color}`}>
        {stat.count.toLocaleString()}
      </span>
    </div>
  );

  const LanguageTag = ({ language }: { language: string }) => (
    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
      {language}
    </span>
  );

  return (
    <section className="px-4 md:px-20 lg:px-40 mx-auto">
      <Link
        to="/"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-6"
      >
        ← Go Back
      </Link>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="font-bold text-3xl">{repoData.name}</h1>
        <Link
          to={`https://github.com/godaddy/${repoData.name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 hover:bg-blue-600 text-sm px-4 py-2 rounded-lg flex gap-2 items-center text-white transition-colors w-fit"
        >
          <Icon
            elements={linkTo}
            svgClass="stroke-white fill-none"
            dimensions={{ width: "14", height: "14" }}
          />
          View Repository
        </Link>
      </div>

      {repoData.description && (
        <p className="text-gray-600 mb-6 leading-relaxed">
          {repoData.description}
        </p>
      )}

      <hr className="border-gray-200 mb-6" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={stat.title} stat={stat} index={index} />
        ))}
      </div>

      <div className="mb-8">
        <h2 className="font-bold text-lg mb-4">Languages Used</h2>
        <div className="flex flex-wrap gap-2">
          {Object.keys(languageList).length > 0 ? (
            Object.keys(languageList).map((language) => (
              <LanguageTag key={language} language={language} />
            ))
          ) : (
            <span className="text-gray-500 text-sm">No languages detected</span>
          )}
        </div>
      </div>
    </section>
  );
}
