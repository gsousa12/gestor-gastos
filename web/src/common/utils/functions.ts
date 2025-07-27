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

export const getErrorMessage = (error: unknown): string => {
  if (
    typeof error === "object" &&
    error !== null &&
    "isAxiosError" in error &&
    (error as any).isAxiosError &&
    "response" in error &&
    (error as any).response &&
    typeof (error as any).response === "object" &&
    "data" in (error as any).response &&
    (error as any).response.data &&
    typeof (error as any).response.data === "object"
  ) {
    const message = (error as any).response.data.message;
    if (Array.isArray(message)) {
      return (
        message[0] ||
        "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde."
      );
    }
    if (typeof message === "string") {
      return message;
    }
  }
  return "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.";
};

export const getErrorMessageFromAxiosBlob = async (
  error: any
): Promise<string> => {
  try {
    if (error && error.response && error.response.data instanceof Blob) {
      const text = await error.response.data.text();
      const json = JSON.parse(text);

      if (Array.isArray(json.message)) {
        return (
          json.message[0] ||
          "Ocorreu um erro inesperado. Por favor, tente novamente."
        );
      }
      if (typeof json.message === "string") {
        return json.message;
      }
    }
  } catch {}
  return "Ocorreu um erro inesperado. Por favor, tente novamente.";
};

export const formatCurrentDate = () => {
  const date = new Date();
  const dias = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];
  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  return `${dias[date.getDay()]}, ${date.getDate()} de ${
    meses[date.getMonth()]
  } de ${date.getFullYear()}`;
};

export const formatNumber = (value: number | null | undefined): string => {
  // Retorna um hífen se o valor for nulo, indefinido ou não for um número
  if (value === null || value === undefined || isNaN(value)) {
    return "-";
  }

  // Cria um formatador para o locale 'pt-BR'
  const formatter = new Intl.NumberFormat("pt-BR", {
    // Define o número máximo de casas decimais a serem exibidas.
    // Ideal para quantidades que podem ser fracionadas (ex: 1,5 kg).
    maximumFractionDigits: 3,
  });

  return formatter.format(value);
};
