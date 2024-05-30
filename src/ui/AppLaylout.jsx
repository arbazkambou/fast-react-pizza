import { Outlet, useNavigation } from "react-router-dom/dist";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import LoadingIndicator from "./LoadingIndicator";

function AppLaylout() {
  const navigate = useNavigation();
  const isLoading = navigate.state === "loading";
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <LoadingIndicator />}

      <Header />
      <div className="overflow-scroll">
        <main  >
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}

export default AppLaylout;
