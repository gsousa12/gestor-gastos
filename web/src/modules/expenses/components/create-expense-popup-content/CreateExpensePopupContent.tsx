import { useCreateExpensePopupContentController } from "./createExpensePopupContentController";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateExpenseFormValues,
  createExpenseSchema,
} from "../../schemas/create-expense-schema";
import { ComboBox } from "../../../../common/components/combobox/Combobox";
import {
  getCurrentMonth,
  getCurrentYear,
} from "../../../../common/utils/functions";
import { useCreateExpense } from "../../../../common/hooks/expense/useCreateExpense";

export const CreateExpensePopupContent = () => {
  const { createExpenseFormData, isPending } =
    useCreateExpensePopupContentController();
  const { mutate: createExpenseMutation } = useCreateExpense();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateExpenseFormValues>({
    resolver: zodResolver(createExpenseSchema),
    defaultValues: {
      description: "",
      month: getCurrentMonth(),
      year: getCurrentYear(),
      amount: 100,
      supplierId: undefined,
      secretaryId: undefined,
      userId: 1, // mockado
      subsectorId: undefined,
    },
  });

  if (isPending || !createExpenseFormData) {
    return (
      <div className="flex justify-center items-center h-32">
        <span className="text-gray-400">Carregando dados...</span>
      </div>
    );
  }

  const onSubmit = (data: CreateExpenseFormValues) => {
    data.amount = data.amount * 100;
    createExpenseMutation(data);
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <div>
        <label className="block text-xs text-gray-700 mb-1">Descrição</label>
        <input
          {...register("description")}
          className="w-full px-2 py-1 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-teal-400 outline-none"
          placeholder="Descrição da despesa"
        />
        {errors.description && (
          <span className="text-xs text-red-500">
            {errors.description.message}
          </span>
        )}
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block text-xs text-gray-700 mb-1">Mês</label>
          <input
            type="number"
            min={1}
            max={12}
            {...register("month", { valueAsNumber: true })}
            className="w-full px-2 py-1 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-teal-400 outline-none"
            placeholder="Mês"
          />
          {errors.month && (
            <span className="text-xs text-red-500">{errors.month.message}</span>
          )}
        </div>
        <div className="flex-1">
          <label className="block text-xs text-gray-700 mb-1">Ano</label>
          <input
            {...register("year")}
            className="w-full px-2 py-1 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-teal-400 outline-none"
            placeholder="Ano"
            maxLength={4}
          />
          {errors.year && (
            <span className="text-xs text-red-500">{errors.year.message}</span>
          )}
        </div>
      </div>
      <div>
        <label className="block text-xs text-gray-700 mb-1">Valor (R$)</label>
        <input
          type="number"
          min={100}
          step={0.01}
          {...register("amount", { valueAsNumber: true })}
          className="w-full px-2 py-1 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-teal-400 outline-none"
          placeholder="Valor"
        />
        {errors.amount && (
          <span className="text-xs text-red-500">{errors.amount.message}</span>
        )}
      </div>
      <ComboBox
        label="Fornecedor"
        options={createExpenseFormData.supplierList ?? []}
        value={watch("supplierId")}
        onChange={(id) => setValue("supplierId", id)}
        placeholder="Selecione o fornecedor"
      />
      <ComboBox
        label="Secretaria"
        options={createExpenseFormData.secretaryList}
        value={watch("secretaryId")}
        onChange={(id) => setValue("secretaryId", id)}
        placeholder="Selecione a secretaria"
      />
      <ComboBox
        label="Subsetor"
        options={createExpenseFormData.subSectorList}
        value={watch("subsectorId")}
        onChange={(id) => setValue("subsectorId", id)}
        placeholder="Selecione o subsetor"
      />
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 hover:cursor-pointer transition-colors"
      >
        Cadastrar Despesa
      </button>
    </form>
  );
};
