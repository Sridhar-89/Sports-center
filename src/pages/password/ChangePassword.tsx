import React, { useState } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { useNavigate } from "react-router-dom";

export interface ApiResponse {
  auth_token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

const ChangePassword: React.FC = () => {
  const [curr_password, setCurrentPassword] = useState("");
  const [n_password, setNewPassword] = useState("");
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_ENDPOINT}/user/password`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ curr_password, n_password }),
      });

      if (!response.ok) {
        throw new Error("failed to update the password");
      }

      console.log("Password successfully changed");

      navigate("/home");
    } catch (error) {
      console.error("failed to update password", error);
    }
  };

  return (
    <div>
      <form onSubmit={(event) => void handleSubmit(event)}>
        <div>
          <label className="block text-gray-900 font-semibold mb-2">
            Current-Password:
          </label>
          <input
            type="password"
            name="currentpassword"
            id="currentpassword"
            value={curr_password}
            required
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full border rounded-lg py-3 px-4 text-gray-900"
          />
        </div>
        <div>
          <label className="block text-gray-900 font-semibold mb-2">
            New-Password:
          </label>
          <input
            type="password"
            name="newpassword"
            id="newpassword"
            required
            value={n_password}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border rounded-lg py-2 px-3 text-gray-900"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-900 hover:bg-red-800 text-white font-semibold py-2 px-4 rounded-lg  mt-4"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
