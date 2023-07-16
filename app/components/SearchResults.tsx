'use client'

import { useState } from "react";
import { SafeListing } from "../types"
import PetCard from "./modals/components/PetCard"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";



interface Params {
    query_array: any[],
    getFilteredPets?: SafeListing[] | null,
}

const SearchResults:React.FC<Params> = ({
    query_array,
    getFilteredPets
}) => {

  const [currentPage, setCurrentPage] = useState(1);
  const petsPerPage = 10
  
  const indexOfLastPet = currentPage * petsPerPage
  const indexOfFirstPet = indexOfLastPet - petsPerPage
  const currentPets = getFilteredPets?.slice(indexOfFirstPet, indexOfLastPet)

  const totalPages = Math.ceil((getFilteredPets?.length || 0)/ petsPerPage)

  let petKind = query_array[0] === 'all' ? 'pet' : query_array[0]

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="flex flex-col">
        <div className="flex flex-row w-full pt-10 pb-5 text-neutral-700 justify-center items-center text-2xl">
          All {petKind}s for {query_array[1]} 
        </div>  
        <div className="grid grid-cols-1 pb-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5 gap-8 px-4">
            {currentPets?.map((pet) => (
              <PetCard data={pet}/>
            ))}
        </div>
        <div className="flex justify-center items-center space-x-2">
          
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 rounded-full focus:outline-none bg-green-400 text-white"
          disabled={currentPage === 1}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

          {Array.from({length: totalPages}, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-full focus:outline-none ${
                  currentPage === page ? "bg-green-700 text-white" : "bg-green-400 text-white"
                }`}
              >
                {page}
              </button>
          ))}  

          <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-4 py-2 rounded-full focus:outline-none bg-green-400 text-white"
              disabled={currentPage === totalPages}
            >
              <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
  )
}

export default SearchResults
