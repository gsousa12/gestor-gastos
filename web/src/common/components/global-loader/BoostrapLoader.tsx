import styles from "./loader.module.css";
export const BoostrapLoader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/20 flex justify-center items-center z-[9999]">
      <div className={styles.loader}></div>
    </div>
  );
};
