import React from "react";
import LiveScoreIcon from "../../assets/react.svg";

function LiveScoreboard() {
  const sports = ["Soccer", "Basketball", "Tennis", "Cricket", "Baseball"];
  const teams = [
    ["Team Alpha", "Team Bravo"],
    ["Team Charlie", "Team Delta"],
    ["Team Echo", "Team Foxtrot"],
    ["Team Golf", "Team Hotel"],
    ["Team India", "Team Juliet"],
  ];
  const scores = [
    ["2-1", "1-3"],
    ["76-5", "80-2"],
    ["6-4", "4-6"],
    ["120-0", "150-2"],
    ["3-0", "5-1"],
  ];

  const handleScoreButtonClick = () => {
    
    console.log(" checking of Button clicked!");
  };

  return (
    <div>
      <div className="font-bold text-xl px-5 py-4">Live Scoreboard</div>

      <div className="flex px-4 py-2 overflow-x-auto shadow">
        <div className="flex space-x-10">
          {sports.map((sport, index) => (
            <div
              className="bg-white rounded-lg shadow p-4 border border-gray-400"
              key={sport}
            >
              <div className="flex justify-between space-x-3">
                <p className="text-lg font-semibold">{sport}</p>
                <button
                  className="hover:bg-blue-600 text-blue py-2 px-2 rounded-md"
                  onClick={handleScoreButtonClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                </button>
              </div>
              <div className="mt-2">
                {teams[index].map((team, teamIndex) => (
                  <p key={team} className="flex justify-between">
                    <span className="mr-2">{team}</span>
                    <span>{scores[index][teamIndex]}</span>
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LiveScoreboard;
