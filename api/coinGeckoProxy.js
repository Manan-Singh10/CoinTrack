export default async function handler(request, response) {
  const { endpoint, ...queryParams } = request.query;

  if (!endpoint || typeof endpoint !== "string") {
    return response.status(400).json({ error: "Invalid endpoint" });
  }

  try {
    const apiResponse = await fetch(
      `https://api.coingecko.com/api/v3/${endpoint}?${new URLSearchParams(
        queryParams
      )}`,
      {
        headers: {
          "x-cg-demo-api-key": process.env.VITE_API_KEY, // Correct header
        },
      }
    );

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
