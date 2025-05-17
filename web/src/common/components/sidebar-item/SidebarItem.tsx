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
          "flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 group",
          active
            ? "bg-sky-100 text-sky-700 font-semibold shadow"
            : "hover:bg-sky-50 hover:text-sky-700 text-gray-700",
          isMobile ? "justify-center" : ""
        )}
      >
        <span
          className={cn(
            "w-6 h-6 flex items-center justify-center transition-colors duration-200",
            active ? "text-sky-600" : "text-gray-400 group-hover:text-sky-600"
          )}
        >
          {icon}
        </span>
        {!isMobile && <span className="truncate">{label}</span>}
      </div>
    </Link>
  );
};
