import { create } from 'zustand';


interface UpdateProfilePictureState {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

export const useUpdateProfilePicture = create<UpdateProfilePictureState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));


export default useUpdateProfilePicture;