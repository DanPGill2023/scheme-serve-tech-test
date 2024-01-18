type HistoricSearchProps = {
  onClickPostcode: (postcode: string) => void;
  onClickRemovePostcode: (postcode: string) => void;
};

const HistoricSearch = ({
  onClickPostcode,
  onClickRemovePostcode,
}: HistoricSearchProps) => {
  const postcodesString = localStorage.getItem("postcodes") || "";
  const postcodes =
    postcodesString.length > 0 ? postcodesString?.split(", ") : [];

  return (
    <div data-testid="historic-search-container" className="flex flex-col">
      <h1 className="ml-6">Previously Searched Postcodes:</h1>
      <div className="flex flex-wrap p-4 justify-center overflow-y-auto flex-1 bg-theme-purple m-6 rounded-md max-h-44">
        {postcodes.map((postcode: string) => {
          return (
            <div className="flex relative" key={postcode}>
              <button
                data-testid={`postcode-chip-button-${postcode}`}
                onClick={() => onClickPostcode(postcode)}
                className="rounded-sm hover:brightness-150 w-24 p-2 h-10 m-4 bg-white text-theme-purple font-bold"
              >
                {postcode}
              </button>
              <button
                onClick={() => onClickRemovePostcode(postcode)}
                className="flex items-center hover:brightness-150 justify-center absolute rounded-full bg-theme-purple text-white right-3 border-white border text-align-center top-3 text-xs w-4 h-4"
              >
                X
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoricSearch;
