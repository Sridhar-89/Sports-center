import React from "react";
import Dashboardpage from "./dashboard";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-center text-gray-600 mb-5">
        Dashboard
      </h1>
      <Dashboardpage />
    </div>
  );
};

export default Dashboard;
