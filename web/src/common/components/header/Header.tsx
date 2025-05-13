import { useState, useRef, useEffect } from "react";
import { ChevronDown, Settings, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "../../../components/ui/avatar";
import { getUserInitials } from "../../utils/functions";
import { useLogoutMutation } from "../../hooks/auth/useLogoutMutation";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const username = "Gabriel Sousa";

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

  const { mutate, isPending, isError, error } = useLogoutMutation();

  const handleLogout = () => {
    mutate();
    setOpen(false);
  };

  return (
    <header className="w-full h-16 px-6 flex items-center justify-end bg-white border-b border-gray-200 shadow-sm">
      {/* <span className="text-gray-700 text-base font-medium mr-auto">
        Seja bem-vindo, {username}
      </span> */}
      <Avatar className="w-9 h-9 bg-white text-teal-700 font-bold text-base ring-2 ring-gray-300 mr-2">
        <AvatarFallback>{getUserInitials(username)}</AvatarFallback>
      </Avatar>
      <span className="text-gray-700 text-base font-medium">{username}</span>
      <div className="relative" ref={menuRef}>
        <button
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-teal-50 transition-colors duration-200 group"
          onClick={() => setOpen((v) => !v)}
        >
          <ChevronDown className="w-6 h-6 text-gray-500 group-hover:text-teal-600 hover:cursor-pointer transition-colors duration-200" />
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-lg shadow-lg py-2 z-50 animate-fade-in">
            <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-700 hover:cursor-pointer transition-colors duration-200">
              <Settings className="w-5 h-5 text-gray-400 group-hover:text-teal-600" />
              <span className="text-sm font-medium">Opções</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-700 hover:cursor-pointer transition-colors duration-200">
              <LogOut className="w-5 h-5 text-gray-400 group-hover:text-teal-600" />
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
