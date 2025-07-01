import { cn } from "../../lib/utils";
import { SideBarGroupTitle } from "../sidebar-group-title/SideBarGroupTitle";
import { SidebarItem } from "../sidebar-item/SidebarItem";
import {
  LayoutGrid,
  GalleryVerticalEnd,
  Receipt,
  ArrowRightCircle,
  Truck,
  Layers2,
  Building,
  FileChartColumn,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import { useMobileDetect } from "../../hooks/useMobileDetect";

export const Sidebar = () => {
  const location = useLocation();
  const isMobile = useMobileDetect();
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-white transition-all duration-300 z-30 border-r border-gray-200 shadow-sm",
        isMobile ? "w-20 px-2" : "w-64 px-4"
      )}
    >
      <div className="flex flex-col flex-grow">
        <div
          className={cn(
            "flex items-center gap-3 py-6 transition-all duration-300",
            isMobile ? "justify-center" : "justify-between"
          )}
        >
          <GalleryVerticalEnd className="w-8 h-8 text-sky-600" />
          {!isMobile && (
            <>
              <span className="text-lg font-bold text-gray-800 tracking-tight">
                Gestão de Gastos
              </span>
              <span className="text-[9px] text-gray-400 font-semibold ml-auto">
                v{import.meta.env.VITE_APP_VERSION}
              </span>
            </>
          )}
        </div>
        <div className="flex flex-col gap-2">
          {!isMobile && <SideBarGroupTitle label="Geral" />}
          <SidebarItem
            key={"Dashboard"}
            icon={<LayoutGrid />}
            label={"Dashboard"}
            routerLink={"/dashboard"}
            isMobile={isMobile}
            active={location.pathname === "/dashboard"}
          />
          {/* <SidebarItem
            key={"Reports"}
            icon={<FileText />}
            label={"Relatórios"}
            routerLink={"/reports"}
            isMobile={isMobile}
            active={location.pathname === "/reports"}
          /> */}
        </div>
        <div className="flex flex-col gap-2">
          {!isMobile && <SideBarGroupTitle label="Movimentações" />}
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
        <div className="flex flex-col gap-2">
          {!isMobile && <SideBarGroupTitle label="Gestão" />}
          <SidebarItem
            key={"Suppliers"}
            icon={<Truck />}
            label={"Fornecedores"}
            routerLink={"/suppliers"}
            isMobile={isMobile}
            active={
              location.pathname === "/suppliers" ||
              location.pathname === "/suppliers/details"
            }
          />
          <SidebarItem
            key={"Sectors"}
            icon={<Layers2 />}
            label={"Setores"}
            routerLink={"/sectors"}
            isMobile={isMobile}
            active={location.pathname === "/sectors"}
          />
          <SidebarItem
            key={"Secretariats"}
            icon={<Building />}
            label={"Secretarias"}
            routerLink={"/secretariats"}
            isMobile={isMobile}
            active={location.pathname === "/secretariats"}
          />
        </div>
        <div className="flex flex-col gap-2">
          {!isMobile && <SideBarGroupTitle label="Outros" />}
          <SidebarItem
            key={"Reports"}
            icon={<FileChartColumn />}
            label={"Relatórios"}
            routerLink={"/reports"}
            isMobile={isMobile}
            active={location.pathname === "/reports"}
          />
        </div>
      </div>
    </aside>
  );
};
