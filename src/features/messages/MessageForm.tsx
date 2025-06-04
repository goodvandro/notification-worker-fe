import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMessage } from "./message.api";

export default function MessageForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await createMessage({ title, content });
      navigate("/dashboard");
    } catch (error) {
      setError(
        (error as { response: { data: { message: string } } }).response?.data
          ?.message || "Erro ao criar mensagens"
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Nova Mensagem</h2>

        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
          required
        />
        <textarea
          placeholder="Conteúdo"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
          rows={4}
          required
        />
        {error && <p className="text-red-600 mb-2">{error}</p>}

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Criar
          </button>
        </div>
      </form>
    </div>
  );
}
