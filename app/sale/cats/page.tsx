import getFilteredPetsList from "@/app/actions/getFilteredPetsList";
import SearchResults from "@/app/components/SearchResults"


const CatsPage = async () => {

  
  const getFilteredPets = await getFilteredPetsList({ user_input: ['cat', 'sale'] });

  return (
    <div className="flex flex-col w-full h-min-screen">
      <div className="flex pt-20 justify-center items-center">
        <SearchResults query_array={['cat', 'sale']} getFilteredPets={getFilteredPets} />  
      </div>
     </div>
  )
}

export default CatsPage
