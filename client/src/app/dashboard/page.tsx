"use client";
import ProtectRoute from "@/components/custom-components/protectRoute";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}

export default ProtectRoute(Dashboard);
