'use client'


import { SafeUser } from "@/app/types"
import { BiHeart, BiMapPin, BiMessage, BiPhone } from "react-icons/bi";

interface DetailPageProps {
  location?: string | null;
  kind?: string | null;
  breed?: string | null;
  firstImage?: string | null;
  pet_name?: string | null;
  price?: number | null;
  currentUser?: SafeUser | null;
  description?: string | null;
}

const DetailPage: React.FC<DetailPageProps> = ({
  location,
  kind,
  breed,
  pet_name,
  firstImage,
  price,
  description,
  currentUser
}) => {

  console.log('CURRENT USER ==> ', currentUser)

  return (
    <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col px-4 py-20">
          <img 
            src={firstImage ? firstImage : ''}
            alt={pet_name ? pet_name : 'No Name'}
            className="w-full object-contain pt-5"
          />

            <div className="flex flex-col gap-4 pt-5">

            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="flex flex-row items-baseline justify-start gap-4">
                <div className="text-bold text-neutral-600 text-4xl">
                  {kind && kind}
                </div>
                <div className="text-light text-neutral-600 text-2xl">
                  {breed && breed}
                </div>
              </div>

              <div className="flex flex-row items-center justify-start gap-4">
                <BiMessage className="text-4xl text-neutral-600 cursor-pointer" />
                <BiPhone className="text-4xl text-neutral-600 cursor-pointer" />
                <BiHeart className="text-4xl text-neutral-600 cursor-pointer" />
              </div>  
            </div>

            <div className="flex flex-row text-neutral-500 text-lg">
              {location && location}
              <BiMapPin className="text-lg text-neutral-500 cursor-pointer" />
            </div>

            <div className="flex flex-row items-center justify-start gap-4 pb-5">
              <div className="text-bold text-neutral-600 text-2xl">
                ${price && price}
              </div>  
            </div>

            <hr />

            <div className="flex flex-row items-center justify-start gap-4 text-light text-lg text-neutral-600">
              {description && description}
            </div> 

            <hr /> 
            </div>
          </div>
        </div>
  )
}

export default DetailPage
