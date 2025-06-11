import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import AuthLayout from "../layouts/AuthLayout";
import Dashboard from "../pages/Dashboard";
import MessagePage from "../pages/MessagePage";
import NewMessagePage from "../pages/NewMessagePage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initSocket } from "../services/socket";
import { updateMessageStatus } from "../store/messages.slice";

export function AppRouter() {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = initSocket();

    socket.on("messageStatusUpdated", (message) => {
      console.log("messageStatusUpdated", message);
      dispatch(updateMessageStatus(message));
    });

    return () => {
      socket.off("messageStatusUpdated");
    };
  }, [dispatch]);

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
