import React from "react";
import { Link } from "react-router-dom";

const Articles = () => {
  const items = [
    {
      id: 1,
      sport: "tennis",
      title: "Exciting Tennis Tournament",
      details:
        "Get ready for a thrilling tennis tournament with world-class players.",
      date: "Feb 10, 2023",
      image: "tennis-tournament.jpg",
    },
    {
      id: 2,
      sport: "swimming",
      title: "Record-Breaking Swimming Event",
      details:
        "Experience an incredible swimming event with athletes aiming for new records.",
      date: "Feb 18, 2023",
      image: "swimming-event.jpg",
    },
  ];
  return (
    <div className="m-3">
      {items.map((item) => (
        <div key={item.id} className="my-3 p-3 bg-light-gray rounded-lg flex">
          <div className="flex-1">
            <div>
              <h3 className="text-base  mb-2">{item.sport}</h3>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-700 mb-2">{item.details}</p>
            </div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm text-gray-600">{item.date}</h3>
              <Link to="/" className=" text-blue-500 underline">
                Learn More...
              </Link>
            </div>
          </div>

          <div className="ml-4">
            <img
              src={item.image}
              alt={item.title}
              className="w-36 h-36 object-cover rounded-md"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Articles;
