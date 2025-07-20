import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getCurrentMonth,
  getCurrentYear,
  getErrorMessage,
} from "@/common/utils/functions";
import { useAuthStore } from "@/common/store/auth/authStore";
import { createExpenseMutation } from "@/common/api/mutations/expense/createExpenseMutation";
import { showToast } from "@/common/components/toast/Toast";
import { useCallback } from "react";
import { getCreateExpenseFormDataQuery } from "@/common/api/queries/expenses/getCreateExpenseFormDataQuery";
import {
  CreateExpenseFormValues,
  createExpenseSchema,
} from "../../schemas/create-expense-schema";

export const useExpenseCreationPageController = () => {
  /* ---------- queries (form data) ---------- */
  const {
    data: createExpenseFormData,
    isPending,
    refetch: refetchCreateExpenseFormDataQuery,
  } = getCreateExpenseFormDataQuery();

  /* ---------- form ---------- */
  const userId = useAuthStore((s) => s.user?.userId);
  const methods = useForm<CreateExpenseFormValues>({
    resolver: zodResolver(createExpenseSchema),
    defaultValues: {
      description: "",
      month: getCurrentMonth(),
      year: getCurrentYear(),
      supplierId: undefined,
      secretaryId: undefined,
      userId,
      subsectorId: undefined,
      items: [],
    },
    mode: "onChange",
  });
  const {
    formState: { errors, isValid, isSubmitting },
    setValue,
    watch,
    trigger,
  } = methods;

  /* ---------- mutation ---------- */
  const { mutateAsync: createExpenseMutate } = createExpenseMutation();

  const onSubmit = useCallback(
    async (data: CreateExpenseFormValues) => {
      try {
        await createExpenseMutate({
          month: data.month,
          year: data.year,
          description: data.description?.length ? data.description : null,
          supplierId: data.supplierId,
          secretaryId: data.secretaryId,
          userId: data.userId,
          subsectorId: data.subsectorId,
          items: data.items.map((item: any) => ({
            id: item.id ? item.id : null,
            name: item.name,
            quantity: item.quantity,
            unitValue: Number(String(item.unitValue).replace(/\D/g, "")),
          })),
        });

        /* limpa somente o necessário */
        setValue("items", []);
        setValue("description", "");
        refetchCreateExpenseFormDataQuery();

        showToast({
          title: "Despesa criada com sucesso!",
          description: "Sua despesa foi cadastrada.",
          type: "success",
        });
      } catch (err) {
        showToast({
          title: "Erro ao criar despesa",
          description: getErrorMessage(err),
          type: "error",
        });
      }
    },
    [createExpenseMutate, setValue, refetchCreateExpenseFormDataQuery]
  );

  return {
    /* view helpers */
    isPending,
    createExpenseFormData: createExpenseFormData?.data,
    methods: { ...methods, FormProvider },
    onSubmit,
    isValid,
    isSubmitting,
    watch,
    errors,
    setValue,
    trigger,
  };
};
