import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// import { coinData } from "../../data/coinData";

function MetricsTable({ coinData }) {
  const metrics = [
    { label: "Market Cap Rank", value: coinData.market_cap_rank },
    {
      label: "24h Trading Volume",
      value: coinData.market_data.total_volume.usd,
    },
    {
      label: "Circulating Supply",
      value: coinData.market_data.circulating_supply,
    },
    { label: "Total Supply", value: "Paid" }, // Static fallback
    { label: "Max Supply", value: coinData.market_data.max_supply },
    { label: "All Time High (ATH)", value: coinData.market_data.ath.usd },
    { label: "ATH Date", value: coinData.market_data.ath_date.usd },
    { label: "All Time Low (ATL)", value: coinData.market_data.atl.usd },
  ];

  return (
    <Table>
      <TableHeader className="flex justify-center">
        <TableRow className="text-xl">
          <TableHead className="text-stone-200">
            Price & Market Metrics
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="flex flex-col">
        {metrics.map((metric, index) => (
          <TableRow key={index} className="flex justify-between">
            <TableCell className="font-medium">{metric.label}</TableCell>
            <TableCell>{metric.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default MetricsTable;
