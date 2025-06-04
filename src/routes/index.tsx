import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "../features/auth/register";
import Login from "../features/auth/login";
import Dashboard from "../pages/Dashboard";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
