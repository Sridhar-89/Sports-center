import React, { useState } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export interface ApiResponse {
  auth_token: string;
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
      const response = await fetch(`${API_ENDPOINT}/users/sign_in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, password: userPassword }),
      });

      if (!response.ok) {
        throw new Error("Authentication failed or invalid details");
      }
      

      const userData = await response.json() as ApiResponse;
     
      localStorage.setItem("authToken", userData.auth_token);
      localStorage.setItem("userDetails", JSON.stringify(userData.user));
      navigate("/home");
     
    } catch (error) {
      console.error("Authentication failed: or invalid details", error);
    }
  };

  return (
    <div>
      <form onSubmit={(event) => handleSignIn(event)}>
        <div>
          <label className="block text-black font-bold mt-3">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={userEmail}
            required
            onChange={(e) => setUserEmail(e.target.value)}
            className="w-full border rounded-lg py-3 px-5 text-black leading-tight focus:outline-red focus:border-blue-900 focus:shadow-outline-green"
          />
        </div>
        <div>
          <label className="block text-gray-900 font-bold mt-3">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            className="w-full border rounded-lg py-3 px-5  text-black leading-tight focus:outline-red focus:border-blue-900 focus:shadow-outline-green"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 mr-3 mt-4 py-3 hover:bg-red-400 text-white font-bold rounded-lg"
        >
          Sign In
        </button>
      </form>
      <Link to="/signup">
        <button
          id="signup-btn"
          className="rounded-lg bg-red-500 px-2 py-2 m-4 text-sm font-medium text-white hover:bg-yellow-500"
        >
          Don't Have an account ? Create 
        </button>
      </Link>
    </div>
  );
};

export default SignInForm;
