import { useEffect, useState } from "react";
import { useMobileDetect } from "@common/hooks/useMobileDetect";
import { PaymentsFilterValues } from "../../pages/payments-page/payments-page-controller";
import { Filter } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { months } from "@common/utils/constants";
import { getCurrentYear } from "@common/utils/functions";

interface PaymentsFilterPopupProps {
  filters: PaymentsFilterValues;
  onApply: (values: PaymentsFilterValues) => void;
  onClear: () => void;
}

export const PaymentsFilterPopup = ({
  filters,
  onApply,
  onClear,
}: PaymentsFilterPopupProps) => {
  const isMobile = useMobileDetect();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<PaymentsFilterValues>(filters);

  useEffect(() => {
    setValues(filters);
  }, [filters]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: name === "month" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleApply = () => {
    onApply(values);
    setOpen(false);
  };

  const handleClear = () => {
    setValues({ supplierName: "", month: "", year: "" });
    onClear();
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className="flex items-center gap-1 px-3 py-1 bg-white text-gray-600 hover:bg-sky-50 hover:text-sky-700 hover:cursor-pointer"
          type="button"
        >
          <Filter className="w-4 h-4" />
          <span className="text-sm font-medium">
            {isMobile ? "" : "Filtrar"}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4 flex flex-col gap-3">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Fornecedor</label>
          <input
            type="text"
            name="supplierName"
            value={values.supplierName}
            onChange={handleChange}
            className="w-full px-2 py-1 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-sky-400 outline-none"
            placeholder="Nome do fornecedor"
          />
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-xs text-gray-500 mb-1">Mês</label>
            <select
              name="month"
              value={values.month}
              onChange={handleChange}
              className="w-full px-2 py-1 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-sky-400 outline-none"
            >
              {months.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-xs text-gray-500 mb-1">Ano</label>
            <input
              type="text"
              name="year"
              value={values.year}
              onChange={handleChange}
              className="w-full px-2 py-1 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-sky-400 outline-none"
              placeholder={getCurrentYear()}
              maxLength={4}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-2">
          <button
            className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-500 hover:bg-gray-200 hover:cursor-pointer"
            onClick={handleClear}
            type="button"
          >
            Limpar
          </button>
          <button
            className="px-2 py-1 text-xs rounded bg-sky-600 text-white hover:bg-sky-700 hover:cursor-pointer"
            onClick={handleApply}
            type="button"
          >
            Aplicar
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
