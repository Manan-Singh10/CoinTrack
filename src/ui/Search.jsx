import { useState } from "react";
import { useSearchQueryStore } from "../../store/searchQueryStore";
import { useNavigate } from "react-router-dom";

function Search() {
  // const searchQuery = useSearchQueryStore((state) => state.searchQuery);
  const setSearchQuery = useSearchQueryStore((state) => state.setSearchQuery);
  const [input, setInput] = useState("");

  const navigate = useNavigate();

  const className = `bg-stone-200 text-md p-2 min-w-[20rem] rounded-2xl  text-stone-800`;

  function handleSubmit(e) {
    e.preventDefault();
    setSearchQuery(input);
    navigate(`/search/${input}`);
    setInput("");
  }

  return (
    <form className="flex items-center relative" onSubmit={handleSubmit}>
      <input
        placeholder="Search any coin..."
        className={className}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">
        <img
          src="../public/search-icon.png"
          className=" w-8 absolute right-1 top-1 p-1 cursor-pointer"
        />
      </button>
    </form>
  );
}

export default Search;
