import ClientOnly from "@/app/ClientOnly";
import getFilteredPetsList from "@/app/actions/getFilteredPetsList";
import { getCurrentUser } from "@/app/actions/getServerSession";
import Container from "@/app/components/Container";
import PetCard from "@/app/components/modals/components/PetCard";

interface IParams {
  user_input: string;
}

const SearchPage = async ({ params }: { params: IParams }) => {
  const currentUser = await getCurrentUser();
  const { user_input } = params;
  const query_array: any[] = [];

  const decoded = decodeURIComponent(user_input);
  console.log('DECODED ==> ', decoded);

  const keyValuePairs = decoded?.split('&');

  const values = keyValuePairs?.map((pair) => {
    const [key, value] = pair.split('=');
    console.log('value:', value);
    query_array.push(value);
  });

  for (let i = 0; i < query_array.length; i++) {
    console.log('query_array[i]:', query_array[i]);
  }
  
  const getFilteredPets = await getFilteredPetsList({ user_input: query_array });

  return (
    <ClientOnly>
      <Container>
      <div className="flex flex-col">
        <div className="flex flex-row w-full pt-40 pb-5 text-neutral-700 justify-center items-center text-2xl">
          All {query_array[0]}s for {query_array[1]} 
        </div>  
        <div className="grid grid-cols-1 pb-20 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5 gap-8 px-4">
            {getFilteredPets.map((pet) => (
              <PetCard data={pet}/>
            ))}
        </div>
      </div>
      </Container>
    </ClientOnly>
  );
};

export default SearchPage;


