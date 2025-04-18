import { Link } from "react-router-dom";
import Button from "../ui/Button";
import Search from "../ui/Search";

function Landing() {
  return (
    <div className="h-[40rem] w-[90%] sm:w-[60%] mx-auto text-center p-2 overflow-y-auto flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold mb-8 text-stone-50 sm:text-5xl">
        Welcome to CoinTrack
      </h2>
      <h3 className="text-centre  text-2xl text-stone-400 sm:text-[24px] mb-8">
        Your one-stop platform to stay updated with{" "}
        <span className="text-stone-200">global cryptocurrency</span> prices,
        explore detailed{" "}
        <span className="text-stone-200">insights on individual coins</span>,
        and catch the latest <span className="text-stone-200">news</span> from
        the world of crypto
      </h3>
      <Search />
      <div className="">
        <Button>
          <Link to="/home">Get Started</Link>
        </Button>
      </div>
    </div>
  );
}

export default Landing;
