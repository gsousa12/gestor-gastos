export const getUserInitials = (name: string) => {
  if (!name || typeof name !== "string") return "US";
  return name
    .split(" ")
    .filter(Boolean)
    .map((name) => name[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export const convertCentsToReal = (cents: number): string => {
  const reais = cents / 100;
  return reais.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const getMonthName = (month: number): string => {
  const monthNames: Record<number, string> = {
    1: "Janeiro",
    2: "Fevereiro",
    3: "Março",
    4: "Abril",
    5: "Maio",
    6: "Junho",
    7: "Julho",
    8: "Agosto",
    9: "Setembro",
    10: "Outubro",
    11: "Novembro",
    12: "Dezembro",
  };

  return monthNames[month] || "";
};

export const getCurrentMonth = (): number => {
  const currentDate = new Date();
  const month = currentDate.getMonth();
  return month + 1;
};

export const getCurrentYear = (): string => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  return year.toString();
};

export const formatAmount = (amount: number): number => {
  return amount * 100;
};

export const formatExpenseStatus = (status: string): string => {
  switch (status) {
    case "pendente":
      return "Pendente";
    case "pago":
      return "Pago";
    default:
      return status;
  }
};

export const formatPaymentStatus = (status: string): string => {
  switch (status) {
    case "cancelado":
      return "Cancelado";
    case "ativo":
      return "Ativo";
    default:
      return status;
  }
};

export const getAccost = (): string => {
  const currentHour = new Date().getHours();
  if (currentHour >= 6 && currentHour < 12) {
    return "Bom dia";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "Boa tarde";
  } else {
    return "Boa noite";
  }
};

export const formatDateAndHoursToPTBR = (dataISO: string): string => {
  const data = new Date(dataISO);

  if (isNaN(data.getTime())) {
    return "-";
  }

  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();
  const horas = String(data.getHours()).padStart(2, "0");
  const minutos = String(data.getMinutes()).padStart(2, "0");

  return `${dia}/${mes}/${ano} às ${horas}:${minutos}`;
};

export const formatTaxId = (taxId: string | null): string => {
  if (taxId === null || taxId === undefined) return "-";

  const cleaned = taxId.replace(/\D/g, "");

  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  if (cleaned.length === 14) {
    return cleaned.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );
  }

  return taxId;
};
