import { useRegisterExpensePaymentController } from "./register-expense-payment-controller";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/common/components/ui/tabs";

import { Button } from "@/common/components/ui/button";
import {
  BadgeCheck,
  Calendar,
  FileText,
  User,
  Truck,
  Landmark,
  Layers2,
  Info,
  DollarSign,
  Building,
} from "lucide-react";

import { useMobileDetect } from "@/common/hooks/useMobileDetect";
import {
  convertCentsToReal,
  formatExpenseStatus,
  getMonthName,
} from "@/common/utils/functions";
import { Input } from "@/common/components/ui/input";
import { cn } from "@/common/lib/utils";
import { showToast } from "@/common/components/toast/Toast";

const paymentSchema = z.object({
  amount: z
    .string()
    .min(1, "Informe o valor do pagamento")
    .refine((val) => {
      const num = Number(val.replace(/\D/g, ""));
      return num > 0;
    }, "O valor deve ser maior que zero"),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

interface RegisterExpensePaymentContentProps {
  selectedId: number | null;
  refreshExpenseTable: () => void;
  onClosePopup: () => void;
}

export const RegisterExpensePaymentContent = ({
  selectedId,
  refreshExpenseTable,
  onClosePopup,
}: RegisterExpensePaymentContentProps) => {
  const isMobile = useMobileDetect();
  const { expenseDetailsData, createPaymentMutate } =
    useRegisterExpensePaymentController(selectedId);

  const expenseIdToDispatch = expenseDetailsData?.id;
  // RHF + Zod
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: { amount: "" },
  });

  // Valor digitado (string com máscara)
  const watchedAmount = watch("amount");
  // Valor em centavos
  const paymentCents = Number(watchedAmount.replace(/\D/g, "")) || 0;
  const expenseCents = expenseDetailsData?.amount || 0;
  const diff = paymentCents - expenseCents;

  // Máscara de moeda
  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value.replace(/\D/g, "");
    value = (Number(value) / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    e.target.value = value;
    // Atualiza o valor no RHF
    register("amount").onChange(e);
  }

  const onSubmit = async (data: PaymentFormValues) => {
    try {
      await createPaymentMutate({
        expenseId: expenseIdToDispatch,
        amount: Number(data.amount.replace(/\D/g, "")),
      });
      refreshExpenseTable();
      showToast({
        title: "Pagamento registrado com sucesso!",
        description: `Pagamento de ${data.amount} registrado para a despesa ID ${expenseIdToDispatch}.`,
        type: "success",
      });
      onClosePopup();
    } catch (error) {}
  };

  if (!expenseDetailsData) {
    return (
      <div className="text-gray-400 italic text-center py-8">
        Nenhuma despesa selecionada.
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col gap-4 ${isMobile ? "text-sm" : "text-base"}`}
    >
      <Tabs defaultValue="despesa" className="w-full">
        <TabsList className="w-full flex ">
          <TabsTrigger
            value="despesa"
            className="flex-1 hover:cursor-pointer hover:bg-gray-200"
          >
            Despesa
          </TabsTrigger>
          <TabsTrigger
            value="vinculos"
            className="flex-1 hover:cursor-pointer hover:bg-gray-200"
          >
            Vínculos
          </TabsTrigger>
        </TabsList>
        <TabsContent value="despesa">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 py-2">
            <DetailRow
              icon={<FileText className="w-4 h-4 text-sky-500" />}
              label="ID"
              value={expenseDetailsData.id}
            />
            <DetailRow
              icon={<Info className="w-4 h-4 text-sky-500" />}
              label="Descrição"
              value={expenseDetailsData.description}
            />
            <DetailRow
              icon={<Calendar className="w-4 h-4 text-sky-500" />}
              label="Competência"
              value={`${getMonthName(expenseDetailsData.month)}/${
                expenseDetailsData.year
              }`}
            />
            <DetailRow
              icon={<DollarSign className="w-4 h-4 text-sky-500" />}
              label="Valor"
              value={`R$ ${convertCentsToReal(expenseDetailsData.amount)}`}
            />
            <DetailRow
              icon={<BadgeCheck className="w-4 h-4 text-sky-500" />}
              label="Status"
              value={formatExpenseStatus(expenseDetailsData.status)}
            />
            <DetailRow
              icon={<Calendar className="w-4 h-4 text-sky-500" />}
              label="Criado em"
              value={new Date(expenseDetailsData.createdAt).toLocaleDateString(
                "pt-BR"
              )}
            />
          </div>
        </TabsContent>
        <TabsContent value="vinculos">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 py-2">
            <DetailRow
              icon={<Truck className="w-4 h-4 text-sky-500" />}
              label="Fornecedor"
              value={expenseDetailsData.supplier?.name}
            />
            <DetailRow
              icon={<Landmark className="w-4 h-4 text-sky-500" />}
              label="Empresa"
              value={expenseDetailsData.supplier?.companyName}
            />
            <DetailRow
              icon={<Building className="w-4 h-4 text-sky-500" />}
              label="Secretaria"
              value={expenseDetailsData.secretary?.name}
            />
            <DetailRow
              icon={<User className="w-4 h-4 text-sky-500" />}
              label="Criado por"
              value={expenseDetailsData.user?.name}
            />
            <DetailRow
              icon={<Layers2 className="w-4 h-4 text-sky-500" />}
              label="Sub-setor"
              value={expenseDetailsData.subsector?.name}
            />
          </div>
        </TabsContent>
      </Tabs>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 mt-2"
      >
        <label className="font-medium flex items-center gap-2 text-sky-700">
          <DollarSign className="w-4 h-4" />
          Valor do pagamento
        </label>
        <Input
          {...register("amount")}
          onChange={handleAmountChange}
          placeholder="R$ 0,00"
          inputMode="numeric"
          className="w-full"
        />
        {errors.amount && (
          <span className="text-red-500 text-xs">{errors.amount.message}</span>
        )}

        <PaymentDiffMessage diff={diff} expenseAmount={expenseCents} />

        <Button
          type="submit"
          className={cn(
            "mt-4 px-6 py-3 bg-gradient-to-r from-sky-500 to-sky-400 text-white font-semibold rounded-lg shadow-md hover:from-sky-600 hover:to-sky-500 transition-all text-base flex items-center justify-center gap-2",
            !!errors.amount?.message
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer"
          )}
        >
          Registrar Pagamento
        </Button>
      </form>
    </div>
  );
};

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 border-b border-gray-100 py-1">
      {icon}
      <span className="text-gray-500">{label}:</span>
      <span
        className="font-medium text-gray-700 truncate"
        title={value?.toString() || ""}
      >
        {value ?? <span className="italic text-gray-400">-</span>}
      </span>
    </div>
  );
}

function PaymentDiffMessage({
  diff,
  expenseAmount,
}: {
  diff: number;
  expenseAmount: number;
}) {
  if (diff === 0) return null;
  const abs = Math.abs(diff);
  const color = diff < 0 ? "text-yellow-600" : "text-green-600";
  const text =
    diff < 0
      ? `Com esse pagamento o débito com o fornecedor aumenta em R$ ${convertCentsToReal(
          abs
        )}`
      : `Com esse pagamento o débito com o fornecedor diminui em R$ ${convertCentsToReal(
          abs
        )}`;
  return (
    <div className={`text-xs font-medium ${color} flex items-center gap-1`}>
      {abs !== expenseAmount ? <DollarSign className="w-4 h-4" /> : <></>}
      {abs !== expenseAmount ? text : ""}
    </div>
  );
}
