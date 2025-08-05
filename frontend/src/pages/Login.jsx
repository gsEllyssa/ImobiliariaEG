import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const user = {
      name: "Dev Usuário",
      email: email || "teste@dev.com",
      idade: 25,
      role: "admin",
    };

    const token = "token-fake-dev";

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);

    console.log("🔐 Login liberado no modo DEV");
    navigate("/home", { replace: true });
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 md:p-14 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Login</h2>
        <p className="text-sm text-gray-500 text-center mb-6">Digite seu e-mail e senha:</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-semibold text-gray-700 block mb-1">
              E-MAIL
            </label>
            <input
              type="email"
              id="email"
              placeholder="Digite seu e-mail..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-semibold text-gray-700 block mb-1">
              SENHA
            </label>
            <input
              type="password"
              id="password"
              placeholder="Digite sua senha..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-sm font-semibold rounded-md transition-colors ${
              loading
                ? "bg-gray-300 text-white cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            {loading ? "Carregando..." : "Acessar"}
          </button>
        </form>
      </div>
    </div>
  );
}
