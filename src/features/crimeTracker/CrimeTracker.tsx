import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getValidPostcodes,
  updatePreviouslySearchedPostcodes,
  removePreviouslySearchedPostcodes,
} from "src/utils/func/postcodes";
import SearchBar from "../search/SearchBar";
import HistoricSearch from "../search/HistoricSearch";
import DataViewTable from "../table/DataViewTable";

const CrimeTracker = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const postcodeQueryParams = searchParams.get("postcode") || "";
  const initialPostcodes = getValidPostcodes(postcodeQueryParams);

  const [searchTerm, setSearchTerm] = useState<string>(
    initialPostcodes.join(", ") || ""
  );
  const [postcodes, setPostcodes] = useState<string[]>(
    postcodeQueryParams.length ? postcodeQueryParams?.split(", ") : []
  );
  const [coordinates, setCoordinates] = useState<
    | {
        latitude: number;
        longitude: number;
      }
    | {}
  >({});
  const [selectedPostcodeIndex, setSelectedPostcodeIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const handleUpdateSearchTerm = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
  };

  const handleSubmitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    const validPostcodes = getValidPostcodes(searchTerm.toUpperCase());
    event.preventDefault();
    if (!validPostcodes.length) {
      window.alert("You have not entered a valid postcode!");
    } else {
      const validSearchTerm = validPostcodes.join(", ");
      setPostcodes(validPostcodes);
      setSearchTerm(validSearchTerm);
      setSearchParams({ postcode: validSearchTerm });
      updatePreviouslySearchedPostcodes(validPostcodes);
    }
  };

  const handleUpdateCoordinates = (coordinates: {
    latitude: number;
    longitude: number;
  }) => {
    setCoordinates(coordinates);
  };

  const handleUpdateSelectedPostcodeIndex = (postcode: string) => {
    const index = postcodes.includes(postcode)
      ? postcodes.indexOf(postcode)
      : 0;

    setSelectedPostcodeIndex(index);
    setPostcodes([postcode]);
    setSearchTerm(postcode);
    setSearchParams({ postcode });
  };

  const handleRemoveSavedPostcode = (postcode: string) => {
    const updatedPostcodes = postcodes.filter((pc) => postcode !== pc);

    setPostcodes(updatedPostcodes);

    if (searchTerm.includes(postcode)) {
      setSearchTerm(updatedPostcodes.join(", "));
    }

    if (postcodeQueryParams.includes(postcode)) {
      setSearchParams({ postcode: updatedPostcodes.join(", ") });
    }

    removePreviouslySearchedPostcodes(postcode);
  };

  useEffect(() => {
    if (postcodes.length) {
      setLoading(true);
      const fetchData = async () => {
        const response = await fetch(
          `http://api.getthedata.com/postcode/${postcodes[selectedPostcodeIndex]}`
        );
        const jsonResponse = await response.json();

        if (jsonResponse.status === "match") {
          const { data } = jsonResponse;
          const { latitude, longitude } = data;
          const coordinates = {
            latitude: Number(latitude),
            longitude: Number(longitude),
          };
          handleUpdateCoordinates(coordinates);
        }
        setLoading(false);
      };
      fetchData().then();
    }
  }, [postcodes, selectedPostcodeIndex]);

  return (
    <div className="flex flex-col flex-1">
      <SearchBar
        onChange={handleUpdateSearchTerm}
        onSubmit={handleSubmitSearch}
        search={searchTerm}
      />
      <HistoricSearch
        onClickPostcode={handleUpdateSelectedPostcodeIndex}
        onClickRemovePostcode={handleRemoveSavedPostcode}
      />
      <DataViewTable
        loadingCoordinates={loading}
        selectedCoordinates={coordinates}
        postcode={postcodes[selectedPostcodeIndex]}
      />
    </div>
  );
};

export default CrimeTracker;
