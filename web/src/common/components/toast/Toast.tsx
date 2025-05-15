import { toast } from "sonner";
import { CheckCircle, XCircle } from "lucide-react";
import { ReactNode } from "react";

interface ShowToastOptions {
  title: string;
  description?: string;
  type?: "success" | "error" | "default";
}

export const showToast = ({
  title,
  description,
  type = "default",
}: ShowToastOptions) => {
  const iconMap: Record<string, ReactNode> = {
    success: (
      <div className="bg-teal-100 p-1 rounded-full">
        <CheckCircle className="text-emerald-600 w-5 h-5" />
      </div>
    ),
    error: (
      <div className="bg-rose-100 p-1 rounded-full">
        <XCircle className="text-rose-600 w-5 h-5" />
      </div>
    ),
    default: null,
  };

  const classMap: Record<string, string> = {
    success: "toast-with-progress-success",
    error: "toast-with-progress-error",
    default: "",
  };

  toast(title, {
    description,
    icon: iconMap[type],
    style: {
      background: "#ffffff",
      color: "#0f172a",
      border: "1px solid #e2e8f0",
      boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
      padding: "16px 20px",
      borderRadius: "12px",
      position: "relative",
      overflow: "hidden",
      gap: "20px",
    },
    className: classMap[type],
  });
};
