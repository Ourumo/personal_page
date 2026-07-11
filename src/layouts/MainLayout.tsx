import { Outlet, ScrollRestoration } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <ScrollRestoration />
      <Outlet />
    </div>
  );
};

export default MainLayout;
