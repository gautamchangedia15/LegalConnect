import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProvider } from "../../action/providerAction";
import { logoutClient } from "../../action/clientAction";

function NavigationBar() {
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const Navigate = useNavigate();

  const inputHandler = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    dispatch(getProvider("", "", search));
    if (Navigate && Navigate !== "/service") {
      Navigate("/service");
    }
  };

  const handleLogout = () => {
    dispatch(logoutClient());
    Navigate("/");
    window.location.reload();
  };

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-10 bg-white shadow-md ${
        role === "Provider" ? "bg-gray-50" : "bg-white"
      }`}
    >
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <span className="text-indigo-500">Legal</span>
          <span className="text-green-800">Connect</span>
        </Link>

        {/* Hamburger menu for small screens */}
        <button
          className="block md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                menuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        {/* Navigation links */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex md:items-center md:w-auto w-full`}
        >
          <div className="flex-grow md:flex md:items-center md:w-auto w-full md:ml-4 mt-2 md:mt-0">
            <input
              type="text"
              className="w-full md:w-[300px] bg-white h-10 border border-gray-300 rounded-md px-2 py-1"
              value={search}
              onChange={inputHandler}
            />
            <button
              onClick={handleSearch}
              className="bg-gray-800 border border-gray-300 h-10 text-white font-bold text-xl px-4 py-2 rounded-md ml-2"
            >
              <IoSearch />
            </button>

            <div className="text-sm mt-2 md:mt-0 md:ml-4">
              <Link
                to="/service"
                className="block mt-4 md:inline-block md:mt-0 text-gray-700 hover:text-gray-900 mr-4"
              >
                Find a service
              </Link>
              {role === "Provider" && (
                <Link
                  to="/provider/dashboard"
                  className="block mt-4 md:inline-block md:mt-0 text-gray-700 hover:text-gray-900 mr-4"
                >
                  Dashboard
                </Link>
              )}
              {role === "Client" && (
                <Link
                  to="/client/myservices"
                  className="block mt-4 md:inline-block md:mt-0 text-gray-700 hover:text-gray-900 mr-4"
                >
                  My services
                </Link>
              )}
              <Link
                to="/about"
                className="block mt-4 md:inline-block md:mt-0 text-gray-700 hover:text-gray-900 mr-4"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block mt-4 md:inline-block md:mt-0 text-gray-700 hover:text-gray-900"
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="md:flex md:items-center">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="ml-4 bg-gray-800 border border-gray-300 h-10 text-white font-bold text-sm px-4 py-2 rounded-md"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/clientLogin"
                className="ml-4 bg-gray-800 border border-gray-300 h-10 text-white font-bold text-sm px-4 py-2 rounded-md"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
