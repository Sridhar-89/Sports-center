import { API_ENDPOINT } from "../../config/constants";
import { useArticlesState } from "../../context/articles/context";
import { useState } from "react";
import { Dialog } from "@headlessui/react";

interface Article {
  id: number;
  title: string;
  summary: string;
  thumbnail: string;
  date: string;
  sport: {
    id: number;
    name: string;
  };
  content: string;
}

export default function ArticleListItems({ article }: { article: Article }) {
  const state: any = useArticlesState();

  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [articleData, setArticleData] = useState<Article | null>(null);

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
        throw new Error("Failed to fetch article data or unable to fetech");
      }
      const data: Article = await response.json();
      console.log("data", data);
      setArticleData(data);
    } catch (error) {
      console.error(
        "Error fetching article data or failed to fetch the data",
        error
      );
    }
  };

  return (
    <div>
      <div className="m-4 dark:bg-gray-500">
        <div key={article.id} className="my-5 p-5 rounded-lg flex dark:bg-gray-800">
          <div className="flex-1">
            <div>
              <h3 className="text-sm  mb-3">{article.sport.name}</h3>
              <h3 className="text-xl font-bold mb-23">{article.title}</h3>
              <p className="text-black-500 mb-3">{article.summary}</p>
            </div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xs text-gray-900">
                {new Date(article.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })}
              </h3>
              <button
                onClick={() => handleLinkClick(article.id)}
                className=" text-blue-900 underline hover:text-red-500 dark:text-white"
              >
                Read More...
              </button>
            </div>
          </div>
          <div className="ml-4">
            <img
              src={article.thumbnail}
              alt={article.title}
              className="w-40 h-40 object-cover rounded"
            />
          </div>
        </div>
      </div>

      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-h-screen overflow-y-auto p-4 max-w-2xl rounded bg-gray-200 dark:bg-gray-500">
            <div className="flex justify-end">
              <button onClick={() => setIsDialogOpen(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="blue"
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
              <div>
                <Dialog.Title
                  key={selectedArticleId}
                  className="bg-green-200 font-bold text-xl shadow-xl py-2 rounded-xl px-2 dark:bg-gray-500"
                >
                  {articleData.title}
                </Dialog.Title>
                <div className="px-2 py-2">
                  <img
                    src={articleData.thumbnail}
                    alt={articleData.title}
                    className="w-full h-40 object-cover rounded"
                  />
                </div>
                <div>{articleData.content}</div>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
