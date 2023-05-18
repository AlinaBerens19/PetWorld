import { create } from 'zustand';
import { useEffect } from "react";

interface ResizeState {
  isSmall: boolean;
}

type ResizeActions = {
  set: (newState: Partial<ResizeState>) => void;
};

const useResizeStore = create<ResizeState & ResizeActions>((set) => ({
  isSmall: false,
  set: (newState: Partial<ResizeState>) => set((state) => ({ ...state, ...newState })),
}));

const useResize = () => {
  const isSmall = useResizeStore((state) => state.isSmall);
  const set = useResizeStore((state) => state.set);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1200) {
        set({ isSmall: true });
      } else {
        set({ isSmall: false });
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isSmall;
};

export default useResize;
