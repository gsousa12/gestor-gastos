export const InfoRow = ({ icon: Icon, label, value }: any) => (
  <div className="flex items-center gap-1 text-sm text-gray-600">
    <Icon className="w-4 h-4 text-sky-500" />
    <span className="font-medium">{label}:</span>
    <span className="text-gray-700">
      {value || <span className="italic text-gray-400">Não informado</span>}
    </span>
  </div>
);
