import Livescore from "../livescores";

import Appbar from "../../layouts/Appbar";
import Favourites from "../favourites";
import Articles from "../articles";

const Home = () => {
  return (
    <div className="m-4 dark:bg-grey-300">
      <Appbar />
      {/* <div className="bg-gray-100">
        <div>
          <Livescore />
        </div>
        <h1 className="font-bold text-xl p-4">Trending News</h1>
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-3/4 shadow-xl">
            <Articles />
          </div>
          <div className="lg:w-1/4 shadow-xl">
            <Favourites />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Home;
