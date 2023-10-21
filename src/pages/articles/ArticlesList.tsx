import React, { useEffect } from "react";
import { fetchArticles } from "../../context/articles/actions";
import { useArticlesDispatch } from "../../context/articles/context";
import ArticleListItems from "./ArticleListItems";

const ArticlesList: React.FC = () => {
  const dispatchArticles = useArticlesDispatch();
  useEffect(() => {
    fetchArticles(dispatchArticles);
  }, [dispatchArticles]);
  return (
    <div className="mt-5">
      <ArticleListItems/>
    </div>
  );
};
export default ArticlesList;