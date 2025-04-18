import { Chart as ChartJS, Ticks } from "chart.js/auto";
import { Line } from "react-chartjs-2";

import { CoinChartData } from "../../data/coinChartData";
import { coinData } from "../../data/coinData";

import { callback } from "chart.js/helpers";
import MainLayout from "../../ui/MainLayout";
import CoinDataTable from "./CoinDataTable";
import MetricsTable from "./MetricsTable";
import AdditionalInfo from "./AdditionalInfo";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../ui/Loader";
import { getFullCoinData } from "../../services/apiGeckoCoin";

const chartOptions = {
  scales: {
    x: {
      grid: {
        display: false, // 🔹 Hides vertical grid lines
      },
    },
    y: {
      grid: {
        display: false, // 🔹 Hides horizontal grid lines
      },
    },
  },
  plugins: {
    legend: {
      labels: {
        color: "#fff", // Optional: makes legend text visible on dark backgrounds
      },
    },
  },
};

function CoinPage() {
  const [days, setDays] = useState(7);
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [error, setError] = useState(null);

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
  }, [coinId, days]);

  if (error) return <Error>{error}</Error>;
  if (!coinData || !coinChartData) return;
  <Loader />;

  const chartData = {
    labels: coinChartData.prices.map((date) =>
      new Date(date[0]).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
      })
    ),
    datasets: [
      {
        label: "Price in USD",
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
