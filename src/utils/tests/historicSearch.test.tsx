import { render, screen } from "@testing-library/react";
import HistoricSearch from "src/features/search/HistoricSearch";

const TestHistoricSearch = () => {
  localStorage.setItem("postcodes", "EH15 2NS, NN12 8UR");

  return (
    <HistoricSearch
      onClickPostcode={() => {}}
      onClickRemovePostcode={() => {}}
    />
  );
};

const postcodesString = localStorage.getItem("postcodes") || "";
const postcodes =
  postcodesString.length > 0 ? postcodesString?.split(", ") : [];

const setup = () => {
  const utils = render(<TestHistoricSearch />);

  const buttons = postcodes?.map((postcode: string) =>
    screen.getByTestId(`postcode-chip-button-${postcode}`)
  );
  const searchContainer = screen.getByTestId("historic-search-container");

  return {
    buttons,
    searchContainer,
    ...utils,
  };
};

describe("Historic search functionality", () => {
  it("Historic search component has mounted", () => {
    const { searchContainer } = setup();
    expect(searchContainer).toBeVisible();
  });

  it("Renders chip button using locally stored postcodes", () => {
    const { buttons } = setup();

    buttons.map((button, i) => {
      expect(button).toBeVisible();
      expect(button).toHaveTextContent(postcodes[i]);

      return null;
    });
  });
});

export {};
