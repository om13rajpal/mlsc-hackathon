import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { useEffect } from "react";
import { Toaster } from "sonner";
import Main from "./pages/Main";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<div>Dashboard</div>} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
