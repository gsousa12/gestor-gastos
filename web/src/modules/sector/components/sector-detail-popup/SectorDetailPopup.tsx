import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/common/components/ui/dialog";
import { X } from "lucide-react";
import { SectorDetailContentPopup } from "../sector-detail-content-popup/SectorDetailContentPopup";

interface SectorDetailPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedSectorId: number | null;
}

export const SectorDetailPopup = ({
  open,
  onOpenChange,
  selectedSectorId,
}: SectorDetailPopupProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby={undefined}>
        <div className="flex items-center justify-between w-full">
          <DialogTitle>Cadastrar Sub-Setor</DialogTitle>
          <DialogClose asChild>
            <button
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5 hover:cursor-pointer" />
            </button>
          </DialogClose>
        </div>
        <SectorDetailContentPopup selectedSectorId={selectedSectorId} />
      </DialogContent>
    </Dialog>
  );
};
