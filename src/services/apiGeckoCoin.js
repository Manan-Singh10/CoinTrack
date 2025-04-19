// const API_KEY = import.meta.env.VITE_API_KEY || "";
const API_KEY = "";
const proxyUrl = "https://cors-anywhere.herokuapp.com/";

export async function getMarketData() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": API_KEY,
    },
  };

  try {
    const res = await fetch(
      proxyUrl +
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd",
      options
    );
    if (!res.ok) {
      throw new Error("Something went wrong with fetching data");
    }
    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err.message || "Something went wrong");
  }
}

export async function getFullCoinData(coinId, days = 7) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": API_KEY,
    },
  };

  const coinDataURL = `https://api.coingecko.com/api/v3/coins/${coinId}`;
  const chartDataURL = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`;

  try {
    // Run both fetches in parallel
    const [coinRes, chartRes] = await Promise.all([
      fetch(proxyUrl + coinDataURL, options),
      fetch(proxyUrl + chartDataURL, options),
    ]);

    if (!coinRes.ok || !chartRes.ok) {
      throw new Error("Failed to fetch coin or chart data");
    }

    const [coinData, coinChartData] = await Promise.all([
      coinRes.json(),
      chartRes.json(),
    ]);

    return { coinData, coinChartData };
  } catch (err) {
    console.error(
      err.message || "Something went wrong fetching full coin data"
    );
    return null;
  }
}

export async function getSearchData(query) {
  const options = {
    method: "GET",
    headers: { accept: "application/json", "x-cg-demo-api-key": API_KEY },
  };

  try {
    const res = await fetch(
      proxyUrl + `https://api.coingecko.com/api/v3/search?query=${query}`,
      options
    );

    if (!res.ok) {
      throw new Error("Something went wrong with fetching searched data");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err.message || "Something went wrong");
  }
}
