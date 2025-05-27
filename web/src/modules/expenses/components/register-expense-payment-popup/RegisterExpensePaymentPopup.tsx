import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/common/components/ui/dialog";
import { X } from "lucide-react";
import { useRegisterExpensePaymentController } from "./register-expense-payment-controller";

interface RegisterExpensePaymentPopupProps {
  selectedId: number | null;
  open: boolean;
  onCancel: () => void;
}

export const RegisterExpensePaymentPopup = ({
  selectedId,
  open,
  onCancel,
}: RegisterExpensePaymentPopupProps) => {
  const { registerPaymentData } = useRegisterExpensePaymentController();
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent>
        <div className="flex items-center justify-between w-full">
          <DialogTitle>Registrar Pagamento</DialogTitle>
          <DialogClose asChild>
            <button
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5 hover:cursor-pointer" />
            </button>
          </DialogClose>
        </div>
        {selectedId}
      </DialogContent>
    </Dialog>
  );
};
