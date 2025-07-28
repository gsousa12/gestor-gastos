// src/features/dashboard/pages/dashboard-page-controller.ts

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getDashboardDataQuery } from "@common/api/queries/dashboard/getDashboardDataQuery";
import { getCurrentMonth, getCurrentYear } from "@common/utils/functions";
import { useAuthStore } from "@/common/store/auth/authStore";

export const getDashboardDataEmpty = {
  activeSuppliers: 0,
  expensesMonthSomatory: 0,
  paymentsMonthSomatory: 0,
  lastExpenses: [],
  supplierWithMostDebits: [],
};

// Filtros que são enviados para a API
type ApiFilterValues = {
  month: number;
  year: string;
  userId?: number;
};

// Valores que o formulário do popover manipula
export type FormFilterValues = {
  month: number;
  year: string;
  onlyMyExpenses: boolean;
};

export const dashboardPageController = () => {
  const navigate = useNavigate();
  const userIdFromStore = useAuthStore((state: any) => state.user?.userId);

  const initialApiFilters: ApiFilterValues = {
    month: getCurrentMonth(),
    year: getCurrentYear().toString(),
    userId: userIdFromStore ? userIdFromStore : undefined,
  };

  const initialFormFilters: FormFilterValues = {
    month: getCurrentMonth(),
    year: getCurrentYear().toString(),
    onlyMyExpenses: true,
  };

  // Estado dos filtros que a API consome
  const [apiFilters, setApiFilters] =
    useState<ApiFilterValues>(initialApiFilters);
  // Estado que representa os valores do formulário (para resetar/limpar)
  const [formFilters, setFormFilters] =
    useState<FormFilterValues>(initialFormFilters);

  // A query depende do estado `apiFilters`. Mudanças aqui disparam o refetch.
  const {
    data,
    isPending,
    refetch: refetchDashboardData,
  } = getDashboardDataQuery(apiFilters);

  // Aplica os filtros vindos do popover
  const applyFilters = (formValues: FormFilterValues) => {
    // Atualiza o estado do formulário para manter a consistência
    setFormFilters(formValues);
    // Atualiza o estado da API, o que dispara a chamada
    setApiFilters({
      month: formValues.month,
      year: formValues.year,
      userId: formValues.onlyMyExpenses ? userIdFromStore : undefined,
    });
  };

  // Limpa os filtros, resetando ambos os estados
  const clearFilters = () => {
    setApiFilters(initialApiFilters);
    setFormFilters(initialFormFilters);
  };

  return {
    dashboardData: data?.data ?? getDashboardDataEmpty,
    isPending,
    // Passa os filtros do formulário para o componente de UI
    filters: formFilters,
    // Passa os filtros da API para a UI poder exibir o mês/ano corretos
    activeApiFilters: apiFilters,
    applyFilters,
    clearFilters,
    refetchDashboardData,
    navigate,
  };
};
