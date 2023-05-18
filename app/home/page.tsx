import CategoriesModel from "../components/modals/CategoriesModel"
import MapModal from "../components/modals/MapModal"


const HomePage = () => {
  return (
      <div className="flex flex-col w-full h-full">
        <MapModal />
        <CategoriesModel />
      </div>
  )
}

export default HomePage
