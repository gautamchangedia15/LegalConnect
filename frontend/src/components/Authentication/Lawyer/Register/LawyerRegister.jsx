import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { server} from '../../../../store';
const LawyerRegister = ({ history }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Save email and password to local storage (for demonstration)
    localStorage.setItem('email', formData.email);
    localStorage.setItem('password', formData.password);
    history.push('/additional-details');
    try {
        const response = await axios.post(`${server}/auth/provider/register`, {
          email,
          password,
         
        });
  
        console.log('Response from server:', response.data);
      } catch (error) {
        console.error('Error signing up:', error);
      }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white max-w-md w-full rounded-lg shadow-md overflow-hidden">
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
            <Link to={'/Additional-details'}>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
              >
              Next
            </button>
                </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LawyerRegister;
