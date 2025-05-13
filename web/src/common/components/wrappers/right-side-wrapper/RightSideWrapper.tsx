import { ReactNode } from "react";

interface RightSideWrapperProps {
  children: ReactNode;
}

export const RightSideWrapper = ({ children }: RightSideWrapperProps) => {
  return <div>{children}Right SIDE</div>;
};
