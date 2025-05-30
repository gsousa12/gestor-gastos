import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/common/components/ui/dialog";
import { X } from "lucide-react";
import { CreateSupplierPopupContent } from "../create-supplier-popup-content/CreateSupplierPopupContent";

interface CreateSupplierPopupProps {
  open: boolean;
  handleCloseCreateSupplierPopUp: () => void;
  refreshSupplierList: () => void;
}

export const CreateSupplierPopup = ({
  open,
  handleCloseCreateSupplierPopUp,
  refreshSupplierList,
}: CreateSupplierPopupProps) => {
  return (
    <Dialog open={open} onOpenChange={handleCloseCreateSupplierPopUp}>
      <DialogContent aria-describedby={undefined}>
        <div className="flex items-center justify-between w-full">
          <DialogTitle>Cadastrar Fornecedor</DialogTitle>
          <DialogClose asChild>
            <button
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5 hover:cursor-pointer" />
            </button>
          </DialogClose>
        </div>
        <CreateSupplierPopupContent refreshSupplierList={refreshSupplierList} />
      </DialogContent>
    </Dialog>
  );
};
