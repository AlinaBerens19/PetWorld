'use client';


import SliderHomePage from "./components/SliderHomePage";
import PetFinder from "./components/PetFinder";

const MapModal = () => {
  return (
    <div className="flex flex-col bg-neutral-100 w-full h-full md:flex-row justify-center items-center pt-20 xl:pt-20">
      <SliderHomePage />
      <PetFinder />
    </div>
  );
}

export default MapModal;


