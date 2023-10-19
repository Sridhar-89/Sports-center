import React from "react";
import { Link } from "react-router-dom";

const Favourites =() =>{
  const items = [
    {
      id: 1,
      title: "Favorite Item A",
      details: "Explore this amazing content that will keep you engaged and informed.",
    },
    {
      id: 2,
      title: "Favorite Item B",
      details: "Discover a fascinating article that's both educational and entertaining.",
    },
  ];
  return (
    <div className="m-4 bg-gray-300">
      <h1 className="py-3 px-4 font-semibold">Your Favorites</h1>
      <div className="m-3">
        {items.map((item) => (
          <div key={item.id} className="my-4 p-4 bg-white rounded-lg flex">
            <div className="flex-1 bg-white flex flex-col items-center justify-center">
              <div>
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-700 mb-2">{item.details}</p>

                <div className="flex justify-center">
                  <button className="mt-4 bg-blue-500 w-full hover:bg-blue-700 text-white py-2 px-4">
                    <Link to="/" className="text-white font-semibold">
                      Learn More
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favourites;
