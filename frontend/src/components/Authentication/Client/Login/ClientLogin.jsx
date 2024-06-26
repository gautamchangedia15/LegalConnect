import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../../../store";

const ClientLogin = () => {
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
        `${server}/auth/client/login`,
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
      console.log("Response from server:", response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Invalid email or password. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
      console.error("Error signing in:", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="bg-white shadow-lg rounded-lg px-10 pt-6 pb-8 mb-4 w-full max-w-md"
      >
        <div className="flex justify-between text-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Log In</h2>
          <Link to={"/lawyerLogin"}>
            <p className="h-full p-1 rounded-md underline text-gray-700">
              as Lawyer
            </p>
          </Link>
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-green-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Log In
          </button>
          <div className="flex flex-col">
            <a
              className="inline-block align-baseline text-sm text-blue-500 hover:text-blue-800 mb-2"
              href="#"
            >
              Forgot Password?
            </a>
            <Link to="/clientRegistration">
              <a
                className="inline-block align-baseline text-sm text-gray-700 hover:text-blue-800"
                href="#"
              >
                Don't have an account? Sign up now!
              </a>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ClientLogin;