import { JSX } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../../lib/utils";

interface SidebarItemProps {
  icon: JSX.Element;
  label: string;
  routerLink: string;
  isMobile?: boolean;
  active?: boolean;
}

export const SidebarItem = ({
  icon,
  label,
  routerLink,
  isMobile,
  active,
}: SidebarItemProps) => {
  return (
    <Link to={routerLink}>
      <div
        className={cn(
          "flex flex-row",
          active ? "bg-teal-200 text-teal-700 " : ""
        )}
      >
        {icon}
        {!isMobile && <span>{label}</span>}
      </div>
    </Link>
  );
};
