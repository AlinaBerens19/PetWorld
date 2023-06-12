import { RefObject } from 'react';
import { create } from 'zustand'
import { combine } from 'zustand/middleware'


type ObjectCallback<T> = (obj: T) => boolean;

interface ClickOutsideState<T> {
    ref: false;
    isOpen: boolean;
    callback: (ref: RefObject<HTMLElement>) => void;
}

const useBearStore = create<ClickOutsideState<HTMLHtmlElement>>()((set) => ({
    ref: false,
    callback: (ref) => set((state) => ({ false: ref, ...state })),
    isOpen: false
}));