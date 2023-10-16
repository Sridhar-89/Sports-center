import React from "react";
import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The requested page could not be found.</p>
      <Link to="/" className="ml-6 text-blue-300 hover:text-black">
        Home
      </Link>
    </div>
  );
};

export default Notfound;
