import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface SlideDownMenuProps {
  items: { id: string; code: string }[];
  defaultItem?: {
    id: string;
    code: string;
  };
  className?: string;
}

const SlideDownMenu: React.FC<SlideDownMenuProps> = ({
  items,
  defaultItem,
  className = ""
}) => {
  const [selectedItem, setSelectedItem] = useState(defaultItem || items[0]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleItemClick = (item: { id: string; code: string }) => {
    setSelectedItem(item);
    toggleMenu();
  };


  return (
    <div className={`relative ${className}`} style={{ width: "80px" }}>
      <div
        className="flex items-center justify-center gap-1"
        onClick={toggleMenu}
        role="button"
        tabIndex={0}
      >
        <span className="font-medium">{selectedItem.code}</span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className="text-gray-400 cursor-pointer"
        />
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 bg-white shadow-md border border-gray-200 rounded-lg w-full z-10 overflow-y-auto max-h-60">
          {items.map((item) => (
            <div
              id="code"
              key={item.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleItemClick(item)}
            >
              <span>{item.code}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SlideDownMenu;
