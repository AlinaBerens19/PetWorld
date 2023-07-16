'use client'


import { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface Props {
  isOpen: boolean;
  priceRange: number[];
  locationRange: number[];
  handlePriceChange: (value: number) => void;
  handleLocationChange: (value: number) => void;
  latitude?: number;
  longitude?: number;
}

const FilterForPriceAndLocation: React.FC<Props> = ({
  isOpen,
  priceRange,
  locationRange,
  handlePriceChange,
  handleLocationChange
}) => {
  const [priceRangeState, setPriceRangeState] = useState<number>(0);
  const [locationRangeState, setLocationRangeState] = useState<number>(0);
  const maxPrice = priceRange[1];
  const maxLocation = locationRange[1];

  useEffect(() => {
    setPriceRangeState(0);
    setLocationRangeState(0);
  }, []);


  // Handler to update the price range state
  const handlePriceRangeChange = (value: number | number[]) => {
    // Calculate the actual price range value based on the slider value
    const numberValue = typeof value === "number" ? value : value[0];
    const priceRangeValue = (numberValue / 100) * maxPrice;
    console.log("priceRangeValue:", priceRangeValue);
    setPriceRangeState(priceRangeValue);
    handlePriceChange(priceRangeValue);
  };

  // Handler to update the location range state
  const handleLocationRangeChange = (value: number | number[]) => {
    const numberValue = typeof value === "number" ? value : value[0];
    const locationRangeValue = (numberValue / 100) * maxLocation;
    console.log("locationRangeValue:", locationRangeValue);
    setLocationRangeState(locationRangeValue);
    handleLocationChange(locationRangeValue);
  };

  return (
    <div className="w-full px-4 py-4 text-neutral-600 rounded-lg border-neutral-300 border-[2px]">
      <div className="flex flex-col space-y-4 pb-4 gap-2">
        <div>
          <label htmlFor="price">Price Range:</label>
          <Slider
            min={0}
            max={100} // Slider value goes from 0 to 100
            value={(priceRangeState / maxPrice) * 100} // Map the priceRangeState back to slider value
            onChange={handlePriceRangeChange}
            marks={{ 0: "0", 100: maxPrice.toString() }} // Use slider values from 0 to 100
          />
        </div>

        <div>
          <label htmlFor="location">Location Range:</label>
          <Slider
            min={0}
            max={100} // Slider value goes from 0 to 100
            value={(locationRangeState / maxLocation) * 100} // Map the locationRangeState back to slider value
            onChange={handleLocationRangeChange}
            marks={{ 0: "0", 100: maxLocation.toString() }} // Use slider values from 0 to 100
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterForPriceAndLocation;





