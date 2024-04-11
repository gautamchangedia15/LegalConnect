import React from 'react';
import RatingStar from '../LawyerCard/Rating/RatingStar';

const LawyerProfile = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-start py-8">
      <div className="max-w-5xl w-full px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/4 bg-gray-200 p-4 flex justify-center items-center">
              <img
                src="https://lawrato.com/expert_images/thumb/webp/advocate-sudershani-ray.webp"
                alt="Lawyer Profile"
                className="object-cover w-32 h-32 md:w-48 md:h-48 rounded-full"
              />
            </div>
            <div className="md:flex-1 p-6">
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Advocate Sudershani Ray</h1>
                <p className="text-gray-700 mb-2">Criminal Lawyer</p>
                <p className="text-gray-600">10+ years of experience</p>
              </div>
              <div className="mb-4 flex items-center">
                <RatingStar rating={4} totalStars={5} />
                <span className="text-gray-500 ml-2">4 out of 5 stars</span>
              </div>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">About Me</h2>
                <p className="text-gray-700">
                  Advocate Sudershani Ray is a highly experienced criminal lawyer with a proven track
                  record of successful cases. She has been practicing law for over 10 years,
                  specializing in a wide range of criminal matters, from theft and assault to
                  homicide and organized crime.
                </p>
              </div>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Areas of Expertise</h2>
                <ul className="list-disc pl-6 text-gray-700">
                  <li>Criminal Law</li>
                  <li>Theft and Robbery</li>
                  <li>Assault and Battery</li>
                  <li>Homicide and Murder</li>
                  <li>Organized Crime</li>
                </ul>
              </div>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Education and Background</h2>
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Education</h3>
                  <p className="text-gray-700">
                    Bachelor of Laws (LLB) from National Law University, Kolkata
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Professional Experience</h3>
                  <p className="text-gray-700">
                    10+ years of experience practicing criminal law in Kolkata, West Bengal
                  </p>
                </div>
              </div>
              <div className="flex space-x-4">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md">
                  Contact
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md">
                  Schedule Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerProfile;
