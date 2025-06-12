import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../store";
import { setPaginatedMessages } from "../../store/messages.slice";
import { getMessages } from "./message.api";

export default function MessageList() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.messages.items);
  const meta = useSelector((state: RootState) => state.messages.meta);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const result = await getMessages(page, 6, status);
        dispatch(setPaginatedMessages(result));
      } catch (error) {
        setError(
          (error as { response: { data: { message: string } } }).response?.data
            ?.message || "Erro ao carregar mensagens"
        );
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [dispatch, page, status]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Mensagens</h2>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Status:</label>
          <select
            value={status || ""}
            onChange={(e) => {
              setPage(1);
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
          Total: <strong>{meta.total ?? 0}</strong> mensagem
          {(meta.total ?? 0) !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Conteúdo da lista */}
      {error && <p className="text-red-600 text-center py-10">{error}</p>}

      {loading && (
        <ul className="space-y-3 animate-pulse">
          {Array.from({ length: 6 }).map((_, index) => (
            <li
              key={index}
              className="border p-4 rounded bg-white shadow space-y-2"
            >
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </li>
          ))}
        </ul>
      )}

      {!loading && !error && messages.length === 0 && (
        <p className="text-gray-600 text-center py-10">
          Nenhuma mensagem encontrada.
        </p>
      )}

      {!loading && !error && messages.length > 0 && (
        <>
          <ul className="space-y-3">
            {messages.map((msg) => (
              <li
                key={msg.id}
                className="border p-4 rounded bg-white shadow cursor-pointer hover:bg-gray-50"
                onClick={() => navigate(`/messages/${msg.id}`)}
              >
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
              Página {meta.page} de {meta.totalPages}
            </span>
            <button
              onClick={() =>
                setPage((prev) => (prev < meta.totalPages ? prev + 1 : prev))
              }
              disabled={page >= meta.totalPages}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Próxima
            </button>
          </div>
        </>
      )}
    </div>
  );
}
