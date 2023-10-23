import React from "react";
import { Link } from "react-router-dom";
import Favourites from "./favourites";

const Favouriteslist = () => {
  // const items = [
  //   {
  //     id: 1,
  //     title: "Favorite Item A",
  //     details:
  //       "Explore this amazing content that will keep you engaged and informed.",
  //   },
  //   {
  //     id: 2,
  //     title: "Favorite Item B",
  //     details:
  //       "Discover a fascinating article that's both educational and entertaining.",
  //   },
  // ];
  return (
    <div className="m-4 bg-gray-300">
      <h1 className="py-3 px-4 font-semibold">Your Favorites</h1>
      <div className="m-3">
        <Favourites />
      </div>
    </div>
  );
};

export default Favouriteslist;
