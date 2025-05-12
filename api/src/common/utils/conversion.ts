export const getMonthName = (month: number): string => {
  const monthNames: Record<number, string> = {
    1: 'Janeiro',
    2: 'Fevereiro',
    3: 'Março',
    4: 'Abril',
    5: 'Maio',
    6: 'Junho',
    7: 'Julho',
    8: 'Agosto',
    9: 'Setembro',
    10: 'Outubro',
    11: 'Novembro',
    12: 'Dezembro',
  };

  return monthNames[month] || '';
};

export const convertCentsToReal = (cents: number): number => {
  return cents / 100;
};
