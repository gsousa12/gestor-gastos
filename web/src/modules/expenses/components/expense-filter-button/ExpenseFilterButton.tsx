import { useState, useRef } from "react";
import { Filter } from "lucide-react";

export const ExpenseFilterButton = ({ onClick }: { onClick?: () => void }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={buttonRef}
      className="flex items-center gap-1 px-3 py-1 bg-white border border-gray-200 rounded-md text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors duration-150 shadow-sm"
      onClick={onClick}
      type="button"
    >
      <Filter className="w-4 h-4" />
      <span className="text-sm font-medium">Filtrar</span>
    </button>
  );
};
