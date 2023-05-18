import { ChangeEvent, useEffect, useState } from "react";
import { RegisterOptions, UseFormRegisterReturn } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import SlideDownMenu from "./SlideDownMenu";

interface PhoneNumberFieldProps {
  isLoading: boolean,
  register: UseFormRegisterReturn
}

// const menuItems = [
//     {'id': 'US', 'code': '+1'},
//     {'id': 'ILS', 'code': '+972'},
//     {'id': 'GB', 'code': '+44'},
//     {'id': 'FR', 'code': '+33'},
//     {'id': 'DE', 'code': '+49'},
//     {'id': 'ES', 'code': '+34'},
//     {'id': 'IT', 'code': '+39'},
//     {'id': 'JP', 'code': '+81'},
//     {'id': 'CN', 'code': '+86'},
//     {'id': 'KR', 'code': '+82'},
//     {'id': 'RU', 'code': '+7'},
//     {'id': 'IN', 'code': '+91'},
//     {'id': 'BR', 'code': '+55'},
//     {'id': 'AU', 'code': '+61'},
//     {'id': 'CA', 'code': '+1'},
//     {'id': 'MX', 'code': '+52'},
//     {'id': 'AR', 'code': '+54'},
//     {'id': 'CL', 'code': '+56'},
// ];

const PhoneNumberField: React.FC<PhoneNumberFieldProps> = ({
  isLoading,
  register
}) => {

  const [phoneNumber, setPhoneNumber] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSetNumber = (value: string) => {
    console.log(value);
    setPhoneNumber(value);
  };


  return (
    <div className="flex flex-row w-full justify-start">
      <div className="w-full flex flex-row items-center">
        <div className="relative">
          {/* <SlideDownMenu items={menuItems} className={`slide-down-menu ${isMenuOpen ? 'open' : ''}`} phoneNumber={phoneNumber}/>   */}
        </div>
            <input
            id='phoneNumber'
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => handleSetNumber}
            className="border-2 border-gray-400 rounded-lg p-2 w-full focus:outline-none"
            disabled={isLoading}
            pattern="\d*"
        />
      </div>
    </div>
  )
}

export default PhoneNumberField;
