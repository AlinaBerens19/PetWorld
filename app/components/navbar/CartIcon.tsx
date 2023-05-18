'use client';


import { BiCart } from 'react-icons/bi';

interface CartIconProps {
  onClick?: () => void;
}

const CartIcon: React.FC<CartIconProps> = ({
  onClick,
}) => {
  return (
    <div 
        onClick={onClick}
        className='text-white text-3xl cursor-pointer toolbar-item'>
      <BiCart />
    </div>
  );
}

export default CartIcon;
