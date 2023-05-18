'use client';

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'


interface Props {
    register: UseFormRegister<FieldValues>
    errors: FieldErrors<FieldValues>
}

const PetProfileBody: React.FC<Props> = ({
    register,
    errors
}) => {
  return (
    <div className='flex flex-col justify-center gap-4'>
    <h3 className='text-neutral-600'>PLEASE FILL NEXT INFO ABOUT YOUR PET:</h3>  
    <input
      type='text'
      id='name'
      placeholder="Name"
      className="border border-gray-300 rounded-md p-2"
      {...register('name', { required: true })}
    />
    {errors.name && <span className='text-red-500'>This field is required</span>}

    <input
      type='number'
      id='age'
      placeholder="Age"
      className="border border-gray-300 rounded-md p-2"
      {...register('age', { required: true })}
    />
    {errors.age && <span className='text-red-500'>This field is required</span>}

    <input
      type='text'
      id='kind'
      placeholder="Kind"
      className="border border-gray-300 rounded-md p-2"
      {...register('kind', { required: true })}
    />
    {errors.kind && <span className='text-red-500'>This field is required</span>}

    <input
      type='text'
      id='breed'
      placeholder="Breed"
      className="border border-gray-300 rounded-md p-2"
      {...register('breed', { required: true })}
    />
    {errors.breed && <span className='text-red-500'>This field is required</span>}

  </div>
  )
}

export default PetProfileBody
