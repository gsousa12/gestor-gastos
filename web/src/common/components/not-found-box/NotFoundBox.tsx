import { NotFoundItems } from "../not-found-items/NotFoundItems";
import { Skeleton } from "../ui/skeleton";

interface NotFoundBoxProps {
  title: string;
  description: string;
}

export const NotFoundBox = ({ title, description }: NotFoundBoxProps) => {
  return (
    <div className="bg-white h-[50vh]">
      <Skeleton className="bg-white h-[50vh] flex items-center justify-center">
        <NotFoundItems title={title} description={description} />
      </Skeleton>
    </div>
  );
};
