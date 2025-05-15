export const SessionExpiredPopup = ({ open, onConfirm }: any) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[99999] bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs text-center">
        <h2 className="text-lg font-semibold mb-2">Sessão expirada</h2>
        <p className="mb-4 text-gray-600">Por favor, faça login novamente.</p>
        <button
          className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 hover:cursor-pointer"
          onClick={onConfirm}
        >
          OK
        </button>
      </div>
    </div>
  );
};
