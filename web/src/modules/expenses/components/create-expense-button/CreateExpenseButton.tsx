import { Plus } from "lucide-react";

interface CreateExpenseButtonProps {
  label: string;
  onClick: () => void;
}

export const CreateExpenseButton = ({
  label,
  onClick,
}: CreateExpenseButtonProps) => {
  return (
    <button
      className="flex flex-row items-center gap-2 px-4 py-2 bg-teal-600 
      text-white font-semibold rounded-lg shadow hover:bg-teal-700 
      hover:cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400"
      onClick={onClick}
    >
      <Plus className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );
};
