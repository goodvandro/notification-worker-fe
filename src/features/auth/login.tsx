import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "./auth.api";
import { setToken, setRefreshToken } from "../../store/auth.slice";
import toast from "react-hot-toast";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("A efetuar login...");

    try {
      const { accessToken, refreshToken } = await login({ username, password });
      dispatch(setToken(accessToken));
      dispatch(setRefreshToken(refreshToken));
      toast.success("Login efetuado com sucesso!", { id: toastId });
      navigate("/dashboard");
    } catch (error: unknown) {
      const msg =
        (error as { response: { data: { message: string } } }).response?.data
          ?.message || "Erro ao efetuar login";
      toast.error(msg, { id: toastId });
      // setError(
      //   (error as { response: { data: { message: string } } }).response?.data
      //     ?.message || "Erro ao efetuar login"
      // );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
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
          Entrar
        </button>
        <p className="mt-4 text-sm text-center text-gray-600">
          Ainda não tem uma conta?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Registre-se aqui
          </Link>
        </p>
      </form>
    </div>
  );
}
