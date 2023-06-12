'use client'


import useFavorite from "@/app/hooks/useFavourited";
import { SafeUser } from "@/app/types"
import { BiHeart, BiMapPin, BiMessage, BiPhone } from "react-icons/bi";
import HeartButton from "../componets/HeartButton";
import { set } from "date-fns";

interface DetailPageProps {
  location?: string | null;
  kind?: string | null;
  breed?: string | null;
  firstImage?: string | null;
  pet_name?: string | null;
  price?: number | null;
  currentUser?: SafeUser | null;
  description?: string | null;
  gender?: string | null;
  id?: string | null;
}

const DetailPage: React.FC<DetailPageProps> = ({
  location,
  kind,
  breed,
  pet_name,
  firstImage,
  price,
  description,
  currentUser,
  gender,
  id
}) => {

    console.log('CURRENT USER ==> ', currentUser)
    console.log('LISTING ID ==> ', id)

    const favorited = useFavorite({ listingId: id || "", currentUser: currentUser });

    console.log('FAVORITED ==> ', favorited)

    return (
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col px-4 py-20">

        <div className="flex flex-row w-full gap-1"> 
          <img
            src={firstImage ? firstImage : ''}
            alt={pet_name ? pet_name : 'No Name'}
            className="w-[100vh] h-1/2 object-contain pt-5 sm:rounded-tl-xl sm:rounded-bl-xl"
          />

          <div className="flex flex-col pt-5">
            <img
              src={firstImage ? firstImage : ''}
              alt={pet_name ? pet_name : 'No Name'}
              className="w-[33vh] h-1/2 object-contain"
            />

            <img
              src={firstImage ? firstImage : ''}
              alt={pet_name ? pet_name : 'No Name'}
              className="w-[33vh] h-1/2 object-contain"
            />

            <img
              src={firstImage ? firstImage : ''}
              alt={pet_name ? pet_name : 'No Name'}
              className="w-[33vh] h-1/2 object-contain rounded-br-xl"
            />
          </div>
          
        </div>

            <div className="flex flex-col gap-4 pt-5">

            <div className="flex flex-col sm:flex-row gap-4 justify-start">
              <div className="flex flex-row items-baseline justify-start gap-4">
                <div className="text-bold  text-2xl">
                  {breed && breed}
                </div>
                <div className="text-light text-xl pe-10">
                  ({kind && kind})
                </div>
              </div>

              <div className="flex flex-row items-center justify-start gap-4">
                <BiMessage className="text-4xl text-neutral-600 cursor-pointer" />
                <BiPhone className="text-4xl text-neutral-600 cursor-pointer" />
                <HeartButton
                  onClick={(e: React.MouseEvent<HTMLDivElement>) => favorited.toggleFavorite(e)}
                  isClicked={favorited.hasFavorited}
                  className="text-4xl text-neutral-600 cursor-pointer"
                />

              </div>  
            </div>

            <div className="flex flex-row text-neutral-800 text-xl">
              {gender && gender}
            </div>

            <div className="flex flex-row text-neutral-500 text-lg">
              {location && location}
              <BiMapPin className="text-neutral-800 text-xl cursor-pointer" />
            </div>

            <div className="flex flex-row items-center justify-start gap-4 pb-5">
              <div className="text-bold text-neutral-800 text-xl">
                ${price && price}
              </div>  
            </div>

            <div className="flex flex-row items-center justify-start gap-4 font-light text-lg text-neutral-800">
              {description && description}
            </div> 

            </div>
          </div>
        </div>
  )
}

export default DetailPage
