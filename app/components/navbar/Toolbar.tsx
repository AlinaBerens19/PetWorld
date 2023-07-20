'use client';

import React, { useState } from "react";
import ToolbarItem from "./ToolbarItem";
import ButtonMembership from "./ButtonMembership";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/app/types";
import DropdownMenu from "../DropdownMenu";
import CartIcon from "./CartIcon";
import HamburgerMenu from "./HamburgerMenu";
import SearchIcon from "./SearchIcon";
import useCreateAd from "@/app/hooks/useCreateAd";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useSearchModal from "@/app/hooks/useSearchModal";

interface ToolbarProps {
  onClick: () => void;
  currentUser?: SafeUser | null;
  isSmall?: boolean;
  logOut?: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  onClick,
  currentUser,
  isSmall = false,
  logOut
}) => {
  const [outline, setOutline] = useState(false);
  const [isOpen_store, setIsOpen_store] = useState(false);
  const [isOpen_more, setIsOpen_more] = useState(false);
  const [isOpen_dashboard, setIsOpen_dashboard] = useState(false);
  const createAdModal = useCreateAd();
  const loginModal = useLoginModal();
  const router = useRouter();
  const { open } = useRegisterModal();
  const searchModal = useSearchModal();

  const handleSearchClick = () => {
    if (!isSmall) {
      searchModal.open();
    }
  };

  const handleCartClick = () => {
    console.log("clicked cart");
  };

  const handleMembershipButtonClick = () => {
    open();
  };

  const handleDashboardClick = () => {
    setIsOpen_dashboard(!isOpen_dashboard);
    setIsOpen_store(false);
    setIsOpen_more(false);
  };

  
  const handleStoreClick = () => {
    setIsOpen_store(!isOpen_store);
    setIsOpen_dashboard(false);
    setIsOpen_more(false);
  };

  const handleMoreClick = () => {
    setIsOpen_more(!isOpen_more);
    setIsOpen_dashboard(false);
    setIsOpen_store(false);
  };

  const handleItemClick = (item: string) => {
    if (item === "Account") {
      if (!currentUser) {
        loginModal.open();
      } else {
        router.push("/account");
      }
    }

    if (item === "Create Ad") {
      if (!currentUser) {
        loginModal.open();
      } else {
        createAdModal.open();
      }
    }

    if (item === "Meal") {
      router.push("/store/meal");
    }

    if (item === "Register a store") {
      router.push("/store/register");
    }

    setIsOpen_dashboard(false);
    setIsOpen_store(false);
    setIsOpen_more(false);
  };

  if (isSmall) {
    console.log("isSmall", isSmall);
    return (
      <div className="flex flex-row gap-4 px-4 items-center">
        <CartIcon onClick={handleCartClick} />
        <HamburgerMenu onClick={onClick} />
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-8 items-center justify-between slide-in-out">
      <div className="relative">
        <ToolbarItem
          onClick={handleDashboardClick}
          title="DASHBOARD"
          outlined={true}
          isArrow={true}
        />
        {isOpen_dashboard && (
          <DropdownMenu
            items={[
              "Account",
              "Create Ad",
              "Membership",
              "My Ads",
              "My Favorites",
              "My Messages",
              "My Orders",
              "My Reviews",
              "My Settings",
              "My Wallet",
              "My Wishlist"
            ]}
            isOpen={isOpen_dashboard}
            onClick={(item) => handleItemClick(item)}
            id="dashboard"
          />
        )}
      </div>

      <div className="relative">
        <ToolbarItem
          title="STORE"
          isArrow={true}
          onClick={handleStoreClick}
        />
        {isOpen_store && (
          <DropdownMenu
            items={[
              "Meal",
              "Toys",
              "Treats",
              "Accessories",
              "Supplements",
              "Grooming",
              "Health",
              "Training",
              "Travel",
              "Clothing",
              "Gifts"
            ]}
            isOpen={isOpen_store}
            onClick={(item) => handleItemClick(item)}
            id="store"
          />
        )}
      </div>
      <ToolbarItem onClick={() => router.push("/sale")} title="PETS" />

      <div className="relative">
        <ToolbarItem
          title="MORE"
          isArrow={true}
          onClick={handleMoreClick}
        />
        {isOpen_more && (
          <DropdownMenu
            items={["Register a store", "About us", "FAQ", "Contact us"]}
            isOpen={isOpen_more}
            onClick={(item) => handleItemClick(item)}
            id={"more"}
          />
        )}
      </div>

      <div className="flex flex-row gap-8 items-center justify-between slide-in-out">

{/* Existing code for dashboard, store, pets, and more menus */}

{/* Navbar Icons */}
<div className="flex flex-row gap-1">
  <SearchIcon 
    onClick={() => { searchModal.isOpen ? searchModal.close() : searchModal.open() }}
  />
  <CartIcon 
    onClick={handleCartClick}
  />
  </div>

  {/* Membership button aligned to the end of the toolbar */}
  {currentUser?.id ? 
    <div className="flex flex-row items-center">
      <ButtonMembership onClick={logOut} outline={outline} title="LOG OUT"/>
      <p className="text-white ps-20">Hi, {currentUser?.email}!</p>
    </div>
    :
    <div>
      <ButtonMembership onClick={handleMembershipButtonClick} outline={outline} title="MEMBERSHIP"/>
    </div>
  }
  </div>
  </div>
  );
};

export default Toolbar;

