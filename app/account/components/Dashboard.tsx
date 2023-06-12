'use client'


import useCreateAd from "@/app/hooks/useCreateAd";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeUser } from "@/app/types";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BiCamera, BiPencil, BiSave } from "react-icons/bi";
import SidePanel from "./SidePanel";
import useUpdateProfilePicture from "@/app/hooks/useUpdateProfilePicture";
import ProfileImageUpload from "@/app/components/inputs/ProfileImageUpload";
import { Profile } from "next-auth";
import useGlobalStore from "@/app/hooks/useHandleSideMenuClick";

interface DashboardProps {
  currentUser?: SafeUser | undefined | null;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  currentUser
}) => {

  const createAdModal = useCreateAd()
  const loginModal = useLoginModal();
  const router = useRouter();
  const updateProfilePicture = useUpdateProfilePicture();
  const globalStore: any = useGlobalStore();
  

  const toggleEditProfilePicture = () => {
    if(!currentUser) {
      loginModal.open();
    } else {
      if(!updateProfilePicture.isOpen){
        updateProfilePicture.open();
      }
      else {
        updateProfilePicture.close();
      }
    }
  }

  const handleProfilePictureClick = (open: Function) => {
    if (!updateProfilePicture.isOpen) {
      open?.();
    }
  };

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }

  const handleSideMenuClick = (item: string) => {
      globalStore.handleSideMenuClick(item, currentUser, createAdModal, loginModal, router);
  } 

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      surname: '',
      address: '',
      country: '',
      city: '',
      zip: '',
      phone: '',
      email: '',
      userId: currentUser?.id,
      image: '',
    }
  });

  
  
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    axios.post("/api/profile", data)
    .then(res => {
      alert("Profile updated");
      console.log(res);
    })
    .catch(err => {
      alert(`Error: ${err.response.data.message}` );
      console.log(err);
    })
    .finally(() => {
      console.log("done");
    })
  }


  return (
    
    <div className="container mx-auto">
      <div className="flex flex-col py-24 items-top sm:flex-row w-full h-screen px-8 justify-start gap-8">
        <SidePanel currentUser={currentUser} handleSideMenuClick={handleSideMenuClick} />

        <div className="w-full sm:basis-1/2 border-[1px]">
          

          <div className="flex flex-col h-full">

            <div className="flex flex-row justify-start items-center w-full pt-4 pb-8 px-4">

            <div className="relative inline-block">

            <ProfileImageUpload
              size={15}
              key={'image'}
              onChange={(value) => setCustomValue('image', value)}
              value={watch('image')}
              className="w-36 h-36 rounded-xl text-md text-neutral-500 object-cover aspect-w-1 aspect-h-1"
              disabled={!updateProfilePicture.isOpen}
            />

            { updateProfilePicture.isOpen && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <BiCamera 
                  onClick={() => {handleProfilePictureClick}}
                  className="text-white w-8 h-8" />
              </div>
            )
            }
              
              
            </div>

              <div className="flex flex-col sm:flex-row w-full justify-bottom sm:justify-between">
                <div className="flex flex-col text-neutral-800 justify-center items-top ml-8">
                  <h4>{currentUser?.username ? currentUser?.username : currentUser?.email  }</h4>
                </div> 

                <div className="flex flex-row justify-center items-center gap-4">
                  <BiPencil 
                    className="w-8 h-8 text-neutral-500 cursor-pointer cursor-hover hover:text-yellow-500"
                    onClick={toggleEditProfilePicture}
                    />
                  <BiSave 
                    id='save' 
                    className="w-8 h-8 text-neutral-500 cursor-pointer cursor-hover hover:text-yellow-500"
                    onClick={handleSubmit(onSubmit)}
                    />
                </div>
                </div>
              </div>

            
            <div className="flex flex-col sm:flex-row w-full p-4 gap-4">
              <input 
                id="name"
                type="text" 
                className="w-full sm:w-1/2 text-neutral-800 h-12 border-[1px] border-gray-300 rounded-md px-4"
                placeholder={'Your name'}
                {...register('name', { required: false })}
                />

              <input 
                id="surname"
                type="text" 
                className="w-full sm:w-1/2 text-neutral-800 h-12 border-[1px] border-gray-300 rounded-md px-4"
                placeholder={'Your surname'}
                {...register('surname', { required: false })}
                />
            </div>

            
            <div className="flex flex:col sm:flex-row w-full p-4 gap-4">
              <input 
                id="email"
                type="email" 
                className="w-full sm:w-1/2 text-neutral-800 h-12 border-[1px] border-gray-300 rounded-md px-4"
                {...register('email', { required: false })}
                placeholder={currentUser?.email ? currentUser?.email : 'Your email'}/>

              <input 
                id="phone"
                type="text" 
                className="w-full sm:w-1/2 text-neutral-800 h-12 border-[1px] border-gray-300 rounded-md px-4"
                {...register('phone', { required: false })}
                placeholder={currentUser?.phone ? currentUser?.phone : 'Your phone'}/>
            </div>

            
            <div className="flex flex-col sm:flex-row w-full p-4 gap-4">
              <input 
                id="address"
                type="text" 
                className="w-full sm:w-1/2 text-neutral-800 h-12 border-[1px] border-gray-300 rounded-md px-4"
                placeholder={'Your address'}
                {...register('address', { required: false })}
                />

              <input 
                id="city"
                type="text" 
                className="w-full sm:w-1/2 text-neutral-800 h-12 border-[1px] border-gray-300 rounded-md px-4"
                placeholder={'Your city'}
                {...register('city', { required: false })}
                />
            </div>

            
            <div className="flex flex-col sm:flex-row w-full p-4 gap-4">
              <input 
                id="country"
                type="text" 
                className="w-full sm:w-1/2 text-neutral-800 h-12 border-[1px] border-gray-300 rounded-md px-4"
                placeholder={'Your country'}
                {...register('country', { required: false })}
                />

              <input 
                id="zip"
                type="text" 
                className="w-full sm:w-1/2 text-neutral-800 h-12 border-[1px] border-gray-300 rounded-md px-4"
                placeholder={'Your zip code'}
                {...register('zip', { required: false })}
                />
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard
