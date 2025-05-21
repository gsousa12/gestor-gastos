import { Supplier } from "@/common/api/interfaces/supplier/supplier-api-interfaces";
import { cn } from "@/common/lib/utils";
import { convertCentsToReal, formatTaxId } from "@/common/utils/functions";
import { Eye, Truck, Mail, Phone, BadgeDollarSign, IdCard } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SupplierDetailsCardProps {
  supplier: Supplier;
}

export const SupplierDetailsCard = ({ supplier }: SupplierDetailsCardProps) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate("/suppliers/details", {
      state: { supplierId: supplier.id },
    });
  };

  return (
    <div
      className="relative p-6 bg-gradient-to-br from-white via-slate-50 to-sky-50  hover:shadow-lg border 
    border-gray-200 shadow-sm shadow-gray-300 rounded-md group min-h-[200px] flex flex-col gap-4"
    >
      {/* Botão de detalhes */}
      <button
        onClick={handleViewDetails}
        className="absolute top-3 right-3 text-sky-400 hover:text-sky-600 hover:cursor-pointer transition"
        title="Ver detalhes"
        aria-label="Ver detalhes do fornecedor"
      >
        <Eye size={20} />
      </button>

      {/* Nome e empresa */}
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 bg-sky-100 rounded-full p-1.5">
          <Truck className="w-4 h-4 text-sky-600" />
        </div>
        <div>
          <h3 className="font-bold text-base text-sky-700 leading-tight">
            {supplier.name}
          </h3>
          <p className="text-xs text-gray-600 font-medium">
            {supplier.companyName ?? "-"}
          </p>
        </div>
      </div>

      {/* Débito recorrente em destaque */}
      <div className="flex flex-col items-start mt-2">
        <div className="flex items-center gap-2">
          <BadgeDollarSign
            className={cn(
              "w-5 h-5 ",
              supplier.recurringDebit === 0 ? "text-gray-700" : "text-red-500"
            )}
          />
          <span
            className={cn(
              "text-base font-bold ",
              supplier.recurringDebit === 0 ? "text-gray-700" : "text-red-700"
            )}
            style={{ fontSize: "1rem" }}
          >
            R$ {convertCentsToReal(supplier.recurringDebit)}
          </span>
        </div>
        <span className="text-[11px] text-gray-500 ml-7">
          Débito recorrente
        </span>
      </div>

      {/* Informações de contato */}
      <div className="flex flex-col gap-2 mt-2">
        <div className="flex items-center gap-2">
          <IdCard className="w-4 h-4 text-gray-400" />
          <span className="text-xs text-gray-700 font-medium">
            {formatTaxId(supplier.taxId)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-gray-400" />
          <span className="text-xs text-gray-700">
            {supplier.contactEmail ?? "-"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-gray-400" />
          <span className="text-xs text-gray-700">
            {supplier.contactPhone ?? "-"}
          </span>
        </div>
      </div>
    </div>
  );
};
