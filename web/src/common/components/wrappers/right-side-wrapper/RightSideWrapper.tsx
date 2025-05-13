import { ReactNode } from "react";
import { useMobileDetect } from "../../../hooks/useMobileDetect";

interface RightSideWrapperProps {
  children: ReactNode;
}

export const RightSideWrapper = ({ children }: RightSideWrapperProps) => {
  const isMobile = useMobileDetect();
  return <div className={isMobile ? "ml-20" : "ml-64"}>{children}</div>;
};
