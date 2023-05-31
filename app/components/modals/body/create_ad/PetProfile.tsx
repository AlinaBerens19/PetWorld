'use client';


import { useEffect, useState } from 'react';
import { FieldErrors, FieldValues, UseFormRegister, useFormContext } from 'react-hook-form'
import { toast } from 'react-hot-toast';
import DropdownMenu from '@/app/components/DropdownMenu';
import { BsArrowDown } from 'react-icons/bs';
import { cat_breeds, dog_breeds, other_breeds, petKinds } from '@/app/utils';
import { set } from 'date-fns';


interface Props {
    errors: FieldErrors<FieldValues>,
    register: UseFormRegister<FieldValues>,
    setValue: (id: string, value: any, options?: { shouldDirty?: boolean | undefined; shouldValidate?: boolean | undefined; shouldTouch?: boolean | undefined; }) => void
}

const PetProfileBody: React.FC<Props> = ({
    errors,
    register,
    setValue
}) => {

  const [age, setAge] = useState(0)
  const [gender, setGender] = useState('male') 
  const [isOpenKind, setIsOpenKind] = useState(false)
  const [isOpenBreed, setIsOpenBreed] = useState(false)
  const [kind, setKind] = useState('')
  const [breed, setBreed] = useState('')
  const [breeds, setBreeds] = useState<string[]>(dog_breeds)

  const setBreedsOfPets = () => {
    if(kind === 'dog') {
      setBreeds([])
      setBreeds(dog_breeds)
    }
    if(kind === 'cat') {
      setBreeds([])
      setBreeds(cat_breeds)
    }
    if(kind === 'other') {
      setBreeds([])
      setBreeds(other_breeds)
    }
  }

  useEffect(() => {
    setBreedsOfPets()
  }, [kind])
  
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }

  const onBreedClicked = (breed: string) => {
      setCustomValue('breed', breed)
      setBreed(breed)
      setIsOpenBreed(false)
    }

  const onKindClicked = (kind: string) => {
    setCustomValue('kind', kind)
    setKind(kind)
    setIsOpenKind(false)
  }

  const handleOpenKind = () => {
    setIsOpenKind(!isOpenKind)
    if(isOpenBreed) {
      setIsOpenBreed(false)
    }
  }

  const handleOpenBreed = () => {
    setIsOpenBreed(!isOpenBreed)
    if(isOpenKind) {
      setIsOpenKind(false)
    }
  }


  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAge = parseInt(event.target.value)
    if(newAge >= 0 && newAge <= 30) {
      setAge(newAge)
      setValue('age', newAge)
    }
    else if(newAge > 30) {
      //Change after to another toast library and ask for confirmation!!!
      toast.error('Age must be less than 30')
    }
  }

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newGender = event.target.value
    console.log('NEW GENDER ==> ', newGender)
    if(newGender === 'male'){
      setGender('male')
    }
    if(newGender === 'femail'){
      setGender('femail')
    }
    if(newGender === 'other'){
      setGender('other')
    }
    setValue('gender', newGender)
  }

  return (
    <div className='flex flex-col justify-center gap-4'>
      <h3 className='text-neutral-600'>Please fill next info:</h3>  
      <input
        type='text'
        id='name'
        placeholder="Name"
        className="border border-gray-300 rounded-md p-2"
        {...register('name', { required: true })}
      />
      {errors.name && <span className='text-red-500'>This field is required</span>}

    <div className='flex flex-row justify-start'>

      <div className="flex flex-col gap-2 justify-top">
        
      {/* Kind of pet   */}
        <div className="flex flex-row w-5/6">
            <div className="flex flex-row items-center px-2 py-2 border border-gray-300 justify-between w-full rounded-md relative">
                <p className="justify-start text-neutral-600">{kind}</p>
                <BsArrowDown onClick={handleOpenKind} className={isOpenKind ? "transform rotate-180 cursor-pointer" : "cursor-pointer"} />
            </div>
        </div>

        {errors.kind && <span className='text-red-500'>This field is required</span>}

        <DropdownMenu 
          id="kind"
          items={petKinds} 
          isOpen={isOpenKind} 
          onClick={onKindClicked} 
          {...register('kind', { required: true })}
            style={{
                position: 'relative',
                top: 0,
                left: 0,
                transform: isOpenKind ? "translateY(0)" : "translateY(-100%)"
            }}
        />


    </div>

    <div className="flex flex-col gap-2 justify-top">
        
      {/* Breed of pet   */}
        <div className="flex flex-row w-5/6">
            <div className="flex flex-row items-center px-2 py-2 border border-gray-300 justify-between w-full rounded-md relative">
                <p className="justify-start text-neutral-600">{breed}</p>
                <BsArrowDown onClick={handleOpenBreed} className={isOpenBreed ? "transform rotate-180 cursor-pointer" : "cursor-pointer"} />
            </div>
        </div>

        {errors.breed && <span className='text-red-500'>This field is required</span>}

        <DropdownMenu 
          id="breed"
          items={breeds}
          isOpen={isOpenBreed} 
          onClick={onBreedClicked} 
          {...register('breed', { required: true })}
            style={{
                position: 'relative',
                top: 0,
                left: 0,
                transform: isOpenBreed ? "translateY(0)" : "translateY(-100%)"
            }}
        />


    </div>


        </div>

        <div className='flex flex-row justify-start items-center gap-5'>
        <input
          type='number'
          id='age'
          placeholder="Age"
          value={age}
          onChange={handleAgeChange}
          className="border border-gray-300 w-1/6 rounded-md p-2"
        />
        {errors.age && <span className='text-red-500'>This field is required</span>}
        

      <div id='gender' className='flex flex-row gap-5'>

        <div className='flex flex-row gap-2'>
          <div className='text-neutral-600 text-light gap-2'>Male</div>
          <input 
            type="radio" 
            value='male'
            checked={gender === 'male'}
            onChange={handleGenderChange}
          />
        </div>

        <div className='flex flex-row gap-2'>
          <div className='text-neutral-600 text-light gap-2'>Femail</div>
          <input 
            type="radio" 
            value='femail'
            checked={gender === 'femail'}
            onChange={handleGenderChange}
          />
        </div>

        <div className='flex flex-row gap-2'>
          <div className='text-neutral-600 text-light gap-2'>Other</div>
          <input 
            type="radio" 
            id='gender'
            value='other'
            checked={gender === 'other'}
            onChange={handleGenderChange}
          />
        </div>
      </div>

    </div>
        </div>

  )
}

export default PetProfileBody
