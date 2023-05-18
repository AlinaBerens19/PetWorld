'use client'

import { BiFilter } from "react-icons/bi";
import CategoryOptions from "./CategoryOptions";
import PetsCategoryChips from "./PetsCategoryChips";
import PetGender from "./PetGender";

const PetsForSaleFilter = () => {
    return (
          <div className="w-full h-full py-4 flex items-top px-5">
            <div className="rounded-lg pt-5 bg-white border border-neutral-200">
                <div className="flex flex-col"> 
                    <div className="flex flex-row justify-between">
                        <div className="text-gray-600 px-40 items-start text-3xl font-light justify-center">
                            PET SEARCH
                        </div>
                    </div>

                    <div className="flex flex-col gap-5">
                        <PetsCategoryChips category="KIND"/>
                        <PetsCategoryChips category="BREED"/>
                        <CategoryOptions />
                        <PetGender />
                        <div className="flex flex-row justify-center">
                            <BiFilter className="text-5xl text-neutral-400 cursor-pointer" />
                        </div>
                    </div>
                </div>   
            </div>
          </div>
      );
    };

export default PetsForSaleFilter
