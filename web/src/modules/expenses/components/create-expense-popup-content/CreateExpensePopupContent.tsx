import { useCreateExpensePopupContentController } from "./createExpensePopupContentController";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateExpenseFormValues,
  createExpenseSchema,
} from "../../schemas/create-expense-schema";
import { ComboBox } from "@components/combobox/Combobox";
import {
  getCurrentMonth,
  getCurrentYear,
  getErrorMessage,
} from "@common/utils/functions";
import { cn } from "@common/lib/utils";
import { showToast } from "@components/toast/Toast";
import { CreateExpensePopupSkeleton } from "@components/skeletons/create-expense-skeleton/CreateExpenseSkeleton";
import { useAuthStore } from "@common/store/authStore";
import { createExpenseMutation } from "@common/api/mutations/expense/createExpenseMutation";
import {
  Building,
  Calendar,
  DollarSign,
  Info,
  Layers2,
  Truck,
} from "lucide-react";

interface CreateExpensePopupContentProps {
  onRefetchExpenseList: () => void;
}

export const CreateExpensePopupContent = ({
  onRefetchExpenseList,
}: CreateExpensePopupContentProps) => {
  const userId = useAuthStore((state) => state.user?.userId);
  const { createExpenseFormData, isPending } =
    useCreateExpensePopupContentController();
  const { mutateAsync: createExpenseMutate } = createExpenseMutation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    trigger,
  } = useForm<CreateExpenseFormValues>({
    resolver: zodResolver(createExpenseSchema),
    defaultValues: {
      description: "",
      month: getCurrentMonth(),
      year: getCurrentYear(),
      amount: "",
      supplierId: undefined,
      secretaryId: undefined,
      userId: userId,
      subsectorId: undefined,
    },
  });

  const validateComboBox = async (field: keyof CreateExpenseFormValues) => {
    await trigger(field);
  };

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

  const onSubmit = async (data: CreateExpenseFormValues) => {
    try {
      const amountCents = Number(data.amount.replace(/\D/g, ""));
      await createExpenseMutate({
        month: data.month,
        year: data.year,
        description: data.description?.length ? data.description : null,
        amount: amountCents,
        supplierId: data.supplierId,
        secretaryId: data.secretaryId,
        userId: data.userId,
        subsectorId: data.subsectorId,
      });
      setValue("description", "");
      showToast({
        title: "Despesa criada com sucesso!",
        description: "Sua despesa foi cadastrada.",
        type: "success",
      });
      onRefetchExpenseList();
    } catch (error) {
      showToast({
        title: "Erro ao criar despesa",
        description: getErrorMessage(error),
        type: "error",
      });
    }
  };

  return (
    <div className="max-w-lg w-full overflow-hidden">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 px-2"
      >
        {/* Fornecedor */}
        <div>
          <ComboBox
            label="Fornecedor"
            options={createExpenseFormData.supplierList ?? []}
            value={watch("supplierId")}
            onChange={(id) => {
              setValue("supplierId", id, { shouldValidate: true });
              validateComboBox("supplierId");
            }}
            placeholder="Selecione o fornecedor"
            icon={<Truck className="h-4 w-4" />}
          />
          <div className="min-h-[18px] text-xs text-red-500">
            {errors.supplierId?.message === "Required" ||
            errors.supplierId?.message === "Selecione um fornecedor válido."
              ? "Selecione um valor válido."
              : errors.supplierId?.message || " "}
          </div>
        </div>

        {/* Subsetor */}
        <div>
          <ComboBox
            label="Subsetor"
            options={createExpenseFormData.subSectorList}
            value={watch("subsectorId")}
            onChange={(id) => {
              setValue("subsectorId", id, { shouldValidate: true });
              validateComboBox("subsectorId");
            }}
            placeholder="Selecione o subsetor"
            icon={<Layers2 className="h-4 w-4" />}
          />
          <div className="min-h-[18px] text-xs text-red-500">
            {errors.subsectorId?.message === "Required" ||
            errors.subsectorId?.message === "Selecione um subsetor válido."
              ? "Selecione um valor válido."
              : errors.subsectorId?.message || " "}
          </div>
        </div>

        {/* Secretaria */}
        <div>
          <ComboBox
            label="Secretaria"
            options={createExpenseFormData.secretaryList}
            value={watch("secretaryId")}
            onChange={(id) => {
              setValue("secretaryId", id, { shouldValidate: true });
              validateComboBox("secretaryId");
            }}
            placeholder="Selecione a secretaria"
            icon={<Building className="h-4 w-4" />}
          />
          <div className="min-h-[18px] text-xs text-red-500">
            {errors.secretaryId?.message === "Required" ||
            errors.secretaryId?.message === "Selecione uma secretaria válida."
              ? "Selecione um valor válido."
              : errors.secretaryId?.message || " "}
          </div>
        </div>

        {/* Valor + Descrição */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center text-sm font-semibold text-sky-700 mb-1">
              <DollarSign className="h-4 w-4 mr-1" />
              Valor (R$)
            </label>
            <div className="relative">
              <input
                type="text"
                inputMode="numeric"
                placeholder="R$ 0,00"
                className="w-full px-4 py-2 border border-sky-100 rounded-lg text-sm focus:ring-2 
                focus:ring-sky-300 outline-none bg-sky-50 transition"
                {...register("amount", {
                  onChange: (e) => {
                    let value = e.target.value.replace(/\D/g, "");
                    value = (Number(value) / 100).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    });
                    e.target.value = value;
                    setValue("amount", value, { shouldValidate: true });
                  },
                })}
                value={watch("amount")}
              />
            </div>
            <div className="min-h-[18px] text-xs text-red-500">
              {errors.amount?.message || " "}
            </div>
          </div>
          <div>
            <label className="flex items-center text-sm font-semibold text-sky-700 mb-1">
              <Info className="h-4 w-4 mr-1" />
              Descrição
            </label>
            <input
              {...register("description")}
              className="w-full px-4 py-2 border border-sky-100 rounded-lg text-sm focus:ring-2
               focus:ring-sky-300 outline-none bg-sky-50 transition"
              placeholder="Descrição da despesa"
            />
            <div className="min-h-[18px] text-xs text-red-500">
              {errors.description?.message || " "}
            </div>
          </div>
        </div>

        {/* Mês + Ano */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center text-sm font-semibold text-sky-700 mb-1">
              <Calendar className="h-4 w-4 mr-1" />
              Mês
            </label>
            <input
              type="number"
              min={1}
              max={12}
              {...register("month", { valueAsNumber: true })}
              className="w-full px-4 py-2 border border-sky-100 rounded-lg 
              text-sm focus:ring-2 focus:ring-sky-300 outline-none bg-sky-50 transition"
              placeholder="Mês"
            />
            <div className="min-h-[18px] text-xs text-red-500">
              {errors.month?.message || " "}
            </div>
          </div>
          <div>
            <label className="flex items-center text-sm font-semibold text-sky-700 mb-1">
              <Calendar className="h-4 w-4 mr-1" />
              Ano
            </label>
            <input
              type="number"
              {...register("year")}
              className="w-full px-4 py-2 border border-sky-100 rounded-lg text-sm focus:ring-2
               focus:ring-sky-300 outline-none bg-sky-50 transition"
              placeholder="Ano"
              maxLength={4}
            />
            <div className="min-h-[18px] text-xs text-red-500">
              {errors.year?.message || " "}
            </div>
          </div>
        </div>

        {/* Botão */}
        <button
          type="submit"
          className={cn(
            "mt-4 px-6 py-3 bg-gradient-to-r from-sky-500 to-sky-400 text-white font-semibold rounded-lg shadow-md hover:from-sky-600 hover:to-sky-500 transition-all text-base flex items-center justify-center gap-2",
            !!errors.description?.message ||
              !!errors.amount?.message ||
              isPending
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer"
          )}
          disabled={isPending || !!errors.description?.message}
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Cadastrar Despesa
        </button>
      </form>
    </div>
  );
};
