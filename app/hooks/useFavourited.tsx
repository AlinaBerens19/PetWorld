import { useRouter } from "next/navigation";
import { SafeUser } from "../types";
import React, { useCallback, useMemo, useState } from "react";
import useLoginModal from "./useLoginModal";
import axios from "axios";
import { faHouseMedicalCircleExclamation } from "@fortawesome/free-solid-svg-icons";


export interface IUseFavourited {
    listingId: string;
    currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavourited) => {

    console.log("useFavorite executed");

    const loginModal = useLoginModal();
    const [hasFavorited, setHasFavorited] = useState(
      currentUser?.favoriteIds?.includes(listingId) || false
    );

    console.log('Updated hasFavorited:', hasFavorited);

    const toggleFavorite = useCallback(
        async (e: React.MouseEvent<HTMLDivElement>) => {
          
          console.log("HOOK: ", currentUser);
      
          e.stopPropagation();
          
      
          try {
            let request;
      
            if (hasFavorited) {
              request = () => axios.delete(`/api/favourites/${listingId}`);
            } else {
              request = () => axios.post(`/api/favourites/${listingId}`);
            }
      
            await request();
      
            // Update the hasFavorited value after a successful API request
            setHasFavorited((prevHasFavorited) => !prevHasFavorited);
      
            alert("Success");
          } catch (err) {
            console.log(err);
            alert("Something went wrong");
          }
        },
        [listingId, loginModal, hasFavorited, currentUser]
      );
      
      console.log("toggleFavorite defined");

    return {
        hasFavorited,
        toggleFavorite
    }

}

export default useFavorite;