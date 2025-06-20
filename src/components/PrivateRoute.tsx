import type { JSX } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../store";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const token = useSelector((state: RootState) => state.auth.token);

  return token ? children : <Navigate to="/login" replace />;
}
