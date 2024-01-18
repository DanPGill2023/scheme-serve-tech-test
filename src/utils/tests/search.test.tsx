import { render, fireEvent, screen } from "@testing-library/react";
import SearchBar from "src/features/search/SearchBar";

describe("Search bar functionality", () => {
  it("Input contains search value", () => {
    render(
      <SearchBar
        onSubmit={(event) => event}
        onChange={(event) => event}
        search={"Test Search"}
      />
    );
    expect(screen.getByTestId("input-search-bar")).toHaveValue("Test Search");
  });

  it("Search bar is mounted", () => {
    render(
      <SearchBar
        onSubmit={(event) => event}
        onChange={(event) => event}
        search={"Test Search"}
      />
    );
    expect(screen.getByTestId("input-search-bar")).toBeVisible();
  });
});

export {};
