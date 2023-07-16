'use client'

import React, { useState } from 'react';
import { Range } from 'react-range';

interface SliderProps {
  // Define any props you want to pass to the Slider component
}

const MySlider: React.FC<SliderProps> = () => {
  const [values, setValues] = useState([50]);

  const minValue = 0;
  const maxValue = 100;

  return (
    <>
      <h3 className="text-xl font-bold">Choose price range</h3>
      <div className="relative">
        <Range
          step={0.1}
          min={minValue}
          max={maxValue}
          values={values}
          onChange={(newValues) => setValues(newValues)}
          renderTrack={({ props, children }) => (
            <div {...props} className="h-6 w-full bg-gray-300">
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div {...props} className="h-42 w-42 bg-gray-600" />
          )}
        />
        <div className="flex justify-between mt-2">
          <span className="text-gray-500">{minValue}</span>
          <span className="text-gray-500">{maxValue}</span>
        </div>
      </div>
    </>
  );
};

export default MySlider;
