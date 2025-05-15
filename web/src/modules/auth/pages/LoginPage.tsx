import React, { useState } from "react";
import { useLoginMutation } from "../../../common/hooks/auth/useLoginMutation";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, isPending, isError, error } = useLoginMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ email, password });
  };

  return (
    <div className="min-h-screen flex">
      {/* Lado esquerdo: só aparece em desktop */}
      <div className="hidden md:flex w-1/2 bg-emerald-600 items-center justify-center" />
      {/* Lado direito: formulário */}
      <div className="flex flex-col w-full md:w-1/2 items-center justify-center px-8 py-12">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Bem-vindo de volta.
          </h2>
          <p className="text-gray-500 mb-8">Efetue o login</p>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                placeholder="Digite seu email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isPending}
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-1"
                htmlFor="password"
              >
                Senha
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                placeholder="Digite sua senha"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isPending}
              />
            </div>
            {isError && (
              <div className="text-red-600 text-sm">
                {(error as any)?.response?.data?.message ||
                  "Erro ao efetuar login."}
              </div>
            )}
            <button
              type="submit"
              className="w-full py-2 mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition"
              disabled={isPending}
            >
              {isPending ? "Entrando..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
