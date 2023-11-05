import React, { useEffect, useState } from "react";
import {
  useArticlesState,
  useArticlesDispatch,
} from "../../context/articles/context";
import { fetchArticles } from "../../context/articles/actions";
import { Link } from "react-router-dom";
import { Article } from "../../context/articles/reducer";
import { API_ENDPOINT } from "../../config/constants";
import { Dialog } from "@headlessui/react";

interface FavouriteItemsProps {
  selectedSport: string;
  selectedTeam: string;
}

type ArticleContent = Article & {
  content: string;
};

const Favouriteitems = ({
  selectedSport,
  selectedTeam,
}: FavouriteItemsProps) => {
  const dispatchArticles = useArticlesDispatch();
  useEffect(() => {
    fetchArticles(dispatchArticles);
  }, [dispatchArticles]);

  const state: any = useArticlesState();

  const [articleData, setArticleData] = useState<ArticleContent>();
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { articles, isLoading, isError, errorMessage } = state;

  if (articles.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>{errorMessage}</span>;
  }

  const handleLinkClick = async (articleId: number) => {
    setSelectedArticleId(articleId);
    setIsDialogOpen(true);
    await fetchArticleData(articleId);
  };

  const fetchArticleData = async (id: number) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/articles/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch article data");
      }
      const data: ArticleContent = await response.json();
     
      setArticleData(data);
    } catch (error) {
      console.error("Error while fetching the article data:", error);
    }
  };

  const filteredArticles = articles.filter((item: any) => {
    if (selectedSport && selectedTeam) {
      return (
        item.sport.name === selectedSport &&
        item.teams.some((team: any) => team.name === selectedTeam)
      );
    } else if (selectedSport) {
      return item.sport.name === selectedSport;
    } else if (selectedTeam) {
      return item.teams.some((team: any) => team.name === selectedTeam);
    }
    return true;
  });
  return (
    <div className="m-5 dark:bg-gray-800">
      <div className="m-4">
        {filteredArticles.map((item: any) => (
          <div key={item.id} className="my-5 p-5 rounded-md flex">
            <div className="flex-1  flex flex-col dark:bg-gray-800 justify-center">
              <div>
                <h3 className="text-lg  font-bold mb-3">
                  {item.title}
                </h3>
                <p className=" text-sm mb-3">{item.summary}</p>

                <div className="flex justify-center">
                  <button
                    onClick={() => handleLinkClick(item.id)}
                    className=" text-blue-600 underline hover:text-red-400"
                  >
                    Read More...
                  </button>
                </div>
              </div>
            </div>

            <Dialog
              open={isDialogOpen}
              onClose={() => setIsDialogOpen(false)}
              className="relative z-50"
            >
              <div className="fixed inset-0 flex items-center justify-center p-5">
                <Dialog.Panel className="w-full max-h-screen overflow-y-auto p-4 max-w-xl rounded bg-black dark:bg-gray-800">
                  <div className="flex justify-end">
                    <button onClick={() => setIsDialogOpen(false)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="red"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="15" y1="9" x2="9" y2="15" />
                        <line x1="9" y1="9" x2="15" y2="15" />
                      </svg>
                    </button>
                  </div>
                  {articleData && (
                    <div className="bg-black px-2 py-2">
                      <Dialog.Title
                        key={selectedArticleId}
                        className="bg-green-200 shadow-lg font-bold text-xl py-3 px-3 md-3 dark:bg-gray-800"
                      >
                        {articleData.title}
                      </Dialog.Title>
                      <div className="ml-4">
                        <img
                          src={articleData.thumbnail}
                          alt={articleData.title}
                          className="w-full h-40vh object-cover rounded px-4 py-4"
                        />
                      </div>
                      <div className="text-white">{articleData.content}</div>
                    </div>
                  )}
                </Dialog.Panel>
              </div>
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Favouriteitems;
