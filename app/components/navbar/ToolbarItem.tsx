'use client';

import { BsChevronDown } from 'react-icons/bs';


interface ToolbarItemProps {
    onClick?: () => void;
    title: string;
    outlined?: boolean;
    isArrow?: boolean;
}

const ToolbarItem: React.FC<ToolbarItemProps> = ({
    onClick,
    title = "HOME",
    outlined = false,
    isArrow = false,
}) => {


  return (
    <div 
        onClick={onClick}
        className={`outline-none cursor-pointer ${outlined ? "text-yellow-400" : "text-white"} flex flex-row toolbar-item gap-1 items-center`} 
    >
        <h2>{title}</h2>
        {isArrow && <p><BsChevronDown /></p>}
    </div>
  )
}

export default ToolbarItem
