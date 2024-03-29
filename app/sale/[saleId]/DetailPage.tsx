'use client'


import useFavorite from "@/app/hooks/useFavourited";
import { SafeUser } from "@/app/types"
import { BiMapPin, BiMessage, BiPhone } from "react-icons/bi";
import HeartButton from "../componets/HeartButton";


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

    const phoneNumber = "+972543475847";

    console.log('CURRENT USER ==> ', currentUser)
    console.log('LISTING ID ==> ', id)

    const favorited = useFavorite({ listingId: id || "", currentUser: currentUser });

    console.log('FAVORITED ==> ', favorited)

    return (
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col px-4 py-20 gap-1">

        <div className="flex flex-row w-full pt-5 gap-1"> 
            <img
              src={firstImage ? firstImage : ''}
              alt={pet_name ? pet_name : 'No Name'}
              className="w-full sm:w-[100vh] h-[200px] sm:h-[350px] object-cover rounded-tl-xl"
            />
            <img
              src={firstImage ? firstImage : ''}
              alt={pet_name ? pet_name : 'No Name'}
              className="w-full sm:w-[50vh] h-[200px] sm:h-[350px] object-cover rounded-tr-xl"
            />
          </div>
            <div className="flex flex-row gap-1">
            <img
              src={firstImage ? firstImage : ''}
              alt={pet_name ? pet_name : 'No Name'}
              className="w-[75vh] h-[200px] object-cover rounded-bl-xl"
            />

            <img
              src={firstImage ? firstImage : ''}
              alt={pet_name ? pet_name : 'No Name'}
              className="w-[75vh] h-[200px] object-cover rounded-br-xl"
            />
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
                <BiMessage className="text-4xl text-neutral-8300 cursor-pointer" />
                <a href={`tel:${phoneNumber}`}>
                  <BiPhone className="text-4xl text-neutral-800 cursor-pointer" />
                </a>
                <HeartButton
                  onClick={(e: React.MouseEvent<HTMLDivElement>) => favorited.toggleFavorite(e)}
                  isClicked={favorited.hasFavorited}
                  onCard={false}
                  className="text-4xl text-neutral-800 cursor-pointer"
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
