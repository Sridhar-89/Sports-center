import Appbar from "./Appbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Appbar />
      <main>
        <div className="mx-auto max-w-8xl py-5 sm:px-8 lg:px-8">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Layout;
