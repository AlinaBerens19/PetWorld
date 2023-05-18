'use client';

import { FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

interface HamburgerMenuProps {
    onClick: () => void;
    onHover?: () => void;
    showArrow?: boolean;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
    onClick,
    onHover,
    showArrow = false,
}) => {

  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
    onClick();
  };

  return (
    <div className="flex flex-row z-50 gap-1 hamburger-button" onClick={handleClick}>
      {clicked ? <FaTimes /> : <FaBars />}
    </div>
  )
}

export default HamburgerMenu
