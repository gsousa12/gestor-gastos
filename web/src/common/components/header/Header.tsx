import { useState, useRef, useEffect } from "react";
import { ChevronDown, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "../../../components/ui/avatar";
import { getUserInitials } from "../../utils/functions";
import { logoutMutation } from "../../api/mutations/auth/logoutMutation";
import { useAuthStore } from "../../store/authStore";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { mutate: logoutMutate } = logoutMutation();
  const userName = useAuthStore((state) => state.user?.name);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleLogout = () => {
    logoutMutate();
    setOpen(false);
  };

  return (
    <header className="w-full h-16 px-6 flex items-center justify-end bg-white border-b border-gray-200 shadow-sm">
      {/* <span>{`${getAccost()},${" "} ${userName}!`}</span> */}
      <Avatar className="w-9 h-9 bg-white text-sky-700 font-bold text-base mr-2">
        <AvatarFallback>{getUserInitials(userName!)}</AvatarFallback>
      </Avatar>
      {/* <span className="text-gray-700 text-base font-medium">{userName}</span> */}
      <div className="relative" ref={menuRef}>
        <button
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-sky-50 transition-colors duration-200 group"
          onClick={() => setOpen((v) => !v)}
        >
          <ChevronDown className="w-6 h-6 text-gray-500 group-hover:text-sky-600 hover:cursor-pointer transition-colors duration-200" />
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-lg shadow-lg py-2 z-50 animate-fade-in">
            {/* <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-sky-50 hover:text-sky-700 hover:cursor-pointer transition-colors duration-200">
              <Settings className="w-5 h-5 text-gray-400 group-hover:text-sky-600" />
              <span className="text-sm font-medium">Opções</span>
            </button> */}
            <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-sky-50 hover:text-sky-700 hover:cursor-pointer transition-colors duration-200">
              <LogOut className="w-5 h-5 text-gray-400 group-hover:text-sky-600" />
              <button className="text-sm font-medium" onClick={handleLogout}>
                Logout
              </button>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
