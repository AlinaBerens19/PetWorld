'use client';

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useCallback } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { TbPhotoPlus } from 'react-icons/tb'

declare global {
  var cloudinary: any;
}

interface ProfileImageUploadProps {
  onChange: (value: string) => void;
  value: string;
  disabled?: boolean;
  size: number;
  className?: string | undefined;
  register?: UseFormRegister<FieldValues> | undefined;
  defaultImage?: string; // Add defaultImage prop
}

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  onChange,
  value,
  disabled,
  className,
  size,
  register,
  defaultImage
}) => {

  console.log("defaultImage: ", defaultImage);

  const handleUpload = useCallback((result: { info: { secure_url: string; }; }) => {
    onChange(result.info.secure_url);
  }, [onChange]); 
  
  const handleClick = (open: Function) => {
    if (!disabled) {
      open?.();
    }
  };

  return (
    <CldUploadWidget 
      onUpload={handleUpload} 
      uploadPreset='nfmase2o'
      options={{
        maxFiles: 1
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => handleClick(open)}
          >
            <TbPhotoPlus
              size={size}
              className={className}
            />
            {
              (value || defaultImage) && (
                <div className="absolute inset-0 rounded-xl">
                  <Image
                    id={value || defaultImage} // Use defaultImage if value is not provided
                    alt="Upload"
                    fill
                    style={{ objectFit: 'cover', borderRadius: 'inherit' }}
                    src={value || defaultImage!} // Use defaultImage if value is not provided
                    {...register && register("image")}
                  />
                </div>
              )
            }

          </div>
        ) 
    }}
    </CldUploadWidget>
  );
}

export default ProfileImageUpload;