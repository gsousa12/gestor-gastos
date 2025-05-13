import { ReactNode } from "react";

interface PaperProps {
  children: ReactNode;
}

export const Paper = ({ children }: PaperProps) => {
  return (
    <div
      className="p-4 bg-white transition-shadow hover:shadow-lg border 
    border-gray-200 shadow-sm shadow-gray-300 rounded-md"
    >
      {children}
    </div>
  );
};
