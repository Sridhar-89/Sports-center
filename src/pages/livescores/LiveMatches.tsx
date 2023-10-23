import React from "react";
import {
  useMatchesState,
  useMatchesDispatch,
} from "../../context/livescores/context";

import LiveMatchItems from "./LiveMatchItems";

export default function LiveMatches() {
  const state: any = useMatchesState();
  const dispatchMembers = useMatchesDispatch();

  const { matches, isLoading, isError, errorMessage } = state;
  console.log("matches",matches)
  if (matches.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>{errorMessage}</span>;
  }



  return (
    <>
    <div className="flex px-4">
    {matches.map((match: any) => (
        <LiveMatchItems key={match.id} id={match.id} />

        ))}
    </div>
    
     
    </>
  );
}