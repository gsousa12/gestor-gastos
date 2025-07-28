// src/features/dashboard/components/dashboard-filters/DashboardFilters.tsx

import { useState, useEffect } from "react";
import { Filter } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { getCurrentYear } from "@common/utils/functions";
import { months } from "@common/utils/constants";
import { Checkbox } from "@/common/components/ui/checkbox";
import { FormFilterValues } from "../../pages/dashboard-page-controller";

interface DashboardFiltersProps {
  initialValues: FormFilterValues;
  onApply: (values: FormFilterValues) => void;
  onClear: () => void;
}

export const DashboardFilters = ({
  initialValues,
  onApply,
  onClear,
}: DashboardFiltersProps) => {
  const [open, setOpen] = useState(false);
  // Estado local para os valores do formulário dentro do popover
  const [values, setValues] = useState<FormFilterValues>(initialValues);

  // Sincroniza o estado local se os filtros externos mudarem (ex: ao limpar)
  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  // Handler genérico para inputs de texto e select
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev: any) => ({
      ...prev,
      // Converte o mês para número, mantendo o resto como string
      [name]: name === "month" ? Number(value) : value,
    }));
  };

  // Handler específico para o checkbox da shadcn/ui
  const handleCheckboxChange = (checked: boolean) => {
    setValues((prev: any) => ({
      ...prev,
      onlyMyExpenses: checked,
    }));
  };

  const handleApply = () => {
    onApply(values);
    setOpen(false); // Fecha o popover ao aplicar
  };

  const handleClear = () => {
    onClear();
    setOpen(false); // Fecha o popover ao limpar
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {/* Botão gatilho com o mesmo estilo do exemplo */}
        <button
          className="flex items-center gap-1 px-3 py-1 bg-white text-gray-600  rounded-md hover:bg-sky-50 hover:text-sky-700 hover:cursor-pointer"
          type="button"
        >
          <Filter className="w-4 h-4" />
          <span className="text-sm font-medium">Filtrar</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4 flex flex-col gap-3">
        {/* Inputs com o mesmo layout e estilo do exemplo */}
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-xs text-gray-500 mb-1">Mês</label>
            <select
              name="month"
              value={values.month}
              onChange={handleChange}
              className="w-full px-2 py-1 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-sky-400 outline-none h-9"
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
              className="w-full px-2 py-1 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-sky-400 outline-none h-9"
              placeholder={getCurrentYear().toString()}
              maxLength={4}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <Checkbox
            id="onlyMyExpenses"
            checked={values.onlyMyExpenses}
            onCheckedChange={handleCheckboxChange}
          />
          <label
            htmlFor="onlyMyExpenses"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Apenas minhas despesas
          </label>
        </div>

        {/* Botões de ação com o mesmo estilo do exemplo */}
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
