import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  Building2,
  IdCard,
  Mail,
  Phone,
  Plus,
  DollarSign,
} from "lucide-react";
import { useState } from "react";
import { Input } from "@/common/components/ui/input";
import { Button } from "@/common/components/ui/button";
import { useCreateSupplierController } from "./create-supplier-controller";
import { showToast } from "@/common/components/toast/Toast";
import { getErrorMessage } from "@/common/utils/functions";

// Mensagens customizadas
const validationMessages = {
  isString: "Campo inválido.",
  Length: "Deve ter entre 3 e 30 caracteres.",
  taxId: "CPF ou CNPJ inválido.",
  isEmail: "E-mail inválido.",
};

const validateTaxIdRegex = /^(\d{11}|\d{14})$/;

const schema = z.object({
  name: z
    .string({ required_error: "Nome é obrigatório." })
    .min(3, { message: validationMessages.Length })
    .max(30, { message: validationMessages.Length }),
  companyName: z
    .string()
    .min(3, { message: validationMessages.Length })
    .max(30, { message: validationMessages.Length })
    .optional()
    .or(z.literal("")),
  taxId: z
    .string()
    .optional()
    .refine((val) => !val || validateTaxIdRegex.test(val.replace(/\D/g, "")), {
      message: validationMessages.taxId,
    })
    .or(z.literal("")),
  contactEmail: z
    .string()
    .email({ message: validationMessages.isEmail })
    .optional()
    .or(z.literal("")),
  contactPhone: z.string().optional().or(z.literal("")),
  recurringDebit: z.string().refine((val) => {
    const num = Number(val.replace(/\D/g, ""));
    return num >= 0;
  }, "O valor deve ser maior que zero"),
});

type FormValues = z.infer<typeof schema>;

// Função para aplicar máscara dinâmica
function formatTaxId(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length <= 11) {
    // CPF: 000.000.000-00
    return digits
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1-$2")
      .slice(0, 14);
  } else {
    // CNPJ: 00.000.000/0000-00
    return digits
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .slice(0, 18);
  }
}
interface CreateSupplierPopupContentProps {
  refreshSupplierList: () => void;
}
export const CreateSupplierPopupContent = ({
  refreshSupplierList,
}: CreateSupplierPopupContentProps) => {
  const { createSupplierMutate } = useCreateSupplierController();
  const [taxIdValue, setTaxIdValue] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      companyName: "",
      taxId: "",
      contactEmail: "",
      contactPhone: "",
      recurringDebit: "",
    },
  });

  // Atualiza máscara do taxId
  const handleTaxIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatTaxId(e.target.value);
    setTaxIdValue(formatted);
    setValue("taxId", formatted, { shouldValidate: true });
  };

  const onSubmit = async (data: FormValues) => {
    try {
      await createSupplierMutate({
        name: data.name,
        companyName: data.companyName ? data.companyName.trim() : null,
        taxId: data.taxId ? data.taxId.replace(/\D/g, "") : null,
        contactEmail: data.contactEmail ? data.contactEmail.trim() : null,
        contactPhone: data.contactPhone
          ? data.contactPhone.replace(/\D/g, "")
          : null,
        recurringDebit:
          Number(data.recurringDebit.replace(/\D/g, "")) < 100
            ? 0
            : Number(data.recurringDebit.replace(/\D/g, "")),
      });
      reset();
      setTaxIdValue("");
      refreshSupplierList();
      showToast({
        title: "Fornecedor cadastrado!",
        description: "Fornecedor cadastrado com sucesso.",
        type: "success",
      });
    } catch (error) {
      showToast({
        title: "Erro ao cadastrar fornecedor!",
        description: getErrorMessage(error),
        type: "error",
      });
      setValue("name", "");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full "
    >
      <div>
        <label className="flex items-center gap-2 text-sky-700 font-medium mb-1">
          <User className="w-4 h-4" />
          Nome*
        </label>
        <Input
          {...register("name")}
          placeholder="Nome do fornecedor"
          className="border-sky-300 focus:border-sky-500"
        />
        {errors.name && (
          <span className="text-red-500 text-xs">{errors.name.message}</span>
        )}
      </div>

      <div>
        <label className="flex items-center gap-2 text-sky-700 font-medium mb-1">
          <DollarSign className="w-4 h-4" />
          Débito Recorrente
        </label>
        <Input
          type="text"
          inputMode="numeric"
          {...register("recurringDebit", {
            onChange: (e) => {
              let value = e.target.value.replace(/\D/g, "");
              value = (Number(value) / 100).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              });
              e.target.value = value;
              setValue("recurringDebit", value, { shouldValidate: true });
            },
          })}
          placeholder="Caso o fornecedor já tenho débito em aberto (opcional)"
          className="border-sky-300 focus:border-sky-500"
        />
        {errors.recurringDebit && (
          <span className="text-red-500 text-xs">
            {errors.recurringDebit?.message}
          </span>
        )}
      </div>

      <div>
        <label className="flex items-center gap-2 text-sky-700 font-medium mb-1">
          <Building2 className="w-4 h-4" />
          Razão Social
        </label>
        <Input
          {...register("companyName")}
          placeholder="Razão social (opcional)"
          className="border-sky-300 focus:border-sky-500"
        />
        {errors.companyName && (
          <span className="text-red-500 text-xs">
            {errors.companyName.message}
          </span>
        )}
      </div>

      <div>
        <label className="flex items-center gap-2 text-sky-700 font-medium mb-1">
          <IdCard className="w-4 h-4" />
          CPF ou CNPJ
        </label>
        <Input
          value={taxIdValue}
          onChange={handleTaxIdChange}
          placeholder="CPF ou CNPJ (opcional)"
          className="border-sky-300 focus:border-sky-500"
          maxLength={18}
        />
        {errors.taxId && (
          <span className="text-red-500 text-xs">{errors.taxId.message}</span>
        )}
      </div>

      <div>
        <label className="flex items-center gap-2 text-sky-700 font-medium mb-1">
          <Mail className="w-4 h-4" />
          E-mail
        </label>
        <Input
          {...register("contactEmail")}
          placeholder="E-mail de contato (opcional)"
          className="border-sky-300 focus:border-sky-500"
        />
        {errors.contactEmail && (
          <span className="text-red-500 text-xs">
            {errors.contactEmail.message}
          </span>
        )}
      </div>

      <div>
        <label className="flex items-center gap-2 text-sky-700 font-medium mb-1">
          <Phone className="w-4 h-4" />
          Telefone
        </label>
        <Input
          type="tel"
          {...register("contactPhone")}
          placeholder="Telefone de contato (opcional)"
          className="border-sky-300 focus:border-sky-500"
        />
        {errors.contactPhone && (
          <span className="text-red-500 text-xs">
            {errors.contactPhone.message}
          </span>
        )}
      </div>

      <Button
        type="submit"
        className="bg-sky-500 hover:bg-sky-600 hover:cursor-pointer text-white font-semibold flex items-center gap-2 mt-2"
        disabled={isSubmitting}
      >
        <Plus className="w-4 h-4" />
        Cadastrar fornecedor
      </Button>
    </form>
  );
};
