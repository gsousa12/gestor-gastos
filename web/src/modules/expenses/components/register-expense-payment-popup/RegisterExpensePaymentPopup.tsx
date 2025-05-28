import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/common/components/ui/dialog";
import { X } from "lucide-react";
import { RegisterExpensePaymentContent } from "../register-expense-payment-content/RegisterExpensePaymentContent";

interface RegisterExpensePaymentPopupProps {
  selectedId: number | null;
  open: boolean;
  onClosePopup: () => void;
  refreshExpenseTable: () => void;
}

export const RegisterExpensePaymentPopup = ({
  selectedId,
  open,
  onClosePopup,
  refreshExpenseTable,
}: RegisterExpensePaymentPopupProps) => {
  return (
    <Dialog open={open} onOpenChange={onClosePopup}>
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
        <RegisterExpensePaymentContent
          selectedId={selectedId}
          refreshExpenseTable={refreshExpenseTable}
          onClosePopup={onClosePopup}
        />
      </DialogContent>
    </Dialog>
  );
};
