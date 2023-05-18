'use client';

import { BsChevronDown } from 'react-icons/bs';

interface DownArrowButtonProps {
    onClick?: () => void;
}

const DownArrowButton: React.FC<DownArrowButtonProps> = ({
    onClick,
}) => {
    return (
        <div 
            onClick={onClick}
            className="text-white text-2xl text-bold cursor-pointer toolbar-item
            "
        >
          <BsChevronDown />
        </div>
    )
}

export default DownArrowButton
