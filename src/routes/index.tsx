import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "../features/auth/register";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
