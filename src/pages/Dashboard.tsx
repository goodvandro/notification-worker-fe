import MessageList from "../features/messages/MessageList";

export default function Dashboard() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <MessageList />
    </div>
  );
}
