export default async function handler(request, response) {
  const { endpoint, ...queryParams } = request.query;

  // Use Vercel's environment variables directly
  const apiUrl = `https://api.coingecko.com/api/v3/${endpoint}?${new URLSearchParams(
    queryParams
  ).toString()}&x_cg_demo_api_key=${process.env.VITE_API_KEY}`;

  try {
    const apiResponse = await fetch(apiUrl);

    if (!apiResponse.ok) {
      throw new Error(`CoinGecko API error: ${apiResponse.status}`);
    }

    const data = await apiResponse.json();
    return response.status(200).json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    return response.status(500).json({
      error: error.message || "Failed to fetch data from CoinGecko",
    });
  }
}
