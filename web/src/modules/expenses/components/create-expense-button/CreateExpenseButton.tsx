import { Plus } from "lucide-react";
import { useMobileDetect } from "../../../../common/hooks/useMobileDetect";

interface CreateExpenseButtonProps {
  label: string;
  openPopup: () => void;
}

export const CreateExpenseButton = ({
  label,
  openPopup,
}: CreateExpenseButtonProps) => {
  const isMobile = useMobileDetect();
  return (
    <button
      className={
        isMobile
          ? "flex items-center justify-center p-2 bg-white text-gray-700 rounded-md hover:bg-teal-50 hover:text-teal-700 hover:cursor-pointer transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-teal-400"
          : "flex flex-row items-center gap-1 px-3 py-1 bg-white text-gray-700 text-sm font-medium rounded-md hover:bg-teal-50 hover:text-teal-700 hover:cursor-pointer transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-teal-400"
      }
      onClick={openPopup}
      title={label}
    >
      <Plus className={isMobile ? "w-5 h-5" : "w-4 h-4"} />
      {!isMobile && <span>{label}</span>}
    </button>
  );
};
