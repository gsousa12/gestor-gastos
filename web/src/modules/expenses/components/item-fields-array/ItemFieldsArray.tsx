import { useFieldArray, useFormContext } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { cn } from "@/common/lib/utils";
import React from "react";
import { ExpenseItemFormValues } from "../../schemas/create-expense-schema";
import { ItemNameComboBox } from "../item-list-combobox/ItemListComboBox";

/* --- helpers ------------------------------------------------------------ */
const parseCurrencyToCents = (value: string) => {
  if (!value) return 0;
  return Number(value.replace(/\D/g, ""));
};

interface ItemFieldsArrayProps {
  itemList: { id: number; name: string }[];
}

/* ----------------------------------------------------------------------- */
export const ItemFieldsArray = ({ itemList }: ItemFieldsArrayProps) => {
  /* react-hook-form */
  const {
    control,
    register,
    setValue,
    formState: { errors },
    watch,
    trigger,
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  /* erros por campo ------------------------------------------------------ */
  const getItemError = (
    field: "name" | "quantity" | "totalValue" | "unitOfMeasure",
    idx: number
  ) => {
    if (Array.isArray(errors.items) && errors.items[idx]?.[field]?.message) {
      return errors.items[idx][field]?.message as string;
    }
    return " ";
  };

  /* total --------------------------------------------------------------- */
  const items: ExpenseItemFormValues[] = watch("items") || [];
  const totalCents = items.reduce(
    (sum, item) => sum + (parseCurrencyToCents(item.totalValue as any) || 0),
    0
  );

  /* máscara de valor ------------------------------------------- */
  const handleTotalValueChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    let value = e.target.value.replace(/\D/g, "");
    value = (Number(value) / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    setValue(`items.${idx}.totalValue`, value, { shouldValidate: true });
  };

  /* render -------------------------------------------------------------- */
  return (
    <div className="flex flex-col gap-3">
      {/* -------------------- LISTAGEM DE ITENS -------------------- */}
      <div
        className={cn(
          "flex flex-col gap-1 pr-1 border rounded border-sky-100 bg-white"
        )}
      >
        {/* Cabeçalho */}
        <div className="grid grid-cols-12 gap-2 px-1 bg-white sticky top-0 z-10 mt-3 ml-2">
          <div className="col-span-4 text-xs font-semibold text-sky-700 mb-1">
            Nome do item
          </div>
          <div className="col-span-2 text-xs font-semibold text-sky-700 mb-1">
            Qtd.
          </div>
          <div className="col-span-2 text-xs font-semibold text-sky-700 mb-1">
            Medida
          </div>
          <div className="col-span-3 text-xs font-semibold text-sky-700 mb-1">
            Valor Total
          </div>
          <div className="col-span-1" />
        </div>

        {/* Linhas */}
        {fields.map((field, idx) => (
          <div
            key={field.id}
            className="grid grid-cols-12 gap-2 items-end py-1 border-b border-sky-100 last:border-b-0 relative bg-white ml-2 mr-2"
          >
            {/* Nome do item */}
            <div className="col-span-4 flex flex-col">
              <ItemNameComboBox
                options={itemList}
                value={{
                  id: items[idx]?.id ?? null,
                  name: items[idx]?.name ?? "",
                }}
                onChange={(val: any) => {
                  setValue(`items.${idx}.name`, val.name, {
                    shouldValidate: true,
                  });
                  setValue(`items.${idx}.id`, val.id, { shouldValidate: true });
                  trigger(`items.${idx}.name`);
                }}
                placeholder="Nome do item"
              />
              <span className="text-xs text-red-500 min-h-[18px]">
                {getItemError("name", idx)}
              </span>
            </div>

            {/* Quantidade */}
            <div className="col-span-2 flex flex-col">
              <input
                type="number"
                min={0.01}
                step="0.01"
                {...register(`items.${idx}.quantity`, { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-sky-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-300 outline-none bg-sky-50 transition"
                placeholder="Qtd"
              />
              <span className="text-xs text-red-500 min-h-[18px]">
                {getItemError("quantity", idx)}
              </span>
            </div>

            {/* Unidade de Medida */}
            <div className="col-span-2 flex flex-col">
              <input
                type="text"
                {...register(`items.${idx}.unitOfMeasure`)}
                className="w-full px-3 py-2 border border-sky-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-300 outline-none bg-sky-50 transition"
                placeholder="Ex: un, kg"
              />
              <span className="text-xs text-red-500 min-h-[18px]">
                {getItemError("unitOfMeasure", idx)}
              </span>
            </div>

            {/* Valor Total */}
            <div className="col-span-3 flex flex-col">
              <input
                type="text"
                inputMode="numeric"
                {...register(`items.${idx}.totalValue`, {
                  onChange: (e) => handleTotalValueChange(e, idx),
                })}
                className="w-full px-3 py-2 border border-sky-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-300 outline-none bg-sky-50 transition"
                placeholder="R$ 0,00"
                // <-- MUDANÇA CRÍTICA: A propriedade 'value' foi removida daqui.
                // value={items[idx]?.totalValue || ""}
              />
              <span className="text-xs text-red-500 min-h-[18px]">
                {getItemError("totalValue", idx)}
              </span>
            </div>

            {/* Remover */}
            <div className="col-span-1 flex items-start justify-center h-full">
              <button
                type="button"
                className="text-red-500 hover:text-red-700 flex items-center justify-center hover:cursor-pointer"
                onClick={() => remove(idx)}
                title="Remover item"
                style={{ marginBottom: 0, height: 36 }}
              >
                <Trash2 size={18} />
              </button>
            </div>

            {/* Campo oculto para id */}
            <input type="hidden" {...register(`items.${idx}.id`)} />
          </div>
        ))}
      </div>

      {/* -------------------- ADICIONAR ITEM -------------------- */}
      <button
        type="button"
        className="flex items-center gap-1 text-sky-600 hover:text-sky-800 mt-1 font-semibold hover:cursor-pointer"
        onClick={() =>
          append({
            id: null,
            name: "",
            quantity: 1,
            totalValue: "",
            unitOfMeasure: "unidade",
          })
        }
      >
        <Plus size={18} /> Adicionar item
      </button>

      {/* -------------------- TOTAL -------------------- */}
      <div className="flex justify-end">
        <span className="inline-flex items-center rounded-md bg-sky-50 px-4 py-2 text-sky-700 font-bold shadow-sm">
          Valor total:&nbsp;
          {(totalCents / 100).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      </div>

      {/* erro geral de items */}
      <span className="text-xs text-red-500 min-h-[18px]">
        {typeof errors.items?.message === "string" ? errors.items?.message : ""}
      </span>
    </div>
  );
};
