import { Link } from "react-router-dom";
import MessageList from "../features/messages/MessageList";

export default function Dashboard() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <Link
        to="/messages/new"
        className="inline-block mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        + Nova Mensagem
      </Link>
      <MessageList />
    </div>
  );
}
