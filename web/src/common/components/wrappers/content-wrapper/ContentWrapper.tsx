import { ReactNode } from "react";

interface ContentWrapperProps {
  children: ReactNode;
}

export const ContentWrapper = ({ children }: ContentWrapperProps) => {
  return <div className="p-5">{children}</div>;
};
