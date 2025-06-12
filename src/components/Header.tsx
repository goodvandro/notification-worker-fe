import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { RootState } from "../store";
import { decodeToken } from "../utils/jwt";

export default function Header() {
  const token = useSelector((state: RootState) => state.auth.token);

  const payload = token ? decodeToken(token) : null;
  const username = payload ? payload.username : null;

  const { logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-gray-800 text-white px-6 flex justify-between items-center shadow z-10">
      <h1 className="text-lg font-bold">
        <Link to="/dashboard">Notification Worker</Link>
      </h1>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <FaUserCircle size={20} />
          <span className="text-sm font-medium">{username}</span>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-sm px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
