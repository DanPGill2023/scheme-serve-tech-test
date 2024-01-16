const validatePostcode = (postcode: string) => {
  const postcodeRegex =
    /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) [0-9][A-Za-z]{2})$/;
  return postcode.match(postcodeRegex);
};

export const getValidPostcodes = (postcodes: string) => {
  const postcodeArray = postcodes.split(", ");
  return postcodeArray.filter((postcode) => {
    return validatePostcode(postcode);
  });
};
