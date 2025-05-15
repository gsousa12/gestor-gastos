import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import styles from "./loader.module.css";
export const GlobalLoader = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  const isLoading = isFetching > 0 || isMutating > 0;

  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/20 flex justify-center items-center z-[9999]">
      <div className={styles.loader}></div>
    </div>
  );
};
