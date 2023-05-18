import { create } from 'zustand';


interface CreatePetProfileState {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

export const useCreatePetProfile = create<CreatePetProfileState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));


export default useCreatePetProfile;