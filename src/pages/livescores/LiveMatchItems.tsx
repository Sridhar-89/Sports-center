import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../../config/constants";

interface Team {
  id: number;
  name: string;
}
interface Props {
  id: number;
}

interface TeamScores {
  [key: string]: string;
}

interface State {
  id: number;
  isRunning: boolean;
  name: string;
  location: string;
  startsAt: string;
  endsAt: string;
  score: TeamScores;
  teams: Team[];
  sportName: string;
  playingTeam: number;
  story: string;
}

export default function LiveMatchItems(props: Props, State: State) {
  const [Livematch, setLiveMatch] = useState<State>(State);

  const fetchMatchDetails = async (id: number) => {
    try {
      const Response = await fetch(`${API_ENDPOINT}/matches/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!Response.ok) {
        throw new Error("Failed to fetch match details or unable to fetch");
      }

      const data = await Response.json();

      setLiveMatch(data);
    } catch (error) {
      console.log("data fetching failed or unable to fetch", error);
    }
  };
  useEffect(() => {
    fetchMatchDetails(props.id);
  }, [props.id]);

  return (
    Livematch.isRunning && (
      <div className="flex px-4 py-2  shadow-lg">
        <div className="flex space-x-10">
          <div
            className="bg-gray-100 rounded-lg shadow p-4 border border-black"
            key={Livematch.sportName}
          >
            <div className="flex justify-between space-x-3">
              <p className="text-lg font-semibold">{Livematch.sportName}</p>
              <button
                className=" hover:bg-red-600 text-white py-1 px-1  rounded-md"
                onClick={() => {
                  fetchMatchDetails(Livematch.id);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="black"
                  className="w-6 h-6"
                >
                  <path d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" />
                </svg>
              </button>
            </div>
            <div>
              <p className="text-sm">{Livematch.location}</p>
            </div>
            <div className="mt-1">
              <div className="flex justify-between">
                <span className="mr-2">{Livematch.teams[0].name}</span>
                <span>{Livematch.score[Livematch.teams[0].name]}</span>
              </div>
              <div className="flex justify-between">
                <span className="mr-2">{Livematch.teams[1].name}</span>
                <span>{Livematch.score[Livematch.teams[1].name]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
