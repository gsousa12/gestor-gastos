import { useMobileDetect } from "../../hooks/useMobileDetect";

interface ContentTitleProps {
  label: string;
}
export const ContentTitle = ({ label }: ContentTitleProps) => {
  const isMobile = useMobileDetect();
  return isMobile ? <></> : <div className="text-2xl font-bold ">{label}</div>;
};
