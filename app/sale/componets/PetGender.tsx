'use client'

import { useState } from "react";


const PetGender = () => {

  const [ clicked, setClicked ] = useState(true)

  const handleClick = (e: any) => {
    setClicked(!clicked)
  }

  return (
    <div className="flex flex-row items-center justify-center gap-3">

      <div id="male" onClick={handleClick}>
        <div className={`text-medium text-lg cursor-pointer
            ${clicked ? "text-neutral-500" : "text-primary-500"}
        `}>
            MALE
        </div>
      </div>  

      <div className="text-light text-lg text-neutral-500"> | </div>

      <div id="femail" onClick={handleClick}>
        <div className={`text-medium text-lg cursor-pointer
            ${clicked ? "text-primary-600" : "text-neutral-500"}
        `}>
            FEMAIL
        </div>
      </div> 

    </div>
  )
}

export default PetGender
