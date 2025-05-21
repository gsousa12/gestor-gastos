export function getCurrentMonth(): number {
  const now = new Date();
  return now.getMonth() + 1;
}

export function getCurrentYear(): string {
  const now = new Date();
  return now.getFullYear().toString();
}
