import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/common/components/ui/dialog";
import { X } from "lucide-react";
import { CreateSecretaryPopupContent } from "../create-secretary-popup-content/CreateSecretaryPopupContent";

interface CreateSecretaryPopupProps {
  open: boolean;
  onCloseCreateSecretaryPopup: () => void;
  handleRefetchSecretaryListData: () => void;
}

export const CreateSecretaryPopup = ({
  open,
  onCloseCreateSecretaryPopup,
  handleRefetchSecretaryListData,
}: CreateSecretaryPopupProps) => {
  return (
    <Dialog open={open} onOpenChange={onCloseCreateSecretaryPopup}>
      <DialogContent aria-describedby={undefined}>
        <div className="flex items-center justify-between w-full">
          <DialogTitle>Cadastrar Secretaria</DialogTitle>
          <DialogClose asChild>
            <button
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5 hover:cursor-pointer" />
            </button>
          </DialogClose>
        </div>
        <CreateSecretaryPopupContent
          handleRefetchSecretaryListData={handleRefetchSecretaryListData}
        />
      </DialogContent>
    </Dialog>
  );
};
