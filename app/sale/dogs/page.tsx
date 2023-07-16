import getFilteredPetsList from "@/app/actions/getFilteredPetsList";
import SearchResults from "@/app/components/SearchResults";

const DogsPage = async () => {

  const getFilteredPets = await getFilteredPetsList({ user_input: ['dog', 'sale'] });

  return (
    <div className="flex flex-col w-full h-min-screen">
      <div className="flex pt-20 justify-center items-center">
        <SearchResults query_array={['dog', 'sale']} getFilteredPets={getFilteredPets} />  
      </div>
     </div>
  )
}

export default DogsPage