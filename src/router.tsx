import { createBrowserRouter } from "react-router-dom";
// 포트폴리오
import MainLayout from "./layouts/MainLayout";
import Error from "./pages/Error";
import Portfolio from "./pages/Portfolio";
// 프로젝트 1 - 법인 카드 관리 페이지
import DeptManagementLayout from "./layouts/DeptManagementLayout";
import Pending from "./pages/deptManagement/Pending";
import Status from "./pages/deptManagement/Status";
import Submitted from "./pages/deptManagement/Submitted";
// 프로젝트 2 - 운동 어플리케이션
import Main from "./pages/fitnessApp/Main";
import FitnessAppLayout from "./layouts/FitnessAppLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      // 포트폴리오
      { path: "", element: <Portfolio /> },
      // 프로젝트 1 - 법인 카드 관리 페이지
      {
        path: "dept",
        element: <DeptManagementLayout />,
        children: [
          {
            path: "pending",
            element: <Pending />,
          },
          {
            path: "status",
            element: <Status />,
          },
          {
            path: "submitted",
            element: <Submitted />,
          },
        ],
      },
      // 프로젝트 2 - 운동 어플리케이션
      {
        path: "fitness",
        element: <FitnessAppLayout />,
        children: [
          {
            path: "",
            element: <Main />,
          },
        ],
      },
    ],
  },
]);

export default router;
