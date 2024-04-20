import React from "react";
import SideDashboard from "../SideDashboard";
import Slots from "./Slots/Slots";

const UpcommingSlots = () => {
  return (
    <div className="flex gap-2">
      <SideDashboard />
      <div className="mt-20">
        <h1 className="text-2xl font-bold text-center">Upcomming Slots</h1>
        
        <Slots/>
      </div>
    </div>
  );
};

export default UpcommingSlots;
