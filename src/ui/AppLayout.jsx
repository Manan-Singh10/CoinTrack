import { Link, Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Gradient from "./Gradient";

function AppLayout() {
  return (
    <div className="font-roboto relative w-full overflow-hidden min-h-screen bg-[#15151A] ">
      <Gradient />

      <div className="relative flex flex-col left-0 min-h-screen z-10 text-white">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default AppLayout;
