import { isMobile } from "react-device-detect";
import { cn } from "../../../lib/utils";
import { SideBarGroupTitle } from "../sidebar-group-title/SideBarGroupTitle";
import { SidebarItem } from "../sidebar-item/SidebarItem";
import {
  LayoutGrid,
  GalleryVerticalEnd,
  Receipt,
  ArrowRightCircle,
} from "lucide-react";
import { useLocation } from "react-router-dom";
export const Sidebar = () => {
  const location = useLocation();
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-white text-gray-800 p-4",
        isMobile ? "w-20" : "w-64"
      )}
    >
      <div className="flex flex-col flex-grow">
        <div className="flex flex-row">
          {/* Logo temporaria */}
          <GalleryVerticalEnd />
          <div className="mr-5">Gestão de Gastos</div>
          {/* Icone de minimização do sidebar */}
          <span>v1.0</span>
        </div>
        {/* Div de agrupamento */}
        <div>
          <SideBarGroupTitle label="Geral" />
          <SidebarItem
            key={"Home"}
            icon={<LayoutGrid />}
            label={"Home"}
            routerLink={"/home"}
            isMobile={isMobile}
            active={location.pathname === "/home"}
          />
          <SidebarItem
            key={"Expenses"}
            icon={<Receipt />}
            label={"Despesas"}
            routerLink={"/expenses"}
            isMobile={isMobile}
            active={location.pathname === "/expenses"}
          />
          <SidebarItem
            key={"Payments"}
            icon={<ArrowRightCircle />}
            label={"Pagamentos"}
            routerLink={"/payments"}
            isMobile={isMobile}
            active={location.pathname === "/payments"}
          />
        </div>
      </div>
    </aside>
  );
};
