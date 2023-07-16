'use client'
import SidePanel from "@/app/components/SidePanel";
import useCreateAd from "@/app/hooks/useCreateAd";
import useGlobalStore from "@/app/hooks/useHandleSideMenuClick";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import { BiHeart } from "react-icons/bi";
import WishCard from "./WishCard";
import { useState } from "react";

interface WishlistProps {
    currentUser?: SafeUser | undefined | null;
    listings?: SafeListing[] | undefined | null ;
}

const Wishlist: React.FC<WishlistProps> = ({
    currentUser,
    listings
}) => {

    console.log('LISTINGS ==> ', listings);

    const createAdModal = useCreateAd()
    const loginModal = useLoginModal();
    const router = useRouter();
    const globalStore: any = useGlobalStore();
    const [deleteCanVisible, setDeleteCanVisible] = useState(false);

    const handleSideMenuClick = (item: string) => {
        globalStore.handleSideMenuClick(item, currentUser, createAdModal, loginModal, router);
    } 

    const handleDeleteClick = () => {
        setDeleteCanVisible(!deleteCanVisible);
        router.refresh();
    }


   return (
    <div className="container mx-auto">
        <div className="flex flex-col py-24 items-top sm:flex-row w-full h-screen px-8 justify-start gap-4">
            <SidePanel currentUser={currentUser} handleSideMenuClick={handleSideMenuClick} />
            <div className="w-full min-h-screen sm:basis-2/3 border-[1px]">
                <div className="flex flex-col min-h-screen justify-start items-center pb-20 ">
                    <div className="flex flex-row items-center justify-center py-4">
                        <h1 className="text-3xl text-neutral-800 font-bold">Wishlist</h1>
                        <BiHeart className="text-3xl text-neutral-800 ml-2" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 pb-5">
                        {listings?.map((listing) => (
                            <WishCard listing={listing} deleteCanVisible={deleteCanVisible}/>
                        ))}
                    </div>    

                    <button className="bg-red-500 w-fit px-10 py-2 rounded-lg text-white items-baseline justify-bottom">
                        <div 
                            onClick={handleDeleteClick}
                            className="flex flex-row items-center justify-center gap-2">
                            {deleteCanVisible ? 'Save' : 'Delete'}
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </div>
   )
}

export default Wishlist

