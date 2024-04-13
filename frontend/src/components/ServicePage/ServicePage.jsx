import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LawyerCard from "../LawyerCard/LawyerCard";
import { useDispatch } from "react-redux";
import { getProvider } from "../../action/providerAction";
const ServicePage = () => {
  const [city, setcity] = useState("Kolkata");
  const [exp, setexp] = useState("Family");
  const dispatch = useDispatch();
  const searchHandler = (e) => {
    e.preventDefault();
    dispatch(getProvider(city, exp));
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8 flex justify-center mt-20">
      <div className="max-w-4xl w-full px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Get the best Lawyers for your legal needs
        </h1>
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <div className="flex space-x-4 mb-6">
            <div className="flex-1">
              <label
                htmlFor="city"
                className="block text-gray-700 font-medium mb-2">
                City
              </label>
              <select
                value={city}
                onChange={(event) => setcity(event.target.value)}
                name="city"
                id="city"
                className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2">
                <option value="Kolkata">Kolkata</option>
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Chennai">Chennai</option>
              </select>
            </div>
            <div className="flex-1">
              <label
                htmlFor="practice-area"
                className="block text-gray-700 font-medium mb-2">
                Select Practice area
              </label>
              <select
                value={exp}
                onChange={(e) => setexp(e.target.value)}
                name="practice-area"
                id="practice-area"
                className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2">
                <option value="Family">family</option>

                <option value="Criminal Law">Criminal Law</option>
                <option value="Civil Law">Civil Law</option>
                <option value="Family Law">Family Law</option>
                <option value="Property Law">Property Law</option>
              </select>
            </div>
          </div>
          <button
            onClick={(e) => searchHandler(e)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md">
            Search
          </button>
        </div>
        <LawyerCard />
      </div>
    </div>
  );
};

export default ServicePage;
