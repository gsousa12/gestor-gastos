import { z } from "zod";

export const createExpenseSchema = z.object({
  description: z
    .string({ required_error: "A descrição é obrigatória." })
    .min(3, { message: "A descrição deve ter pelo menos 3 caracteres." })
    .max(50, { message: "A descrição deve ter no máximo 50 caracteres." }),
  month: z
    .number({
      required_error: "O mês é obrigatório.",
      invalid_type_error: "O mês deve ser um número.",
    })
    .min(1, { message: "O mês deve ser entre 1 e 12." })
    .max(12, { message: "O mês deve ser entre 1 e 12." }),
  year: z
    .string({ required_error: "O ano é obrigatório." })
    .length(4, { message: "O ano deve ter 4 dígitos." }),
  amount: z
    .number({
      required_error: "O valor é obrigatório.",
      invalid_type_error: "O valor deve ser um número.",
    })
    .min(1, { message: "O valor deve ser no mínimo 1." }),
  supplierId: z.number({
    required_error: "O fornecedor é obrigatório.",
    invalid_type_error: "Selecione um fornecedor válido.",
  }),
  secretaryId: z.number({
    required_error: "A secretaria é obrigatória.",
    invalid_type_error: "Selecione uma secretaria válida.",
  }),
  userId: z.number({
    required_error: "O usuário é obrigatório.",
    invalid_type_error: "Usuário inválido.",
  }),
  subsectorId: z.number({
    required_error: "O subsetor é obrigatório.",
    invalid_type_error: "Selecione um subsetor válido.",
  }),
});

export type CreateExpenseFormValues = z.infer<typeof createExpenseSchema>;
