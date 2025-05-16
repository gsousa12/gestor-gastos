import { useState } from "react";
import { useLoginPageController } from "../components/login-route/login-page-controller";
import { Eye, EyeOff, GalleryVerticalEnd, Lock, Mail } from "lucide-react";

export const LoginPage = () => {
  const { email, setEmail, password, setPassword, handleSubmit, isPending } =
    useLoginPageController();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex bg-slate-100">
      {/* Lado esquerdo: área de login */}
      <div className="relative flex flex-col justify-center items-center w-full md:w-1/2 bg-white md:rounded-l-3xl md:shadow-lg md:m-8 md:ml-16 p-8 md:p-16">
        <div className="w-full max-w-md mx-auto flex flex-col gap-8">
          {/* Logo */}
          <div>
            <GalleryVerticalEnd className="w-7 h-7 text-emerald-600" />
          </div>
          {/* Saudação */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 leading-tight">
              Olá,
            </h2>
            <p className="text-lg text-gray-600 leading-tight">
              Bem-vindo de volta
            </p>
          </div>
          {/* Formulário */}
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-medium mb-1"
              >
                Email
              </label>
              <div className="flex items-center border border-gray-200 rounded-lg bg-white focus-within:ring-2 focus-within:ring-emerald-400 transition">
                <Mail className="w-5 h-5 text-gray-400 ml-3" />
                <input
                  id="email"
                  type="email"
                  className="flex-1 px-3 py-2 bg-transparent outline-none text-gray-800"
                  placeholder="Digite seu email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isPending}
                  required
                />
              </div>
            </div>
            {/* Senha */}
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-medium mb-1"
              >
                Senha
              </label>
              <div className="flex items-center border border-gray-200 rounded-lg bg-white focus-within:ring-2 focus-within:ring-emerald-400 transition">
                <Lock className="w-5 h-5 text-gray-400 ml-3" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="flex-1 px-3 py-2 bg-transparent outline-none text-gray-800"
                  placeholder="Digite sua senha"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isPending}
                  required
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className="mr-3 focus:outline-none"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            {/* Botão de login */}
            <button
              type="submit"
              className="w-full py-2 mt-2 bg-emerald-600 hover:bg-emerald-700 hover:cursor-pointer text-white font-semibold rounded-lg transition"
              disabled={isPending}
            >
              {"Efetuar Login"}
            </button>
          </form>
        </div>
      </div>
      {/* Lado direito: fundo teal com moldura branca */}
      <div className="hidden md:flex w-1/2 items-center justify-center relative">
        <div className="absolute inset-0 bg-emerald-600 rounded-r-3xl m-8" />
      </div>
    </div>
  );
};
