'use client'

import { useRouter } from "next/navigation";
import PetCard from "../components/modals/components/PetCard";
import PetsForSaleFilter from "./componets/PetsFilter"
import { SafeListing, SafeUser } from "../types";
import { useState } from "react";

interface Params {
    currentUser?: SafeUser | null,
    getPets?: SafeListing[] | null,
    dogs?: SafeListing[] | null,
    cats?: SafeListing[] | null,
    other?: SafeListing[] | null, 
}

const PetsPage:React.FC<Params> = ({
    currentUser,
    getPets,
    dogs,
    cats,
    other
}) => {

  const router = useRouter()


  const onShowMoreClick = (petKind: string) => {
    router.push(`/sale/${petKind}`)
  }


  return (
    <div className="flex flex-col">

    <div className="flex flex-row h-min-screen">   
        <div className="sm:w-full sm:col-span-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2 xl:divide-x px-4">
        <div className="grid w-full justify-center sm:grid-cols-2 gap-4 pb-4">
            {getPets?.slice(0, 4).map((pet) => (
                <div key={pet.id} className="w-full sm:w-auto">
                {pet ? (
                    <div className="flex w-full justify-center items-center">
                    <PetCard key={pet.id} data={pet} currentUser={currentUser}/>
                    </div>
                ) : null}
                </div>
            ))}
        </div>

            <div className="hidden sm:justify-end ms-16 sm:block">
                <div className="flex flex-col w-full h-full">
                    <PetsForSaleFilter />
                </div>
            </div>

          </div>
        </div>   

    
    <div className="hidden lg:block pt-10">
        <div className="flex flex-row pt-10 justify-center items-center">
            <div className="text-gray-600 text-2xl font-light">
            Cats  
            </div>
        </div>

        <div className="flex flex-row justify-evenly gap-3">
            {cats?.map((pet) => (
                <div key={pet.id}>
                {pet ? (
                    <div className="flex justify-center items-center">
                    <PetCard key={pet.id} data={pet} />
                    </div>
                ) : null}
                </div>
            ))}
        </div>  

        <div className="flex flex-row pt-5 justify-center items-center">            
            <button 
                onClick={() => onShowMoreClick('cats')}
                className="p-2 bg-green-600 rounded-lg text-white">
                    Show more
            </button>
        </div>
    </div>              
    
     

    <div className="hidden lg:block pt-10">
        <div className="flex flex-row pt-10 justify-center items-center">
            <div className="text-gray-600 text-2xl font-light">
            Dogs  
            </div>
        </div>

        <div className="flex flex-row justify-evenly gap-3">
            {dogs?.map((pet) => (
                <div key={pet.id}>
                {pet ? (
                    <div className="flex justify-center items-center">
                    <PetCard key={pet.id} data={pet} />
                    </div>
                ) : null}
                </div>
            ))}
        </div> 

        <div className="flex flex-row pt-5 justify-center items-center">            
            <button 
                onClick={() => onShowMoreClick('dogs')}
                className="p-2 bg-green-600 rounded-lg text-white">
                    Show more
            </button>
        </div>
    </div> 

    <div className="hidden lg:block pt-10">
        <div className="flex flex-row pt-10 justify-center items-center">
            <div className="text-gray-600 text-2xl font-light">
            Others  
            </div>
        </div>

        <div className="flex flex-row justify-evenly gap-3">
            {other?.map((pet) => (
                <div key={pet.id}>
                {pet ? (
                    <div className="flex justify-center items-center">
                    <PetCard key={pet.id} data={pet} />
                    </div>
                ) : null}
                </div>
            ))}
        </div>  

        <div className="flex flex-row pt-5 justify-center items-center">            
            <button 
                onClick={() => onShowMoreClick('other')}
                className="p-2 bg-green-600 rounded-lg text-white">
                    Show more
            </button>
        </div>
    </div>            
        
   
</div>
  )
}

export default PetsPage
