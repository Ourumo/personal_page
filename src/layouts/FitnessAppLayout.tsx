import { Outlet, ScrollRestoration } from "react-router-dom";

const FitnessAppLayout = () => {
  return (
    <div>
      <ScrollRestoration />
      <Outlet />
    </div>
  );
};

export default FitnessAppLayout;
