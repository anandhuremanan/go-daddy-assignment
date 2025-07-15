import { Card } from "./components/Card";
import { useState, useMemo } from "react";

interface RepoDataType {
  id: number;
  name: string;
  description: string;
  forks_count: number;
  open_issues: number;
  watchers: number;
  language: string;
}

export function Landing({ repositories }: any) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    if (!repositories) return [];

    if (!searchQuery.trim()) return repositories;

    const query = searchQuery.toLowerCase();
    return repositories.filter(
      (repo: any) =>
        repo.name.toLowerCase().includes(query) ||
        repo.description?.toLowerCase().includes(query) ||
        repo.language?.toLowerCase().includes(query)
    );
  }, [repositories, searchQuery]);

  return (
    <section className="px-4 min-h-screen md:px-20 lg:px-40">
      <div className="w-full mb-6">
        <h1 className="font-medium text-2xl mb-4">Repository Browser</h1>
        <div className="relative">
          <input
            type="text"
            className="w-full bg-zinc-200 rounded-lg px-4 py-3 text-black text-sm placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="Search repositories by name, description"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search repositories"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-zinc-700 transition-colors"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {searchQuery && (
          <p className="text-sm text-zinc-400 mt-2">
            {filteredData.length} result{filteredData.length !== 1 ? "s" : ""}{" "}
            found
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
        {filteredData.length > 0 ? (
          filteredData.map((repo: RepoDataType) => (
            <Card
              key={repo.id}
              name={repo.name}
              description={repo.description}
              forks_count={repo.forks_count}
              open_issues={repo.open_issues}
              watchers={repo.watchers}
              language={repo.language}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-zinc-400">
              {searchQuery ? (
                <>
                  <p className="text-xl mb-2">No repositories found</p>
                  <p>Try adjusting your search terms</p>
                </>
              ) : (
                <p className="text-xl">No repositories available</p>
              )}
            </div>
          </div>
        )}
      </div>

      {repositories && repositories.length > 0 && (
        <footer className="text-center py-8 text-zinc-500">
          Showing {filteredData.length} of {repositories.length} repositories
        </footer>
      )}
    </section>
  );
}
