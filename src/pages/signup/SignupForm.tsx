import React, { useState } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { useNavigate } from "react-router-dom";
import { ApiResponse } from "../signin/SigninForm";

const SignupForm: React.FC = () => {
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_ENDPOINT}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newUserName,
          email: newUserEmail,
          password: newUserPassword,
        }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }
      console.log("Registration successful");

      const data = await response.json() as ApiResponse;
      localStorage.setItem("authToken", data.auth_token);
      localStorage.setItem("userData", JSON.stringify(data.user));
      console.log(data)

      navigate("/home");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <div className="items-center justify-center">
        <div>
          <label className="block text-gray-900 font-semibold mb-3">Your Name:</label>
          <input
            type="text"
            name="newUserName"
            id="newUserName"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            className="w-full border rounded-lg py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
          />
        </div>
        <div>
          <label className="block text-gray-900 font-semibold mb-3">Email:</label>
          <input
            type="email"
            name="newUserEmail"
            id="newUserEmail"
            value={newUserEmail}
            required
            onChange={(e) => setNewUserEmail(e.target.value)}
            className="w-full border rounded-lg py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
          />
        </div>
        <div>
          <label className="block text-gray-900 font-semibold mb-3">Password:</label>
          <input
            type="password"
            name="newUserPassword"
            id="newUserPassword"
            required
            value={newUserPassword}
            onChange={(e) => setNewUserPassword(e.target.value)}
            className="w-full border rounded-lg py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-blue-400 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue mt-4"
        >
          Sign up
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
