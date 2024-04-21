import React from "react";
import SideDashboard from "./SideDashboard";
import { useSelector } from "react-redux";
const Dashboard = () => {
  const { data } = useSelector((state) => state.loadProviders.Provider);

  return (
    <div>
      <SideDashboard />
      <div>{data && <h1>Welcome {data.name}</h1>}</div>
    </div>
  );
};

export default Dashboard;
