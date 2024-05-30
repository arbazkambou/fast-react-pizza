import { Link } from "react-router-dom/dist";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

function Header() {
  return (
    <header className=" bg-yellow-400 border-b-2 border-stone-200 p-4 sm:px-6 flex justify-between focus:ring-opacity-50">
      <Link to="/" className=" tracking-widest">
      <span className=" font-semibold text-lg">Fast React Pizza.</span>
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
