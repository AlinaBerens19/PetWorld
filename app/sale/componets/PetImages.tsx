'use client';

import { SafeListing } from "@/app/types";

interface PetImagesProps {
    data?: SafeListing;
}

const PetImages: React.FC<PetImagesProps> = ({
    data
}) => {
  return (
    <div className="lg:w-1/2 flex flex-col gap-1 px-2">
      <div className="hidden lg:grid xl:grid-cols-2 gap-1 grid-cols-1">
          <img 
            src={data?.firstImage ? data?.firstImage : '/images/default.png'}
            alt={data?.name ? data?.name : 'No Name'}
            className="w-full h-[100%] object-cover"
          />
          <img 
            src={data?.secondImage ? data?.secondImage : '/images/default.png'}
            alt={data?.name ? data?.name : 'No Name'}
            className="w-full h-[100%] object-cover rounded-tr-lg"
          />
          <img 
            src={data?.thirdImage ? data?.thirdImage : '/images/default.png'}
            alt={data?.name ? data?.name : 'No Name'}
            className="w-full h-[100%] object-cover"
          />    
          <img 
            src={data?.imageSrc ? data?.imageSrc : '/images/default.png'}
            alt={data?.name ? data?.name : 'No Name'}
            className="w-full h-[100%] object-cover  rounded-br-lg"
          />
        </div>
        </div>
  )
}

export default PetImages
