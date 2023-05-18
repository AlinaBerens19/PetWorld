'use client';


import CallButton from "@/app/sale/componets/CallButton";
import HeartButton from "@/app/sale/componets/HeartButton";
import { SafeListing } from "@/app/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface PetCardProps {
  data?: SafeListing;
}

const PetCard: React.FC<PetCardProps> = ({
  data
}) => {

  const router = useRouter();

  useEffect(() => {
    console.log("DATA: ", data);
  }, []);

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
                className="w-full h-48 sm:w-60 object-cover rounded-lg"
              />
              <HeartButton />
              <CallButton />
          </div>
          
        ) : null}
        {
          data ? (
            <div className="flex flex-row justify-between pt-4 items-baseline">
              <div className="text-gray-600 items-start text-lg font-light">
                {data?.breed ? data?.breed : 'Other'}
              </div>
              <div className="text-gray-600 items-end text-lg font-medium">
                ${data?.price ? data?.price : '0'}
              </div>
            </div>) : null    
        }
      </div>
    </div>
  );
};

export default PetCard;
