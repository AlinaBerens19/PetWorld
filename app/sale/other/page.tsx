import getFilteredPetsList from "@/app/actions/getFilteredPetsList";
import SearchResults from "@/app/components/SearchResults"

const OtherPage = async () => {

  const getFilteredPets = await getFilteredPetsList({ user_input: ['other', 'sale'] });

  return (
    <div className="flex flex-col w-full h-min-screen">
      <div className="flex pt-20 justify-center items-center">
        <SearchResults query_array={['other', 'sale']} getFilteredPets={getFilteredPets} />  
      </div>
     </div>
  )
}

export default OtherPage