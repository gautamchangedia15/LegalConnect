import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../../../store";

const LawyerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    try {
      const response = await axios.post(
        `${server}/auth/provider/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      // Clear any previous error
      setError("");

      // Redirect to home page upon successful login
      navigate("/");
      window.location.reload(); // Force reload to update user session
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setError("Invalid email or password. Please try again.");
        } else if (error.response.status === 404) {
          setError("Account not found. Please check your credentials.");
        } else {
          setError("An unexpected error occurred. Please try again later.");
        }
      } else {
        setError("Network error. Please try again later.");
      }
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-4">
          Lawyer Login
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-md font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="input-field border-2 rounded-sm p-1"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-md font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="input-field border-2 rounded-sm p-1"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition duration-300"
          >
            Log in
          </button>
        </form>
        <div className="flex justify-between mt-2 text-gray-600">
          <p>Forgot password</p>
          <Link to={"/lawyerRegistration"}>
            <p>Sign Up as Lawyer</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LawyerLogin;
