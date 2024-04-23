import React, { useState, useEffect } from "react";
import SideDashboard from "./SideDashboard";
import { useSelector } from "react-redux";
import LawyerProfile from "../LawyerProfile/LawyerProfile1";
import ProfileCard from './ProfileCard';
import AvailabilityCalendar from './AvailabilityCalendar';
import ClientsDashboard from "./ClientsDashboard";
const Dashboard = () => {
  const today = new Date();

const { data } = useSelector((state) => state.loadProviders.Provider);
console.log(data);
const { name, education, about, expertise_area, city, propExp, availability, clients } = data
// const {availability}  = data.availability
const profile = { name, education, about, expertise_area, city, propExp }
// console.log("new data", profile)
// const slot = {availability}
// console.log(availability.availability)




 

    // setAvailale( data.availability);
  
// const ct = data.clients.map((client) =>{ client.name, client.caseDetails})
// console.log(ct);
// console.log(clients);

return (
  <div className="flex">

    <SideDashboard />
    <div className="container mx-10 px-4 py-8 mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col gap-10">
          <ProfileCard profileData={profile} />
        <div className="">
          <ClientsDashboard clients={clients} />
        </div>
        </div>
        <div>
          <AvailabilityCalendar availability={availability} />
        </div>
      </div>
    </div>
  </div>
);

}
export default Dashboard;
