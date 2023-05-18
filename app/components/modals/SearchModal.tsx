'use client';



import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import useCreateAd from '@/app/hooks/useCreateAd';



const SearchModal = () => {

  
  return (
    <div className="flex flex-row items-center justify-center navbar">
      <div className="relative">
        <input
          type="text"
          className="bg-white px-4 py-2 pl-10 rounded-md outline-none" // Added pl-10 class for left padding and outline-none class to remove focus outline
          placeholder="Search"
        />
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute top-2 left-2 text-gray-500 text-xl icon cursor-pointer"
          onClick={() => console.log('search clicked')}
        />
      </div>
    </div>
  );
};

export default SearchModal;

