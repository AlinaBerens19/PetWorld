import { create } from 'zustand';
import useLoginModal, { LoginModalState } from './useLoginModal';
import { SafeUser } from '../types';
import { signOut } from 'next-auth/react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { CreateAdState } from './useCreateAd';



const useGlobalStore = create((set) => ({
  handleSideMenuClick: (
    item: string,
    currentUser: SafeUser | null | undefined,
    createAdModal: CreateAdState,
    loginModal: LoginModalState,
    router: AppRouterInstance
  ) => {
    if (item === 'CreateAd') {
      if (!currentUser) {
        loginModal.open();
      } else {
        createAdModal.open();
      }
    }

    if (item === 'logout') {
      signOut();
      router.push('/');
    }

    if (item === 'login') {
      loginModal.open();
    }

    if (item === 'YourPets') {
      console.log('your pets');
      router.push(`account/pets/${currentUser?.id}`);
    }

    if (item === 'Dashboard') {
      console.log('dashboard');
      router.push(`/account`);
    }

    if (item === 'Wishlist') {
      console.log('wishlist');
      router.push(`/wishlist`);
    }

    if (item === 'Password') {
      console.log('password');
      router.push(`/password`);
    }
  },
}));

export default useGlobalStore;
