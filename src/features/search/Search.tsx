import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getValidPostcodes } from "src/utils/func/postcodes";

const Search = () => {
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
    <div className="flex flex-col">
      <form
        onSubmit={(event) => handleSubmitSearch(event)}
        className="flex p-4 justify-center"
      >
        <input
          className="flex w-2/3 m-2 border-2 outline-none rounded-md border-black focus:border-theme-purple hover:border-theme-purple"
          type="text"
          placeholder="Please enter a postcode or list of postcodes separated with commas"
          value={searchTerm}
          onChange={(event) => handleUpdateSearchTerm(event)}
        />
        <button
          disabled={!searchTerm.length}
          className="bg-theme-purple text-white p-2 rounded-md disabled:brightness-50"
          type="submit"
        >
          Search by Postcode
        </button>
      </form>
    </div>
  );
};

export default Search;
