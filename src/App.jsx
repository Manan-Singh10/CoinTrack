import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./ui/Header";
import Footer from "./ui/Footer";
import AppLayout from "./ui/AppLayout";
import About from "./Pages/About";
import News from "./Pages/News";
import SearchPage from "./Pages/SearchPage";
import CoinPage from "./features/coin-result/CoinPage";
import ResultsTable from "./features/search-results/ResultsTable";
import Landing from "./Pages/Landing";
import Home from "./Pages/Home";
import Error from "./Pages/Error";
import { loader as marketDataLoader } from "./features/Market-result/MarketTable";
import Loader from "./ui/Loader";

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Landing />,
        },
        {
          path: "/home",
          element: <Home />,
          loader: marketDataLoader,
        },
        {
          path: "/search/:searchQuery",
          element: (
            <SearchPage>
              <ResultsTable />
            </SearchPage>
          ),
        },
        {
          path: "/search/coin/:coinId",
          element: <CoinPage />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/News",
          element: <News />,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
