import { useCreateExpensePopupContentController } from "./createExpensePopupContentController";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateExpenseFormValues,
  createExpenseSchema,
} from "../../schemas/create-expense-schema";
import { ComboBox } from "@components/combobox/Combobox";
import {
  formatAmount,
  getCurrentMonth,
  getCurrentYear,
} from "@common/utils/functions";
import { cn } from "@common/lib/utils";
import { useEffect } from "react";
import { showToast } from "@components/toast/Toast";
import { CreateExpensePopupSkeleton } from "@components/skeletons/create-expense-skeleton/CreateExpenseSkeleton";
import { useAuthStore } from "@common/store/authStore";
import { createExpenseMutation } from "@common/api/mutations/expense/createExpenseMutation";

export const CreateExpensePopupContent = () => {
  const userId = useAuthStore((state) => state.user?.userId);
  const { createExpenseFormData, isPending } =
    useCreateExpensePopupContentController();
  const { mutate: createExpenseMutate, isSuccess } = createExpenseMutation();
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
      userId: userId,
      subsectorId: undefined,
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setValue("description", "");
      showToast({
        title: "Despesa criada com sucesso!",
        description: "Sua despesa foi cadastrada.",
        type: "success",
      });
    }
  }, [isSuccess]);

  if (isPending) {
    return (
      <div className="flex justify-center items-center">
        <CreateExpensePopupSkeleton />
      </div>
    );
  }

  if (!createExpenseFormData) {
    return <>{/* FIXME: Criar componente de error */}</>;
  }

  const onSubmit = (data: CreateExpenseFormValues) => {
    data.amount = formatAmount(data.amount);
    createExpenseMutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* Fornecedor */}
      <ComboBox
        label="Fornecedor"
        options={createExpenseFormData.supplierList ?? []}
        value={watch("supplierId")}
        onChange={(id) => setValue("supplierId", id)}
        placeholder="Selecione o fornecedor"
      />

      {/* Valor + Descrição */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Valor (R$)
          </label>
          <input
            type="number"
            min={1}
            step={0.01}
            {...register("amount", { valueAsNumber: true })}
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:ring-1 focus:ring-sky-400 outline-none"
            placeholder="Valor"
          />
          {errors.amount && (
            <span className="text-xs text-red-500">
              {errors.amount.message}
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Descrição
          </label>
          <input
            {...register("description")}
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:ring-1 focus:ring-sky-400 outline-none"
            placeholder="Descrição da despesa"
          />
          {errors.description && (
            <span className="text-xs text-red-500">
              {errors.description.message}
            </span>
          )}
        </div>
      </div>

      {/* Mês + Ano */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Mês
          </label>
          <input
            type="number"
            min={1}
            max={12}
            {...register("month", { valueAsNumber: true })}
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:ring-1 focus:ring-sky-400 outline-none"
            placeholder="Mês"
          />
          {errors.month && (
            <span className="text-xs text-red-500">{errors.month.message}</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Ano
          </label>
          <input
            type="number"
            {...register("year")}
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:ring-1 focus:ring-sky-400 outline-none"
            placeholder="Ano"
            maxLength={4}
          />
          {errors.year && (
            <span className="text-xs text-red-500">{errors.year.message}</span>
          )}
        </div>
      </div>

      {/* Subsetor + Secretaria */}
      <div className="grid grid-cols-2 gap-3">
        <ComboBox
          label="Subsetor"
          options={createExpenseFormData.subSectorList}
          value={watch("subsectorId")}
          onChange={(id) => setValue("subsectorId", id)}
          placeholder="Selecione o subsetor"
        />
        <ComboBox
          label="Secretaria"
          options={createExpenseFormData.secretaryList}
          value={watch("secretaryId")}
          onChange={(id) => setValue("secretaryId", id)}
          placeholder="Selecione a secretaria"
        />
      </div>

      {/* Botão */}
      <button
        type="submit"
        className={cn(
          "mt-4 px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-colors text-sm",
          !!errors.description?.message
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer"
        )}
        disabled={isPending || !!errors.description?.message}
      >
        Cadastrar Despesa
      </button>
    </form>
  );
};
