import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Plus } from "lucide-react";

import { cn } from "@/common/lib/utils";
import { Input } from "@/common/components/ui/input";
import { Button } from "@/common/components/ui/button";
import { showToast } from "@/common/components/toast/Toast";
import { getErrorMessage } from "@/common/utils/functions";
import { useCreateSecretaryController } from "./create-secretary-controller";

const validationMessages = {
  isString: "Campo inválido.",
  nameLength: "O nome deve ter entre 3 e 50 caracteres.",
};

const schema = z.object({
  name: z
    .string({ required_error: "Nome é obrigatório." })
    .min(3, { message: validationMessages.nameLength })
    .max(50, { message: validationMessages.nameLength }),
});

type FormValues = z.infer<typeof schema>;

interface CreateSecretaryPopupContentProps {
  handleRefetchSecretaryListData: () => void;
}

export const CreateSecretaryPopupContent = ({
  handleRefetchSecretaryListData,
}: CreateSecretaryPopupContentProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  const { createSecretaryMutate } = useCreateSecretaryController();

  const onSubmit = async (data: FormValues) => {
    try {
      await createSecretaryMutate({
        name: data.name.trim(),
      });
      reset();
      handleRefetchSecretaryListData();
      showToast({
        title: "Secretaria cadastrada com sucesso!",
        description: `Secretaria "${data.name}" foi adicionada.`,
        type: "success",
      });
    } catch (error) {
      reset();
      handleRefetchSecretaryListData();
      showToast({
        title: "Erro ao cadastrar secretaria",
        description: getErrorMessage(error),
        type: "error",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full py-2"
      autoComplete="off"
    >
      <div>
        <label className="flex items-center gap-2 text-sky-700 font-medium mb-1">
          <User className="w-4 h-4" />
          Nome*
        </label>
        <Input
          {...register("name")}
          placeholder="Nome da secretaria"
          className={cn(
            "border-sky-300 focus:border-sky-500",
            errors.name && "border-red-400"
          )}
        />
        <div
          className={cn(
            "min-h-[18px] text-xs text-red-500 transition-all",
            errors.name ? "opacity-100" : "opacity-0"
          )}
        >
          {errors.name?.message || " "}
        </div>
      </div>

      <Button
        type="submit"
        className="bg-sky-500 hover:bg-sky-600 text-white font-semibold flex items-center gap-2 mt-2 cursor-pointer"
        disabled={isSubmitting}
      >
        <Plus className="w-4 h-4" />
        Cadastrar secretaria
      </Button>
    </form>
  );
};
