import { create } from 'zustand';


interface RouteModalState {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

export const useRoute = create<RouteModalState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));


export default useRoute;