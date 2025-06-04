import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import Login from "../features/auth/login";
import Register from "../features/auth/register";
import AuthLayout from "../layouts/AuthLayout";
import Dashboard from "../pages/Dashboard";
import MessagePage from "../pages/MessagePage";
import NewMessagePage from "../pages/NewMessagePage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Rotas protegidas */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <AuthLayout>
                <Dashboard />
              </AuthLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/messages/:id"
          element={
            <PrivateRoute>
              <AuthLayout>
                <MessagePage />
              </AuthLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/messages/new"
          element={
            <PrivateRoute>
              <AuthLayout>
                <NewMessagePage />
              </AuthLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
