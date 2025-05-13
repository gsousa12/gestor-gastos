type PaperTitleProps = {
  label: string;
};

export const PaperTitle = ({ label }: PaperTitleProps) => {
  return <span className="text-2xl font-bold">{label}</span>;
};
