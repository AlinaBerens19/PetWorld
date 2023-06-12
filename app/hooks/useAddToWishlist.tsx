import { create } from 'zustand';


interface AddToWishlistState {
    isClicked: boolean;
    onClick: () => void;
}

export const useAddToWishList = create<AddToWishlistState>((set) => ({
    isClicked: false,
    onClick: () => set({ isClicked: true }),
}));


export default useAddToWishList;