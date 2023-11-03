import React from "react";
import {
  useMatchesState,
  useMatchesDispatch,
} from "../../context/livescores/context";

import LiveMatchItems from "./LiveMatchItems";

export default function LiveMatches() {
  const state: any = useMatchesState();

  const favoriteSports = JSON.parse(
    localStorage.getItem("favouriteSports") || "{}"
  );
  const favoriteTeams = JSON.parse(
    localStorage.getItem("favouriteTeams") || "{}"
  );
  const authToken = localStorage.getItem("authToken");
  const dispatchMembers = useMatchesDispatch();

  const { matches, isLoading, isError, errorMessage } = state;

  if (matches.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>{errorMessage}</span>;
  }
  const live = matches.filter((match: any) => {
    const isFavoriteSport = favoriteSports[match.sportName] === true;
    const hasFavoriteTeams = Object.values(favoriteTeams).some(
      (value) => value === true
    );
    if (isFavoriteSport && !hasFavoriteTeams) {
      return true;
    }

    if (isFavoriteSport && hasFavoriteTeams) {
      return match.teams.some((team: any) => favoriteTeams[team.name] === true);
    }
    return false;
  });

  if (authToken && live.length == 0) {
    return <h1>No Live Matches Available</h1>;
  }

  return (
    <>
      <div className="flex px-6">
        {authToken
          ? live?.map((match: any) => (
              <LiveMatchItems key={match.id} id={match.id} />
            ))
          : matches.map((match: any) => (
              <LiveMatchItems key={match.id} id={match.id} />
            ))}
      </div>
    </>
  );
}
