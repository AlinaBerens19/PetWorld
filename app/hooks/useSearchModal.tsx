import { create } from 'zustand';


interface SearchModalState {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

export const useSearchModal = create<SearchModalState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));


export default useSearchModal;