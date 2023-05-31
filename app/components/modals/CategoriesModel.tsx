'use client';

import useScreenSizeDetector from "@/app/hooks/useScreenSizeDetector";
import Container from "../Container";
import RoundImageItem from "./components/RoundImageItem";
import { useRouter } from "next/navigation";
import { ro } from "date-fns/locale";

const CategoriesModel = () => {

  const isSmall = useScreenSizeDetector();
  const router = useRouter();

  return (
    <Container>
      <div className={isSmall ? `hidden` : `flex flex-row py-16 items-center justify-between gap-10`}>
        {/* Add px-10 to add padding to the left and right sides */}
        <RoundImageItem 
          src="https://cdn.pixabay.com/photo/2019/04/22/15/35/persians-4146814__340.jpg"
          alt="Sale"
          text="Sale"
          onClick={() => router.push('/sale')}
        />
        <RoundImageItem 
          src="https://cdn.pixabay.com/photo/2015/11/17/13/13/bulldog-1047518_960_720.jpg"
          alt="Adoption"
          text="Adoption"
        />
        <RoundImageItem 
          src="https://cdn.pixabay.com/photo/2017/07/13/01/56/pugs-2498922_960_720.jpg"
          alt="Pairing"
          text="Pairing"
        />
        <RoundImageItem 
          src="https://cdn.pixabay.com/photo/2020/05/16/01/18/dog-toys-5175628__340.jpg"
          alt="Shop"
          text="Shop"
        />
        <RoundImageItem 
          src="https://cdn.pixabay.com/photo/2020/09/22/03/23/doctor-5591782_960_720.jpg"
          alt="Veterinary"
          text="Veterinary"
        />
      </div>
    </Container>
  )
}

export default CategoriesModel

