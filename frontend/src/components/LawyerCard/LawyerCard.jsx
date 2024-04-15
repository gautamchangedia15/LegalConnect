import React, { useEffect, useState } from "react";
import RatingStar from "./Rating/RatingStar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../Loading";

const LawyerCard = () => {
  const [newProvider, setnewProvider] = useState([]);
  const { providers } = useSelector((state) => state.provider.providers);
  const { loading } = useSelector((state) => state.provider);
  useEffect(() => {
    setnewProvider(providers);
  }, [providers]);
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Results</h2>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid md:grid-cols-2 justify-between mb-8 gap-12 sm:grid-cols-1">
          {newProvider && newProvider ? (
            newProvider.map((lawyer) => (
              <Link
                key={lawyer.id}
                to={`/service/providerprofile/${lawyer.id}`}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row gap-4  ">
                  <div className="w-full md:w-48 h-48 md:h-full bg-gray-200 ">
                    <img
                      src="https://lawrato.com/expert_images/thumb/webp/advocate-sudershani-ray.webp/"
                      alt=""
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1 flex-col justify-between p-4 gap-2 space-y-1 md:space-y-0 md:gap-0">
                    <h2 className="text-lg font-bold text-gray-900 mb-2">
                      {lawyer.name}
                    </h2>
                    <p className="text-gray-700 mb-2">Criminal Lawyer</p>
                    <p className="text-gray-600 mb-2">
                      10+ years of experience
                    </p>
                    <p className="text-gray-600 mb-4">Kolkata, West Bengal</p>
                    <div className="flex items-center mb-4">
                      <RatingStar rating={4} totalStars={5} />
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md">
                      Book Appointment
                    </button>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <h4 className="text-2xl font-bold text-gray-900 mb-4">
              No search Found
            </h4>
          )}
        </div>
      )}
    </div>
  );
};

export default LawyerCard;
