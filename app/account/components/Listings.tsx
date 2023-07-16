'use client'


import useCreateAd from "@/app/hooks/useCreateAd";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import SidePanel from "../../components/SidePanel";
import PetCard from "@/app/components/modals/components/PetCard";
import useGlobalStore from "@/app/hooks/useHandleSideMenuClick";

interface Props {
  currentUser?: SafeUser | undefined | null;
}

const Listings: React.FC<Props> = ({ 
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
        <SidePanel currentUser={currentUser} handleSideMenuClick={handleSideMenuClick}/>

            <div className="flex flex-col h-full">
                <div className="flex flex-row justify-start items-center w-full pt-4 pb-8 px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2">
                        <PetCard />
                    </div>
                </div>
            </div>    
        </div>
    </div>
  )
}

export default Listings;
