import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getValidPostcodes } from "src/utils/func/postcodes";
import SearchBar from "../search/SearchBar";
import HistoricSearch from "../search/HistoricSearch";

const CrimeTracker = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const postcodeQueryParams = searchParams.get("postcode") || "";
  const initialPostcodes = getValidPostcodes(postcodeQueryParams);
  const [searchTerm, setSearchTerm] = useState(
    initialPostcodes.join(",") || ""
  );
  const [postcodes, setPostcodes] = useState(
    postcodeQueryParams?.split(",") || [""]
  );
  const [coordinates, setCoordinates] = useState([{}]);
  const [selectedPostcodeIndex, setSelectedPostcodeIndex] = useState(0);

  const handleUpdateSearchTerm = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
  };

  const handleSubmitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    const validPostcodes = getValidPostcodes(searchTerm);
    event.preventDefault();
    if (!validPostcodes.length) {
      window.alert("You have not entered a valid postcode!");
    } else {
      const validSearchTerm = validPostcodes.join(",");
      setSearchParams({ postcode: searchTerm });
      setPostcodes(validPostcodes);
      setSearchTerm(validSearchTerm);
      setSearchParams({ postcode: validSearchTerm });
    }
  };

  const handleUpdateCoordinates = (response: any) => {
    const { data } = response;
    const { latitude, longitude } = data;

    setCoordinates([{ latitude, longitude }]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://api.getthedata.com/postcode/${postcodes[selectedPostcodeIndex]}`
      );

      const jsonResponse = await response.json();

      if (jsonResponse.status === "match") {
        handleUpdateCoordinates(jsonResponse);
      }
    };
    fetchData();
  }, [postcodes, selectedPostcodeIndex]);

  return (
    <div className="flex flex-col flex-1">
      <SearchBar
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleUpdateSearchTerm(event)
        }
        onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
          handleSubmitSearch(event)
        }
        search={searchTerm}
      />
      <HistoricSearch />
    </div>
  );
};

export default CrimeTracker;
