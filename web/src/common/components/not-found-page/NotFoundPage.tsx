import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

export const NotFoundPage = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const navigate = useNavigate();

  const handleBack = () => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-50">
      <h1 className="text-4xl font-bold mb-2 text-sky-700">404</h1>
      <p className="mb-6 text-gray-600">Página não encontrada.</p>
      <button
        className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700"
        onClick={handleBack}
      >
        Voltar
      </button>
    </div>
  );
};
