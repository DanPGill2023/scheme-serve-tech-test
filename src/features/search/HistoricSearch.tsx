type HistoricSearchProps = {
  onClick: (postcode: string) => void;
};

const HistoricSearch = ({ onClick }: HistoricSearchProps) => {
  const postcodes = localStorage.getItem("postcodes")?.split(", ") || [];
  return (
    <div className="flex flex-1 flex-col">
      <h1 className="ml-6">Previously Searched Postcodes:</h1>
      <div className="flex flex-wrap p-4 justify-center overflow-y-scroll flex-1 bg-theme-purple m-6 rounded-md max-h-44">
        {postcodes.map((postcode: string) => {
          return (
            <button
              key={postcode}
              onClick={() => onClick(postcode)}
              className="rounded-sm hover:brightness-150 w-24 p-2 h-10 m-4 bg-white text-theme-purple font-bold"
            >
              {postcode}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default HistoricSearch;
