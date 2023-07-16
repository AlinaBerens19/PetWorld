'use client'

import React, { useState, useRef, useEffect, forwardRef, ForwardedRef } from 'react';

interface Props {
  id: string;
  items: string[];
  isOpen: boolean;
  onClick?: (item: string) => void;
  style?: React.CSSProperties;
}

const DropdownMenu: React.ForwardRefRenderFunction<HTMLDivElement, Props> = (
  { id, items, isOpen, onClick, style },
  ref
) => {
  const [selectedItem, setSelectedItem] = useState(items[0]);
  const listRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleSelect = (item: string) => {
    setSelectedItem(item);
    onClick && onClick(item);
    console.log('CLICKED => ', item);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      // Clicked outside the menu, close it
      // You can add additional logic if needed
      console.log('Clicked outside the menu');
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div
      style={style}
      className="absolute z-50 top-10 w-72 bg-white rounded-md shadow-lg"
      ref={ref}
    >
      {isOpen && (
        <div className="absolute z-10 w-5/6 mt-2 shadow-lg bg-white transition">
          <div
            className="overflow-y-scroll max-h-60"
            style={{ maxHeight: '10rem' }}
            ref={listRef}
          >
            <table className="w-full text-left border-collapse">
              <tbody>
                {items.map((item, index) => (
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
        </div>
      )}
    </div>
  );
};

export default forwardRef<HTMLDivElement, Props>(DropdownMenu);
