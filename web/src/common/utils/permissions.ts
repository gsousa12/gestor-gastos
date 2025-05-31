export enum UserRole {
  ADMINISTRADOR = "administrador",
  AUXILIAR = "auxiliar",
}

export const ROLE_PERMISSIONS: Record<UserRole, Set<UserSystemActions>> = {
  [UserRole.ADMINISTRADOR]: new Set(["generate_report"]),
  [UserRole.AUXILIAR]: new Set(["create_expense"]),
};

export type UserSystemActions =
  | "generate_report"
  | "register_payment"
  | "create_expense"
  | "cancel_payment";
