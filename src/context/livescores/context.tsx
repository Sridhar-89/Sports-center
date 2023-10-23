import React, { createContext, useContext, useReducer } from "react";

import { reducer, initialState, MatchesState, MatchesActions } from "./reducer";

const MatchesStateContext = createContext<MatchesState | undefined>(undefined);


export const useMatchesState = () => useContext(MatchesStateContext);
type MatchesDispatch = React.Dispatch<MatchesActions>;
const MatchesDispatchContext = createContext<MatchesDispatch | undefined>(undefined);

export const useMatchesDispatch = () => useContext(MatchesDispatchContext);


export const MatchesProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [stateMatch, dispatchMatch] = useReducer(reducer, initialState);

  return (
    <MatchesStateContext.Provider value={stateMatch}>
      <MatchesDispatchContext.Provider value={dispatchMatch}>
        {children}
      </MatchesDispatchContext.Provider>
    </MatchesStateContext.Provider>
  );
};