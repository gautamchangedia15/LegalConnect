import React, { useState } from 'react';

const ProfilePhotoInput = ({ avatarUrl }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    // You can add additional logic here, like uploading the file
  };

  return (
    
    <div className="mt-4">
      {/* Profile avatar image */}
      {/* <img src="https://via.placeholder.com/150" alt="" /> */}
      <div className="mb-4">
        <img
          src={avatarUrl || 'https://cdn-icons-png.freepik.com/512/147/147142.png'}
          alt="Profile Avatar"
          className="w-32 h-32 rounded-full object-cover mx-auto"
        />
      </div>

      {/* File input */}
      <label
        htmlFor="profilePhotoInput"
        className="block bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg cursor-pointer text-center"
      >
        {selectedFile ? 'Change Photo' : 'Select Photo'}
        <input
          id="profilePhotoInput"
          name="profilePhotoInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default ProfilePhotoInput;
