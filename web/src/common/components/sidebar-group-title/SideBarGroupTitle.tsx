interface SideBarGroupTitleProps {
  label: string;
}

export const SideBarGroupTitle = ({ label }: SideBarGroupTitleProps) => {
  return (
    <div className="uppercase text-xs text-gray-400 font-bold tracking-widest mb-2 mt-4 px-2">
      {label}
    </div>
  );
};
