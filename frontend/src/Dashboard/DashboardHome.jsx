import React from "react";
import DashboardCards from "./DashboardHome/DashboardCards";
import DashboardCharts from "./DashboardHome/DashboardCharts";
import QuickActions from "./DashboardHome/QuickActions";

const DashboardHome = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-[#0B1324]">Dashboard Overview</h1>
      <DashboardCards />
      <QuickActions />
      <DashboardCharts />
    </div>
  );
};

export default DashboardHome;
