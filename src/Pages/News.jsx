import { useEffect, useState } from "react";
import { cacheNews, getNewsCache } from "../utils/newsCache";
import NewsRow from "../ui/NewsRow";
import Loader from "../ui/Loader";

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const NEWS_URL = `https://newsdata.io/api/1/news?apikey=${NEWS_API_KEY}&q=crypto%20coins `;

function News() {
  const [newsData, setNewsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        setIsLoading(true);
        setError(null);

        const cachedNews = getNewsCache();
        console.log(cachedNews ? "Using cached data" : "Fetching fresh data");
        if (cachedNews) {
          setNewsData(cachedNews);
          setIsLoading(false);
          return;
        }

        const res = await fetch(NEWS_URL);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        if (!data.results) throw new Error("No results in API response");

        cacheNews(data.results);
        setNewsData(data.results);
      } catch (err) {
        console.error("Error fetching news: ", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchNews();
  }, []);

  return (
    <div>
      <div>
        {isLoading && <Loader />}
        {error && <p className="error">{error}</p>}
        {newsData &&
          newsData.map((news) => {
            return (
              <NewsRow
                key={news.title}
                title={news.title}
                creator={news.creator || news.source_name}
                imgUrl={news.image_url}
                country={news.country}
                description={news.description}
                sourceUrl={news.source_url}
              />
            );
          })}
        {!isLoading && !error && !newsData && <p>No news available</p>}
      </div>
      <div className="text-center">Feed updates every 24 hours</div>
    </div>
  );
}

export default News;
