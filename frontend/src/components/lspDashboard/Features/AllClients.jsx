import React from "react";
import SideDashboard from "../SideDashboard";
import Chat from "../../Chat/Chat";

const AllClients = () => {
  return (
    <div className="flex">
      <SideDashboard />
      <div>
        <Chat/>
      </div>
    </div>
  );
};

export default AllClients;
