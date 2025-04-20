import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { marketData } from "../../data/marketData";
import { useEffect, useState } from "react";
import { getMarketData } from "../../services/apiGeckoCoin";
import { Link, useLoaderData } from "react-router-dom";
import { useCurrencyStore } from "../../../store/currencyStore";

function MarketTable() {
  const coins = useLoaderData();
  // const [coins, setCoins] = useState(marketData);
  const currency = useCurrencyStore((state) => state.currency);

  const [item, setItem] = useState(0);

  const itemsPerPage = 7;
  const paginatedData = coins.slice(item, item + itemsPerPage);

  return (
    <div className="overflow-x-auto custom-scrollbar">
      <Table className="min-w-[500px]">
        <TableHeader>
          <TableRow>
            <TableHead className="text-stone-200 text-center w-1/20">
              #
            </TableHead>
            <TableHead className="sticky left-0 z-10 px-0">
              <h2 className="text-stone-200 backdrop-blur-3xl text-center p-1 rounded-lg">
                Coin
              </h2>
            </TableHead>
            <TableHead className="text-stone-200 text-center">Price</TableHead>
            <TableHead className="text-stone-200 text-center">
              High(24h)
            </TableHead>
            <TableHead className="text-stone-200 text-center">
              low(24h)
            </TableHead>
            <TableHead className="text-stone-200 text-center">
              Price change(24h)
            </TableHead>
            <TableHead className="text-stone-200">Market Cap Rank</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="mt-4">
          {paginatedData.map((data, index) => (
            <TableRow className="relative" key={data.id}>
              <TableCell className="text-center">
                <Link
                  to={`/search/coin/${data.id}`}
                  className="absolute inset-0"
                />
                {item + index + 1}
              </TableCell>

              <TableCell className="sticky left-0 z-10 px-0 flex min-w-35 max-w-50 overflow-hidden">
                <p className="text-stone-200 backdrop-blur-3xl text-center p-1 px-2 w-full flex items-center gap-2 rounded-lg">
                  <img src={data.image} className="w-6 h-6 rounded-2xl" />
                  {data.name}
                </p>
              </TableCell>

              <TableCell>{data.current_price}</TableCell>
              <TableCell>{data.ath}</TableCell>
              <TableCell>{data.atl}</TableCell>
              <TableCell>{data.price_change_24h}</TableCell>
              <TableCell>{data.market_cap_rank}</TableCell>
            </TableRow>
          ))}
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
    </div>
  );
}

export default MarketTable;

export async function loader() {
  const marketData = await getMarketData();
  return marketData;
}
