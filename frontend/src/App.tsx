import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { useEffect } from "react";
import { Toaster } from "sonner";
import Main from "./pages/Main";
import Dashboard from "./pages/Dashboard";
import {
  ProtectedDashboardRoute,
  ProtectedLoginRoute,
} from "./components/ProtectedRoute";

const App = () => {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }, []);
  return (
    <>
      <Routes>
        <Route element={<ProtectedLoginRoute />}>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedDashboardRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
