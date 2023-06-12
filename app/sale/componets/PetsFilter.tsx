'use client'

import { BiFilter, BiSearch } from "react-icons/bi";
import CategoryOptions from "./CategoryOptions";
import PetGender from "./PetGender";
import PetsCategoryField from "./PetsCategoryField";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FilterForPriceAndLocation from "./FilterForPriceAndLocation";


const PetsFilter = () => {

    const [searchKind, setSearchKind] = useState("");
    const [searchCategory, setSearchCategory] = useState("sale");
    const [searchGender, setSearchGender] = useState("femail");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const handleSearchKindChange = (value: string) => {
        setSearchKind(value);
    };

    const handleSearchGenderChange = (value: string) => {
        setSearchGender(value);
    };

    const handleSearchCategoryChange = (value: string) => {
        setSearchCategory(value);
    };

    const router = useRouter();

    const handleSearch = () => {
        const queryParams = {
            kind: searchKind || "all",
            category: searchCategory || "sale",
            gender: searchGender || "all",
        };
        const queryString = new URLSearchParams(queryParams).toString();

        router.push(`/search/${queryString}`);
    };


    return (
          <div className="w-full h-full pt-4 flex items-top px-8">
            <div className="rounded-lg pt-5 bg-white border border-neutral-200">
                <div className="flex flex-col"> 
                    <div className="flex flex-row justify-between">
                        <div className="text-gray-600 px-40 items-start text-2xl font-light justify-center">
                            PET SEARCH
                        </div>
                    </div>

                    <div className="flex flex-col gap-5">
                        <PetsCategoryField value={searchKind} onSearchChange={handleSearchKindChange} category="Search.."/>
                        <CategoryOptions category="category" onSearchChange={handleSearchCategoryChange}/>
                        <PetGender category="gender" onSearchChange={handleSearchGenderChange}/>
                        <div className="flex flex-row justify-center">
                            <BiFilter 
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className="text-5xl text-neutral-400 cursor-pointer" />
                        </div>
                        <div className="px-4">
                            {isFilterOpen && (<FilterForPriceAndLocation isOpen={isFilterOpen} />)}
                        </div>
                        
                        <div 
                            onClick={handleSearch}
                            className="flex flex-row gap-2 items-center text-xl text-neutral-700 justify-center">
                            <button>
                                SEARCH
                            </button>
                            <BiSearch className="cursor-pointer" />
                        </div>
                    </div>
                </div>   
            </div>
          </div>
      );
    }

export default PetsFilter
