'use client';


import Container from "../Container";
import Logo from "./Logo";
import Toolbar from "./Toolbar";
import SlideDownMenu from "./SlideDownMenu";
import { useEffect, useState } from "react";
import { SafeUser } from "@/app/types";
import SearchModal from "../modals/SearchModal";
import useSearchModal from "@/app/hooks/useSearchModal";
import { signOut } from "next-auth/react";
import useScreenSizeDetector from "@/app/hooks/useScreenSizeDetector";
import { useRouter } from "next/navigation";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({
  currentUser
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const searchModal = useSearchModal();
  const isSmall = useScreenSizeDetector();
  const router = useRouter();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logOut = async () => {
    setIsLoggingOut(true); // Set the flag to indicate that logout is in progress
    await signOut();
    setIsLoggingOut(false); // Reset the flag after logout is completed
  };

  useEffect(() => {
    if (isLoggingOut === false) {
      router.push('/');
    }
  }, [isLoggingOut]);

  const handleMenuClick = () => {
    console.log("menu clicked");
    setShowMenu(!showMenu);
  };

  const handleMenuItemClick = () => {
    console.log("menu item clicked");
  };

  
  return (
    <div className="flex flex-col relative">
      
      {/* Navbar component */}
      <div className="fixed w-full z-40 navbar">
        <div className="xl:py-5 md:py-4 sm:py-4 py-3 px-10">
          {/* <Container> */}
            <div className="flex flex-col">
              <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                <div className="pe-20 px-4">
                  <Logo />
                </div>
                
                <Toolbar logOut={logOut} onClick={handleMenuClick} currentUser={currentUser} isSmall={isSmall}/>
              </div>
              
            </div>
            {showMenu && <SlideDownMenu logOut={logOut} currentUser={currentUser} showMenu={showMenu} handleSearchClick={handleMenuItemClick}/>}
            
          {/* </Container> */}
        </div>
      </div>

      {/* Search Component */}
      {searchModal.isOpen && 
        <div 
          className={`
            fixed w-full z-30 navbar transition py-8 mt-24 slide-in-out
            ${searchModal.isOpen ? 'slide-in' : 'slide-out'}
          `}
        >
          <SearchModal />
        </div>}

    </div>
  );
};

export default Navbar;
