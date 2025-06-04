import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import clsx from "clsx";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", to: "/dashboard" },
    { label: "Nova Mensagem", to: "/messages/new" },
  ];

  return (
    <div className="min-h-screen">
      {/* Cabeçalho fixo no topo */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-gray-800 text-white px-6 flex justify-between items-center shadow z-10">
        <h1 className="text-lg font-bold">
          <Link to="/dashboard">Notification Worker</Link>
        </h1>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-sm px-3 py-1 rounded"
        >
          Logout
        </button>
      </header>

      {/* Sidebar fixa à esquerda */}
      <aside className="fixed top-16 left-0 w-60 h-[calc(100vh-4rem)] bg-gray-100 border-r border-gray-300 p-4 overflow-y-auto">
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={clsx(
                "block px-3 py-2 rounded hover:bg-gray-200 text-gray-700 font-medium",
                location.pathname === item.to && "bg-gray-200 font-semibold"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Área principal com scroll interno */}
      <main className="ml-60 mt-16 h-[calc(100vh-4rem)] bg-gray-50 overflow-y-auto overflow-x-hidden flex flex-col">
        {children}
      </main>
    </div>
  );
}
