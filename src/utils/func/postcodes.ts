const validatePostcode = (postcode: string) => {
  const postcodeRegex =
    /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) [0-9][A-Za-z]{2})$/;
  return postcode.match(postcodeRegex);
};

export const getValidPostcodes = (postcodes: string) => {
  const postcodeArray = postcodes.split(",").map((postcode) => postcode.trim());
  return postcodeArray.filter((postcode) => {
    return validatePostcode(postcode);
  });
};

const getPreviousPostcodes = (postcodes: string[]) => {
  const previouslySearchedPostcodeString = localStorage
    .getItem("postcodes")
    ?.toUpperCase();
  const previouslySearchedPostcodes =
    previouslySearchedPostcodeString &&
    previouslySearchedPostcodeString.length > 0
      ? previouslySearchedPostcodeString
          ?.split(",")
          .map((postcode) => postcode.trim())
      : [];

  return previouslySearchedPostcodes;
};

export const updatePreviouslySearchedPostcodes = (postcodes: string[]) => {
  const previouslySearchedPostcodes = getPreviousPostcodes(postcodes);
  const newPostcodes = postcodes.filter(
    (postcode) => !previouslySearchedPostcodes?.includes(postcode)
  );
  const updatedPostcodes = [
    ...previouslySearchedPostcodes,
    ...newPostcodes,
  ].map((postcode) => postcode.trim());
  localStorage.setItem("postcodes", updatedPostcodes.join(", "));
};

export const removePreviouslySearchedPostcodes = (postcode: string) => {
  const previouslySearchedPostcodes = getPreviousPostcodes([postcode]);
  const newPostcodes = previouslySearchedPostcodes.filter(
    (pc) => pc !== postcode
  );
  const updatedPostcodes = newPostcodes.map((pc) => pc.trim());
  console.log(updatedPostcodes);
  localStorage.setItem("postcodes", updatedPostcodes.join(", "));
};
