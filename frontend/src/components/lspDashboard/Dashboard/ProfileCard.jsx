import React from 'react';

const ProfileCard = ({ profileData }) => {
  const { name, education, about, expertise_area, city, propExp } = profileData;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-4">{name}</h1>
      <p className="text-gray-600 mb-2">
        <span className="font-bold">Education:</span> {education}
      </p>
      <p className="text-gray-600 mb-2">
        <span className="font-bold">City:</span> {city}
      </p>
      <p className="text-gray-600 mb-4">
        <span className="font-bold">Experience:</span> {propExp}
      </p>
      <p className="text-gray-700">{about}</p>
      <div className="mt-4">
        <span className="font-bold">Expertise Areas:</span>{' '}
        {expertise_area.map((area, index) => (
          <span key={index} className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm text-gray-700 mr-2">
            {area}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProfileCard;
