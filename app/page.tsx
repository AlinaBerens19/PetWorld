
import ClientOnly from "./ClientOnly";
import Container from "./components/Container";
import MapModal from "./components/modals/MapModal";
import CategoriesModel from "./components/modals/CategoriesModel";

export default async function Home() {

  return (
    <ClientOnly>
        <div className="flex flex-col w-full h-full">
            <MapModal />
            <CategoriesModel />
        </div>
    </ClientOnly>
  );
};
