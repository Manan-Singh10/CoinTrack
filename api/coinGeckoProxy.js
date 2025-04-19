export default async function handler(request, response) {
  // Extract the CoinGecko endpoint from query parameters
  const { endpoint } = request.query;

  // Construct the CoinGecko API URL
  const apiUrl = `https://api.coingecko.com/api/v3/${endpoint}?x_cg_demo_api_key=${
    import.meta.env.VITE_API_KEY
  }`;

  try {
    // Forward the request to CoinGecko
    const apiResponse = await fetch(apiUrl);
    const data = await apiResponse.json();

    // Return the data to frontend
    return response.status(200).json(data);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
