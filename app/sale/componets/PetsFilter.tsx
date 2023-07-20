'use client'


import { BiFilter, BiSearch } from "react-icons/bi";
import CategoryOptions from "./CategoryOptions";
import PetGender from "./PetGender";
import PetsCategoryField from "./PetsCategoryField";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FilterForPriceAndLocation from "./FilterForPriceAndLocation";


const PetsFilter = () => {
  const [searchKind, setSearchKind] = useState("");
  const [searchCategory, setSearchCategory] = useState("sale");
  const [searchGender, setSearchGender] = useState("femail");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [maxPrice, setMaxPrice] = useState(15000);
  const [maxLocation, setMaxLocation] = useState(15000);
  const [priceRange, setPriceRange] = useState([0, maxPrice]);
  const [locationRange, setLocationRange] = useState([0, maxLocation]);

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);


  useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
          },
          (error) => {
            console.log(error.message);
          }
        );
      } else {
        console.log("Geolocation is not supported by your browser");
      }
    }, []);

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

  const handleSearch = async () => {
    // Wait for geolocation values to be available
    // while (latitude === 0 && longitude === 0) {
    //   await new Promise(resolve => setTimeout(resolve, 10000)); // Delay for 100 milliseconds
    // }
  
    // Geolocation values are available
    const queryParams: Record<string, string> = {
      kind: searchKind || "all",
      category: searchCategory || "sale",
      gender: searchGender || "all",
      maxPrice: JSON.stringify(maxPrice),         // <-- Stringify the maxPrice value
      maxLocation: JSON.stringify(maxLocation),   // <-- Stringify the maxLocation value
      latitude: JSON.stringify(latitude),
      longitude: JSON.stringify(longitude),
    };
  
    const queryString = new URLSearchParams(queryParams).toString();
  
    router.push(`/search/${queryString}`);
  };
  

  const handlePriceChange = (value: number | number[]) => {
    console.log("PRICE ==> ", value);
    if (Array.isArray(value)) {
      console.log("New price range:", value);
      setPriceRange(value);
    }
    else {
      setMaxPrice(value);
    }
  };
  
  const handleLocationChange = (value: number | number[]) => {
    console.log("LOCATION ==> ", value);
    if (Array.isArray(value)) {
      console.log("New location range:", value);
      setLocationRange(value);
    }
    else {
      setMaxLocation(value);
    }
  };
  

  return (
    <div className="w-full h-full pt-4 flex items-top ps-12">
      <div className="rounded-lg pt-5 bg-white border border-neutral-200">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <div className="text-green-700 px-40 items-start text-xl font-medium justify-center">
              PET SEARCH
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <PetsCategoryField
              value={searchKind}
              onSearchChange={handleSearchKindChange}
              category="Search.."
            />
            <CategoryOptions
              category="category"
              onSearchChange={handleSearchCategoryChange}
            />
            <PetGender
              category="gender"
              onSearchChange={handleSearchGenderChange}
            />
            <div className="flex flex-row justify-center">
              <BiFilter
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="text-5xl text-neutral-400 cursor-pointer"
              />
            </div>
            <div className="px-4">
              {isFilterOpen && (
                <FilterForPriceAndLocation
                  isOpen={isFilterOpen}
                  priceRange={priceRange}
                  locationRange={locationRange}
                  handlePriceChange={handlePriceChange}
                  handleLocationChange={handleLocationChange}
                />
              )}
            </div>

            <div
              onClick={handleSearch}
              className="flex flex-row gap-2 items-center text-xl text-neutral-700 justify-center pb-4"
            >
              <div className="flex flex-row gap-2 items-center justify-center bg-green-600 rounded-lg text-white px-4 py-2 hover:bg-yellow-400 cursor-pointer">
                SEARCH <BiSearch />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetsFilter;
