import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "../../../../components/ui/dialog";
import { X } from "lucide-react";

interface CreateExpensePopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateExpensePopup = ({
  open,
  onOpenChange,
}: CreateExpensePopupProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <div className="flex items-center justify-between w-full">
          <DialogTitle>Cadastrar Despesa</DialogTitle>
          <DialogClose asChild>
            <button
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5 hover:cursor-pointer" />
            </button>
          </DialogClose>
        </div>
        {/* Conteúdo da modal */}
      </DialogContent>
    </Dialog>
  );
};
