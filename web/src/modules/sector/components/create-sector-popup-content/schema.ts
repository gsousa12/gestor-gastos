import { z } from "zod";

export const createSectorDefaultValues = {
  name: "",
  description: "",
};

const createSectorValidationMessages = {
  isString: "Campo inválido.",
  nameLength: "O nome deve ter entre 3 e 20 caracteres.",
  descriptionLength: "A descrição deve ter entre 3 e 30 caracteres.",
};

export const createSectorSchema = z.object({
  name: z
    .string({ required_error: "Nome é obrigatório." })
    .min(3, { message: createSectorValidationMessages.nameLength })
    .max(40, { message: createSectorValidationMessages.nameLength }),
  description: z
    .string()
    .min(3, { message: createSectorValidationMessages.descriptionLength })
    .max(30, { message: createSectorValidationMessages.descriptionLength })
    .optional()
    .or(z.literal("")),
});

export type CreateSectorFormValues = z.infer<typeof createSectorSchema>;
