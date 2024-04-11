import React from 'react';
import RatingStar from './Rating/RatingStar';

const LawyerCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row gap-4  ">
      <div className="w-full md:w-48 h-48 md:h-full bg-gray-200 ">
        <img
          src="https://lawrato.com/expert_images/thumb/webp/advocate-sudershani-ray.webp/"
          alt=""
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex-1 flex-col justify-between p-4 gap-2 space-y-1 md:space-y-0 md:gap-0">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Advocate Sudershani Ray</h2>
        <p className="text-gray-700 mb-2">Criminal Lawyer</p>
        <p className="text-gray-600 mb-2">10+ years of experience</p>
        <p className="text-gray-600 mb-4">Kolkata, West Bengal</p>
        <div className="flex items-center mb-4">
          <RatingStar rating={4} totalStars={5} />
          {/* <span className="text-gray-500 ml-2">4 out of 5 stars</span> */}
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md">
          Contact
        </button>
      </div>
    </div>
  );
};

export default LawyerCard;