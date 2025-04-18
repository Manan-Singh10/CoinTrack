import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { coinData } from "../../data/coinData";

function CoinDataTable({ coinData }) {
  // const {coinData}

  const details = [
    { label: "Current Price", value: coinData.market_data.current_price.usd },
    { label: "Market Cap", value: coinData.market_data.market_cap.usd },
    {
      label: "Price Change 24h %",
      value: coinData.market_data.price_change_percentage_24h,
    },
    {
      label: "Price Change 7d %",
      value: coinData.market_data.price_change_percentage_7d,
    },
  ];

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>

      <TableHeader className="flex justify-center">
        <TableRow className="text-xl">
          <TableHead className="text-stone-200 flex items-center gap-3">
            {coinData.name}
            <img className="w-6 h-6" src={coinData.image.thumb} />
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="flex flex-col">
        {details.map((detail, index) => (
          <TableRow className="flex justify-between" key={index}>
            <TableCell className="font-medium">{detail.label}</TableCell>
            <TableCell>{detail.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default CoinDataTable;
