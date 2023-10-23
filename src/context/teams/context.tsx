import React, { createContext, useContext, useReducer } from "react";
import { reducer, initialState, TeamsState, TeamsActions } from "./reducer";

const TeamsStateContext = createContext<TeamsState | undefined>(undefined);

export const useTeamsState = () => useContext(TeamsStateContext);
type TeamsDispatch = React.Dispatch<TeamsActions>;
const TeamsDispatchContext = createContext<TeamsDispatch | undefined>(undefined);

export const useTeamsDispatch = () => useContext(TeamsDispatchContext);


export const TeamsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [stateTeam, dispatchTeam] = useReducer(reducer, initialState);

  return (
    <TeamsStateContext.Provider value={stateTeam}>
      <TeamsDispatchContext.Provider value={dispatchTeam}>
        {children}
      </TeamsDispatchContext.Provider>
    </TeamsStateContext.Provider>
  );
};