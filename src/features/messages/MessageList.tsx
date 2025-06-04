import { useEffect, useState } from "react";
import type { Message, PaginatedResponse } from "./message.type";
import { getMessages } from "./message.api";

export default function MessageList() {
  const [data, setData] = useState<PaginatedResponse<Message> | null>(null);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await getMessages(page, 10);
        setData(result);
      } catch (error) {
        setError(
          (error as { response: { data: { message: string } } }).response?.data
            ?.message || "Erro ao carregar mensagens"
        );
      }
    };
    fetch();
  }, [page]);

  if (error) return <p className="text-red-600 mb-2">{error}</p>;
  if (!data) return <p>Carregando...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Mensagens</h2>
      <ul className="space-y-3">
        {data.items.map((msg) => (
          <li key={msg.id} className="border p-4 rounded bg-white shadow">
            <h3 className="font-semibold text-lg">{msg.title}</h3>
            <p className="text-sm text-gray-700">{msg.content}</p>
            <p className="text-xs text-gray-500 mt-1">
              Status: <strong>{msg.status}</strong>
            </p>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span>
          Página {data.meta.page} de {data.meta.totalPages}
        </span>
        <button
          onClick={() =>
            setPage((prev) => (prev < data.meta.totalPages ? prev + 1 : prev))
          }
          disabled={page >= data.meta.totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Próxima
        </button>
      </div>
    </div>
  );
}
