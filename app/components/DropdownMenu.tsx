import { useState } from 'react';

interface Props {
  id: string;
  items: string[];
  isOpen: boolean;
  onClick?: (item: string) => void;
  style?: React.CSSProperties;
}

const DropdownMenu: React.FC<Props> = ({
  id,
  items,
  isOpen = false,
  onClick,
  style
}) => {
  const [selectedItem, setSelectedItem] = useState(items[0]);

  const handleSelect = (item: string) => {
    setSelectedItem(item);
    onClick && onClick(item);
    console.log('CLICKED => ', item);
  };


  return (
    <div style={style} className="absolute z-50 top-10 w-72 bg-white rounded-md shadow-lg">
     
      {isOpen && (
        <div className="absolute z-10 w-5/6 mt-2 shadow-lg bg-white transition">
          <table className="w-full text-left border-collapse">
            <tbody>
              {items.map((item) => (
                <tr key={item}>
                  <td
                    id={id}
                    className="px-4 py-2 text-gray-600 hover:text-green-700 cursor-pointer border-t border-gray-300"
                    onClick={() => handleSelect(item)}
                  >
                    <p>{item}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
      )}
    </div>
  );
};


export default DropdownMenu;
