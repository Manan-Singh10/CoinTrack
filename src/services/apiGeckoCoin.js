import { useCurrencyStore } from "../../store/currencyStore";

const API_BASE = "/api/coinGeckoProxy"; // Points to Vercel function
const currency = useCurrencyStore.getState().currency;

export async function getMarketData() {
  try {
    const res = await fetch(
      `${API_BASE}?endpoint=coins/markets&vs_currency=${currency}`
    );

    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Failed to fetch market data:", err);
    throw err; // Re-throw to let components handle errors
  }
}

export async function getFullCoinData(coinId, days = 7) {
  try {
    const [coinData, chartData] = await Promise.all([
      fetch(`${API_BASE}?endpoint=coins/${coinId}`).then((res) => res.json()),
      fetch(
        `${API_BASE}?endpoint=coins/${coinId}/market_chart&vs_currency=${currency}&days=${days}`
      ).then((res) => res.json()),
    ]);

    return { coinData, coinChartData: chartData };
  } catch (err) {
    console.error("Failed to fetch full coin data:", err);
    throw err;
  }
}

export async function getSearchData(query) {
  try {
    const res = await fetch(
      `${API_BASE}?endpoint=search&query=${encodeURIComponent(query)}`
    );

    if (!res.ok) throw new Error(`Search failed with status ${res.status}`);

    return await res.json();
  } catch (err) {
    console.error("Search failed:", err);
    throw err;
  }
}
