import { create } from "zustand";

type SessionExpiredPopupStore = {
  open: boolean;
  show: () => void;
  hide: () => void;
};

export const useSessionExpiredPopupStore = create<SessionExpiredPopupStore>(
  (set) => ({
    open: false,
    show: () => set({ open: true }),
    hide: () => set({ open: false }),
  })
);

export function showSessionExpiredPopup() {
  useSessionExpiredPopupStore.getState().show();
}
