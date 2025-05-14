interface ContentTitleProps {
  label: string;
}
export const ContentTitle = ({ label }: ContentTitleProps) => {
  return <div className="text-xl font-bold mb-2">{label}</div>;
};
