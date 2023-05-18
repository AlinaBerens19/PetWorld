'use client';

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import useCreateAd from "@/app/hooks/useCreateAd";
import { useMemo, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Description from "./body/create_ad/Description";
import PetProfileBody from "./body/create_ad/PetProfile";
import ImageUpload from "../inputs/ImageUpload";
import SimpleMap from "../inputs/SimpleMap";

enum STEPS {
  BASIC = 1,
  PET_PROFILE = 2,
  DESCRIPTION = 3,
  IMAGES = 4,
  LOCATION = 5,
  PRICE = 6
}

const CreateAdModal = () => {

  const createAdModal = useCreateAd()
  const router = useRouter()
  const [step, setStep] = useState(STEPS.BASIC);

  const onBack = () => {
    setStep((value) => value - 1)
  }

  const onNext = () => {
    setStep((value) => value + 1)
  }

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
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
        age: 0,
        kind: '',
        breed: '',
        imageSrc: '',
        category: '',
        description: '',
        price: 0,
        location: '',
        firstImage: '',
        secondImage: '',
        thirdImage: '',
        fourthImage: '',
    },
  });

  let upload_images = Array<string>(4);

  const name = watch('name')
  const age = watch('age')
  const kind = watch('kind')
  const breed = watch('breed')
  const imageSrc = watch('imageSrc')
  const category = watch('category')
  const description = watch('description')
  const price = watch('price')
  const location = watch('location')
  const firstImage = watch('firstImage')
  const secondImage = watch('secondImage')
  const thirdImage = watch('thirdImage')
  const fourthImage = watch('fourthImage')


  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create'
    }

    return 'Next'
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.BASIC) {
      return 'undefined'
    }

    return 'Back'
  }, [step]);
  
  const handleClose = () => {
    createAdModal.close()
    setStep(STEPS.BASIC) 
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if(data.age < 0) return
    if(step !== STEPS.PRICE) {
      onNext();
    }
    
    if(step === STEPS.PRICE) {
      await axios.post('/api/listing', data)
        .then(() => {
          alert('Your pet profile were successfully added!');
          router.refresh();
          reset();
          console.log('DATA => ', data)
          createAdModal.close();
        })
        .catch((error) => {
          alert(error);
          console.log('DATA => ', data)
          console.log('error')
        })
        .finally(() => {
          console.log('finally')
          setStep(STEPS.BASIC);
          createAdModal.close();
        })
    }
  }

  let body = (
    <div className="flex flex-col gap-2 justify-top">
      <div className="flex flex-col gap-2">
        <h2 className="text-neutral-600 text-2xl">Have not yet profile for your pet?</h2>
        <p className="text-neutral-600 text-xl">Please click NEXT to continue</p>
      </div>
    </div>
  )

  if(step === STEPS.PET_PROFILE) {
    body = <PetProfileBody register={register} errors={errors} />
  }

  if(step === STEPS.DESCRIPTION) {
    body = (
      <Description register={register} setValue={setCustomValue}/>
    )
  }

  if (step === STEPS.IMAGES) {
    const imageProperties = ['firstImage', 'secondImage', 'thirdImage', 'fourthImage', 'imageSrc'];
    body = (
      <div className="flex flex-col gap-2 justify-top">
        <div className="flex flex-col gap-2">
          <h3 className="text-neutral-600">Upload profile photos of your pet</h3>
          <div className="image-slider">
            <div className="flex flex-row justify-center items-center">
              {imageProperties.map((property, index) => (
                <ImageUpload
                  key={property}
                  onChange={(value) => setCustomValue(property, value)}
                  value={watch(property)}
                  disabled={index > 0 && !watch(imageProperties[index - 1])}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  

  if(step === STEPS.LOCATION) {
    body = (
      <div className="flex flex-col gap-2 justify-top">
        <div className="flex flex-col gap-2">
          <h3 className="text-neutral-600">Set location for your pet</h3>
          <div className="h-1/2 w-full">
            <SimpleMap />
          </div>
        </div>
      </div>
    )
  }

  if(step === STEPS.PRICE) {
    body = (
      <div className="flex flex-col gap-2 justify-top">
        <div className="flex flex-col gap-2">
          <h3 className="text-neutral-600">Set price for your pet</h3>
          <input
            {...register('price', { required: true })}
            className="border border-neutral-300 rounded-md px-4 py-2"
            type="number"
            placeholder="Price"
          />
        </div>
      </div>
    )
  }


  return (
    <Modal 
        title='Create Ad'
        isOpen={createAdModal.isOpen}
        onClose={handleClose}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel={actionLabel}
        disabled={false}
        secondaryAction={step === STEPS.BASIC ? undefined : onBack}
        secondaryActionLabel={secondaryActionLabel}
        body={body}
    />
  )
}

export default CreateAdModal;
