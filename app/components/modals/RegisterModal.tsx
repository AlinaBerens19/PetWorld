'use client';


import Modal from "./Modal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { 
  FieldValues,
  SubmitHandler,
  useForm
} from "react-hook-form";
import { useCallback } from "react";
import 'react-phone-number-input/style.css'
import SlideDownMenu from "./utils/SlideDownMenu";
import { toast } from "react-hot-toast";
import axios from "axios";
import { menuItems } from "@/app/utils";
import useLoginModal from "@/app/hooks/useLoginModal";
import Footer from "./components/Footer";
import useLoading from "@/app/hooks/useLoading";
import ImageUpload from "../inputs/ImageUpload";
import { watch } from "fs";


const RegisterModal = () => {

  const loadingModal = useLoading()

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keyValue = event.key;
    const regex = /[0-9]/;
    
    if (!regex.test(keyValue) && keyValue !== "Backspace" && keyValue !== "Delete") {
      event.preventDefault();
    }
  }
  
  const 
  { register, 
    handleSubmit, 
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      username: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      image: '',
  }});

  const onChange = () => {

  }

  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()

  const handleClose = useCallback(() => {
    registerModal.close()
  }, [registerModal])

  const onToggle = useCallback(() => {
    registerModal.close()
    loginModal.open()
  }, [loginModal, registerModal])


  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if(data.password !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    console.log(data);

    axios.post('/api/register', data)
      .then(() => {
        alert('Your account were successfully registered!');
        console.log(loadingModal.isLoading)
        registerModal.close();
      })
      .catch((error) => {
        if (error.response.status === 404) {
          console.log(loadingModal.isLoading)
          alert('User already exists');
        } else {
          console.log(loadingModal.isLoading)
          alert('Something went wrong');
        }
      })
      .finally(() => {
        loadingModal.stop();
      })
    }

  const body = (
    <div className='flex flex-col justify-center gap-4'>
      
      <input
        id="username"
        type='text'
        placeholder='Username'
        className='border-2 border-gray-400 rounded-lg p-2'
        {...register('username', { required: true})}
        disabled={loadingModal.isLoading}
        required
      />  
      <input
        id="email"
        type='email'
        placeholder='Email'
        className='border-2 border-gray-400 rounded-lg p-2'
        {...register('email', { required: true})}
        disabled={loadingModal.isLoading}
        required
      />

      <div className="flex justify-start">
        <div className="w-full flex gap-1">
          <div className="flex flex-row w-full justify-start">
            <div className="w-full flex flex-row items-center">
              <div className="relative">
                <SlideDownMenu items={menuItems} className={`slide-down-menu`}/>  
              </div>
                <input
                  id='phoneNumber'
                  type='tel'
                  placeholder="Enter phone number"
                  {...register('phoneNumber', {
                    required: false,
                  })}
                  maxLength={9}
                  disabled={loadingModal.isLoading}
                  className="border-2 border-gray-400 rounded-lg p-2 w-full focus:outline-none"
                  onKeyDown={handleKeyDown}
                />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="flex flex-col gap-2 justify-top">
        <div className="flex flex-col gap-2">
          <h3 className="text-neutral-600">Upload profile photos</h3>
          <div className="image-slider">
            <div className="flex flex-row justify-center items-center">
                <ImageUpload
                  value={""} 
                  onChange={onChange}
                  disabled={loadingModal.isLoading}                  
                />
            </div>
          </div>
        </div>
      </div>              */}

      <input
        id="password"
        type='password'
        placeholder='Password'
        className='border-2 border-gray-400 rounded-lg p-2'
        {...register('password', { required: true})}
        disabled={loadingModal.isLoading}
        required
      />
      <input
        id="confirmPassword"
        type='password'
        placeholder='Confirm Password'
        className='border-2 border-gray-400 rounded-lg p-2'
        {...register('confirmPassword', { required: true})}
        disabled={loadingModal.isLoading}
        required
      />
    </div>
  )  

  const footer = <Footer 
    title='Already have an account?'
    subtitle='Login'
    onToggle={onToggle}
  />


  return (
    <Modal 
        title='Register'
        isOpen={registerModal.isOpen}
        onClose={registerModal.close}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel='Register'
        disabled={false}
        secondaryAction={handleClose}
        secondaryActionLabel='Cancel'
        body={body}
        footer={footer}
    />
  )
}

export default RegisterModal
