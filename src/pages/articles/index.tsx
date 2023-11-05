import { Link } from "react-router-dom";
import React, { Suspense } from "react";
const ArticlesList = React.lazy(() => import("./ArticlesList"));
import ErrorBoundary from "../../components/ErrorBoundary";

const Articles = () => {
  return (
    <div className="dark:bg-gray-800">
      <ErrorBoundary>
        <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
          <ArticlesList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Articles;
