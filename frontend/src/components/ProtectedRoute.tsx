import { Navigate, Outlet } from "react-router-dom";

export const ProtectedDashboardRoute = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to={"/"} />;
};

export const ProtectedLoginRoute = () => {
  const token = localStorage.getItem("token");
  return !token ? <Outlet /> : <Navigate to={"/dashboard"} />;
};
