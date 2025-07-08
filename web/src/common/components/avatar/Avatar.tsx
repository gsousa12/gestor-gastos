import { getUserInitials } from "@/common/utils/functions";

interface AvatarProps {
  name: string;
  size?: number; // px
}

export const Avatar = ({ name, size = 32 }: AvatarProps) => {
  const initials = getUserInitials(name);
  return (
    <div
      style={{ width: size, height: size }}
      className="flex shrink-0 items-center justify-center rounded-full bg-sky-600 text-white text-xs font-bold"
    >
      {initials}
    </div>
  );
};
