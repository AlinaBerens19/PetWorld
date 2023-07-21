'use client'


import useCreateAd from "@/app/hooks/useCreateAd";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeStore, SafeUser } from "@/app/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BiCamera, BiPencil, BiSave } from "react-icons/bi";
import SidePanel from "../../components/SidePanel";
import useUpdateProfilePicture from "@/app/hooks/useUpdateProfilePicture";
import ProfileImageUpload from "@/app/components/inputs/ProfileImageUpload";
import useGlobalStore from "@/app/hooks/useHandleSideMenuClick";
import { Store } from "@prisma/client";

interface DashboardProps {
  currentUser?: SafeUser | undefined | null;
  currentStore?: SafeStore | undefined | null;
  image?: string | undefined | null;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  currentUser,
  image,
  currentStore
}) => {

  const createAdModal = useCreateAd()
  const loginModal = useLoginModal();
  const router = useRouter();
  const updateProfilePicture = useUpdateProfilePicture();
  const globalStore: any = useGlobalStore();

  console.log('IMAGE ==>', image);
  

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
      name: currentStore?.name,
      description: currentStore?.description,
      address: currentStore?.address,
      country: currentStore?.country,
      city: currentStore?.city,
      zipCode: currentStore?.zipCode,
      phone: currentStore?.phone,
      email: currentStore?.email,
      userId: currentUser?.id,
      imageSrc: currentStore?.imageSrc,
    }
  });
  
  
  const onSubmit: SubmitHandler<FieldValues> = (data) => {

    console.log('USER ID ==>', data.userId);

    const storeData = {
      name: data.name,
      description: data.description,
      address: data.address,
      country: data.country,
      city: data.city,
      zipCode: data.zipCode,
      phone: data.phone,
      email: data.email,
      imageSrc: data.imageSrc,
      userId: data.userId,
    };

    if (!currentStore) {
      axios
      .post("/api/store/create", storeData)
      .then((res) => {
        alert("Store created");
        console.log(res);
        if (updateProfilePicture.isOpen) {
          updateProfilePicture.close();
        }
      })
      .catch((err) => {
        alert(`Error: ${err.response.data.message}`);
        console.log(err);
      })
      .finally(() => {
        console.log("done");
        router.push(`/store/${currentUser?.id}`);
      });
    }
  
    axios
      .put("/api/store/update", storeData)
      .then((res) => {
        alert("Store updated");
        console.log(res);
        if (updateProfilePicture.isOpen) {
          updateProfilePicture.close();
        }
      })
      .catch((err) => {
        alert(`Error: ${err.response.data.message}`);
        console.log(err);
      })
      .finally(() => {
        console.log("done");
        router.push(`/store/${currentUser?.id}`);
      });
  
  };
  

  return (
    
    <div className="container mx-auto">
      <div className="flex flex-col items-top sm:flex-row w-full h-screen justify-center gap-8">
        <SidePanel currentUser={currentUser} handleSideMenuClick={handleSideMenuClick} />

        <div className="w-full h-fit py-4 sm:basis-1/2 border-[1px]">
          

          <div className="flex flex-col h-full">

            <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-center w-full pt-4 pb-4 sm:pb-8 px-4">

            <div className="relative inline-block">

            <ProfileImageUpload
              size={22}
              key={'imageSrc'}
              onChange={(value) => setCustomValue('imageSrc', value)}
              value={watch('imageSrc')}
              className="w-36 h-36 rounded-xl text-md text-neutral-500 object-cover aspect-w-1 aspect-h-1"
              defaultImage={image ? image : 'https://res.cloudinary.com/dvnn8eun6/image/upload/v1689863094/dog-gc7226d649_1920_x5w50i.jpg'}
              disabled={!updateProfilePicture.isOpen}
              visible={true}
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

              <div className="flex flex-col pt-4 sm:flex-row w-full justify-bottom sm:justify-between">
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
                placeholder='Store name'
                {...register('name', { required: false })}
                />

              <input 
                id="email"
                type="email" 
                className="w-full sm:w-1/2 text-neutral-800 h-12 border-[1px] border-gray-300 rounded-md px-4"
                {...register('email', { required: false })}
                placeholder={currentUser?.email ? currentUser?.email : 'Your email'}/>  

            </div>

            <div className="flex flex:col sm:flex-row w-full p-4 gap-4">

              <input 
                id="city"
                type="text" 
                className="w-full sm:w-1/2 text-neutral-800 h-12 border-[1px] border-gray-300 rounded-md px-4"
                placeholder={'City'}
                {...register('city', { required: false })}
                />
              
              <input 
                id="phone"
                type="text" 
                className="w-full sm:w-1/2 text-neutral-800 h-12 border-[1px] border-gray-300 rounded-md px-4"
                {...register('phone', { required: false })}
                placeholder='Phone'/>
            </div>

            
            <div className="flex flex-col sm:flex-row w-full p-4 gap-4">
              <input 
                id="address"
                type="text" 
                className="w-full sm:w-1/2 text-neutral-800 h-12 border-[1px] border-gray-300 rounded-md px-4"
                placeholder='Address'
                {...register('address', { required: false })}
                />

              <input 
                id="city"
                type="text" 
                className="w-full sm:w-1/2 text-neutral-800 h-12 border-[1px] border-gray-300 rounded-md px-4"
                placeholder='City'
                {...register('city', { required: false })}
                />
            </div>

            
            <div className="flex flex-col sm:flex-row w-full p-4 gap-4">
              <input 
                id="country"
                type="text" 
                className="w-full sm:w-1/2 text-neutral-800 h-12 border-[1px] border-gray-300 rounded-md px-4"
                placeholder='Country'
                {...register('country', { required: false })}
                />

              <input 
                id="zip"
                type="text" 
                className="w-full sm:w-1/2 text-neutral-800 h-12 border-[1px] border-gray-300 rounded-md px-4"
                placeholder='Zip code'
                {...register('zipCode', { required: false })}
                />
            </div>

            <div className="flex flex-col sm:flex-row w-full p-4 gap-4">
                <textarea 
                    id="description" 
                    rows={10}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    {...register('description', { required: false })}
                    placeholder={'Your store description'}
                />
            </div>

            <div className="flex flex-col sm:flex-row w-full p-4 gap-4 justify-end">
            <button 
                onClick={handleSubmit(onSubmit)}
                className="items-end justify-end py-2 px-16 navbar rounded-lg text-white text-bold">
                SAVE
            </button> 

            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard
