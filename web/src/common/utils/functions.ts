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

  // Verifica se a data é válida
  if (isNaN(data.getTime())) {
    return "Data inválida";
  }

  // Formata o dia com 2 dígitos
  const dia = String(data.getDate()).padStart(2, "0");

  // Formata o mês com 2 dígitos (janeiro é 0)
  const mes = String(data.getMonth() + 1).padStart(2, "0");

  // Obtém o ano
  const ano = data.getFullYear();

  // Formata as horas com 2 dígitos
  const horas = String(data.getHours()).padStart(2, "0");

  // Formata os minutos com 2 dígitos
  const minutos = String(data.getMinutes()).padStart(2, "0");

  return `${dia}/${mes}/${ano} às ${horas}:${minutos}`;
};
