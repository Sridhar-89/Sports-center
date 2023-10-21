import React, { createContext, useContext, useReducer } from "react";

import {
  reducer,
  initialState,
  ArticlesState,
  ArticlesActions,
} from "./reducer";

const ArticlesStateContext = createContext<ArticlesState | undefined>(
  undefined
);

export const useArticlesState = () => useContext(ArticlesStateContext);
export const useArticlesDispatch = () => useContext(ArticlesDispatchContext);

type ArticlesDispatch = React.Dispatch<ArticlesActions>;
const ArticlesDispatchContext = createContext<ArticlesDispatch | undefined>(
  undefined
);

export const ArticlesProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [stateArticle, dispatchArticle] = useReducer(reducer, initialState);

  return (
    <ArticlesStateContext.Provider value={stateArticle}>
      <ArticlesDispatchContext.Provider value={dispatchArticle}>
        {children}
      </ArticlesDispatchContext.Provider>
    </ArticlesStateContext.Provider>
  );
};
