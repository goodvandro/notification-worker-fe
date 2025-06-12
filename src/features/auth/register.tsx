import { useState } from "react";
import { register } from "./auth.api";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // const [success, setSuccess] = useState(false);
  // const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("A registar...");

    try {
      await register(username, password);
      toast.success("Registado com sucesso!", { id: toastId });
      navigate("/login");
    } catch (error: unknown) {
      const msg = (error as { response: { data: { message: string } } })
        .response?.data.message;
      toast.error(msg || "Erro ao registrar. Tente novamente mais tarde.", {
        id: toastId,
      });
      // setError(
      //   (error as { response: { data: { message: string } } }).response?.data
      //     ?.message || "Erro ao registrar"
      // );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4">Registo de Utilizador</h2>

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
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Registrar
        </button>
        <p className="mt-4 text-sm text-center text-gray-600">
          Já tem uma conta?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Faça login
          </Link>
        </p>
      </form>
    </div>
  );
}
