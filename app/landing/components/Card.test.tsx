import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Card } from "./Card";

jest.mock("~/icon/icon", () => ({
  __esModule: true,
  default: () => <svg data-testid="icon" />,
}));

describe("Card", () => {
  const props = {
    name: "cool-repo",
    description: "test desc",
    forks_count: 5,
    open_issues: 2,
    watchers: 10,
    language: "Go",
  };

  it("renders card with name and description", () => {
    render(
      <MemoryRouter>
        <Card {...props} />
      </MemoryRouter>
    );

    expect(screen.getByText("cool-repo")).toBeInTheDocument();
    expect(screen.getByText("test desc")).toBeInTheDocument();
  });

  it("renders language tag", () => {
    render(
      <MemoryRouter>
        <Card {...props} />
      </MemoryRouter>
    );

    expect(screen.getByText("Go")).toBeInTheDocument();
  });

  it("renders stats correctly", () => {
    render(
      <MemoryRouter>
        <Card {...props} />
      </MemoryRouter>
    );

    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("renders the link to repo detail page", () => {
    render(
      <MemoryRouter>
        <Card {...props} />
      </MemoryRouter>
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/repo/cool-repo");
  });
});
