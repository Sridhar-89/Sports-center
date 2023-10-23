import React, { createContext, useContext, useReducer } from "react";
import { reducer, initialState, SportsState, SportsActions } from "./reducer";

const SportsStateContext = createContext<SportsState | undefined>(undefined);


export const useSportsState = () => useContext(SportsStateContext);
type SportsDispatch = React.Dispatch<SportsActions>;
const SportsDispatchContext = createContext<SportsDispatch | undefined>(undefined);

export const useSportsDispatch = () => useContext(SportsDispatchContext);


export const SportsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [stateSport, dispatchSport] = useReducer(reducer, initialState);

  return (
    <SportsStateContext.Provider value={stateSport}>
      <SportsDispatchContext.Provider value={dispatchSport}>
        {children}
      </SportsDispatchContext.Provider>
    </SportsStateContext.Provider>
  );
};