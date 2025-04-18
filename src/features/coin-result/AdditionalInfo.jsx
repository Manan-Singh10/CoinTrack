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

function AdditionalInfo({ coinData }) {
  const infos = [
    {
      label: "Description",
      value: `${coinData?.description?.en}` || "Not available",
    },
    {
      label: "Website",
      value: coinData?.links?.homepage[0] || "Not available",
    },
    {
      label: "Github",
      value: coinData?.links?.repos_url.github || "Not available",
    },
    {
      label: "Categories",
      value: coinData?.categories || "Not available",
    },
  ];

  return (
    <Table>
      <TableHeader className="flex justify-center">
        <TableRow className="text-xl">
          <TableHead className="text-stone-200">Additional Info</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {infos.map((info, index) => (
          <TableRow key={index} className="flex justify-between">
            <TableCell className="font-medium">{info.label}</TableCell>
            <TableCell className="max-w-[50%] overflow-auto break-words whitespace-normal">
              {info.value}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default AdditionalInfo;
