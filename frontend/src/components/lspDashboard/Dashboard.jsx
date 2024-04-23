import React from "react";
import SideDashboard from "./SideDashboard";
import { useSelector } from "react-redux";
const Dashboard = () => {
  // const { data } = useSelector((state) => state.loadProviders.Provider);
  const { data } = useSelector((state) => state.loadProviders.Provider);
  // const { client } = useSelector((state) => state.user);
  // if (data && data.id) {
  //   console.log(data.clients);
  // } else {
  //   console.log(client.data.services);
  // }

  return (
    <div className="flex flex-row mt-[3.5rem]">
      <div>
        {" "}
        <SideDashboard />
      </div>
      <div>{data && <h1>Welcome {data.name}</h1>}</div>
    </div>
  );
};

export default Dashboard;
