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
import { useCurrencyStore } from "../../../store/currencyStore";

// function MetricsTable() {
function MetricsTable({ coinData }) {
  const currency = useCurrencyStore((state) => state.currency);

  const metrics = [
    { label: "Market Cap Rank", value: coinData.market_cap_rank },
    {
      label: `24h Trading Volume(${currency})`,
      value: coinData.market_data.total_volume[currency],
    },
    {
      label: "Circulating Supply",
      value: coinData.market_data.circulating_supply,
    },
    { label: "Total Supply", value: "Paid" }, // Static fallback
    { label: "Max Supply", value: coinData.market_data.max_supply },
    {
      label: `All Time High (ATH)(${currency})`,
      value: coinData.market_data.ath[currency],
    },
    {
      label: `ATH Date (${currency})`,
      value: coinData.market_data.ath_date[currency],
    },
    {
      label: `All Time Low (ATL)(${currency})`,
      value: coinData.market_data.atl[currency],
    },
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
