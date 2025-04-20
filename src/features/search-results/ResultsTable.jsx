import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// import { searchData } from "@/data/searchData";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSearchData } from "../../services/apiGeckoCoin";
import { useSearchQueryStore } from "../../../store/searchQueryStore";
import Loader from "../../ui/Loader";

function ResultsTable() {
  const { searchQuery } = useSearchQueryStore();
  const [coins, setCoins] = useState(null);
  // const coins = searchData.coins;

  const [isLoading, setIsLoading] = useState(false);
  const [item, setItem] = useState(0);

  const itemsPerPage = 8;
  const paginatedData = coins.slice(item, item + itemsPerPage);

  useEffect(() => {
    async function fetchData() {
      if (!searchQuery || isLoading) return;

      try {
        setIsLoading(true);

        const data = await getSearchData(searchQuery);
        if (!data) throw new Error("Couldnt get data from getSearchData");
        if (JSON.stringify(data) !== JSON.stringify(coins)) {
          setCoins(data.coins);
        }
        setItem(0);
      } catch (err) {
        console.error("Failed to fetch search results", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [searchQuery]);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-stone-200 w-1/20 text-center">
              #
            </TableHead>
            <TableHead className="text-stone-200 w-1/10 text-center">
              Symbol
            </TableHead>
            <TableHead className="text-stone-200 w-1/2 text-center">
              Coins
            </TableHead>
            <TableHead className="text-stone-200 text-center">
              Market cap rank
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((coin, i) => {
            return (
              <TableRow className="relative" key={coin.id}>
                <TableCell className="text-center">
                  <Link
                    to={`/search/coin/${coin.id}`}
                    className="absolute inset-0"
                  />
                  {item + i + 1}
                </TableCell>
                <TableCell className="flex justify-center">
                  <img
                    src={coin.thumb}
                    alt={coin.api_symbol}
                    className="rounded-2xl"
                  />
                </TableCell>
                <TableCell className="max-w-[120px] overflow-hidden">
                  {coin.name}
                </TableCell>
                <TableCell className="flex justify-center">
                  {coin.market_cap_rank}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="min-w-full flex justify-between my-2 text-sm">
        {item > 0 ? (
          <button
            className={`px-3 py-1 bg-white/20 rounded-2xl `}
            onClick={() => setItem((a) => a - itemsPerPage)}
          >
            Previous
          </button>
        ) : (
          <div></div>
        )}

        {item + itemsPerPage < coins.length && (
          <button
            className={`px-3 py-1 bg-white/20 rounded-2xl `}
            onClick={() => setItem((a) => a + itemsPerPage)}
          >
            Next
          </button>
        )}
      </div>
    </>
  );
}

export default ResultsTable;
