'use client';

import { useState, useEffect } from "react";
import catBlueEyes from "@/public/images/cat_blue_eyes.jpg";
import dogBeach from "@/public/images/dog_beach.jpg";
import parrot from "@/public/images/parrot.jpg";
import dogCuddle from "@/public/images/dog_cuddle.jpg";

const SliderHomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [catBlueEyes.src, dogBeach.src, parrot.src, dogCuddle.src];

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? images.length - 1 : prevSlide - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative flex flex-row sm:h-screen sm:w-full transition ease-in-out h-auto bg-yellow-500 w-auto md:w-auto md:flex-1 sm:flex-1">
      <img
        src={images[currentSlide]}
        alt="Slider Image"
        className="object-cover object-center h-full w-full"
      />
      <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-row items-center justify-between">
        <button
          onClick={handlePrevSlide}
          className="text-white font-bold text-6xl px-6 py-6 m-4 rounded-full opacity-75 hover:opacity-100 transition-opacity"
        >
          &lt;
        </button>

        <button
          onClick={handleNextSlide}
          className="text-white font-bold text-6xl px-6 py-6 rounded-full opacity-75 hover:opacity-100 transition-opacity transform absolute right-0"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default SliderHomePage;

