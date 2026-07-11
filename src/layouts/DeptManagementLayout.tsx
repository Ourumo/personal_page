import { Outlet, ScrollRestoration } from "react-router-dom";

const DeptManagementLayout = () => {
  return (
    <div>
      <ScrollRestoration />
      <Outlet />
    </div>
  );
};

export default DeptManagementLayout;
