import React from "react";
import LiveScoreIcon from "../../assets/react.svg";
import AllMatches from "./AllMatches";

const LiveScoreboard = () => {
  return (
    <div className="bg-green-100">
      <div className="font-bold text-xl px-5 py-4">Live Games</div>
      <div className="flex px-4 py-4  shadow-lg">
        <div className="flex space-x-10">
          <AllMatches />
        </div>
      </div>
    </div>
  );
};

export default LiveScoreboard;
