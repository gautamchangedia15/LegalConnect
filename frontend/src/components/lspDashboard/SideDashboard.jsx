import React from "react";
import { Link } from "react-router-dom";

const SideDashboard = () => {
  return (
    <div className=" h-screen w-64 bg-gray-200 text-gray-700 overflow-y-auto mt-[5%]">
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <h1 className="text-xl font-bold">Dashboard</h1>
      </div>

      <div className="p-4">
        {/* <h2 className="text-lg font-semibold mb-4">Men  u</h2> */}
        <nav className="flex flex-col gap-10 mt-5">
          <Link
            to="/provider/dashboard/upcomingslots"
            className=" p-2 rounded-lg block py-2 hover:bg-gray-50 transition duration-200">
            Upcoming Bookings
          </Link>
          <Link
            to="/provider/dashboard/pastbooking"
            className="p-2 rounded-lg block py-2 hover:bg-gray-50 transition duration-200">
            Past Bookings
          </Link>
          <Link
            to="/provider/dashboard/createbooking"
            className="p-2 rounded-lg block py-2 hover:bg-gray-50 transition duration-200">
            Create Slot
          </Link>
          <Link
            to="/provider/dashboard/clients"
            className="p-2 rounded-lg block py-2 hover:bg-gray-50 transition duration-200">
            All Clients
          </Link>
          <Link
            to="/provider/dashboard/payments"
            className="p-2 rounded-lg block py-2 hover:bg-gray-50 transition duration-200">
            Payments
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default SideDashboard;
