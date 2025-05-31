import { useState, useRef, useEffect } from "react";
import { ChevronDown, LogOut, Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  formatCurrentDate,
  getErrorMessage,
  getUserInitials,
} from "../../utils/functions";
import { logoutMutation } from "../../api/mutations/auth/logoutMutation";
import { useAuthStore } from "../../store/auth/authStore";
import { useMobileDetect } from "@/common/hooks/useMobileDetect";
import { ConfirmationPopup } from "../popups/confirmation-popup/ConfirmationPopup";
import { showToast } from "../toast/Toast";

export const Header = () => {
  const [openHeaderMenu, setOpenHeaderMenu] = useState(false);
  const [openLogoutConfirmationPopUp, setOpenLogoutConfirmationPopUp] =
    useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { mutateAsync: logoutMutate } = logoutMutation();
  const userName = useAuthStore((state) => state.user?.name);
  const userRole = useAuthStore((state) => state.user?.role);
  const userEmail = useAuthStore((state) => state.user?.email);
  const userImage = null;

  const isMobile = useMobileDetect();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenHeaderMenu(false);
      }
    }
    if (openHeaderMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openHeaderMenu]);

  const handleLogout = () => {
    logoutMutate();
  };

  return (
    <header className="w-full h-16 px-4 sm:px-8 flex items-center justify-between bg-white border-b border-sky-100 shadow-sm z-50">
      <div className="flex items-center min-w-0">
        {/* <span className="text-sky-700 font-semibold text-base truncate">
          {getAccost()}, {userName}!
        </span> */}
      </div>

      <div className="flex items-center gap-4">
        {/* Data atual */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-sky-50 border border-sky-100 text-sky-700 font-medium text-sm shadow-sm">
          <Calendar className="w-5 h-5 text-sky-500" />
          <span>{formatCurrentDate()}</span>
        </div>

        {/* Avatar + User Info + Menu */}
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <Avatar
            className="w-10 h-10 bg-white border border-sky-100 shadow-sm"
            title={userName}
          >
            {userImage ? (
              <AvatarImage src={userImage} alt={userName || "Avatar"} />
            ) : (
              <AvatarFallback className="bg-sky-100 text-sky-700 font-bold text-lg">
                {getUserInitials(userName || "")}
              </AvatarFallback>
            )}
          </Avatar>

          {/* User Info */}
          {!isMobile && (
            <div className="flex flex-col items-start">
              <span className="text-sky-900 font-semibold text-sm leading-tight">
                {userEmail}
              </span>
              <span className="text-gray-500 text-xs leading-tight capitalize">
                {userRole}
              </span>
            </div>
          )}

          {/* Menu */}
          <div className="relative" ref={menuRef}>
            <button
              className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-sky-50 transition-colors"
              onClick={() => setOpenHeaderMenu((v) => !v)}
              aria-label="Abrir menu do usuário"
              type="button"
            >
              <ChevronDown className="w-6 h-6 text-sky-500 hover:cursor-pointer" />
            </button>
            {openHeaderMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-sky-100 rounded-lg shadow-lg py-2 z-50 animate-fade-in">
                <button
                  className="w-full flex items-center gap-2 px-4 py-2 text-sky-700 hover:bg-sky-50 transition-colors text-sm font-medium hover:cursor-pointer"
                  onClick={() => setOpenLogoutConfirmationPopUp(true)}
                  type="button"
                >
                  <LogOut className="w-5 h-5 text-sky-500" />
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <ConfirmationPopup
        title="Efetuar Logout"
        description="Tem certeza que deseja sair do sistema?"
        open={openLogoutConfirmationPopUp}
        onCancel={() => setOpenLogoutConfirmationPopUp(false)}
        onConfirm={handleLogout}
      />
    </header>
  );
};
