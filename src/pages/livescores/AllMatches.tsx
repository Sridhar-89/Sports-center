import React, { useEffect } from "react";
import LiveMatches from "./LiveMatches";
import { fetchMatches } from "../../context/livescores/actions";
import { useMatchesDispatch } from "../../context/livescores/context";

const AllMatches: React.FC = () => {
  const dispatchMatches = useMatchesDispatch();
  useEffect(() => {
    fetchMatches(dispatchMatches);
  }, []);
  return (
    <div className="grid gap-3 grid-cols-3 mt-3 dark:bg-gray-500">
      <LiveMatches />
    </div>
  );
};
export default AllMatches;