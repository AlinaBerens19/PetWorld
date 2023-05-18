import { create } from 'zustand';


interface CreateAdState {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

export const useCreateAd = create<CreateAdState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));


export default useCreateAd;