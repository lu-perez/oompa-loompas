interface InputSearchProps {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const InputSearch = ({ setSearchTerm }: InputSearchProps) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <img className="search-icon" src={'assets/img/ic_search.png'} />
    </div>
  );
};

export default InputSearch;
