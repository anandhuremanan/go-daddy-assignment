export async function githubAPI(endpoint: string) {
  const res = await fetch(`https://api.github.com${endpoint}`);

  if (!res.ok) {
    throw new Error(
      `Failed to fetch ${endpoint}: ${res.status} ${res.statusText}`
    );
  }

  return res.json();
}

// Usage examples:
export const getData = (repoName: string) =>
  githubAPI(`/repos/godaddy/${repoName}`);
export const getLanguages = (repoName: string) =>
  githubAPI(`/repos/godaddy/${repoName}/languages`);
export const getRepos = () => githubAPI(`/orgs/godaddy/repos`);

export const getLanguageColor = (language: string) => {
  const colors: any = {
    JavaScript: "bg-yellow-100 text-yellow-800",
    TypeScript: "bg-blue-100 text-blue-800",
    Python: "bg-green-100 text-green-800",
    "C++": "bg-purple-100 text-purple-800",
    Rust: "bg-orange-100 text-orange-800",
    Go: "bg-cyan-100 text-cyan-800",
    Java: "bg-red-100 text-red-800",
    CSS: "bg-pink-100 text-pink-800",
    HTML: "bg-gray-100 text-gray-800",
    Shell: "bg-gray-100 text-gray-800",
    PHP: "bg-blue-100 text-gray-800",
    Ruby: "bg-red-100 text-gray-800",
  };
  return colors[language] || "bg-gray-100 text-gray-800";
};
