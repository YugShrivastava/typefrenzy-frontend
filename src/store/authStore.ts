import { create } from "zustand";

const useAuthStore = create((set) => ({
    authStatus: null,
    user: null,
    login: (user: any) => set({ authStatus: true, user }),
    logout: () => {
        localStorage.removeItem("token");
        set({ authStatus: false, user: null });
    },
}));

export default useAuthStore;
