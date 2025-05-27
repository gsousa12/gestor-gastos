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
  sectorDetails: any;
  subSectorListData: any[];
  isMobile: boolean;
}

export const SectorDetailPopup = ({
  open,
  onOpenChange,
  sectorDetails,
  subSectorListData,
  isMobile,
}: SectorDetailPopupProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`p-0 ${isMobile ? "w-full max-w-full" : "max-w-lg"}`}
        aria-describedby={undefined}
      >
        <div className="flex items-center justify-between w-full px-6 pt-4 pb-2 border-b border-gray-100">
          <DialogTitle className="text-sky-700 text-lg">
            Detalhes do Setor
          </DialogTitle>
          <DialogClose asChild>
            <button
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5 hover:cursor-pointer" />
            </button>
          </DialogClose>
        </div>
        <SectorDetailContentPopup
          sectorDetails={sectorDetails}
          subSectorListData={subSectorListData}
          isMobile={isMobile}
        />
      </DialogContent>
    </Dialog>
  );
};
