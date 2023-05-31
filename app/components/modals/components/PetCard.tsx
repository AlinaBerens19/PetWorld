'use client';


import CallButton from "@/app/sale/componets/CallButton";
import HeartButton from "@/app/sale/componets/HeartButton";
import { SafeListing } from "@/app/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMars } from '@fortawesome/free-solid-svg-icons';
import { faVenus } from '@fortawesome/free-solid-svg-icons';
import NewButton from "@/app/sale/componets/NewButton";

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
