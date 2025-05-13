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
