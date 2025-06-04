import { useEffect, useState } from "react";
import type { Message, PaginatedResponse } from "./message.type";
import { getMessages } from "./message.api";

export default function MessageList() {
  const [data, setData] = useState<PaginatedResponse<Message> | null>(null);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await getMessages(page, 10, status);
        setData(result);
      } catch (error) {
        setError(
          (error as { response: { data: { message: string } } }).response?.data
            ?.message || "Erro ao carregar mensagens"
        );
      }
    };
    fetch();
  }, [page, status]);

  if (error) return <p className="text-red-600 mb-2">{error}</p>;
  if (!data) return <p>Carregando...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Mensagens</h2>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Status:</label>
          <select
            value={status || ""}
            onChange={(e) => {
              setPage(1); // reset para página 1 ao trocar filtro
              setStatus(e.target.value || undefined);
            }}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="">Todos</option>
            <option value="PENDING">Pendentes</option>
            <option value="SENDING">Enviando</option>
            <option value="SENT">Enviadas</option>
          </select>
        </div>
        <span className="text-gray-600 text-sm">
          Total: <strong>{data.meta.total}</strong> mensagem
          {data.meta.total !== 1 ? "s" : ""}
        </span>
      </div>

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
