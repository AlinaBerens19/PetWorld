import { BiHeartCircle, BiHome, BiMoney } from "react-icons/bi";
import { useState } from "react";

interface CategoryOptionsProps {
  category: string;
  onSearchChange: (value: string) => void;
}

interface ClickedStates {
  [key: string]: boolean;
}

const CategoryOptions: React.FC<CategoryOptionsProps> = ({
  category,
  onSearchChange,
}) => {
  const [clickedStates, setClickedStates] = useState<ClickedStates>({
    sale: true,
    pairing: false,
    adoption: false,
  });

  const handleClick = (category: string) => {
    setClickedStates((prevState) => {
      const newState = { ...prevState };
  
      Object.keys(newState).forEach((key) => {
        if (key !== category) {
          newState[key] = false;
        } else {
          newState[key] = !prevState[key];
        }
      });
  
      return newState;
    });
  };

  return (
    <div className="flex flex-row justify-between py-10 px-5">
      <div
        id="sale"
        className={`flex flex-row gap-3 ${
          clickedStates.sale ? "text-green-700" : "text-neutral-500"
        }`}
        onClick={() => {
          onSearchChange("sale");
          handleClick("sale");
        }}
      >
        <div className="text-lg font-medium">SALE</div>
        <BiMoney
          className={`text-3xl ${
            clickedStates.sale ? "text-green-700" : "text-neutral-400"
          } cursor-pointer`}
        />
      </div>

      <div
        id="pairing"
        className={`flex flex-row gap-3 ${
          clickedStates.pairing ? "text-green-700" : "text-neutral-500"
        }`}
        onClick={() => {
          onSearchChange("pairing");
          handleClick("pairing");
        }}
      >
        <div className="text-lg font-medium">PAIRING</div>
        <BiHeartCircle
          className={`text-3xl ${
            clickedStates.pairing ? "text-green-700" : "text-neutral-400"
          } cursor-pointer`}
        />
      </div>

      <div
        id="adoption"
        className={`flex flex-row gap-3 ${
          clickedStates.adoption ? "text-green-700" : "text-neutral-500"
        }`}
        onClick={() => {
          onSearchChange("adoption");
          handleClick("adoption");
        }}
      >
        <div className="text-lg font-medium">ADOPTION</div>
        <BiHome
          className={`text-3xl ${
            clickedStates.adoption ? "text-green-700" : "text-neutral-400"
          } cursor-pointer`}
        />
      </div>
    </div>
  );
};

export default CategoryOptions;
