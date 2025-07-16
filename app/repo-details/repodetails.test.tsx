import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Repodetails } from "./repodetails";

jest.mock("~/icon/icon", () => ({
  __esModule: true,
  default: () => <svg data-testid="icon" />,
}));

const dummyRepoData = {
  name: "cool-repo",
  description: "This is a cool repository",
  forks_count: 25,
  open_issues: 5,
  watchers: 100,
};

const dummyLanguageList = {
  JavaScript: 12345,
  TypeScript: 6789,
};

describe("Repodetails", () => {
  it("renders repo name and description", () => {
    render(
      <MemoryRouter>
        <Repodetails
          repoData={dummyRepoData}
          languageList={dummyLanguageList}
        />
      </MemoryRouter>
    );

    expect(screen.getByText("cool-repo")).toBeInTheDocument();
    expect(screen.getByText("This is a cool repository")).toBeInTheDocument();
  });

  it("renders the Go Back link", () => {
    render(
      <MemoryRouter>
        <Repodetails
          repoData={dummyRepoData}
          languageList={dummyLanguageList}
        />
      </MemoryRouter>
    );

    expect(screen.getByText("← Go Back")).toBeInTheDocument();
  });

  it("renders the View Repository button with correct link", () => {
    render(
      <MemoryRouter>
        <Repodetails
          repoData={dummyRepoData}
          languageList={dummyLanguageList}
        />
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: /view repository/i });
    expect(link).toHaveAttribute(
      "href",
      "https://github.com/godaddy/cool-repo"
    );
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("renders stats", () => {
    render(
      <MemoryRouter>
        <Repodetails
          repoData={dummyRepoData}
          languageList={dummyLanguageList}
        />
      </MemoryRouter>
    );

    expect(screen.getByText("Forks")).toBeInTheDocument();
    expect(screen.getByText("Open Issues")).toBeInTheDocument();
    expect(screen.getByText("Watchers")).toBeInTheDocument();
    expect(screen.getByText("Languages")).toBeInTheDocument();

    expect(screen.getByText("25")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("renders language tags", () => {
    render(
      <MemoryRouter>
        <Repodetails
          repoData={dummyRepoData}
          languageList={dummyLanguageList}
        />
      </MemoryRouter>
    );

    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("shows 'No languages detected' if languageList is empty", () => {
    render(
      <MemoryRouter>
        <Repodetails repoData={dummyRepoData} languageList={{}} />
      </MemoryRouter>
    );

    expect(screen.getByText("No languages detected")).toBeInTheDocument();
  });
});
