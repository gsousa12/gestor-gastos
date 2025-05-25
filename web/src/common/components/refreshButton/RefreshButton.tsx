import { RefreshCcw } from "lucide-react";

interface RefreshButtonProps {
  onClick: () => void;
  className?: string;
}

export const RefreshButton = ({
  onClick,
  className = "",
}: RefreshButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`p-2 rounded hover:bg-sky-100 transition-colors ${className} hover:cursor-pointer`}
    aria-label="Atualizar"
  >
    <RefreshCcw className="w-5 h-5 text-sky-600" />
  </button>
);
