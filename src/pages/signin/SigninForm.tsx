import React, { useState } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export interface ApiResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

const SignInForm: React.FC = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_ENDPOINT}/users/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, password: userPassword }),
      });

      if (!response.ok) {
        throw new Error("Authentication failed");
      }

      const userData = await response.json() as ApiResponse;
      localStorage.setItem("authToken", userData.token);
      localStorage.setItem("userDetails", JSON.stringify(userData.user));
      navigate("/dashboard");
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };

  return (
    <div>
      <form onSubmit={(event) => handleSignIn(event)}>
        <div>
          <label className="block text-gray-900 font-semibold mb-3">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={userEmail}
            required
            onChange={(e) => setUserEmail(e.target.value)}
            className="w-full border rounded-lg py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
          />
        </div>
        <div>
          <label className="block text-gray-900 font-semibold mb-3">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            className="w-full border rounded-lg py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-blue-400 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue mt-4"
        >
          Sign In
        </button>
      </form>
      <Link to="/signup">
        <button
          id="signup-btn"
          className="rounded-lg bg-gray-800 px-4 py-2 m-2 text-sm font-medium text-white hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Don't Have an account ? Create 
        </button>
      </Link>
    </div>
  );
};

export default SignInForm;
