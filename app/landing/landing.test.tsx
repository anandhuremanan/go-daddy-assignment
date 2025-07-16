import { render, screen, fireEvent } from "@testing-library/react";
import { Landing } from "./landing";
import { MemoryRouter } from "react-router-dom";

jest.mock("./components/Card", () => ({
  Card: ({ name }: { name: string }) => <div data-testid="card">{name}</div>,
}));

const dummyRepos = [
  {
    id: 1,
    name: "React",
    description: "A JavaScript library for building UI",
    forks_count: 100,
    open_issues: 20,
    watchers: 50,
    language: "JavaScript",
  },
  {
    id: 2,
    name: "GoProject",
    description: "Cool stuff in Go",
    forks_count: 10,
    open_issues: 2,
    watchers: 5,
    language: "Go",
  },
];

describe("Landing", () => {
  it("renders heading and all repos by default", () => {
    render(
      <MemoryRouter>
        <Landing repositories={dummyRepos} />
      </MemoryRouter>
    );

    expect(screen.getByText("Repository Browser")).toBeInTheDocument();
    expect(screen.getAllByTestId("card").length).toBe(2);
  });

  it("filters repositories based on search input", () => {
    render(
      <MemoryRouter>
        <Landing repositories={dummyRepos} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/search repositories/i), {
      target: { value: "go" },
    });

    expect(screen.queryByText("React")).not.toBeInTheDocument();
    expect(screen.getByText("GoProject")).toBeInTheDocument();
  });

  it("shows empty state if no repo matches", () => {
    render(
      <MemoryRouter>
        <Landing repositories={dummyRepos} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/search repositories/i), {
      target: { value: "nothing" },
    });

    expect(screen.getByText("No repositories found")).toBeInTheDocument();
  });

  it("clears the search input when 'x' button is clicked", () => {
    render(
      <MemoryRouter>
        <Landing repositories={dummyRepos} />
      </MemoryRouter>
    );

    const input = screen.getByLabelText(/search repositories/i);
    fireEvent.change(input, { target: { value: "react" } });

    expect(input).toHaveValue("react");

    fireEvent.click(screen.getByLabelText(/clear search/i));

    expect(input).toHaveValue("");
    expect(screen.getAllByTestId("card").length).toBe(2);
  });
});
