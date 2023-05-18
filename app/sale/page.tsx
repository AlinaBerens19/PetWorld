import ClientOnly from "../ClientOnly"
import getPetsForSale from "../actions/getPetsForSale"
import { getCurrentUser } from "../actions/getServerSession"
import Container from "../components/Container"
import PetCard from "../components/modals/components/PetCard"
import PetsForSaleFilter from "./componets/PetsForSaleFilter"


const SalePage = async () => {

  const currentUser = await getCurrentUser();
  const getPets = await getPetsForSale();

  return (
    <ClientOnly>
        <Container>
        <div className="pt-32 sm:col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 divide-x">
            <div className="grid grid-cols-2 gap-4 pe-4">
                {getPets.map((pet) => (
                    <div key={pet.id}>
                    {pet ? (
                        <div className="flex justify-center items-center">
                        <PetCard key={pet.id} data={pet} />
                        </div>
                    ) : null}
                    </div>
                ))}
            </div>

            <div className="hidden md:block sm:block">
                <div className="flex flex-col w-full h-full">
                    <PetsForSaleFilter />
                </div>
            </div>
            </div>

        </Container>
    </ClientOnly>
  )
}

export default SalePage
