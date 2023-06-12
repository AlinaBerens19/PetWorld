'use client'

import { useEffect, useState } from "react";

interface Props {
    isOpen: boolean;
}


const FilterForPriceAndLocation: React.FC<Props> = ({
    isOpen
}) => {
  const [isRendered, setIsRendered] = useState(false);
  const [shouldRenderContent, setShouldRenderContent] = useState(false);

  useEffect(() => {
    setIsRendered(true);
    if (isOpen) {
      setShouldRenderContent(true);
    } else {
      setTimeout(() => setShouldRenderContent(false), 300);
    }
  }, [isOpen]);

  return (
    <div
      className={`filter-content ${isOpen ? 'slide-down' : 'slide-up'}`}
      style={{ display: shouldRenderContent ? 'block' : 'none' }}
    >
      <div className="w-full px-4 py-4 text-neutral-600 rounded-lg border-neutral-300 border-[2px]">
        Filter
      </div>
    </div>
  );
};

export default FilterForPriceAndLocation;

