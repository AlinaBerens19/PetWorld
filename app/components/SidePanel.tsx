'use client'

import { SafeUser } from "@/app/types";

interface SidePanelProps {
    currentUser?: SafeUser | undefined | null;
    handleSideMenuClick: (item: string) => void;
}

const SidePanel: React.FC<SidePanelProps> = ({
    currentUser,
    handleSideMenuClick

}) => {
  return (
    <div className="w-full sm:basis-1/4 border-[1px]">
          <div className="flex flex-col items-center justify-center">

            <div 
              id="Dashboard"
              onClick={() => handleSideMenuClick("Dashboard")}
              className="w-full py-4 px-4 justify-start border-b cursor-pointer hover:text-yellow-500">
              Dashboard
            </div>

            <div 
              className="w-full py-4 px-4 justify-start border-b cursor-pointer hover:text-yellow-500"
              id="YourPets"
              onClick={() => handleSideMenuClick("YourPets")}
            >
              Your pets
            </div>

            <div 
              id="Wishlist"
              className="w-full py-4 px-4 justify-start border-b cursor-pointer hover:text-yellow-500"
              onClick={() => handleSideMenuClick("Wishlist")}
            >
              Wishlist
            </div>

            <div 
              id="CreateAd"
              className="w-full py-4 px-4 justify-start border-b cursor-pointer hover:text-yellow-500"
              onClick={() => handleSideMenuClick("CreateAd")}
            >
              Create Ad
            </div>
              
            <div className="w-full py-4 px-4 justify-start border-b cursor-pointer hover:text-yellow-500">
              Payment method
            </div>

            <div className="w-full py-4 px-4 justify-start border-b cursor-pointer hover:text-yellow-500">
              Orders
            </div>

            <div 
              id="Password"
              onClick={() => handleSideMenuClick("Password")}
              className="w-full py-4 px-4 justify-start border-b cursor-pointer hover:text-yellow-500">
              Change password
            </div>

            <div 
              id={currentUser ? "logout" : "login"}
              className="w-full py-4 px-4 justify-start border-b cursor-pointer"
              onClick={() => handleSideMenuClick("logout")}
            >
              {currentUser ? "Logout" : "Login"}
            </div>

          </div>  
        </div>
  )
}

export default SidePanel
