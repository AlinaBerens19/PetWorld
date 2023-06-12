'use client'

import SidePanel from "@/app/account/components/SidePanel"
import useCreateAd from "@/app/hooks/useCreateAd";
import useGlobalStore from "@/app/hooks/useHandleSideMenuClick";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeUser } from "@/app/types";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface UIProps {
    currentUser?: SafeUser | undefined | null;
}

const UI: React.FC<UIProps> = ({
    currentUser
}) => {

    const loginModal = useLoginModal();
    const createAdModal = useCreateAd();
    const router = useRouter();
    const globalStore: any = useGlobalStore();

    const handleSideMenuClick = (item: string) => {
        globalStore.handleSideMenuClick(item, currentUser, createAdModal, loginModal, router);
    }  

  return (
    <div className="container mx-auto">
      <div className="flex flex-col py-24 items-top sm:flex-row w-full h-screen px-8 justify-start gap-8">
        <SidePanel currentUser={currentUser} handleSideMenuClick={handleSideMenuClick} />

            <div className="flex flex-col h-full w-full">
                <div className="flex flex-col justify-start gap-5 items-start w-full pt-4 pb-8 px-4">

                    <div className="mt-20 text-neutral-800 text-light">Change password</div>

                    <input
                       type="email"
                       name="email"
                       placeholder="Email" 
                       className="w-1/2 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                    />

                    <input
                       type="email"
                       name="confirmEmail"
                       placeholder="confirm email" 
                       className="w-1/2 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                    />

                  <button className="py-2 px-4 border-neutral-300 rounded-lg bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-green-600 text-white">
                    Change password
                  </button>

                </div>
            </div>    
        </div>
    </div>
  )
}

export default UI
