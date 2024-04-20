import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  // Prepare registration data to send to backend
  const registrationData = {
    ...formData,
    email: localStorage.getItem('email'),
    password: localStorage.getItem('password'),
  };
}

const Page1 = ({ onNext }) => {
  return (
    <div className=" page-1 min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white max-w-md w-full rounded-lg shadow-md overflow-hidden p-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center py-6">Create your Lawyer account</h2>
        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
          <div>
            <label htmlFor="email" className="block text-md font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="input-field border border-gray-300 rounded-sm w-full p-1"
              placeholder="Enter your email"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-md font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="input-field border border-gray-300 rounded-sm w-full p-1"
              placeholder="Enter your password"
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-center">
            {/* <Link to={'/Additional-details'}> */}
              <button
              onClick={onNext}
               
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
              >
                Next
              </button>
            {/* </Link> */}
          </div>
        </form>
      </div>
    </div>
  );
};
const Page2 = ({ onPrev }) => {
  return (
    <div className=" page-2 min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Additional Details</h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="additional-details rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Enter your full name"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="expertise_area" className="block text-sm font-medium text-gray-700">
              Expertise Area
            </label>
            <input
              id="expertise_area"
              name="expertise_area"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Enter your expertise area"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              id="city"
              name="city"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Enter your city"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="education" className="block text-sm font-medium text-gray-700">
              Education
            </label>
            <input
              id="education"
              name="education"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Enter your education"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="about" className="block text-sm font-medium text-gray-700">
              About
            </label>
            <input
              id="about"
              name="about"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Enter your about information"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="propExp" className="block text-sm font-medium text-gray-700">
              Experience
            </label>
            <input
              id="propExp"
              name="propExp"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Enter your experience"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="enrollementId" className="block text-sm font-medium text-gray-700">
              Enrollment Id
            </label>
            <input
              id="enrollementId"
              name="enrollementId"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Enter your enrollment ID"
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </div>
        <button onClick={onPrev}>Previous</button>
      </form>
    </div>
  </div>
  );
};
function LawyerRegister() {
  const [page, setPage] = useState(1);
  const handleNext = () => {
    setPage(2);
  };

  const handlePrev = () => {
    setPage(1);
  };
  return (
    <div className="container flex justify-end">
      <Page1 /><Page2/>
    </div>
  )
}

export default LawyerRegister