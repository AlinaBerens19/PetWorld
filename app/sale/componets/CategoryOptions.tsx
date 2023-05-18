'use client'

import { BiHeartCircle, BiHome, BiMoney } from "react-icons/bi"

const CategoryOptions = () => {
  return (
    <div className="flex flex-row justify-between py-10 px-5">

        <div className="flex flex-row gap-3">
            <div 
                onClick={() => {console.log("sale")}}
                className="text-neutral-500 text-lg font-medium">
                SALE
            </div>
            <BiMoney className="text-3xl text-neutral-400 cursor-pointer" /> 
        </div>   

        <div 
            onClick={() => {console.log("pairing")}}
            className="flex flex-row gap-3">
            <div className="text-neutral-500 text-lg font-medium">
                PAIRING
            </div>
            <BiHeartCircle className="text-3xl text-neutral-400 cursor-pointer" />  
        </div> 

        <div 
            onClick={() => {console.log("adoption")}}
            className="flex flex-row gap-3">
            <div className="text-neutral-500 text-lg font-medium">
                ADOPTION
            </div>
            <BiHome className="text-3xl text-neutral-400 cursor-pointer" />
        </div>     
    
    </div>
)
}

export default CategoryOptions
