import { Disclosure, Menu } from "@headlessui/react";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Dialog } from "@headlessui/react";
import { useSportsState } from "../context/sports/context";
import { useTeamsState } from "../context/teams/context";
import { Sport } from "../context/sports/reducer";
import { Team } from "../context/teams/reducer";
import { API_ENDPOINT } from "../config/constants";
import logo from "../assets/logo.png";

import { Link } from "react-router-dom";

const Appbar = () => {
  const navigate = useNavigate();

  const authToken = localStorage.getItem("authToken");
  const userData = localStorage.getItem("userData");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [favouriteSports, setFavouriteSports] = useState<{
    [sportName: string]: boolean;
  }>({});
  const [favouriteTeams, setFavouriteTeams] = useState<{
    [teamName: string]: boolean;
  }>({});

  const [tempFavouriteSports, setTempFavouriteSports] = useState<{
    [sportName: string]: boolean;
  }>({});
  const [tempFavouriteTeams, setTempFavouriteTeams] = useState<{
    [teamName: string]: boolean;
  }>({});

  console.log("favsports", favouriteSports);
  console.log("favteams", favouriteTeams);

  const handleSportCheckbox = (event: any) => {
    const { id, checked } = event.target;
    setTempFavouriteSports((previousSports) => ({
      ...previousSports,
      [id]: checked,
    }));
  };

  const handleTeamCheckbox = (event: any) => {
    const { id, checked } = event.target;
    setTempFavouriteTeams((previousTeams) => ({
      ...previousTeams,
      [id]: checked,
    }));
  };

  const sports = useSportsState();
  const teams = useTeamsState();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          //console.log("pref",data)
          console.log("pref", data.preferences);

          if (data.preferences.sports && data.preferences.teams) {
            // setSportsData(data.preferences.sports);
            // setTeamsData(data.preferences.teams);
            setFavouriteSports(data.preferences.sports);
            setFavouriteTeams(data.preferences.teams);
            localStorage.setItem(
              "favouriteSports",
              JSON.stringify(data.preferences.sports)
            );
            localStorage.setItem(
              "favouriteTeams",
              JSON.stringify(data.preferences.teams)
            );
          } else {
            setFavouriteSports({});
            setFavouriteTeams({});
          }
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    if (authToken) {
      fetchData();
    }
  }, []);
  const sports1 = sports?.sports;
  const teams1 = teams?.teams;

  const handleLinkClick = async () => {
    setTempFavouriteSports(favouriteSports);
    setTempFavouriteTeams(favouriteTeams);
    setIsDialogOpen(true);
  };
  const handleCancel = () => {
    setTempFavouriteSports(favouriteSports);
    setTempFavouriteTeams(favouriteTeams);
    setIsDialogOpen(false);
  };

  const signout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    localStorage.removeItem("favouriteSports");
    localStorage.removeItem("favouriteTeams");
    navigate("/home");
  };
  const handleSave = async () => {
    setFavouriteSports(tempFavouriteSports);
    setFavouriteTeams(tempFavouriteTeams);
    localStorage.setItem(
      "favouriteSports",
      JSON.stringify(tempFavouriteSports)
    );
    localStorage.setItem("favouriteTeams", JSON.stringify(tempFavouriteTeams));
    try {
      const preferences = {
        sports: tempFavouriteSports,
        teams: tempFavouriteTeams,
      };

      const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ preferences }),
      });

      if (!response.ok) {
        // console.log("error")
        throw new Error("Failed to save data");
      }

      console.log("Data saved successfully");

      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Disclosure as="nav" className="bg-black shadow-2xl">
      {() => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <img
                  className="h-12 mr-10 rounded"
                  src={logo}
                  alt="Logo"
                />
                <span className="font-bold text-xl text-white">SPORTS HUB</span>
              </div>
              <div>
                <Menu as="div" className="relative inline-block text-left">
                  {authToken ? (
                    <Menu.Button
                      onClick={() => handleLinkClick()}
                      className="h-8 w-8 rounded-full bg-white hover:bg-blue-600 flex items-center justify-center focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="50"
                        height="25"
                        viewBox="0 0 50 50"
                      >
                        <path d="M 22.205078 2 A 1.0001 1.0001 0 0 0 21.21875 2.8378906 L 20.246094 8.7929688 C 19.076509 9.1331971 17.961243 9.5922728 16.910156 10.164062 L 11.996094 6.6542969 A 1.0001 1.0001 0 0 0 10.708984 6.7597656 L 6.8183594 10.646484 A 1.0001 1.0001 0 0 0 6.7070312 11.927734 L 10.164062 16.873047 C 9.583454 17.930271 9.1142098 19.051824 8.765625 20.232422 L 2.8359375 21.21875 A 1.0001 1.0001 0 0 0 2.0019531 22.205078 L 2.0019531 27.705078 A 1.0001 1.0001 0 0 0 2.8261719 28.691406 L 8.7597656 29.742188 C 9.1064607 30.920739 9.5727226 32.043065 10.154297 33.101562 L 6.6542969 37.998047 A 1.0001 1.0001 0 0 0 6.7597656 39.285156 L 10.648438 43.175781 A 1.0001 1.0001 0 0 0 11.927734 43.289062 L 16.882812 39.820312 C 17.936999 40.39548 19.054994 40.857928 20.228516 41.201172 L 21.21875 47.164062 A 1.0001 1.0001 0 0 0 22.205078 48 L 27.705078 48 A 1.0001 1.0001 0 0 0 28.691406 47.173828 L 29.751953 41.1875 C 30.920633 40.838997 32.033372 40.369697 33.082031 39.791016 L 38.070312 43.291016 A 1.0001 1.0001 0 0 0 39.351562 43.179688 L 43.240234 39.287109 A 1.0001 1.0001 0 0 0 43.34375 37.996094 L 39.787109 33.058594 C 40.355783 32.014958 40.813915 30.908875 41.154297 29.748047 L 47.171875 28.693359 A 1.0001 1.0001 0 0 0 47.998047 27.707031 L 47.998047 22.207031 A 1.0001 1.0001 0 0 0 47.160156 21.220703 L 41.152344 20.238281 C 40.80968 19.078827 40.350281 17.974723 39.78125 16.931641 L 43.289062 11.933594 A 1.0001 1.0001 0 0 0 43.177734 10.652344 L 39.287109 6.7636719 A 1.0001 1.0001 0 0 0 37.996094 6.6601562 L 33.072266 10.201172 C 32.023186 9.6248101 30.909713 9.1579916 29.738281 8.8125 L 28.691406 2.828125 A 1.0001 1.0001 0 0 0 27.705078 2 L 22.205078 2 z M 23.056641 4 L 26.865234 4 L 27.861328 9.6855469 A 1.0001 1.0001 0 0 0 28.603516 10.484375 C 30.066026 10.848832 31.439607 11.426549 32.693359 12.185547 A 1.0001 1.0001 0 0 0 33.794922 12.142578 L 38.474609 8.7792969 L 41.167969 11.472656 L 37.835938 16.220703 A 1.0001 1.0001 0 0 0 37.796875 17.310547 C 38.548366 18.561471 39.118333 19.926379 39.482422 21.380859 A 1.0001 1.0001 0 0 0 40.291016 22.125 L 45.998047 23.058594 L 45.998047 26.867188 L 40.279297 27.871094 A 1.0001 1.0001 0 0 0 39.482422 28.617188 C 39.122545 30.069817 38.552234 31.434687 37.800781 32.685547 A 1.0001 1.0001 0 0 0 37.845703 33.785156 L 41.224609 38.474609 L 38.53125 41.169922 L 33.791016 37.84375 A 1.0001 1.0001 0 0 0 32.697266 37.808594 C 31.44975 38.567585 30.074755 39.148028 28.617188 39.517578 A 1.0001 1.0001 0 0 0 27.876953 40.3125 L 26.867188 46 L 23.052734 46 L 22.111328 40.337891 A 1.0001 1.0001 0 0 0 21.365234 39.53125 C 19.90185 39.170557 18.522094 38.59371 17.259766 37.835938 A 1.0001 1.0001 0 0 0 16.171875 37.875 L 11.46875 41.169922 L 8.7734375 38.470703 L 12.097656 33.824219 A 1.0001 1.0001 0 0 0 12.138672 32.724609 C 11.372652 31.458855 10.793319 30.079213 10.427734 28.609375 A 1.0001 1.0001 0 0 0 9.6328125 27.867188 L 4.0019531 26.867188 L 4.0019531 23.052734 L 9.6289062 22.117188 A 1.0001 1.0001 0 0 0 10.435547 21.373047 C 10.804273 19.898143 11.383325 18.518729 12.146484 17.255859 A 1.0001 1.0001 0 0 0 12.111328 16.164062 L 8.8261719 11.46875 L 11.523438 8.7734375 L 16.185547 12.105469 A 1.0001 1.0001 0 0 0 17.28125 12.148438 C 18.536908 11.394293 19.919867 10.822081 21.384766 10.462891 A 1.0001 1.0001 0 0 0 22.132812 9.6523438 L 23.056641 4 z M 25 17 C 20.593567 17 17 20.593567 17 25 C 17 29.406433 20.593567 33 25 33 C 29.406433 33 33 29.406433 33 25 C 33 20.593567 29.406433 17 25 17 z M 25 19 C 28.325553 19 31 21.674447 31 25 C 31 28.325553 28.325553 31 25 31 C 21.674447 31 19 28.325553 19 25 C 19 21.674447 21.674447 19 25 19 z"></path>
                      </svg>
                    </Menu.Button>
                  ) : (
                    <></>
                  )}

                  <Dialog
                    open={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                    className="relative z-50"
                  >
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                      <Dialog.Panel className="w-full max-h-screen overflow-y-auto p-4 max-w-xl rounded bg-white">
                        <div className="flex justify-end">
                          <button onClick={() => setIsDialogOpen(false)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="red"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </button>
                        </div>

                        <div>
                          <Dialog.Title className="bg-white  font-bold text-2xl py-2">
                            Preferences
                          </Dialog.Title>
                        </div>
                        <div className="p-2 flex flex-wrap">
                          <h1 className="font-bold text-xl">
                            Favourite Sports
                          </h1>
                          <div className="py-2 flex flex-wrap">
                            {sports1?.map((sport: Sport) => (
                              <div key={sport.id} className="w-1/3 mb-4 px-2">
                                <input
                                  type="checkbox"
                                  id={sport.name}
                                  value={sport.name}
                                  checked={
                                    tempFavouriteSports[sport.name] || false
                                  }
                                  onChange={handleSportCheckbox}
                                />
                                <label htmlFor={sport.name} className="ml-2">
                                  {sport.name}
                                </label>
                              </div>
                            ))}
                          </div>
                          <h1 className="font-bold text-xl">Favourite Teams</h1>
                          <div className="py-2 flex flex-wrap">
                            {teams1?.map((team: Team) => (
                              <div key={team.id} className="w-1/3 mb-4 px-2">
                                <input
                                  type="checkbox"
                                  id={team.name}
                                  value={team.name}
                                  checked={
                                    tempFavouriteTeams[team.name] || false
                                  }
                                  onChange={handleTeamCheckbox}
                                />
                                <label htmlFor={team.name} className="ml-2">
                                  {team.name}
                                </label>
                              </div>
                            ))}
                          </div>

                          <button
                            className="bg-gray-800 px-2 py-2 text-white hover:bg-blue-700 text-xl"
                            onClick={() => handleCancel()}
                          >
                            cancel
                          </button>
                          <button
                            onClick={() => handleSave()}
                            className="bg-gray-800 px-2 py-2 mx-2 text-white  hover:bg-blue-700 text-xl"
                          >
                            save
                          </button>
                        </div>
                      </Dialog.Panel>
                    </div>
                  </Dialog>
                </Menu>
                <Menu
                  as="div"
                  className="relative inline-block text-white text-left px-2"
                >
                  <Menu.Button className="h-10 w-10 rounded-full hover:bg-blue-600 flex items-center justify-center focus:outline-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-10 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </Menu.Button>
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 mr-5 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {authToken ? (
                      <Menu.Item>
                        <button
                          onClick={signout}
                          className="px-3 py-2 text-sm text-black hover:bg-red-500"
                        >
                          Logout
                        </button>
                      </Menu.Item>
                    ) : (
                      <>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/signin"
                              className={`${
                                active ? "bg-gray-100" : ""
                              } block px-4 py-2 text-sm text-gray-700`}
                            >
                              Sign In
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/signup"
                              className={`${
                                active ? "bg-gray-100" : ""
                              } block px-4 py-2 text-sm text-gray-700`}
                            >
                              Sign Up
                            </Link>
                          )}
                        </Menu.Item>
                      </>
                    )}
                  </Menu.Items>
                </Menu>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
};

export default Appbar;
