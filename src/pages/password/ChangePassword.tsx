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

const ChangePasswordForm: React.FC = () => {
  const [current_password, setCurrentPassword] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
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

        body: JSON.stringify({ current_password, new_password }),
      });

      if (!response.ok) {
        throw new Error("failed to update the password");
      }

      console.log("Password successfully changed");

      navigate("/home");
    } catch (error: any) {
      console.log("failed to update password", error);
    }
  };

  return (
    <div>
      <form onSubmit={(event) => void handleSubmit(event)}>
        {error && (
          <div className="bg-red-600 text-white p-5 rounded-lg mb-2">
            {error}
          </div>
        )}

        <div>
          <label className="block text-gray-900 font-semibold mb-2">
            Current-Password:
          </label>
          <input
            type="password"
            name="currentpassword"
            id="currentpassword"
            value={current_password}
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
            value={new_password}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border rounded-lg py-2 px-3 text-gray-900"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-900 hover:bg-red-800 text-white font-semibold py-2 px-4 rounded-lg mt-4"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
