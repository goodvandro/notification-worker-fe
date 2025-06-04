import { useEffect, useState } from "react";
import type { Message } from "./message.type";
import { getMessages } from "./message.api";

export default function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getMessages();
        setMessages(data);
      } catch (error) {
        setError(
          (error as { response: { data: { message: string } } }).response?.data
            ?.message || "Erro ao carregar mensagens"
        );
      }
    };
    fetch();
  }, []);

  if (error) return <p className="text-red-600 mb-2">{error}</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Mensagens</h2>
      <ul className="space-y-3">
        {messages.map((msg) => (
          <li key={msg.id} className="border p-4 rounded bg-white shadow">
            <h3 className="font-semibold text-lg">{msg.title}</h3>
            <p className="text-sm text-gray-700">{msg.content}</p>
            <p className="text-xs text-gray-500 mt-1">
              Status: <strong>{msg.status}</strong>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
