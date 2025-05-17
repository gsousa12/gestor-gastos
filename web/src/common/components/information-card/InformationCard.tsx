import { ArrowUpRight } from "lucide-react";
import { ReactNode } from "react";
import { convertCentsToReal } from "../../utils/functions";

interface InformationCardProps {
  icon: ReactNode;
  value: number;
  valueType: "money" | "quantity";
  description: string;
  onRedirect?: () => void;
}

export const InformationCard = ({
  icon,
  value,
  valueType,
  description,
  onRedirect,
}: InformationCardProps) => {
  return (
    <div
      className={`bg-gray-50 p-5  hover:shadow-lg border 
    border-gray-200 shadow-sm shadow-gray-300 rounded-md`}
    >
      <div className="flex justify-between items-start">
        <div className=" bg-gray-100 rounded-lg text-gray-600 mt-1">{icon}</div>

        {onRedirect && (
          <button
            onClick={onRedirect}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Redirect"
          >
            <ArrowUpRight size={32} className="hover:cursor-pointer" />
          </button>
        )}
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-semibold text-gray-900">
          {valueType === "money" ? `R$ ${convertCentsToReal(value)}` : value}
        </h3>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
    </div>
  );
};
