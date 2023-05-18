'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo: React.FC = () => {

  const router = useRouter();

  return (
    <div 
      onClick={() => router.push('/home')}
      className="md:block xl:block cursor-pointer">
        <Image 
          alt='Logo'
          src='/images/logo.webp'
          loading="lazy"
          width={150}
          height={60}
          className="pr-3rem width-auto"
    />


    </div>
  )
}

export default Logo;

