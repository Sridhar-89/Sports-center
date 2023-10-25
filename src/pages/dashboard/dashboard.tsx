import React from "react";
import { useNavigate } from "react-router-dom";

interface UserProfile {
  id: number;
  name: string;
  email: string;
}

const Dashboardpage: React.FC = () => {
  const navigation = useNavigate();
  const storedUserData = localStorage.getItem("userDetails");
  let userProfile;

  if (storedUserData) {
    userProfile = JSON.parse(storedUserData) as UserProfile;
  }

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userDetails");
    navigation("/login");
  };

  return (
    <div className="App text-center items-center">
      <div>
        <h1>Welcome, {userProfile?.name}</h1>
      </div>
      <div>
        <h1>Your Email Address: {userProfile?.email}</h1>
      </div>
      <div>
        <button type="submit" id="logout-link" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboardpage;
