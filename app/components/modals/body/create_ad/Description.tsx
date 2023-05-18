'use client';

import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import DropdownMenu from "../../../DropdownMenu";
import { useState } from "react";
import { BsArrowDown } from "react-icons/bs";

interface Props {
    register: UseFormRegister<FieldValues>,
    setValue: UseFormSetValue<FieldValues>
}

const Description: React.FC<Props> = ({
    register,
    setValue
}) => {

  const [isOpen, setIsOpen] = useState(false)
  const [category, setCategory] = useState('Category')

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }

  const onItemClicked = (item: string) => {
    setCustomValue('category', item)
    setCategory(item)
    setIsOpen(false)
  }


  return (
    <div className="flex flex-col gap-2 justify-top">
        <h3 className="text-gray-600 justify-start">DESCRIBE YOUR PET</h3>
        <textarea 
          id="description" 
          rows={10}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          placeholder="Write your ad description here..."
          {...register('description', { required: true })}
          >

          </textarea>



        <h3 className="text-gray-600 justify-bottom">CHOOSE THE CATEGORY</h3>

        <div className="flex flex-row">
            <div className="flex flex-row items-center px-2 py-4 border border-gray-300 justify-between w-full rounded-md relative">
                <p className="justify-start text-neutral-600">{category}</p>
                <BsArrowDown onClick={handleOpen} className={isOpen ? "transform rotate-180 cursor-pointer" : "cursor-pointer"} />
            </div>
        </div>

        <DropdownMenu 
          id="category"
          items={["Sale", "Adoption", "Pairing"]} 
          isOpen={isOpen} 
          onClick={onItemClicked} 
          {...register('category', { required: true })}
            style={{
                position: 'relative',
                top: 0,
                left: 0,
                transform: isOpen ? "translateY(0)" : "translateY(-100%)"
            }}
        />


    </div>
  )
}

export default Description
