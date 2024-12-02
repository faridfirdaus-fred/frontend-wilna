"use client";
import CardPopularProducts from "./CardPopularProducts";
import CardBahan from "./CardBahan";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  xl:overflow-auto gap-10 pb-4 custom-grid-rows">
      <CardPopularProducts />
      <CardBahan />
    </div>
  );
};

export default Dashboard;
