// src/schemas/create-expense-schema.ts

import { z } from "zod";

// Schema para um item da despesa
export const expenseItemSchema = z.object({
  id: z.number().nullable(),
  name: z
    .string({ required_error: "O nome do item é obrigatório." })
    .min(1, { message: "Mínimo: 1 caractere." })
    .max(100, { message: "O nome do item deve ter no máximo 100 caracteres." }),
  quantity: z
    .number({ required_error: "A quantidade é obrigatória." })
    .int({ message: "A quantidade deve ser um número inteiro." })
    .min(1, { message: "A quantidade deve ser maior que zero." }),
  unitValue: z
    .string({ required_error: "O valor unitário é obrigatório." })
    .refine(
      (val) => {
        const cents = Number(val.replace(/\D/g, ""));
        return cents >= 100;
      },
      { message: "Mínimo: R$ 1,00." }
    ),
});

// Schema principal
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
  items: z
    .array(expenseItemSchema, {
      required_error: "Adicione pelo menos um item.",
    })
    .min(1, { message: "Adicione pelo menos um item." })
    .refine(
      (items) => {
        // Impede itens duplicados pelo nome (case-insensitive)
        const names = items.map((i) => i.name.trim().toLowerCase());
        return new Set(names).size === names.length;
      },
      { message: "Não é permitido itens duplicados pelo nome." }
    ),
});

export type CreateExpenseFormValues = z.infer<typeof createExpenseSchema>;
export type ExpenseItemFormValues = z.infer<typeof expenseItemSchema>;
