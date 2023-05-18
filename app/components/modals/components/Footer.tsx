'use client';


import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signIn } from "next-auth/react";

interface FooterProps {
  title: string;
  subtitle: string;
  onToggle: () => void;
}

const Footer: React.FC<FooterProps> = ({
  title,
  subtitle,
  onToggle,
}) => {

  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()

  const handleSignIn = async (provider_signIn: string) => {
    try {
      await signIn(provider_signIn);
      console.log(`Successfully signed in with ${provider_signIn}`);
    } catch (error) {
      console.log(`Error signing in with ${provider_signIn}:`, error);
    }
  };

  return (
    <div className='flex flex-col'>

        <div className='flex flex-row justify-start py-4'>
        <p className="pe-1">{ title }</p>
        <p onClick={onToggle} className="text-blue-500 cursor-pointer">
            { subtitle }
        </p>
        </div>

        <div className="flex flex-row justify-center items-center gap-3 text-3xl ml-4">
            <p onClick={() => handleSignIn('google')}  className="text-black icon">
            <FontAwesomeIcon icon={faGoogle} />
            </p>
            <p onClick={() => signIn('facebook')} className="text-black icon">
            <FontAwesomeIcon icon={faFacebook} />
            </p>
            <p onClick={() => signIn('twitter')} className="text-black icon">
            <FontAwesomeIcon icon={faTwitter} />
            </p>
            <p onClick={() => signIn('github')} className="text-black icon">
            <FontAwesomeIcon icon={faGithub} />
            </p>
        </div>

    </div>
  );
};

export default Footer;
