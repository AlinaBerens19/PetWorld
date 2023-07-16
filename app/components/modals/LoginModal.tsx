'use client';


import Modal from "./Modal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { 
  FieldValues,
  SubmitHandler,
  useForm
} from "react-hook-form";
import { useCallback, useState } from "react";
import 'react-phone-number-input/style.css'
import { toast } from "react-hot-toast";
import useLoginModal from "@/app/hooks/useLoginModal";
import Footer from "./components/Footer";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import useLoading from "@/app/hooks/useLoading";



const LoginModal = () => {

  const router = useRouter()
  const loadingModal = useLoading()
  const [isLoading, setIsLoading] = useState(false);
  
  const 
  { register, 
    handleSubmit, 
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
  }});

  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()

  const handleClose = useCallback(() => {
    loginModal.close()
  }, [loginModal])

  const onToggle = useCallback(() => {
    loginModal.close()
    registerModal.open()
  }, [loginModal, registerModal])


  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn('credentials', {
        ...data,
        redirect: false,
    })
    .then((callback) => {
        setIsLoading(false);
        if(callback?.ok) {
            toast.success('Login successful');
            router.refresh();
            loginModal.close();
        } 
        if(callback?.error){
            toast.error(callback.error);
        }
    })
  }  

  const body = (
    <div className='flex flex-col justify-center gap-4'>
      
      <input
        id="email"
        type='email'
        placeholder='Email'
        className='border-2 border-gray-400 rounded-lg p-2'
        {...register('email', { required: true})}
        disabled={loadingModal.isLoading}
        required
      />

      <input
        id="password"
        type='password'
        placeholder='Password'
        className='border-2 border-gray-400 rounded-lg p-2'
        {...register('password', { required: true})}
        disabled={loadingModal.isLoading}
        required
      />

    </div>
  )  

  const footer = <Footer 
    title='Don’t have an account?'
    subtitle='Register'
    onToggle={onToggle}
  />


  return (
    <Modal 
        title='Login'
        isOpen={loginModal.isOpen}
        onClose={loginModal.close}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel='Login'
        disabled={false}
        secondaryAction={handleClose}
        secondaryActionLabel='Cancel'
        body={body}
        footer={footer}
    />
  )
}

export default LoginModal
