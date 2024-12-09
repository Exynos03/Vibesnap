import { Navigate, Outlet } from "react-router-dom";
import getCookie from "./cookies/getCookies";

const SchedulerProtectedRoute = () => {

  return getCookie("sessionData") ? <Outlet /> : <Navigate to="/" />;
};

export default SchedulerProtectedRoute;