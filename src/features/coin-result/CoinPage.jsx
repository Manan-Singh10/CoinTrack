import { Chart as ChartJS, Ticks } from "chart.js/auto";
import { Line } from "react-chartjs-2";

// import { CoinChartData as coinChartData } from "../../data/coinChartData";
// import { coinData } from "../../data/coinData";

import { callback } from "chart.js/helpers";
import MainLayout from "../../ui/MainLayout";
import CoinDataTable from "./CoinDataTable";
import MetricsTable from "./MetricsTable";
import AdditionalInfo from "./AdditionalInfo";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../ui/Loader";
import { getFullCoinData } from "../../services/apiGeckoCoin";
import { useCurrencyStore } from "../../../store/currencyStore";

function CoinPage() {
  const currency = useCurrencyStore((state) => state.currency);

  const [days, setDays] = useState(7);
  const [error, setError] = useState(null);

  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [coinChartData, setCoinChartData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (!coinId) {
        setError("Undefined coinId");
        return;
      }

      try {
        const fullData = await getFullCoinData(coinId, days);

        if (!fullData) {
          setError("Could not get full coin data");
          return;
        }

        const { coinData, coinChartData } = fullData;

        if (!coinData) {
          setError("Could not get coin data");
          return;
        }

        if (!coinChartData) {
          setError("Could not get coin chart data");
          return;
        }

        setCoinData(coinData);
        setCoinChartData(coinChartData);
      } catch (err) {
        console.error(err);
        setError("An unexpected error occurred.");
      }
    }

    fetchData();
  }, [coinId, days, currency]);

  if (error) return <Error>{error}</Error>;
  if (!coinData || !coinChartData) return;
  <Loader />;

  const chartOptions = {
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#fff", // Optional: white tick text
          callback: function (value, index, ticks) {
            const date = new Date(coinChartData.prices[index][0]);
            return date.toLocaleDateString("en-US", {
              day: "2-digit",
              month: "short",
            }); // ➜ "17 Apr"
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#fff", // Optional: white tick text
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#fff",
        },
      },
      tooltip: {
        callbacks: {
          title: function (tooltipItems) {
            const index = tooltipItems[0].dataIndex;
            const timestamp = coinChartData.prices[index][0]; // Get original timestamp
            const date = new Date(timestamp);
            return date.toLocaleString("en-US", {
              day: "2-digit",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true, // ➜ 01:45:07 PM
              // hour12: false, // ➜ 13:45:07 (if you want 24-hour format)
            });
          },
        },
      },
    },
  };

  const chartData = {
    labels: coinChartData.prices.map((item) => item[0]),
    datasets: [
      {
        label: `Price in ${currency.toUpperCase()}`,
        data: coinChartData.prices.map((price) => price[1]),
        backgroundColor: "#0999",
        borderColor: "#064ff0",
        tension: 0.1,
        pointRadius: 2,
        pointHoverRadius: 4,
      },
    ],
  };

  return (
    <div className="w-full flex items-center justify-center flex-col lg:grid lg:grid-cols-2 lg:w-[80%] py-4">
      <MainLayout>
        <CoinDataTable coinData={coinData} />
      </MainLayout>

      <MainLayout>
        <div className="w-full lg:max-w-[80%] ">
          <div className="text-sm flex gap-1.5 m-2.5 text-left">
            <div>Number of days</div>
            <select
              className="bg-white/20 text-stone-500"
              onChange={(e) => setDays(e.target.value)}
              value={days}
            >
              <option value="1">Today</option>
              <option value="7">7 days</option>
              <option value="30">30 days</option>
              <option value="60">60 days</option>
              <option value="200">200 days</option>
            </select>
          </div>
          <Line data={chartData} options={chartOptions} />
        </div>
      </MainLayout>

      <MainLayout>
        <MetricsTable coinData={coinData} />
      </MainLayout>

      <MainLayout>
        <AdditionalInfo coinData={coinData} />
      </MainLayout>
    </div>
  );
}

export default CoinPage;
