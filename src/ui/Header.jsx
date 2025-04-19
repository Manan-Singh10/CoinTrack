import { Link } from "react-router-dom";
import Button from "./Button";
import { useCurrencyStore } from "../../store/currencyStore";

function Header() {
  const currency = useCurrencyStore((state) => state.currency);
  const setCurrency = useCurrencyStore((state) => state.setCurrency);

  return (
    <header className="items-center bg-linear-to-br from-[#2B0068] to-[#5200C5] grid grid-cols-[130px_1fr_80px] px-2 py-6 w-full overflow-hidden sm:px-20 md:px-28 md:py-9 lg:px-48 md:grid-cols-[200px_1fr_180px]">
      <h1 className="text-xl sm:text-2xl font-bold text-stone-100 md:text-3xl lg:text-[32px]">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C7C7C7] to-[#999999]">
          <Link to="/">COINTRACK</Link>
        </span>
      </h1>

      <nav className="text-stone-300 font-medium text-md flex items-center justify-center gap-3 sm:text-xl sm:font-medium md:text-[23px] md:gap-16 lg:gap-32">
        <Link to="/home" className="">
          Home
        </Link>
        <Link to="/about" className="">
          About
        </Link>
        <Link to="/news" className="">
          News
        </Link>
      </nav>

      <div className="flex justify-center">
        <select
          className="text-black  font-medium text-sm bg-white opacity-50 p-1 lg:pb-2 rounded-3xl sm:text-md lg:text-xl items-center"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="usd">USD</option>
          <option value="inr">INR</option>
          <option value="eur">EUR</option>
        </select>
      </div>
    </header>
  );
}

export default Header;
