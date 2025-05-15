import { BrushCleaning } from "lucide-react";

interface NotFoundItemsProps {
  title: string;
  description: string;
}

export const NotFoundItems = ({ title, description }: NotFoundItemsProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center text-muted-foreground">
      <BrushCleaning className="w-12 h-12 mb-2" />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm">{description}</p>
    </div>
  );
};
