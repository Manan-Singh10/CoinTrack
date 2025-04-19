const CACHE_KEY = "newsData";
const CACHE_DURATION = 24 * 60 * 60 * 1000;

export function getNewsCache() {
  try {
    const cachedData = localStorage.getItem(CACHE_KEY);

    if (!cachedData) return null;

    const { data, timestamp } = JSON.parse(cachedData);

    if (Date.now() - timestamp < CACHE_DURATION) return data;

    localStorage.removeItem(CACHE_KEY);
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export function cacheNews(data) {
  try {
    const cacheValue = JSON.stringify({
      data,
      timestamp: Date.now(),
    });
    localStorage.setItem(CACHE_KEY, cacheValue);
  } catch (err) {
    console.error("Error caching news", err);
  }
}
