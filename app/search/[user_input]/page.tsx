import ClientOnly from "@/app/ClientOnly";
import getFilteredPetsList from "@/app/actions/getFilteredPetsList";
import { getCurrentUser } from "@/app/actions/getServerSession";
import Container from "@/app/components/Container";
import SearchResults from "@/app/components/SearchResults";

interface IParams {
  user_input: string;
}

const SearchPage = async ({ params }: { params: IParams }) => {
  const { user_input } = params;
  const query_array: any[] = [];

  const decoded = decodeURIComponent(user_input);
  console.log('DECODED ==> ', decoded);

  const keyValuePairs = decoded?.split('&');

  keyValuePairs?.map((pair) => {
    const [key, value] = pair.split('=');
    console.log('value:', value);
    query_array.push(value);
  });

  const getFilteredPets = await getFilteredPetsList({ user_input: query_array });

  return (
    <div className="flex flex-col w-full h-min-screen">
      <div className="flex pt-20 justify-center items-center">
        <SearchResults query_array={query_array} getFilteredPets={getFilteredPets}/>
      </div>
    </div>
  );
};

export default SearchPage;


