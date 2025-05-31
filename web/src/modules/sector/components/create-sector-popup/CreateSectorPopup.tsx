import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/common/components/ui/dialog";
import { X } from "lucide-react";
import { CreateSectorPopupContent } from "../create-sector-popup-content/CreateSectorPopupContent";

interface CreateSectorPopupProps {
  open: boolean;
  onCloseCreateSectorPopup: () => void;
  handleRefetchSectorListData: () => void;
}

export const CreateSectorPopup = ({
  open,
  onCloseCreateSectorPopup,
  handleRefetchSectorListData,
}: CreateSectorPopupProps) => {
  return (
    <Dialog open={open} onOpenChange={onCloseCreateSectorPopup}>
      <DialogContent aria-describedby={undefined}>
        <div className="flex items-center justify-between w-full">
          <DialogTitle>Cadastrar Setor</DialogTitle>
          <DialogClose asChild>
            <button
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5 hover:cursor-pointer" />
            </button>
          </DialogClose>
        </div>
        <CreateSectorPopupContent
          handleRefetchSectorListData={handleRefetchSectorListData}
        />
      </DialogContent>
    </Dialog>
  );
};
