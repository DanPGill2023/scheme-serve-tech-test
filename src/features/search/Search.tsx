import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const postcodeQueryParams = searchParams.get("postcode");
  const [searchTerm, setSearchTerm] = useState(postcodeQueryParams || "");
  const [postcodes, setPostcodes] = useState(
    postcodeQueryParams?.split(",") || [""]
  );
  const [coordinates, setCoordinates] = useState([{}]);

  const validatePostcode = (postcode: string) => {
    const postcodeRegex =
      /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) [0-9][A-Za-z]{2})$/;
    return postcode.match(postcodeRegex);
  };

  const getValidPostcodes = (postcodes: string) => {
    const postcodeArray = postcodes.split(",");
    return postcodeArray.filter((postcode) => {
      return validatePostcode(postcode);
    });
  };

  const handleUpdateSearchTerm = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
  };

  const handleSubmitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    const validPostcodes = getValidPostcodes(searchTerm);
    event.preventDefault();
    setSearchParams({ postcode: searchTerm });
    if (!validPostcodes.length) {
      window.alert("You have not entered a valid postcode!");
    } else {
      const validSearchTerm = validPostcodes.join(",");
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
