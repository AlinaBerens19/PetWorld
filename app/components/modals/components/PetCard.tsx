'use client';


import CallButton from "@/app/sale/componets/CallButton";
import HeartButton from "@/app/sale/componets/HeartButton";
import { SafeListing, SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMars } from '@fortawesome/free-solid-svg-icons';
import { faVenus } from '@fortawesome/free-solid-svg-icons';
import NewButton from "@/app/sale/componets/NewButton";
import useAddToWishList from "@/app/hooks/useAddToWishlist";
import useFavorite from "@/app/hooks/useFavourited";

interface Props {
  data?: SafeListing;
  currentUser?: SafeUser | null;
}


const PetCard: React.FC<Props> = ({
  data,
  currentUser, 
}) => {

  const favorited = useFavorite({ listingId: data?.id ?? "", currentUser: currentUser ?? null });
  const router = useRouter();

  // useEffect(() => {
  //   console.log("DATA: ", data);
  // }, []);

  return (
    <div className="col-span-1 bg-white rounded-lg">
      <div className="flex flex-col h-auto justify-start py-4">
        {data?.firstImage ? (
          <div 
            onClick={(id) => router.push(`/sale/${data ? data?.id : 'undefined'}`)}
            className="relative flex justify-center items-center cursor-pointer">
              <img
                src={data?.firstImage}
                alt="pet"
                className="sm:w-60 h-48 w-80 object-cover rounded-lg"
              />
              <HeartButton isClicked={favorited.hasFavorited} onCard={true} className={"absolute top-2 left-2 flex text-4xl"} onClick={(e: React.MouseEvent<HTMLDivElement>) => favorited.toggleFavorite(e)}/>
              <NewButton />
              <CallButton />
          </div>
          
        ) : null}
        {
          data ? (
            
              <div className="flex flex-row justify-between pt-1 items-baseline">
                <div className="flex flex-row items-center gap-2">
                  <div className="text-gray-600 items-start text-lg font-light">
                    {data?.name ? data?.name : 'Other'}
                  </div>

                  <div className="text-gray-600 items-center justify-center text-md font-light">
                    ({data?.category ? data?.category : 'Other'})
                  </div>

                  <div className="text-lg text-rose-700">
                    {data?.gender === 'femail' ? (<FontAwesomeIcon icon={faVenus} title="Female" className="cursor-pointer"/>) : (<FontAwesomeIcon icon={faMars} title="Male" className="cursor-pointer"/>)}
                  </div>
                </div>
                
                <div className="text-gray-600 items-end text-lg font-medium">
                  ${data?.price ? data?.price : '0'}
                </div>
              </div>
            ) : null    
        }
      </div>
    </div>
  );
};

export default PetCard;
