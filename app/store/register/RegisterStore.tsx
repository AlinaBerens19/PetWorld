'use client'

import DropdownMenu from "@/app/components/DropdownMenu"
import useUpdateProfilePicture from "@/app/hooks/useUpdateProfilePicture"
import { use, useEffect, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { BiArrowToBottom, BiImageAdd } from "react-icons/bi"
import axios from "axios";
import { SafeUser } from "@/app/types"
import useLoginModal from "@/app/hooks/useLoginModal"
import ProfileImageUpload from "@/app/components/inputs/ProfileImageUpload"


interface RegisterStoreProps {
  currentUser?: SafeUser | undefined | null;
}

const RegisterStore:React.FC<RegisterStoreProps> = ({
  currentUser
}) => {

  const [category, setCategory] = useState('')

  const loginModal = useLoginModal();

  const [isOpen, setIsOpen] = useState(false)
  const updateProfilePicture = useUpdateProfilePicture();


  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
        userId: currentUser?.id,
        name: '',
        description: '',
        email: '',
        imageSrc: '',
        category: '',
        phone: '',
    },
  });


  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const storeData = {
      userId: currentUser?.id,
      name: data.name,
      imageSrc: data.imageSrc,
      description: data.description,
      email: data.email,
      category: data.category,
      phone: data.phone,
    };
    
    axios
      .post("/api/store/create", storeData)
      .then((res) => {
        console.log('RES STATUS==>', res.data.status);
        if (res.data.status === 401) {
          alert('You already have a store');
          return;
        }
        if (res.data.status === 402) {
          alert('Store name is already exists');
          return;
        }
        else {
          alert("Store created!");
          console.log('RESULT ==>', res);
          if (updateProfilePicture.isOpen) {
            updateProfilePicture.close();
          }
        }
      })
      .catch((err) => {
        alert(`Error: ${err.response.data.message}`);
        console.log(err);
      })
      .finally(() => {
        console.log("done");
      });
    }

  

  const onItemClicked = (item: string) => {
    setCustomValue('category', item)
    setCategory(item)
    setIsOpen(false)
  }

  return (
    <div className="flex flex-col w-full sm:w-2/3 items-center justify-center h-min-screen px-4 sm:px-20">
      <div className="text-neutral-700 text-xl">Register your store</div>
      <div className="flex flex-col sm:flex-row w-full gap-5 pt-4">
        <input
          id="name"
          type="text"
          className="w-full sm:w-full text-neutral-800 h-12 border-[1px] border-gray-300 rounded-md px-4"
          {...register('name', { required: true })}
          placeholder={'Your store name'}
        />

        <input
          id="email"
          type="email"
          className="w-full sm:w-full text-neutral-800 h-12 border-[1px] border-gray-300 rounded-md px-4"
          {...register('email', { required: true })}
          placeholder={'Your store email'}
        />

          <input 
              id="phone"
              type="text" 
              className="w-full text-neutral-800 h-12 border-[1px] border-gray-300 rounded-md px-4"
              {...register('phone', { required: true })}
              placeholder={'Your store phone'}
            />
      </div>

      <div className="flex flex-row w-full pt-4">
        <textarea 
            id="description" 
            rows={10}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            {...register('description', { required: true })}
            placeholder={'Your store description'}
          />
      </div>

      <div className="flex flex-col sm:flex-row w-full pt-4 gap-4">

        <input
          id="address"
          type="text"
          className="w-full sm:w-full text-neutral-800 h-12 border-[1px] border-gray-300 rounded-md px-4"
          onChange={(e) => {}}
          placeholder={'Address'}
        />

        <input
          id="city"
          type="text"
          className="w-full sm:w-full text-neutral-800 h-12 border-[1px] border-gray-300 rounded-md px-4"
          onChange={(e) => {}}
          placeholder={'City'}
        />
      </div>

      <div className="flex flex-col sm:flex-row w-full pt-4 gap-4">

        <input
          id="country"
          type="text"
          className="w-full sm:w-full text-neutral-800 h-12 border-[1px] border-gray-300 rounded-md px-4"
          onChange={(e) => {}}
          placeholder={'Country'}
        />

        <input
          id="zipCode"
          type="text"
          className="w-full sm:w-full text-neutral-800 h-12 border-[1px] border-gray-300 rounded-md px-4"
          onChange={(e) => {}}
          placeholder={'Zip code'}
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row w-full pt-4 sm:justify-between">
        <div className="flex flex-col">
          <div className="flex flex-row gap-2 items-center">
            <input
              id="category-field"
              type="text"
              className="text-neutral-700 w-5/6 h-12 border-[1px] border-gray-300 rounded-md px-4"
              value={category}
              {...register('category', { required: true })}
              placeholder={'Category'}
            />

          <BiArrowToBottom onClick={handleOpen} size={24} className="cursor-pointer hover:navbar" />
          </div>

          <DropdownMenu 
            id="category"
            items={["PetShop", "Website", "Other"]} 
            isOpen={isOpen} 
            onClick={onItemClicked} 
              style={{
                  position: 'relative',
                  top: 0,
                  left: 0,
                  transform: isOpen ? "translateY(0)" : "translateY(-100%)"
              }}
          />
        </div>

        <div className="flex flex-row gap-4 items-center text-neutral-700">
        <p>Add image of your store</p>
        <ProfileImageUpload 
          size={24} 
          onChange={(value) => setCustomValue('imageSrc', value)}
          value={watch('imageSrc')}
          key={'image'}
          visible={false}
        />
      </div>
      <button 
        onClick={handleSubmit(onSubmit)}
        className="items-end justify-end py-2 px-6 navbar rounded-lg text-white text-bold">
          REGISTER
        </button>        
      </div> 
    </div>
  )
}

export default RegisterStore
