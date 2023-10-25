import React, { useEffect, useState } from "react";
import { fetchArticles } from "../../context/articles/actions";
import {
  useArticlesDispatch,
  useArticlesState,
} from "../../context/articles/context";
import ArticleListItems from "./ArticleListItems";

const ArticlesList: React.FC = () => {
  const dispatchArticles = useArticlesDispatch();
  useEffect(() => {
    fetchArticles(dispatchArticles);
  }, [dispatchArticles]);
  const state: any = useArticlesState();
  const favoriteSports = JSON.parse(
    localStorage.getItem("favouriteSports") || "{}"
  );

  const favoriteTeams = JSON.parse(
    localStorage.getItem("favouriteTeams") || "{}"
  );
  const authToken = localStorage.getItem("authToken");

  const [selectedSport, setSelectedSport] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("date");
  const [filterValue, setFilterValue] = useState("");

  const { articles, isLoading, isError, errorMessage } = state;
  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>{errorMessage}</span>;
  }

  const applyFilter = (article: any) => {
    if (article.sport.name === selectedSport) {
      switch (selectedFilter) {
        case "By SportName":
          return article.sport.name.includes(filterValue);
        case "By Date":
          return article.date.includes(filterValue);
        case "By Title":
          return article.title.includes(filterValue);
        default:
          return true;
      }
    } else if (selectedSport == "") {
      if (authToken) {
        return (
          favoriteSports[article.sport.name] === true &&
          (article.teams.length === 0 ||
            article.teams.some(
              (team: any) => favoriteTeams[team.name] === true
            ))
        );
      } else {
        return true;
      }
    }
    return false;
  };

  const sortArticles = (a: any, b: any) => {
    switch (selectedFilter) {
      case "By SportName":
        return a.sport.name.localeCompare(b.sport.name);
      case "By Date":
        return a.date.localeCompare(b.date);
      case "By Title":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  };
  return (
    <div>
      <div className="flex border bg-grey-700">
        <div className="w-full p-3">
          <div className="px-4 mb-3 flex">
            <button
              onClick={() => setSelectedSport("")}
              className={`px-4 py-2 mr-2 text-sm font-medium rounded ${
                selectedSport === ""
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              Your News
            </button>
            {Array.from(
              new Set(articles.map((article: any) => article.sport.name))
            ).map((sportName: any) => (
              <button
                key={sportName}
                onClick={() => setSelectedSport(sportName)}
                className={`px-3 py-3 mr-3 text-sm font-medium rounded ${
                  selectedSport === sportName
                    ? "bg-red-500 text-white"
                    : "bg-black-300 text-black-500"
                }`}
              >
                {sportName}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full p-3">
          <div className="mb-5 flex items-center justify-end">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-3 py-3 text-sm rounded-lg font-bold bg-gray-200 text-black-400"
            >
              <option value="By SportName">By Date</option>
              <option value="By Date">By Sport Name</option>
              <option value="By Title">By Title</option>
            </select>
            <div className="p-1 bg-slate-400 m-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6H20M4 12H16M4 18H12"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="m-3 bg-slate-300">
        {articles
          .filter(applyFilter)
          .sort(sortArticles)
          .map((article: any) => (
            <ArticleListItems key={article.id} article={article} />
          ))}
      </div>
    </div>
  );
};

export default ArticlesList;
