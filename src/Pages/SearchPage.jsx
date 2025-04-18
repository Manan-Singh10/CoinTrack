import { useParams } from "react-router-dom";
import ResultsTable from "../features/search-results/ResultsTable";
import Search from "../ui/Search";

function SearchPage({ children }) {
  const { searchQuery } = useParams();

  return (
    <div className=" h-[70vh] w-[100%] sm:w-[80%] mx-auto text-center p-2 overflow-y-auto  flex flex-col items-center gap-5 sm:px-10">
      <div className="w-full mt-15 sm:flex items-center justify-between">
        <Search />
        <p className="text-stone-100 mt-2 sm:mt-0">
          showing results for <b>{searchQuery}</b>
        </p>
      </div>
      <div className="h-[80%] w-[90%] bg-white/5 rounded-4xl px-6 py-1 text-[12px] sm:text-lg lg:text-xl mt-10 text-stone-300 overflow-y-scroll custom-scrollbar lg:w-[70%]">
        {/* Search results */}
        {children}
      </div>
    </div>
  );
}

export default SearchPage;
