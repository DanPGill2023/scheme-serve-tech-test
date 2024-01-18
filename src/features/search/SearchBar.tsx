type SearchBarProps = {
  onSubmit: React.FormEventHandler;
  onChange: React.ChangeEventHandler;
  search: string;
};

const SearchBar = ({ onSubmit, search, onChange }: SearchBarProps) => {
  return (
    <div className="flex flex-col">
      <form onSubmit={onSubmit} className="flex p-4 justify-center">
        <input
          className="flex w-2/3 m-2 border-2 outline-none rounded-md border-black focus:border-theme-purple hover:border-theme-purple"
          type="text"
          data-testid="input-search-bar"
          placeholder="Please enter a postcode or list of postcodes separated with commas"
          value={search}
          onChange={onChange}
        />
        <button
          disabled={!search.length}
          className="bg-theme-purple text-white p-2 rounded-md hover:brightness-150 disabled:brightness-50"
          type="submit"
        >
          Search by Postcode
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
