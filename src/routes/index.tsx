import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "../features/auth/register";
import Login from "../features/auth/login";
import Dashboard from "../pages/Dashboard";
import MessagePage from "../pages/MessagePage";
import NewMessagePage from "../pages/NewMessagePage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/messages/new" element={<NewMessagePage />} />
        <Route path="/messages/:id" element={<MessagePage />} />
      </Routes>
    </BrowserRouter>
  );
}
