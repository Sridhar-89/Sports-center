import { Link } from "react-router-dom";
import React, { Suspense } from "react";
const Favourites = React.lazy(() => import("./favourites"));
import ErrorBoundary from "../../components/ErrorBoundary";

const Favouriteslist = () => {
  return (
    <div className="m-4 dark:bg-gray-800">
      <h1 className="py-3 px-4 font-semibold">Your Favorites</h1>
      <div className="m-3">
        <ErrorBoundary>
          <Suspense
            fallback={<div className="suspense-loading">Loading...</div>}
          >
            <Favourites />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Favouriteslist;
