'use client';


import { useMediaQuery } from '@react-hook/media-query';
import DownArrowButton from './DownArrowButton';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import SearchModal from '../modals/SearchModal';
import { SafeUser } from '@/app/types';
import { signOut } from 'next-auth/react';

interface SlideDownMenuProps {
    onClick?: () => void;
    handleSearchClick: () => void;
    showMenu: boolean;
    currentUser?: SafeUser | null;
    logOut?: () => void;
}

const SlideDownMenu: React.FC<SlideDownMenuProps> = ({
    onClick,
    handleSearchClick,
    showMenu = false,
    currentUser,
    logOut,
}) => {
    // Use the useMediaQuery hook to detect the screen size
    const isXlScreen = useMediaQuery('(min-width: 1280px)');
    const registerModal = useRegisterModal();

    const handleOnClick = () => {
        onClick && onClick();
    };

    const menuItems = [
        { title: "DASHBOARD", link: "#", isArrow: false },
        { title: "STORE", link: "#", isArrow: true },
        { title: "SALE", link: "#", isArrow: false },
        { title: "ADOPTION", link: "#", isArrow: true },
        { title: "PAIRING", link: "#", isArrow: false },
        { title: "MORE", link: "#", isArrow: false },
    ];


    return (
        <div
            className={`fixed left-0 right-0 w-full font-extrabold z-10 navbar transition-all duration-500 h-auto ${
                showMenu ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
            } ${isXlScreen ? 'hidden' : ''}`}
        >
            {/* Welcome message */}
            <div className='justify-start text-2xl text-white items-start px-8 pt-7'>
                {currentUser ? (<i>WELCOME, {currentUser?.name}!</i>) : (<i>WELCOME, GUEST!</i>)}
            </div>

            {/* Add the "hidden" class to the component when the screen size is "xl" or larger */}
            <ul className="h-full flex flex-col text-xl text-white items-start gap-6 mx-auto xl:px-40 md:px-7 sm:px-7 p-8 pb-0 justify-top">
                {menuItems && menuItems.map((item, index) => (
                    <div key={index} className='flex flex-row justify-between w-full toolbar-item' onClick={handleOnClick}>
                        <li>
                            <a href={item.link}>{item.title}</a>
                        </li>
                        {item.isArrow && <DownArrowButton />}
                    </div>
                ))}
            </ul>

            <div className='justify-start text-xl text-white items-start px-8 pt-6'>
                {currentUser ? (<p onClick={logOut}>LOG OUT</p>) : null}
            </div>

            <div 
                onClick={handleSearchClick}
                className='px-8 pt-5 text-neutral-700'>
                <SearchModal />
            </div>

            <button onClick={registerModal.open} className="btn btn-block text-white text-2xl mt-6 py-4 w-full membership-button">MEMBERSHIP</button>
        </div>
    );
};

export default SlideDownMenu;

