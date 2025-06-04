import { useState } from "react";
import { register } from "./auth.api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      await register(username, password);
      setSuccess(true);
    } catch (error: unknown) {
      setError(
        (error as { response: { data: { message: string } } }).response?.data
          ?.message || "Erro ao registrar"
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4">Registo de Utilizador</h2>

        {success ? (
          <p className="text-green-600">Registro efetuado com sucesso!</p>
        ) : (
          <>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border p-2 mb-4 rounded"
              required
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-2 mb-4 rounded"
              required
            />
            {error && <p className="text-red-600 mb-2">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Registrar
            </button>
          </>
        )}
      </form>
    </div>
  );
}
