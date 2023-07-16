
import ClientOnly from "./ClientOnly";
import MapModal from "./components/modals/MapModal";
import CategoriesModel from "./components/modals/CategoriesModel";
import { SessionProvider, useSession } from "next-auth/react";


export default async function Home() {

  return (
      <div className="flex flex-col w-full h-full">
          <MapModal />
          <CategoriesModel />
      </div>
  );
};
