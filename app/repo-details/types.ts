export interface RepoData {
  name: string;
  description: string;
  forks_count: number;
  open_issues: number;
  watchers: number;
}

export interface LanguageList {
  [key: string]: number;
}

export interface RepoDetailsProps {
  repoData: RepoData;
  languageList: LanguageList;
}

export interface StatItem {
  elements: any;
  count: number;
  title: string;
  color: string;
}
