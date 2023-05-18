'use client';

import { BiMap } from "react-icons/bi";


const PetFinder = () => {
    return (
      <div className="flex flex-col py-7 w-auto justify-center text-neutral-700 items-center sm:w-full md:w-auto md:flex-1 sm:flex-1">
        <h3 className="text-5xl">FIND YOUR</h3>
        <h3 className="text-5xl">NEW FRIEND!</h3>
        <p className="pt-5 text-xl">Check pets for sale/adopt nearby</p>
        <div 
            onClick={() => console.log('clicked')}
            className="justify-center items-center pt-5 icon">
            <BiMap className="text-5xl" />
        </div>    
      </div>
    )
  }
  
export default PetFinder;
  