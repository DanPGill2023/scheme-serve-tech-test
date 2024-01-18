import { render, screen, act } from "@testing-library/react";
import { useState } from "react";
import userEvent from "@testing-library/user-event";
import SearchBar from "src/features/search/SearchBar";

const TestSearchBar = () => {
  const [search, setSearch] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    act(() => {
      setSearch(event.target.value);
    });
  };

  return (
    <SearchBar onSubmit={() => {}} onChange={handleChange} search={search} />
  );
};

const setup = () => {
  const utils = render(<TestSearchBar />);
  const input = screen.getByTestId("input-search-bar");

  return {
    input,
    ...utils,
  };
};

describe("Search bar functionality", () => {
  it("Search bar is mounted", () => {
    const { input } = setup();
    expect(input).toBeVisible();
  });

  it("Typing in search bar updates value", () => {
    const { input } = setup();
    const { value } = input as HTMLInputElement;
    expect(value).toBe("");
    userEvent.type(input, "Test Search");
    expect(input).toHaveValue("Test Search");
  });
});

export {};
