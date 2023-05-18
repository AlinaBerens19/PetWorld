'use client';


import SliderHomePage from "./components/SliderHomePage";
import PetFinder from "./components/PetFinder";

const MapModal = () => {
  return (
    <div className="flex flex-col bg-neutral-100 w-full h-full md:flex-row justify-center items-center pt-32 xl:pt-36">
      <SliderHomePage />
      <PetFinder />
    </div>
  );
}

export default MapModal;


