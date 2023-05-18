'use client';

import { BiSearch } from 'react-icons/bi';


interface SearchIconProps {
  onClick?: () => void;
}

const SearchIcon: React.FC<SearchIconProps> = ({
  onClick,
}) => {
  return (
    <div 
      onClick={onClick}
      className='text-white text-3xl cursor-pointer toolbar-item'>
      <BiSearch />
    </div>
  )
}

export default SearchIcon
