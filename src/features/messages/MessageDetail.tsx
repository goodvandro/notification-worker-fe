import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Message } from "./message.type";
import { getMessageById } from "./message.api";

export default function MessageDetail() {
  const { id } = useParams();
  const [message, setMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await getMessageById(id!);
        setMessage(result);
      } catch (error) {
        setError(
          (error as { response: { data: { message: string } } }).response?.data
            ?.message || "Erro ao carregar mensagem"
        );
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) return <p className="text-center py-10">Carregando...</p>;
  if (error) return <p className="text-red-600 text-center">{error}</p>;
  if (!message)
    return <p className="text-center py-10">Mensagem não encontrada.</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Detalhe da Mensagem</h2>
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-4 inline-flex items-center text-sm text-blue-600 hover:underline cursor-pointer"
      >
        ← Voltar à listagem
      </button>
      <div className="bg-white rounded shadow p-6">
        <p>
          <strong>ID:</strong> {message.id}
        </p>
        <p>
          <strong>Título:</strong> {message.title}
        </p>
        <p>
          <strong>Conteúdo:</strong> {message.content}
        </p>
        <p>
          <strong>Status:</strong> {message.status}
        </p>
        <p>
          <strong>Criada em:</strong>{" "}
          {new Date(message.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
