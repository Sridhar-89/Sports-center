import Livescore from "../livescores";

import Appbar from "../../layouts/Appbar";
import Favourites from "../favourites";
import Articles from "../articles";

function Home() {
  return (
    <div>
      <Appbar />

      <Livescore />

      <Articles />

      <Favourites />
    </div>
  );
}

export default Home;
