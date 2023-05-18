'use client';

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useCallback } from 'react';
import { TbPhotoPlus } from 'react-icons/tb'

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
  disabled: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  value,
  disabled
}) => {

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
            className="
              relative
              cursor-pointer
              hover:opacity-70
              transition
              border-dashed 
              border-2 
              p-20 
              border-neutral-300
              flex
              flex-col
              justify-center
              items-center
              gap-4
              text-neutral-600
            "
          >
            <TbPhotoPlus
              size={50}
            />
            <div className="font-semibold text-lg">
              Click to upload
            </div>
            {
              value && (
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    id={value}
                    alt = "Upload"
                    fill
                    style = {{ objectFit: 'cover' }}
                    src = {value}
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

export default ImageUpload;