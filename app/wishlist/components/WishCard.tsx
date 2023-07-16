'use client'

import { SafeListing } from "@/app/types"
import { faMars, faVenus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState } from "react";


interface WishCardProps {
    listing: SafeListing | undefined | null;
    deleteCanVisible?: boolean;
}

const WishCard:React.FC<WishCardProps> = ({
    listing,
    deleteCanVisible
}) => {

  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleTrashCanClick = async () => {
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/favourites/${listing?.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Successful deletion
        // You can perform any additional actions here,
        // such as updating the UI or refetching data.
        console.log('Favorite deleted successfully');
      } else {
        // Handle error response
        console.log('Failed to delete favorite');
      }
    } catch (error) {
      console.log('Error:', error);
    }

    setIsDeleting(false);
  };

  return (
    <div 
        className="flex flex-row p-4 sm:p-10 w-fit items-center justify-center cursor-pointer"
        >
      {listing?.firstImage && (
        <div style={{ position: "relative" }}>
          <img
            onClick={(id) => router.push(`/sale/${listing ? listing?.id : 'undefined'}`)}
            src={listing?.firstImage}
            alt="pet"
            className="w-28 h-28 object-cover rounded-xl"
          />
        </div>
        )}

      <div 
        
        className="flex flex-col ml-4">
        <div className="flex flex-row items-center justify-start gap-3">
            <h1 className="text-lg text-neutral-800 font-bold">{listing?.name}</h1>
            {listing?.gender === 'male' ? (<FontAwesomeIcon icon={faMars} className="text-blue-500 text-lg"/>): (<FontAwesomeIcon icon={faVenus} className="text-pink-500 text-lg"/>)}
        </div>
        
        <p>{listing?.breed}</p>
        {listing?.price && <p className="text-lg text-neutral-800 font-bold">${listing?.price}</p>}
        <div>
            {deleteCanVisible && (
            <FontAwesomeIcon
              icon={faTrash}
              className="text-neutral-800 cursor-pointer"
              onClick={handleTrashCanClick}
            />
        )}
        </div>
      </div>
    </div>
  )
}

export default WishCard
