import {
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/common/components/ui/dialog";
import { Dialog } from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { PaymentDetailsPopupContent } from "../payment-details-popup-content/PaymentDetailsPopupContent";

interface PaymentDetailsPopupProps {
  paymentId: number | null;
  open: boolean;
  onClosePopup: () => void;
}

export const PaymentDetailsPopup = ({
  paymentId,
  open,
  onClosePopup,
}: PaymentDetailsPopupProps) => {
  return (
    <Dialog open={open} onOpenChange={onClosePopup}>
      <DialogContent>
        <div className="flex items-center justify-between w-full">
          <DialogTitle>Detalhes do Pagamento</DialogTitle>
          <DialogClose asChild>
            <button
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5 hover:cursor-pointer" />
            </button>
          </DialogClose>
        </div>
        <PaymentDetailsPopupContent selectedId={paymentId} />
      </DialogContent>
    </Dialog>
  );
};
